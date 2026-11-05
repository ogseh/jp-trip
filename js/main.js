import { TRIP, PLACES, STAGES, PASSES, DAYS, CATEGORIES } from './data.js';
import { JAPAN_PATH, CITY_XY } from './japan-geo.js';

// ============================================================================
//  Helpers
// ============================================================================
const $ = (s, el = document) => el.querySelector(s);
const h = (tag, attrs = {}, html = '') => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (html) el.innerHTML = html;
  return el;
};
const SVGNS = 'http://www.w3.org/2000/svg';
const s = (tag, attrs = {}) => {
  const el = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WEEK_JP = ['日', '月', '火', '水', '木', '金', '土'];
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const parseDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (date, n) => { const d = new Date(date); d.setDate(d.getDate() + n); return d; };
const fmtDate = (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}`;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const store = {
  get(k, fallback) { try { const v = localStorage.getItem('jq:' + k); return v == null ? fallback : JSON.parse(v); } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem('jq:' + k, JSON.stringify(v)); } catch { /* private mode */ } },
};
let currency = store.get('currency', 'JPY');
let party = store.get('party', TRIP.defaultPartySize);
let usePass = store.get('pass', false);
const stageById = Object.fromEntries(STAGES.map((st) => [st.id, st]));
// Which stage a day "belongs" to (for costs/colours): where we sleep, else where we slept last.
const dayStage = DAYS.map((d, i) => d.sleep || DAYS[i - 1]?.sleep || STAGES[0].id);
const placeColor = (id) => PLACES[id]?.color || '#fff';

// ============================================================================
//  FX canvas — snow, plum petals, bursts
// ============================================================================
const fx = (() => {
  const cv = $('#fx'); const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1; const parts = []; const bursts = [];
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener('resize', resize);
  const N = REDUCED ? 0 : Math.round(Math.min(28, W / 45));
  const spawn = (top) => ({
    x: Math.random() * W, y: top ? -20 : Math.random() * H,
    r: 1 + Math.random() * 3, vy: 0.3 + Math.random() * 0.8, vx: -0.3 + Math.random() * 0.6,
    rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04, petal: Math.random() < 0.35, ph: Math.random() * 6.28,
  });
  for (let i = 0; i < N; i++) parts.push(spawn(false));
  const petal = (p) => {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = 'rgba(255,143,177,.85)';
    ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.2, p.r * 1.2, 0, 0, 6.28); ctx.fill(); ctx.restore();
  };
  let last = performance.now();
  const tick = (now) => {
    const dt = Math.min(3, (now - last) / 16.7); last = now;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.ph += 0.02 * dt; p.x += (p.vx + Math.sin(p.ph) * 0.4) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (p.y > H + 20 || p.x < -30 || p.x > W + 30) Object.assign(p, spawn(true));
      if (p.petal) petal(p); else { ctx.fillStyle = 'rgba(245,240,230,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill(); }
    }
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i]; b.life -= 0.02 * dt;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      b.x += b.vx * dt; b.y += b.vy * dt; b.vy += 0.15 * dt;
      ctx.globalAlpha = b.life; ctx.fillStyle = b.c;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.life * 8);
      ctx.beginPath(); for (let k = 0; k < 4; k++) { const a = k * 1.5708; ctx.lineTo(Math.cos(a) * b.s, Math.sin(a) * b.s); ctx.lineTo(Math.cos(a + .785) * b.s * .35, Math.sin(a + .785) * b.s * .35); } ctx.fill();
      ctx.restore(); ctx.globalAlpha = 1;
    }
    if (!document.hidden) requestAnimationFrame(tick); else hiddenWait();
  };
  const hiddenWait = () => document.addEventListener('visibilitychange', () => { last = performance.now(); requestAnimationFrame(tick); }, { once: true });
  requestAnimationFrame(tick);
  return {
    burst(x, y, n = 26) {
      if (REDUCED) return;
      const cols = ['#ffd166', '#ff3b30', '#ff8fb1', '#4cc9f0', '#f5f0e6'];
      for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 2 + Math.random() * 5; bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, life: 1, s: 3 + Math.random() * 5, c: cols[i % cols.length] }); }
    },
  };
})();

// ============================================================================
//  HERO — title, countdown
// ============================================================================
(() => {
  const jp = $('.hero__jp');
  jp.innerHTML = [...jp.textContent].map((c, i) => `<span class="ch" style="animation-delay:${0.5 + i * 0.12}s">${c}</span>`).join('');

  const target = new Date(TRIP.start + 'T00:00:00+09:00').getTime();
  const box = $('#countdown'); const mini = $('#countdownMini'); const hp = $('#hpFill');
  const render = () => {
    const ms = target - Date.now();
    if (ms <= 0) {
      const endMs = new Date(TRIP.end + 'T23:59:59+09:00').getTime();
      box.innerHTML = `<div class="unit"><b>${Date.now() < endMs ? 'GO!' : 'CLEAR'}</b><small>${Date.now() < endMs ? 'adventure in progress' : 'thanks for playing'}</small></div>`;
      mini.textContent = 'GO!'; hp.style.width = '100%'; return;
    }
    const d = Math.floor(ms / 864e5), hh = Math.floor(ms / 36e5) % 24, mm = Math.floor(ms / 6e4) % 60, ss = Math.floor(ms / 1e3) % 60;
    const u = (v, l) => `<div class="unit"><b>${String(v).padStart(2, '0')}</b><small>${l}</small></div>`;
    box.innerHTML = u(d, '日 days') + u(hh, '時 hrs') + u(mm, '分 min') + u(ss, '秒 sec');
    mini.textContent = `${d}d`;
    hp.style.width = `${Math.max(4, Math.min(100, 100 - (d / 120) * 100))}%`;
  };
  render(); setInterval(render, 1000);
})();

// ============================================================================
//  HUD — hide on scroll, active section, reveal-on-scroll
// ============================================================================
(() => {
  const hud = $('#hud'); let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY; hud.classList.toggle('is-hidden', y > lastY && y > 300); lastY = y;
  }, { passive: true });
  const links = [...document.querySelectorAll('.hud__nav a')];
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach((sec) => io.observe(sec));
})();
const revealIO = new IntersectionObserver((ents) => ents.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); }
}), { threshold: 0.15 });
const observeReveal = (root = document) => root.querySelectorAll('.reveal, .section__head, .stage').forEach((el) => revealIO.observe(el));

// ============================================================================
//  MAP
// ============================================================================
const LABEL_POS = { // [dx, dy, anchor] in overview units
  osaka: [10, 20, 'start'], kobe: [-8, 22, 'end'], nara: [14, 4, 'start'], kyoto: [8, -12, 'start'],
  himeji: [-10, -10, 'end'], takamatsu: [0, 26, 'middle'], naoshima: [-12, 0, 'end'], teshima: [6, -12, 'start'],
  tokyo: [14, 4, 'start'], fuji: [0, 24, 'middle'],
};
const MINOR = new Set(['naoshima', 'teshima', 'nara', 'kobe', 'fuji']);
const usedPlaces = [...new Set(DAYS.flatMap((d) => d.route))];

function curve(a, b, bend = 0.2) {
  const [x1, y1] = CITY_XY[a], [x2, y2] = CITY_XY[b];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
  const cx = mx - dy * bend, cy = my + dx * bend;
  return `Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}`;
}
function routePath(route) {
  const pts = route.filter((p, i) => p !== route[i - 1]);
  if (pts.length < 2) return null;
  let d = `M${CITY_XY[pts[0]].join(',')}`;
  for (let i = 1; i < pts.length; i++) d += ' ' + curve(pts[i - 1], pts[i], (i % 2 ? 0.22 : -0.22));
  return d;
}
function bbox(points, pad) {
  const xs = points.map((p) => CITY_XY[p][0]), ys = points.map((p) => CITY_XY[p][1]);
  let x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad, y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
  return [x0, y0, x1 - x0, y1 - y0];
}

const map = (() => {
  const svg = $('#mapSvg');
  const frame = $('.map-frame');
  svg.innerHTML = `
    <defs>
      <linearGradient id="landG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9cc59a"/><stop offset="1" stop-color="#5e8f6a"/>
      </linearGradient>
      <pattern id="seaDots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,.08)"/>
      </pattern>
      <radialGradient id="glow"><stop offset="0" stop-color="#ffd166" stop-opacity=".55"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient>
    </defs>
    <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#seaDots)"/>
    <g id="grid"></g>
    <g id="clouds"></g>
    <path class="coast-glow" d="${JAPAN_PATH}"/>
    <path class="land" fill="url(#landG)" d="${JAPAN_PATH}"/>
    <path class="route-all" id="routeAll"/>
    <path class="route-done" id="routeDone"/>
    <path class="route-day" id="routeDay"/>
    <circle id="dayGlow" r="0" fill="url(#glow)"/>
    <g id="cities"></g>
    <g id="sprite" class="sprite"></g>`;

  // decorative graticule
  const grid = $('#grid', svg);
  for (let x = -200; x <= 1200; x += 60) grid.appendChild(s('line', { x1: x, y1: -400, x2: x, y2: 1100, class: 'grid-line' }));
  for (let y = -400; y <= 1100; y += 60) grid.appendChild(s('line', { x1: -200, y1: y, x2: 1200, y2: y, class: 'grid-line' }));

  // drifting clouds (kumo)
  const clouds = $('#clouds', svg);
  [[150, 250, 1], [620, 470, 0.8], [880, 180, 1.2], [300, 600, 0.9]].forEach(([x, y, sc], i) => {
    const g = s('g', { opacity: '.12' });
    g.innerHTML = `<path d="M0 20 q10 -20 30 -10 q15 -18 35 -2 q20 -6 22 12 z" fill="#f5f0e6" transform="scale(${sc})"/>`;
    const anim = s('animateTransform', { attributeName: 'transform', type: 'translate', values: `${x} ${y}; ${x + 60} ${y - 6}; ${x} ${y}`, dur: `${28 + i * 7}s`, repeatCount: 'indefinite' });
    g.appendChild(anim); clouds.appendChild(g);
  });

  // full route
  const allRoute = []; DAYS.forEach((d) => d.route.forEach((p) => { if (allRoute.at(-1) !== p) allRoute.push(p); }));
  $('#routeAll', svg).setAttribute('d', routePath(allRoute));

  // cities
  const cityG = $('#cities', svg); const cityEls = {};
  usedPlaces.forEach((id) => {
    const [x, y] = CITY_XY[id]; const P = PLACES[id];
    const g = s('g', { class: 'city', style: `--c:${P.color}`, tabindex: '0', role: 'button', 'aria-label': P.name });
    const ring = s('circle', { cx: x, cy: y, r: 8, class: 'city-ring' });
    const dot = s('circle', { cx: x, cy: y, r: 5, class: 'city-dot' });
    const t = s('text', { class: 'city-label' });
    t.innerHTML = `<tspan class="jp">${P.jp}</tspan><tspan dx="4">${P.name}</tspan>`;
    g.append(ring, dot, t); cityG.appendChild(g);
    const go = () => { const i = DAYS.findIndex((d) => d.route.includes(id)); if (i >= 0) select(i); };
    g.addEventListener('click', go); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    cityEls[id] = { g, dot, ring, t, x, y };
  });

  // pixel hero sprite
  const sprite = $('#sprite', svg);
  const PIX = [ // 8x10, chars: k=black hair, s=skin, r=red, w=white, b=blue
    '..kkkk..', '.kkkkkk.', '.kswsks.', '.ssssss.', '..ssss..', '.rrwwrr.', 'srrwwrrs', '..bbbb..', '..b..b..', '.kk..kk.',
  ];
  const COL = { k: '#1a1030', s: '#ffd9b3', r: '#ff3b30', w: '#f5f0e6', b: '#2a3a9c' };
  const inner = s('g', { class: 'bob' }); const body = s('g');
  PIX.forEach((row, yy) => [...row].forEach((c, xx) => { if (c !== '.') body.appendChild(s('rect', { x: xx - 4, y: yy - 10, width: 1.05, height: 1.05, fill: COL[c] })); }));
  inner.appendChild(s('ellipse', { cx: 0, cy: 0.3, rx: 4, ry: 1.2, fill: 'rgba(0,0,0,.4)' }));
  inner.appendChild(body); sprite.appendChild(inner);

  // camera
  const FULL = bbox(usedPlaces, 90);
  const fitAspect = ([x, y, w, hgt]) => {
    const r = frame.clientWidth / Math.max(1, frame.clientHeight) || 10 / 7;
    if (w / hgt < r) { const nw = hgt * r; x -= (nw - w) / 2; w = nw; } else { const nh = w / r; y -= (nh - hgt) / 2; hgt = nh; }
    return [x, y, w, hgt];
  };
  let cam = fitAspect(FULL);
  let spritePos = CITY_XY[DAYS[0].route[0]];
  const applyCam = () => {
    svg.setAttribute('viewBox', cam.map((n) => n.toFixed(2)).join(' '));
    const z = cam[2] / Math.max(1, frame.clientWidth); // user units per screen px
    for (const [id, c] of Object.entries(cityEls)) {
      const [dx, dy, anchor] = LABEL_POS[id] || [10, 4, 'start'];
      c.t.setAttribute('x', c.x + dx * z * 0.85); c.t.setAttribute('y', c.y + dy * z * 0.85);
      c.t.setAttribute('text-anchor', anchor); c.t.style.fontSize = `${13 * z}px`; c.t.style.strokeWidth = `${2.5 * z}px`;
      c.dot.setAttribute('r', 5 * z);
      // minor places only get a label when zoomed in or visited today
      c.t.style.display = MINOR.has(id) && z > 0.75 && !c.g.classList.contains('is-today') ? 'none' : '';
    }
    sprite.setAttribute('transform', `translate(${spritePos[0]} ${spritePos[1] - 4 * z}) scale(${2 * z})`);
  };
  applyCam();
  addEventListener('resize', () => { cam = fitAspect(target || FULL); applyCam(); });

  let target = null, anim = 0, current = -1;
  function animateTo(view, dayPath, onDone) {
    cancelAnimationFrame(anim);
    const from = cam.slice(), to = fitAspect(view); target = view;
    const pathEl = $('#routeDay', svg);
    let len = 0;
    if (dayPath) { pathEl.setAttribute('d', dayPath); len = pathEl.getTotalLength(); pathEl.style.strokeDasharray = `${len} ${len}`; pathEl.style.strokeDashoffset = len; }
    else { pathEl.setAttribute('d', ''); }
    const camDur = REDUCED ? 1 : 900, travelDur = REDUCED ? 1 : 1500, delay = REDUCED ? 0 : 450;
    const fromSprite = spritePos.slice();
    const t0 = performance.now();
    const step = (now) => {
      const tc = Math.min(1, (now - t0) / camDur);
      const e = ease(tc);
      cam = from.map((v, i) => v + (to[i] - v) * e);
      const tt = Math.max(0, Math.min(1, (now - t0 - delay) / travelDur));
      const et = ease(tt);
      if (dayPath) {
        pathEl.style.strokeDashoffset = len * (1 - et);
        const p = pathEl.getPointAtLength(len * et); spritePos = [p.x, p.y];
      } else {
        const end = onDone.end; spritePos = [fromSprite[0] + (end[0] - fromSprite[0]) * et, fromSprite[1] + (end[1] - fromSprite[1]) * et];
      }
      applyCam();
      if (tc < 1 || tt < 1) anim = requestAnimationFrame(step); else onDone.fn?.();
    };
    anim = requestAnimationFrame(step);
  }

  function show(i) {
    current = i;
    const d = DAYS[i];
    const path = routePath(d.route);
    // completed route = all previous days
    const prev = []; DAYS.slice(0, i).forEach((dd) => dd.route.forEach((p) => { if (prev.at(-1) !== p) prev.push(p); }));
    $('#routeDone', svg).setAttribute('d', routePath(prev) || '');
    for (const [id, c] of Object.entries(cityEls)) {
      c.g.classList.toggle('is-today', d.route.includes(id));
      c.g.classList.toggle('is-dim', !d.route.includes(id) && !prev.includes(id));
    }
    const glow = $('#dayGlow', svg); const endP = CITY_XY[d.route.at(-1)];
    glow.setAttribute('cx', endP[0]); glow.setAttribute('cy', endP[1]);
    const view = bbox(d.route, d.route.length > 1 ? 70 : 0);
    if (d.route.length === 1 || new Set(d.route).size === 1) { const [x, y] = CITY_XY[d.route[0]]; view.splice(0, 4, x - 130, y - 90, 260, 180); }
    if (view[2] < 220) { const c = view[0] + view[2] / 2; view[0] = c - 110; view[2] = 220; }
    animateTo(view, path, { end: endP, fn: () => { glow.setAttribute('r', 34 * cam[2] / Math.max(1, frame.clientWidth)); } });
    glow.setAttribute('r', 0);
  }
  function overview() {
    current = -1;
    for (const c of Object.values(cityEls)) { c.g.classList.remove('is-dim'); c.g.classList.remove('is-today'); }
    $('#routeDone', svg).setAttribute('d', routePath(allRoute));
    $('#dayGlow', svg).setAttribute('r', 0);
    animateTo(FULL, null, { end: spritePos });
  }
  return { show, overview };
})();

// ============================================================================
//  DAY STRIP + PANEL
// ============================================================================
let currentDay = 0; let typer = 0;
const strip = $('#dayStrip'); const panel = $('#dayPanel');
DAYS.forEach((d, i) => {
  const date = parseDate(d.date);
  const btn = h('button', { class: 'day-chip', role: 'tab', 'aria-selected': 'false', style: `--c:${placeColor(dayStage[i])}`, 'aria-label': `Day ${i + 1}, ${fmtDate(date)}: ${d.title}` },
    `<span class="d">DAY${String(i + 1).padStart(2, '0')}</span><span class="n">${date.getDate()}</span><span class="w">${MONTHS[date.getMonth()]}·${WEEK_JP[date.getDay()]}</span><span class="bar"></span>`);
  btn.addEventListener('click', () => { stopPlay(); select(i); });
  strip.appendChild(btn);
});

function yen(n) { return fmtMoney(n); }

function select(i, { scrollChip = true } = {}) {
  currentDay = (i + DAYS.length) % DAYS.length;
  const d = DAYS[currentDay]; const date = parseDate(d.date);
  [...strip.children].forEach((c, k) => { c.classList.toggle('is-active', k === currentDay); c.setAttribute('aria-selected', k === currentDay); });
  if (scrollChip) { const chip = strip.children[currentDay]; strip.scrollTo({ left: chip.offsetLeft - strip.clientWidth / 2 + chip.clientWidth / 2, behavior: REDUCED ? 'auto' : 'smooth' }); }
  map.show(currentDay);

  const sleep = d.sleep ? stageById[d.sleep] : null;
  const arriving = STAGES.find((st) => st.checkIn === d.date);
  const transport = [];
  if (arriving) transport.push(`${arriving.arrive.label} · ${arriving.arrive.duration} · ${yen(arriving.arrive.price)}`);
  (d.extraTransport || []).forEach((t) => transport.push(`${t.label} · ${yen(t.price)}`));
  const dayCost = d.activities.reduce((a, b) => a + (b.price || 0), 0);
  const routeNames = d.route.filter((p, k) => p !== d.route[k - 1]).map((p) => `<b>${PLACES[p].name}</b>`).join(' → ');

  panel.style.setProperty('--c', placeColor(dayStage[currentDay]));
  panel.innerHTML = `
    <div class="dialog__top"><span class="dialog__day">DAY ${currentDay + 1} / ${DAYS.length}</span>
      <span class="dialog__date">${WEEK_EN[date.getDay()]} ${fmtDate(date)} (${WEEK_JP[date.getDay()]})</span></div>
    <h3>${d.title}</h3>
    <p class="dialog__where">${routeNames}</p>
    <p class="dialog__text typing" id="typeText"></p>
    <ul class="dialog__list">${d.activities.map((a, k) => `
      <li style="animation-delay:${0.15 + k * 0.08}s"><span class="t">${a.time || ''}</span>
        <span>${CATEGORIES[a.cat]?.icon || '✦'} ${a.name}${a.note ? `<span class="note">${a.note}</span>` : ''}</span>
        <span class="p">${a.price ? yen(a.price) : 'free'}</span></li>`).join('')}
    </ul>
    <div class="dialog__meta">
      <div><span class="k">SLEEP</span><span>${sleep ? `${PLACES[sleep.place].jp} ${sleep.stay.name} <span style="color:var(--ink-3)">(${sleep.stay.area})</span>` : '✈ Flight home'}</span></div>
      <div><span class="k">MOVE</span><span>${transport.length ? transport.join('<br>') : 'Local transit / walking'}</span></div>
      <div><span class="k">SPEND</span><span>${yen(dayCost)} planned activities / person</span></div>
    </div>`;
  // typewriter
  clearInterval(typer);
  const el = $('#typeText'); const full = d.text;
  if (REDUCED) { el.textContent = full; el.classList.remove('typing'); return; }
  let n = 0; typer = setInterval(() => { n += 2; el.textContent = full.slice(0, n); if (n >= full.length) { clearInterval(typer); el.classList.remove('typing'); } }, 18);
}

let playTimer = 0;
const playBtn = $('#playBtn');
function stopPlay() { clearInterval(playTimer); playTimer = 0; playBtn.classList.remove('is-playing'); playBtn.textContent = '▶ PLAY'; }
playBtn.addEventListener('click', () => {
  if (playTimer) return stopPlay();
  playBtn.classList.add('is-playing'); playBtn.textContent = '❚❚ PAUSE';
  if (currentDay >= DAYS.length - 1) select(0); else select(currentDay + 1);
  playTimer = setInterval(() => { if (currentDay >= DAYS.length - 1) return stopPlay(); select(currentDay + 1); }, 3400);
});
$('#prevDay').addEventListener('click', () => { stopPlay(); select(currentDay - 1); });
$('#nextDay').addEventListener('click', () => { stopPlay(); select(currentDay + 1); });
$('#overviewBtn').addEventListener('click', () => { stopPlay(); map.overview(); });
document.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, select')) return;
  const r = $('#map').getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
  if (e.key === 'ArrowRight') { stopPlay(); select(currentDay + 1); }
  if (e.key === 'ArrowLeft') { stopPlay(); select(currentDay - 1); }
});

// ============================================================================
//  CALENDAR — month grids starting on Monday
// ============================================================================
(() => {
  const wrap = $('#calMonths'); const legend = $('#calLegend');
  const first = parseDate(TRIP.start), last = parseDate(DAYS.at(-1).date);
  const byDate = Object.fromEntries(DAYS.map((d, i) => [d.date, i]));
  const iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  const todayIso = iso(new Date());
  const HEAD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HEAD_JP = ['月', '火', '水', '木', '金', '土', '日'];
  legend.innerHTML = STAGES.map((st) => `<span style="--c:${placeColor(st.place)}"><i></i>${PLACES[st.place].name} · ${st.nights} night${st.nights > 1 ? 's' : ''}</span>`).join('')
    + '<span class="cal-legend__move">🚄 travel day</span>';
  for (let m = new Date(first.getFullYear(), first.getMonth(), 1); m <= last; m = new Date(m.getFullYear(), m.getMonth() + 1, 1)) {
    const month = h('div', { class: 'month' });
    month.innerHTML = `<h3 class="month__name">${m.toLocaleString('en-US', { month: 'long' })} <span>${m.getFullYear()} · ${m.getMonth() + 1}月</span></h3>`;
    const grid = h('div', { class: 'month__grid', role: 'grid' });
    HEAD.forEach((d, k) => grid.appendChild(h('div', { class: 'month__dow' + (k > 4 ? ' is-weekend' : '') }, `${d}<span>${HEAD_JP[k]}</span>`)));
    const lead = (m.getDay() + 6) % 7;
    for (let k = 0; k < lead; k++) grid.appendChild(h('div', { class: 'cal-cell is-pad' }));
    const daysInMonth = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (let dnum = 1; dnum <= daysInMonth; dnum++) {
      const dt = new Date(m.getFullYear(), m.getMonth(), dnum); const key = iso(dt); const i = byDate[key];
      const weekend = dt.getDay() === 0 || dt.getDay() === 6;
      if (i === undefined) {
        grid.appendChild(h('div', { class: 'cal-cell is-off' + (weekend ? ' is-weekend' : '') + (key === todayIso ? ' is-today' : '') }, `<span class="cal-num">${dnum}</span>`));
        continue;
      }
      const d = DAYS[i]; const st = stageById[dayStage[i]]; const P = PLACES[st.place];
      const places = d.route.filter((p, k) => p !== d.route[k - 1]);
      const moves = i > 0 && d.sleep !== DAYS[i - 1]?.sleep;
      const trip = !moves && places.length > 1 ? PLACES[places.find((p) => p !== st.place)]?.name : null;
      const where = moves && i > 0 ? places.map((p) => PLACES[p].name).join(' → ') : (trip ? `Day trip: ${trip}` : P.name);
      const cell = h('button', {
        type: 'button', class: 'cal-cell is-trip' + (moves ? ' is-move' : '') + (key === todayIso ? ' is-today' : ''),
        style: `--c:${P.color}`, 'aria-label': `${fmtDate(dt)}, day ${i + 1}: ${d.title}, ${where}`,
      }, `<span class="cal-top"><span class="cal-num">${dnum}</span><span class="cal-day">Day ${i + 1}</span></span>
        <span class="cal-city"><b>${P.jp}</b> ${moves && i > 0 ? '🚄 ' : ''}${where}</span>
        <span class="cal-title">${d.title}</span>
        <span class="cal-acts">${d.activities.map((a) => CATEGORIES[a.cat]?.icon || '✦').join(' ')}</span>`);
      cell.addEventListener('click', () => { stopPlay(); select(i); $('#map').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' }); });
      grid.appendChild(cell);
    }
    // shrink weeks that have no trip days, so the trip weeks stand out
    const cells = [...grid.children].slice(7);
    for (let k = 0; k < cells.length; k += 7) {
      const week = cells.slice(k, k + 7);
      if (!week.some((c) => c.classList.contains('is-trip'))) week.forEach((c) => c.classList.add('is-quiet'));
    }
    month.appendChild(grid); wrap.appendChild(month);
  }
})();

// ============================================================================
//  STAGES
// ============================================================================
(() => {
  const list = $('#stageList');
  STAGES.forEach((st) => {
    const P = PLACES[st.place]; const inD = parseDate(st.checkIn); const outD = addDays(inD, st.nights);
    const daysHere = dayStage.filter((x) => x === st.id).length;
    const trips = DAYS.filter((d, i) => dayStage[i] === st.id && d.extraTransport).flatMap((d) => d.extraTransport);
    const statRows = Object.entries(st.stats).map(([k, v]) => `<span>${k.toUpperCase()}</span><span class="meter"><i style="--w:${v * 20}%"></i></span>`).join('');
    const card = h('article', { class: 'stage', style: `--c:${P.color}` }, `
      <div class="stage__head">
        <span class="stage__kanji" aria-hidden="true">${P.jp}</span>
        <span class="stage__no">STAGE ${st.stage} · <span class="jpn">${P.jp}</span></span>
        <h3 class="stage__name">${P.name}</h3>
        <p class="stage__tag">${st.tagline}</p>
        <div class="stage__dates"><span class="pill">${fmtDate(inD)} → ${fmtDate(outD)}</span><span class="pill">${st.nights} night${st.nights > 1 ? 's' : ''}</span></div>
      </div>
      <div class="stage__body">
        <div class="stage__box">
          <h4><span>🏯 ACCOMMODATION</span><span class="pill pill--status pill--${st.stay.status}">${st.stay.status}</span></h4>
          <p><b>${st.stay.link ? `<a href="${st.stay.link}" target="_blank" rel="noopener">${st.stay.name}</a>` : st.stay.name}</b></p>
          <p class="muted">📍 ${st.stay.area}</p>
          <p class="muted">${st.stay.why}</p>
          <p class="price">≈ ${fmtMoney(st.stay.pricePerNight)} / night / person · <span data-money="${st.stay.pricePerNight * st.nights}">${fmtMoney(st.stay.pricePerNight * st.nights)}</span> total</p>
        </div>
        <div class="stage__box">
          <h4><span>🚄 GETTING THERE</span></h4>
          <p class="transit-line"><span class="ico">${st.arrive.mode === 'shinkansen' ? '🚅' : '🚃'}</span><span>${st.arrive.label}</span></p>
          <p class="muted">⏱ ${st.arrive.duration} · ${fmtMoney(st.arrive.price)}${st.arrive.pass ? ' · covered by Kansai Wide Pass' : ''}</p>
          ${trips.length ? `<p class="muted">Side trips: ${trips.map((t) => `${t.label} (${fmtMoney(t.price)})`).join(', ')}</p>` : ''}
        </div>
        <div class="stage__box">
          <h4><span>🎫 GETTING AROUND</span></h4>
          <p>${st.local.label}</p>
          <p class="muted">≈ ${fmtMoney(st.local.perDay)} / day × ${daysHere} days</p>
        </div>
        <div class="boss"><b>BOSS</b> ${st.boss}</div>
        <div class="stats">${statRows}</div>
      </div>`);
    // holo tilt
    if (!REDUCED) {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 8}deg) rotateX(${(0.5 - py) * 8}deg) translateY(-4px)`;
        card.style.setProperty('--mx', `${px * 100}%`); card.style.setProperty('--my', `${py * 100}%`);
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    }
    list.appendChild(card);
  });
})();

