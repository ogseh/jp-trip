// ============================================================================
//  VOTES — shared stamps for the four travellers (P1–P4), no accounts.
//
//  Where votes are stored, in order of preference:
//   1. claude.ai artifact: the artifact's shared database (live).
//   2. Vercel: /api/votes (see api/votes.js; needs an Upstash Redis store).
//   3. Fallback: this browser only (localStorage).
//
//  Shape (one record per player):
//   { p1: { name: 'Alex', stays: { osaka: 'option-id', tokyo: '...' } }, ... }
// ============================================================================

export const PLAYER_IDS = ['p1', 'p2', 'p3', 'p4'];
const LOCAL_KEY = 'jq:votes';

const listeners = new Set();
let state = {};
let backend = 'local';
let writeFn = async () => {};

const emit = () => listeners.forEach((fn) => fn(state, backend));
const clean = (raw) => {
  const out = {};
  for (const id of PLAYER_IDS) {
    const r = raw?.[id] || {};
    out[id] = { name: typeof r.name === 'string' ? r.name.slice(0, 24) : '', stays: { ...(r.stays || {}) } };
  }
  return out;
};

function useLocal() {
  backend = 'local';
  try { state = clean(JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}')); } catch { state = clean({}); }
  writeFn = async (pid, rec) => {
    state = { ...state, [pid]: rec };
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); } catch { /* private mode */ }
    emit();
  };
  emit();
}

async function tryClaudeDb() {
  if (!window.claude?.use) return false;
  const db = await window.claude.use('db').catch(() => null);
  if (!db) return false;
  const col = db.collection('votes');
  backend = 'shared';
  writeFn = async (pid, rec) => {
    state = { ...state, [pid]: rec }; emit(); // optimistic
    await col.doc(pid).set(rec);
  };
  col.onSnapshot((snap) => {
    const raw = {}; snap.docs.forEach((d) => { if (d.exists) raw[d.id] = d.data(); });
    state = clean(raw); emit();
  }, () => { /* keep last known state */ });
  return true;
}

async function tryApi() {
  try {
    const r = await fetch('api/votes', { cache: 'no-store' });
    if (!r.ok) return false;
    const j = await r.json();
    if (!j.ok) return false;
    backend = 'shared'; state = clean(j.votes); emit();
    writeFn = async (pid, rec) => {
      state = { ...state, [pid]: rec }; emit();
      const res = await fetch('api/votes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ player: pid, record: rec }) });
      const jj = await res.json().catch(() => null);
      if (jj?.ok) { state = clean(jj.votes); emit(); }
    };
    setInterval(async () => {
      if (document.hidden) return;
      try { const rr = await fetch('api/votes', { cache: 'no-store' }); const jj = await rr.json(); if (jj.ok) { state = clean(jj.votes); emit(); } } catch { /* offline */ }
    }, 12000);
    return true;
  } catch { return false; }
}

export const votes = {
  async init() {
    useLocal(); // render immediately, upgrade when a shared store answers
    if (await tryClaudeDb()) return;
    await tryApi();
  },
  get: () => state,
  backend: () => backend,
  subscribe(fn) { listeners.add(fn); fn(state, backend); return () => listeners.delete(fn); },
  setName(pid, name) { const rec = state[pid] || { name: '', stays: {} }; return writeFn(pid, { ...rec, name: String(name).slice(0, 24) }); },
  toggleStay(pid, city, optionId) {
    const rec = state[pid] || { name: '', stays: {} };
    const stays = { ...rec.stays };
    if (stays[city] === optionId) delete stays[city]; else stays[city] = optionId;
    return writeFn(pid, { ...rec, stays });
  },
};

// "Who am I" is per device.
export const me = {
  get() { try { return localStorage.getItem('jq:me'); } catch { return null; } },
  set(pid) { try { localStorage.setItem('jq:me', pid); } catch { /* private mode */ } },
};
