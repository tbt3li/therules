const SOURCE = "https://api.chesttracker.com/chests/public/LESGFQYK6D/";

const SLOT = 2 * 60 * 60 * 1000;      // 2 hours
const WEEK = 7 * 24 * 60 * 60 * 1000; // 7 days

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

// Shape: [ players[], chestDefinitions[], categoryMap{} ]
function shape(raw) {
  const players = Array.isArray(raw) && Array.isArray(raw[0]) ? raw[0] : [];
  const cats = new Set(raw && raw[2] && typeof raw[2] === "object" ? Object.keys(raw[2]) : []);
  const base = new Set(["name", "aliases", "joinedAt", "createdAt", "guardsLevel", "penalty", "points", "chests"]);

  const list = players.map((p) => {
    const c = {};
    for (const k of Object.keys(p)) {
      if (!base.has(k) && p[k] && typeof p[k] === "object" && "chests" in p[k]) {
        c[k] = Number(p[k].chests) || 0;
        cats.add(k);
      }
    }
    return {
      name: p.name,
      aliases: p.aliases || [],
      joinedAt: p.joinedAt || null,
      level: p.guardsLevel ?? null,
      penalty: p.penalty ?? 0,
      points: p.points ?? 0,
      chests: p.chests ?? 0,
      cats: c,
    };
  });
  return { players: list, categories: [...cats] };
}

async function getSource(env) {
  const url = env.CHEST_API_URL || SOURCE;
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 (compatible; ChestBoard/1.0)" },
  });
  if (!res.ok) throw new Error("Source returned HTTP " + res.status);
  return shape(await res.json());
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

  const hit = await cache.match(slotKey);
  if (hit) return hit;

  try {
    const data = await getSource(env);
    const body = { ok: true, data, fetchedAt: now, weekStart, weekEnd, nextRefresh, stale: false };
    const ttl = Math.max(30, Math.floor((nextRefresh - now) / 1000));
    const res = json(body, 200, `public, max-age=30, s-maxage=${ttl}`);
    context.waitUntil(cache.put(slotKey, res.clone()));
    context.waitUntil(cache.put(lastKey, json(body, 200, "public, s-maxage=604800")));
    return res;
  } catch (err) {
    const last = await cache.match(lastKey);
    if (last) {
      const b = await last.json();
      return json({ ...b, stale: true, error: String(err.message || err), weekEnd, nextRefresh: now + 5 * 60000 });
    }
    return json({ ok: false, error: String(err.message || err), weekEnd, nextRefresh: now + 60000 }, 502);
  }
}