// ============================================================================
//  QUESTS
// ============================================================================
(() => {
  const cleared = new Set(store.get('cleared', []));
  let filter = 'all';
  const filters = $('#questFilters'); const listEl = $('#questList');
  const all = [['all', '✦ All'], ...Object.entries(CATEGORIES).map(([k, v]) => [k, `${v.icon} ${v.label}`])];
  all.forEach(([k, label]) => {
    const b = h('button', { class: 'chip', 'aria-pressed': String(k === filter) }, label);
    b.addEventListener('click', () => { filter = k; [...filters.children].forEach((c) => c.setAttribute('aria-pressed', String(c === b))); applyFilter(); });
    filters.appendChild(b);
  });
  DAYS.forEach((d, i) => {
    const date = parseDate(d.date);
    const row = h('div', { class: 'quest-day', style: `--c:${placeColor(dayStage[i])}` });
    row.innerHTML = `<div class="quest-day__label">DAY ${i + 1} · ${fmtDate(date)}<b>${PLACES[d.route.find((p) => p !== d.route[0]) || d.route[0]].name}</b></div><div class="quest-items"></div>`;
    const items = $('.quest-items', row);
    d.activities.forEach((a, k) => {
      const id = `${d.date}#${k}`;
      const lab = h('label', { class: 'quest', 'data-cat': a.cat });
      lab.innerHTML = `<input type="checkbox" ${cleared.has(id) ? 'checked' : ''}/><span class="box"></span>
        <span><span class="quest__name">${CATEGORIES[a.cat]?.icon || ''} ${a.name}</span>
        <span class="quest__meta"><span>${CATEGORIES[a.cat]?.label || a.cat}</span><span>${a.time || ''}</span><span class="cost" data-money="${a.price || 0}">${a.price ? fmtMoney(a.price) : 'free'}</span></span>
        ${a.note ? `<span class="quest__note">${a.note}</span>` : ''}</span>`;
      lab.classList.toggle('is-done', cleared.has(id));
      const input = $('input', lab);
      input.addEventListener('change', () => {
        if (input.checked) {
          cleared.add(id);
          const r = lab.getBoundingClientRect(); fx.burst(r.left + 20, r.top + 20);
          const pop = h('div', { class: 'clear-pop', style: `left:${r.left + 10}px;top:${r.top - 10}px` }, 'QUEST CLEAR! +XP');
          document.body.appendChild(pop); setTimeout(() => pop.remove(), 1000);
        } else cleared.delete(id);
        lab.classList.toggle('is-done', input.checked);
        store.set('cleared', [...cleared]); progress();
      });
      items.appendChild(lab);
    });
    listEl.appendChild(row);
  });
  const total = DAYS.reduce((n, d) => n + d.activities.length, 0);
  function progress() {
    const done = [...cleared].filter((id) => DAYS.some((d) => id.startsWith(d.date + '#'))).length;
    $('#questCount').textContent = `CLEARED ${done}/${total}`;
    $('#xpFill').style.width = `${(done / total) * 100}%`;
  }
  function applyFilter() {
    listEl.querySelectorAll('.quest-day').forEach((row) => {
      let any = false;
      row.querySelectorAll('.quest').forEach((q) => { const show = filter === 'all' || q.dataset.cat === filter; q.classList.toggle('is-hidden', !show); any ||= show; });
      row.classList.toggle('is-hidden', !any);
    });
  }
  progress();
})();

