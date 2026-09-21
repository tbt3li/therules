// ====== SETTINGS ======
// Paste the API URL here (see "How to find the API URL" below),
// or set it as an environment variable named CHEST_API_URL in Cloudflare.
const DEFAULT_SOURCE = "https://chesttracker.com/counts/LESGFQYK6D";

const SLOT = 2 * 60 * 60 * 1000;          // 2 hours
const WEEK = 7 * 24 * 60 * 60 * 1000;     // 7 days

// Last Sunday 22:00 Pakistan time (= Sunday 17:00 UTC)
function lastReset(now) {
  const d = new Date(now);
  let t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 17, 0, 0);
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

async function getSource(env) {
  const url = env.CHEST_API_URL || DEFAULT_SOURCE;
  let extra = {};
  try { extra = JSON.parse(env.CHEST_HEADERS || "{}"); } catch (e) {}

  const res = await fetch(url, {
    headers: {
      "Accept": "application/json, text/html;q=0.8",
      "User-Agent": "Mozilla/5.0 (compatible; ChestBoard/1.0)",
      ...extra,
    },
  });
  if (!res.ok) throw new Error("Source returned HTTP " + res.status);

  const type = res.headers.get("content-type") || "";
  const text = await res.text();

  if (type.includes("json")) return JSON.parse(text);

  // If it's an HTML page, try to find embedded Next.js data
  const m = text.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (m) return JSON.parse(m[1]);

  try { return JSON.parse(text); } catch (e) {}
  throw new Error(
    "Source is an HTML page with no data inside. Set CHEST_API_URL to the real API URL (see instructions)."
  );
}

export async function onRequest(context) {
  const { request, env } = context;
  const now = Date.now();
  const weekStart = lastReset(now);
  const weekEnd = weekStart + WEEK;
  const slot = Math.floor((now - weekStart) / SLOT);
  const nextRefresh = Math.min(weekStart + (slot + 1) * SLOT, weekEnd);

  const origin = new URL(request.url).origin;
  const cache = caches.default;
  const slotKey = new Request(`${origin}/__cache/counts/${weekStart}/${slot}`);
  const lastKey = new Request(`${origin}/__cache/counts/last`);

  // 1) Fresh cached copy for this 2-hour slot
  const hit = await cache.match(slotKey);
  if (hit) return hit;

  // 2) Fetch from source
  try {
    const data = await getSource(env);
    const body = { ok: true, data, fetchedAt: now, weekStart, weekEnd, nextRefresh, stale: false };
    const ttl = Math.max(30, Math.floor((nextRefresh - now) / 1000));

    const res = json(body, 200, `public, max-age=30, s-maxage=${ttl}`);
    context.waitUntil(cache.put(slotKey, res.clone()));
    context.waitUntil(cache.put(lastKey, json(body, 200, "public, s-maxage=604800")));
    return res;
  } catch (err) {
    // 3) Fall back to the last good copy so the page never goes blank
    const last = await cache.match(lastKey);
    if (last) {
      const b = await last.json();
      return json({ ...b, stale: true, error: String(err.message || err), weekEnd, nextRefresh: now + 5 * 60000 });
    }
    return json({ ok: false, error: String(err.message || err), weekEnd, nextRefresh: now + 60000 }, 502);
  }
}
