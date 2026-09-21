const CLAN_CODE = "LESGFQYK6D";
const API_BASE = "https://api.chesttracker.com/v1/chests/public/";

const SLOT = 2 * 60 * 60 * 1000;      // refresh every 2 hours
const WEEK = 7 * 24 * 60 * 60 * 1000; // 7 days

// Last Sunday
function lastReset(now) {
  const d = new Date(now);
  let t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0);
  t -= d.getUTCDay() * 86400000;
  if (t > now) t -= WEEK;
  return t;
}

function json(body, status = 200, cc = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cc,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function fetchWeek(clan, startMs, endMs) {
  const url =
    API_BASE + encodeURIComponent(clan) +
    "?start=" + encodeURIComponent(new Date(startMs).toISOString()) +
    "&end=" + encodeURIComponent(new Date(endMs).toISOString()) +
    "&duration=7";

  const res = await fetch(url, {
    headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (compatible; ChestBoard/1.0)" },
  });
  if (!res.ok) throw new Error("ChestTracker API returned HTTP " + res.status);

  const raw = await res.json();
  // Response shape: [ players[], chestDefinitions[], categories{} ]
  const players = Array.isArray(raw) ? raw[0] : null;
  if (!Array.isArray(players)) throw new Error("Unexpected API response format");
  const categories = raw[2] && typeof raw[2] === "object" ? Object.keys(raw[2]) : [];
  return { players, categories };
}

export async function onRequest(context) {
  const { request, env } = context;
  const now = Date.now();
  const u = new URL(request.url);

  // ?week=0 current week, 1 = previous week, ... (max 26)
  const offset = Math.min(26, Math.max(0, parseInt(u.searchParams.get("week") || "0", 10) || 0));
  const clan = env.CLAN_CODE || CLAN_CODE;

  const currentStart = lastReset(now);
  const weekStart = currentStart - offset * WEEK;
  const weekEnd = weekStart + WEEK;

  let nextRefresh, slotId;
  if (offset === 0) {
    slotId = Math.floor((now - weekStart) / SLOT);
    nextRefresh = Math.min(weekStart + (slotId + 1) * SLOT, weekEnd);
  } else {
    slotId = Math.floor(now / 3600000);          // past weeks: refresh hourly
    nextRefresh = now + 3600000;
  }

  const cache = caches.default;
  const origin = u.origin;
  const slotKey = new Request(`${origin}/__cache/${clan}/${offset}/${weekStart}/${slotId}`);
  const lastKey = new Request(`${origin}/__cache/${clan}/${offset}/last`);

  const hit = await cache.match(slotKey);
  if (hit) return hit;

  try {
    const data = await fetchWeek(clan, weekStart, weekEnd);
    const body = { ok: true, data, offset, fetchedAt: now, weekStart, weekEnd, nextRefresh, stale: false };
    const ttl = Math.max(30, Math.floor((nextRefresh - now) / 1000));

    const res = json(body, 200, `public, max-age=30, s-maxage=${ttl}`);
    context.waitUntil(cache.put(slotKey, res.clone()));
    context.waitUntil(cache.put(lastKey, json(body, 200, "public, s-maxage=1209600")));
    return res;
  } catch (err) {
    const last = await cache.match(lastKey);
    if (last) {
      const b = await last.json();
      return json({ ...b, stale: true, error: String(err.message || err), nextRefresh: now + 5 * 60000 });
    }
    return json({ ok: false, error: String(err.message || err), offset, weekStart, weekEnd, nextRefresh: now + 60000 }, 502);
  }
}
