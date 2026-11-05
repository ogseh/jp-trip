// Vercel serverless function: shared votes for the four travellers.
// Storage: Upstash Redis (add it in Vercel → Storage → Upstash for Redis; it sets
// KV_REST_API_URL / KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_URL / _TOKEN).
const KEY = 'jq:votes';
const PLAYERS = ['p1', 'p2', 'p3', 'p4'];
const CITIES = ['osaka', 'takamatsu', 'kyoto', 'tokyo'];

async function redis(cmd) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

async function readAll() {
  const flat = (await redis(['HGETALL', KEY])) || [];
  const out = {};
  for (let i = 0; i < flat.length; i += 2) { try { out[flat[i]] = JSON.parse(flat[i + 1]); } catch { /* skip bad */ } }
  return out;
}

function sanitize(rec) {
  const name = typeof rec?.name === 'string' ? rec.name.slice(0, 24) : '';
  const stays = {};
  for (const c of CITIES) {
    const v = rec?.stays?.[c];
    if (typeof v === 'string' && v.length <= 60) stays[c] = v;
  }
  return { name, stays };
}

export default async function handler(req, res) {
  if (!(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL)) {
    return res.status(503).json({ ok: false, error: 'No database connected. Add Upstash Redis in Vercel → Storage.' });
  }
  try {
    if (req.method === 'GET') return res.status(200).json({ ok: true, votes: await readAll() });
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!PLAYERS.includes(body?.player)) return res.status(400).json({ ok: false, error: 'Unknown player' });
      await redis(['HSET', KEY, body.player, JSON.stringify(sanitize(body.record))]);
      return res.status(200).json({ ok: true, votes: await readAll() });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Use GET or POST' });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