// ============================================================================
//  TREASURY
// ============================================================================
function fmtMoney(yenAmount) {
  const rate = TRIP.rates[currency] || 1; const v = yenAmount / rate;
  const sym = { JPY: '¥', USD: '$', EUR: '€' }[currency] || '';
  return sym + Math.round(v).toLocaleString('en-US');
}
const CAT_COST = {
  lodging: { label: 'Lodging', color: 'var(--c-lodging)' },
  transport: { label: 'Transport', color: 'var(--c-transport)' },
  activities: { label: 'Activities', color: 'var(--c-activities)' },
  food: { label: 'Food', color: 'var(--c-food)' },
};
function ledgerItems() {
  const items = []; // {stage, cat, label, amount, struck}
  STAGES.forEach((st) => {
    items.push({ stage: st.id, cat: 'lodging', label: `${st.stay.name} · ${st.nights} nights × ${fmtMoney(st.stay.pricePerNight)}`, amount: st.stay.pricePerNight * st.nights });
    items.push({ stage: st.id, cat: 'transport', label: st.arrive.label, amount: st.arrive.price, struck: usePass && st.arrive.pass === 'kansaiWide' });
    const n = dayStage.filter((x) => x === st.id).length;
    items.push({ stage: st.id, cat: 'transport', label: `Local transit · ${n} days × ${fmtMoney(st.local.perDay)}`, amount: st.local.perDay * n });
    items.push({ stage: st.id, cat: 'food', label: `Daily food baseline · ${n} days × ${fmtMoney(st.foodPerDay)}`, amount: st.foodPerDay * n });
  });
  DAYS.forEach((d, i) => {
    (d.extraTransport || []).forEach((t) => items.push({ stage: dayStage[i], cat: 'transport', label: t.label, amount: t.price, struck: usePass && t.pass === 'kansaiWide' }));
    d.activities.forEach((a) => { if (a.price) items.push({ stage: dayStage[i], cat: a.cat === 'food' ? 'food' : 'activities', label: a.name, amount: a.price }); });
  });
  if (usePass) items.push({ stage: 'himeji', cat: 'transport', label: `🎟 ${PASSES.kansaiWide.name}`, amount: PASSES.kansaiWide.price });
  // Kansai Wide Area Pass savings note
  return items;
}
function passSavings() {
  let covered = 0;
  STAGES.forEach((st) => { if (st.arrive.pass === 'kansaiWide') covered += st.arrive.price; });
  DAYS.forEach((d) => (d.extraTransport || []).forEach((t) => { if (t.pass === 'kansaiWide') covered += t.price; }));
  return covered - PASSES.kansaiWide.price;
}

