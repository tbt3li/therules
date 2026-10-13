// Cloudflare Worker + D1 (binding name: login_db)
// Routes: POST /api/signup, POST /api/login, GET /api/check, POST /api/logout, PATCH /api/user

const ALLOWED_ORIGINS = [
  'https://thefamily.pages.dev',
  // add your custom domain and/or local test origins here, e.g.:
  // 'https://yourdomain.com',
  // 'http://localhost:8788',
];

const SESSION_DAYS = 7;
const enc = new TextEncoder();

// ---------- helpers ----------
const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const randomHex = (n) => toHex(crypto.getRandomValues(new Uint8Array(n)));
const sha256 = async (t) => toHex(await crypto.subtle.digest('SHA-256', enc.encode(t)));

async function hashPassword(password, saltHex) {
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256);
  return toHex(bits);
}

function getBearer(request) {
  const h = request.headers.get('Authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7).trim() : null;
}

async function createSession(env, userId) {
  const token = randomHex(32);
  const expires = Date.now() + SESSION_DAYS * 86400000;
  await env.login_db
    .prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256(token), userId, expires)
    .run();
  return token;
}

async function getSessionUser(request, env) {
  const token = getBearer(request);
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.login_db
    .prepare(
      `SELECT u.id, u.email, u.name, u.created_at, s.expires_at
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.token_hash = ?`)
    .bind(tokenHash)
    .first();
  if (!row || row.expires_at < Date.now()) return null;
  return { ...row, tokenHash };
}

// ---------- main ----------
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : 'null',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Vary': 'Origin',
      'Content-Type': 'application/json',
    };
    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), { status, headers: corsHeaders });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

    if (!env.login_db) {
      return json({ success: false, error: 'D1 binding "login_db" is missing on this Worker.' }, 500);
    }

    const path = new URL(request.url).pathname;

    try {
      if (path === '/api/signup' && request.method === 'POST') return await handleSignup(request, env, json);
      if (path === '/api/login' && request.method === 'POST') return await handleLogin(request, env, json);
      if (path === '/api/check' && request.method === 'GET') return await handleCheck(request, env, json);
      if (path === '/api/logout' && request.method === 'POST') return await handleLogout(request, env, json);
      if (path === '/api/user' && request.method === 'PATCH') return await handleUpdateUser(request, env, json);

      if (path === '/' || path === '/api') {
        return json({
          message: 'Login API is running',
          endpoints: ['POST /api/signup', 'POST /api/login', 'GET /api/check', 'POST /api/logout', 'PATCH /api/user'],
        });
      }
      return json({ success: false, error: 'Not found' }, 404);
    } catch (error) {
      console.error('Worker error:', error);
      return json({ success: false, error: 'Server error: ' + error.message }, 500);
    }
  },
};

// ---------- 1. SIGNUP ----------
async function handleSignup(request, env, json) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const name = String(body.name || email.split('@')[0] || 'User').trim().slice(0, 50);

  if (!email || !password) return json({ success: false, error: 'All fields are required' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ success: false, error: 'Please enter a valid email address.' }, 400);
  if (password.length < 6) return json({ success: false, error: 'Password must be at least 6 characters.' }, 400);

  const existing = await env.login_db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return json({ success: false, error: 'An account with this email already exists.' }, 409);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);

  let result;
  try {
    result = await env.login_db
      .prepare('INSERT INTO users (email, name, password_hash, salt) VALUES (?, ?, ?, ?)')
      .bind(email, name, hash, salt)
      .run();
  } catch (e) {
    return json({ success: false, error: 'An account with this email already exists.' }, 409);
  }

  // No auto-login: the user must log in after signing up
  return json({
    success: true,
    message: 'Signup successful! Now please log in.',
    user: { id: result.meta.last_row_id, email, name },
  }, 201);
}

// ---------- 2. LOGIN ----------
async function handleLogin(request, env, json) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) return json({ success: false, error: 'Email and password required' }, 400);

  const user = await env.login_db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  const fail = () => json({ success: false, error: 'Invalid email or password.' }, 401);
  if (!user) return fail();

  if ((await hashPassword(password, user.salt)) !== user.password_hash) return fail();

  const token = await createSession(env, user.id);
  return json({ success: true, token, user: { id: user.id, email: user.email, name: user.name } });
}

// ---------- 3. CHECK ----------
async function handleCheck(request, env, json) {
  const user = await getSessionUser(request, env);
  if (!user) return json({ success: false, error: 'Invalid session' }, 401);
  return json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name, createdAt: user.created_at },
  });
}

// ---------- 4. LOGOUT ----------
async function handleLogout(request, env, json) {
  const token = getBearer(request);
  if (token) {
    await env.login_db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  }
  return json({ success: true });
}

// ---------- 5. UPDATE PASSWORD ----------
async function handleUpdateUser(request, env, json) {
  const user = await getSessionUser(request, env);
  if (!user) return json({ success: false, error: 'Invalid session' }, 401);

  const body = await request.json().catch(() => ({}));
  if (body.action !== 'updatePassword') return json({ success: false, error: 'Invalid action' }, 400);

  const password = String(body.password || '');
  if (password.length < 6) return json({ success: false, error: 'Password must be at least 6 characters' }, 400);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);

  await env.login_db
    .prepare('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?')
    .bind(hash, salt, user.id)
    .run();

  // Sign out all other devices
  await env.login_db
    .prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?')
    .bind(user.id, user.tokenHash)
    .run();

  return json({ success: true, message: 'Password updated successfully' });
}
