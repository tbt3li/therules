// Cloudflare Worker: /api/signup, /api/login, /api/check, /api/logout
// Requires a D1 binding named "DB" (see wrangler.toml)

const CORS = {
  'Access-Control-Allow-Origin': '*', // change to your site's origin in production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const SESSION_DAYS = 30;
const enc = new TextEncoder();

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

const toHex = (buf) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

const randomHex = (bytes) => toHex(crypto.getRandomValues(new Uint8Array(bytes)));

async function hashPassword(password, saltHex) {
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 },
    key,
    256
  );
  return toHex(bits);
}

async function sha256(text) {
  return toHex(await crypto.subtle.digest('SHA-256', enc.encode(text)));
}

async function createSession(env, userId) {
  const token = randomHex(32);
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  await env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256(token), userId, expires)
    .run();
  return token;
}

async function getUserFromRequest(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  const row = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, s.expires_at
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = ?`
  )
    .bind(await sha256(token))
    .first();
  if (!row || row.expires_at < Date.now()) return null;
  return { id: row.id, email: row.email, name: row.name };
}

async function signup(request, env) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const name = String(body.name || email.split('@')[0] || 'User').slice(0, 50);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ success: false, error: 'Please enter a valid email address.' }, 400);
  if (password.length < 6) return json({ success: false, error: 'Password must be at least 6 characters.' }, 400);

  const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return json({ success: false, error: 'An account with this email already exists.' }, 409);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);

  let result;
  try {
    result = await env.DB.prepare('INSERT INTO users (email, name, password_hash, salt) VALUES (?, ?, ?, ?)')
      .bind(email, name, hash, salt)
      .run();
  } catch (e) {
    return json({ success: false, error: 'An account with this email already exists.' }, 409);
  }

  return json({
    success: true,
    message: 'Signup successful! Now please log in.',
    user: { id: result.meta.last_row_id, email, name },
  }, 201);
}

async function login(request, env) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  const fail = () => json({ success: false, error: 'Invalid email or password.' }, 401);
  if (!user) return fail();

  const hash = await hashPassword(password, user.salt);
  if (hash !== user.password_hash) return fail();

  const token = await createSession(env, user.id);
  return json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    const { pathname } = new URL(request.url);
    try {
      if (pathname === '/api/signup' && request.method === 'POST') return await signup(request, env);
      if (pathname === '/api/login' && request.method === 'POST') return await login(request, env);

      if (pathname === '/api/check') {
        const user = await getUserFromRequest(request, env);
        return user ? json({ success: true, user }) : json({ success: false }, 401);
      }

      if (pathname === '/api/logout' && request.method === 'POST') {
        const auth = request.headers.get('Authorization') || '';
        const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
        if (token) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
        return json({ success: true });
      }

      return json({ success: false, error: 'Not found' }, 404);
    } catch (err) {
      console.error(err);
      return json({ success: false, error: 'Server error. Please try again.' }, 500);
    }
  },
};