const counters = new Map();
function countTo(el, value) {
  const from = counters.get(el) ?? 0; counters.set(el, value);
  if (REDUCED) { el.textContent = fmtMoney(value); return; }
  const t0 = performance.now(); const dur = 900;
  const step = (now) => { const t = Math.min(1, (now - t0) / dur); el.textContent = fmtMoney(from + (value - from) * ease(t)); if (t < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

const tip = $('#tooltip');
function bindTip(el, text) {
  el.addEventListener('pointermove', (e) => { tip.textContent = text(); tip.classList.add('is-on'); tip.style.left = `${Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8)}px`; tip.style.top = `${e.clientY + 14}px`; });
  el.addEventListener('pointerleave', () => tip.classList.remove('is-on'));
}

let treasuryShown = false;
function renderTreasury() {
  const items = ledgerItems().filter((x) => !x.struck);
  const total = items.reduce((a, b) => a + b.amount, 0);
  const nDays = DAYS.length;
  countTo($('#totalPP'), total); countTo($('#totalGroup'), total * party); countTo($('#totalDay'), total / nDays);
  $('#partySize').textContent = party;
  const sv = passSavings();
  $('#passNote').textContent = `${PASSES.kansaiWide.covers} · ${sv > 0 ? `saves ≈ ${fmtMoney(sv)} / person` : `costs ${fmtMoney(-sv)} more`}`;

  // category stacked bar
  const byCat = Object.fromEntries(Object.keys(CAT_COST).map((k) => [k, 0]));
  items.forEach((it) => { byCat[it.cat] += it.amount; });
  const bar = $('#catBar'); const legend = $('#catLegend');
  if (!bar.children.length) {
    Object.entries(CAT_COST).forEach(([k, c]) => {
      const seg = h('div', { class: 'seg-fill', 'data-cat': k, style: `background:${c.color}` });
      bindTip(seg, () => `${c.label}: ${fmtMoney(byCatLive[k])} (${Math.round((byCatLive[k] / totalLive) * 100)}%)`);
      bar.appendChild(seg);
    });
  }
  byCatLive = byCat; totalLive = total;
  [...bar.children].forEach((seg) => { seg.style.width = treasuryShown ? `${(byCat[seg.dataset.cat] / total) * 100}%` : '0'; });
  legend.innerHTML = Object.entries(CAT_COST).map(([k, c]) => `<li><i style="background:${c.color}"></i>${c.label} <span class="v">${fmtMoney(byCat[k])} · ${Math.round((byCat[k] / total) * 100)}%</span></li>`).join('');

  // city bars
  const cityTotals = STAGES.map((st) => {
    const parts = Object.fromEntries(Object.keys(CAT_COST).map((k) => [k, 0]));
    items.filter((it) => it.stage === st.id).forEach((it) => { parts[it.cat] += it.amount; });
    return { st, parts, sum: Object.values(parts).reduce((a, b) => a + b, 0) };
  });
  const max = Math.max(...cityTotals.map((c) => c.sum));
  const cb = $('#cityBars'); cb.innerHTML = '';
  cityTotals.forEach(({ st, parts, sum }) => {
    const row = h('div', { class: 'cityrow' });
    row.innerHTML = `<span class="nm"><b>${PLACES[st.place].jp}</b>${PLACES[st.place].name}</span><span class="track"></span><span class="amt">${fmtMoney(sum)}</span>`;
    const track = $('.track', row);
    Object.entries(CAT_COST).forEach(([k, c]) => {
      if (!parts[k]) return;
      const sp = h('span', { style: `background:${c.color}` });
      bindTip(sp, () => `${PLACES[st.place].name} · ${c.label}: ${fmtMoney(parts[k])}`);
      track.appendChild(sp);
      requestAnimationFrame(() => requestAnimationFrame(() => { sp.style.width = treasuryShown ? `${(parts[k] / max) * 100}%` : '0'; }));
    });
    cb.appendChild(row);
  });

  // ledger
  const all = ledgerItems();
  let html = `<thead><tr><th>Item</th><th>Type</th><th class="num">Per person</th><th class="num">Party ×${party}</th></tr></thead><tbody>`;
  STAGES.forEach((st) => {
    html += `<tr class="group"><td colspan="4">STAGE ${st.stage} · ${PLACES[st.place].jp} ${PLACES[st.place].name}</td></tr>`;
    all.filter((it) => it.stage === st.id).forEach((it) => {
      html += `<tr class="${it.struck ? 'is-struck' : ''}"><td>${it.label}</td><td>${CAT_COST[it.cat].label}</td><td class="num">${fmtMoney(it.amount)}</td><td class="num">${fmtMoney(it.amount * party)}</td></tr>`;
    });
  });
  html += `<tr class="group"><td colspan="2">TOTAL</td><td class="num">${fmtMoney(total)}</td><td class="num">${fmtMoney(total * party)}</td></tr></tbody>`;
  $('#ledger').innerHTML = html;

  // re-render money in other sections
  document.querySelectorAll('[data-money]').forEach((el) => { const v = +el.dataset.money; el.textContent = v ? fmtMoney(v) : 'free'; });
}
let byCatLive = {}, totalLive = 1;

(() => {
  const seg = $('#currencySeg');
  Object.keys(TRIP.rates).forEach((c) => {
    const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(c === currency) }, c);
    b.addEventListener('click', () => {
      currency = c; store.set('currency', c);
      [...seg.children].forEach((x) => x.setAttribute('aria-checked', String(x === b)));
      renderTreasury(); select(currentDay, { scrollChip: false });
    });
    seg.appendChild(b);
  });
  $('#partyMinus').addEventListener('click', () => { party = Math.max(1, party - 1); store.set('party', party); renderTreasury(); });
  $('#partyPlus').addEventListener('click', () => { party = Math.min(20, party + 1); store.set('party', party); renderTreasury(); });
  const pt = $('#passToggle'); pt.checked = usePass;
  pt.addEventListener('change', () => { usePass = pt.checked; store.set('pass', usePass); renderTreasury(); });
  const io = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { treasuryShown = true; renderTreasury(); io.disconnect(); } }, { threshold: 0.2 });
  io.observe($('#treasury'));
})();

// ============================================================================
//  INIT
// ============================================================================
renderTreasury();
select(0, { scrollChip: false });
observeReveal();
