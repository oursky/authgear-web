#!/usr/bin/env node
/**
 * Builds `public/documents/features-mcp-hero-kv.json`, the hero animation on
 * `/features/mcp-authentication`.
 *
 *   node scripts/build-mcp-hero-lottie.mjs
 *
 * Constraints this file exists to keep honest:
 *
 * - **Shape layers only.** No image assets, no fonts, no expressions, so the
 *   `lottie_light` player can render it and the file stays a few tens of KB.
 * - **No text.** The same JSON serves `/features/mcp-authentication` and
 *   `/zh-hant/features/mcp-authentication`, so the story is told with icons
 *   and abstract bars.
 * - **520 × 500**, matching `features-M2M-hero-kv.json`, so it drops into the
 *   existing `.lottie-hero-animation` box (500px on desktop, fluid on mobile).
 * - **60 fps, 5 seconds, plays once.** The last frame has to read on its own:
 *   `prefers-reduced-motion` users are shown that frame and nothing else.
 *
 * The scene: an AI agent card (bottom left) asks to connect, the Authgear card
 * (centre) signs the user in and takes their consent, and the agent then
 * connects straight to the MCP server card (top right), which lights up.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/documents/features-mcp-hero-kv.json');

// ---------------------------------------------------------------------------
// Canvas + palette
// ---------------------------------------------------------------------------

const W = 520;
const H = 500;
const FR = 60;
/*
 * The storyboard below is authored on a 5s timeline because the beats are
 * easier to reason about at 60 frames per second. TIME_SCALE compresses the
 * finished animation — every keyframe, layer in/out point and the comp length
 * are scaled once at write time, so the beats keep their relative spacing.
 */
const STORY_FRAMES = 300;
const TIME_SCALE = 0.78;
const OP = Math.round(STORY_FRAMES * TIME_SCALE); // ≈3.9s at 60fps

/** Straight from the M2M hero animation. Success reads blue, never green. */
const C = {
  white: '#FFFFFF',
  ink: '#201F1E',
  grey: '#8A8886',
  light: '#E5E5E5',
  blue: '#176DF3',
};

const hexToRgba = (hex, alpha = 1) => {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
    alpha,
  ];
};

// ---------------------------------------------------------------------------
// Keyframe helpers
// ---------------------------------------------------------------------------

/** cubic-bezier control points as [[out.x, out.y], [in.x, in.y]]. */
const EASE = {
  out: [
    [0, 0],
    [0.24, 1],
  ],
  inOut: [
    [0.42, 0],
    [0.58, 1],
  ],
  in: [
    [0.5, 0],
    [1, 1],
  ],
  linear: [
    [0.333, 0.333],
    [0.667, 0.667],
  ],
};

const asArray = (v) => (Array.isArray(v) ? v : [v]);

/**
 * Animated property from `[{ t, v, ease?, to?, ti? }]`.
 * `ease` shapes the segment that *starts* at that keyframe; `to`/`ti` are
 * spatial tangents and only mean anything on a position property.
 */
function anim(keys) {
  const k = keys.map((key, i) => {
    const value = asArray(key.v);
    const entry = { t: key.t, s: value };
    if (i === keys.length - 1) return entry;
    const [o, inn] = key.ease ?? EASE.inOut;
    const dim = value.length;
    entry.o = { x: Array(dim).fill(o[0]), y: Array(dim).fill(o[1]) };
    entry.i = { x: Array(dim).fill(inn[0]), y: Array(dim).fill(inn[1]) };
    if (key.to) entry.to = key.to;
    if (key.ti) entry.ti = key.ti;
    return entry;
  });
  return { a: 1, k };
}

const still = (v) => ({ a: 0, k: asArray(v).length === 1 ? asArray(v)[0] : asArray(v) });
const isProp = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'a' in v;
const prop = (v, fallback) => (v === undefined ? fallback : isProp(v) ? v : still(v));

// ---------------------------------------------------------------------------
// Shape helpers — everything is drawn in absolute canvas coordinates
// ---------------------------------------------------------------------------

const groupTransform = () => ({
  ty: 'tr',
  p: { a: 0, k: [0, 0] },
  a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
  sk: { a: 0, k: 0 },
  sa: { a: 0, k: 0 },
  nm: 'Transform',
});

const group = (items, nm = 'Group') => ({
  ty: 'gr',
  nm,
  it: [...items, groupTransform()],
  np: items.length + 1,
  bm: 0,
  hd: false,
});

const fill = (hex, opacity = 100) => ({
  ty: 'fl',
  c: { a: 0, k: hexToRgba(hex) },
  o: prop(opacity, still(100)),
  r: 1,
  bm: 0,
  nm: 'Fill',
});

/** `color` may be a hex string or an already-built animated colour property. */
const stroke = (color, width, { opacity = 100, dash } = {}) => {
  const s = {
    ty: 'st',
    c: typeof color === 'string' ? { a: 0, k: hexToRgba(color) } : color,
    o: prop(opacity, still(100)),
    w: prop(width, still(2)),
    lc: 2,
    lj: 2,
    ml: 4,
    bm: 0,
    nm: 'Stroke',
  };
  if (dash) {
    s.d = [
      { n: 'd', nm: 'dash', v: { a: 0, k: dash[0] } },
      { n: 'g', nm: 'gap', v: { a: 0, k: dash[1] } },
    ];
  }
  return s;
};

/** Animated stroke/fill colour: `[{ t, hex, ease? }]`. */
const colorAnim = (keys) =>
  anim(keys.map(({ t, hex, ease }) => ({ t, v: hexToRgba(hex), ease })));

/** Rounded rect from its top-left corner. */
const rect = (x, y, w, h, r = 0) => ({
  ty: 'rc',
  d: 1,
  s: { a: 0, k: [w, h] },
  p: { a: 0, k: [x + w / 2, y + h / 2] },
  r: { a: 0, k: r },
  nm: 'Rectangle Path',
});

/** Rounded rect from its centre. */
const rectC = (cx, cy, w, h, r = 0) => ({
  ty: 'rc',
  d: 1,
  s: { a: 0, k: [w, h] },
  p: { a: 0, k: [cx, cy] },
  r: { a: 0, k: r },
  nm: 'Rectangle Path',
});

const ellipse = (cx, cy, w, h) => ({
  ty: 'el',
  d: 1,
  s: { a: 0, k: [w, h] },
  p: { a: 0, k: [cx, cy] },
  nm: 'Ellipse Path',
});

const star = (cx, cy, outer, inner, points = 4) => ({
  ty: 'sr',
  sy: 1,
  d: 1,
  pt: { a: 0, k: points },
  p: { a: 0, k: [cx, cy] },
  r: { a: 0, k: 0 },
  ir: { a: 0, k: inner },
  is: { a: 0, k: 0 },
  or: { a: 0, k: outer },
  os: { a: 0, k: 0 },
  nm: 'Star Path',
});

/**
 * Bezier path. `pts` is `[[x, y], …]`; `tangents` optionally gives
 * `[[inX, inY], [outX, outY]]` per point, relative to that point.
 */
const bezier = (pts, closed = false, tangents = null) => ({
  ty: 'sh',
  d: 1,
  ks: {
    a: 0,
    k: {
      i: pts.map((_, idx) => (tangents?.[idx]?.[0] ? tangents[idx][0] : [0, 0])),
      o: pts.map((_, idx) => (tangents?.[idx]?.[1] ? tangents[idx][1] : [0, 0])),
      v: pts.map(([x, y]) => [x, y]),
      c: closed,
    },
  },
  nm: 'Path',
});

/** Trim path, used to draw the dotted connector on. */
const trim = (end) => ({
  ty: 'tm',
  s: { a: 0, k: 0 },
  e: prop(end, still(100)),
  o: { a: 0, k: 0 },
  m: 1,
  nm: 'Trim Paths',
});

let nextIndex = 1;

/**
 * A shape layer. Shapes are drawn in canvas coordinates, so the anchor and the
 * position both start at the layer's pivot — that way scaling and the rise-in
 * happen around the pivot without moving the artwork.
 */
function layer({ nm, shapes, pivot = [0, 0], p, o, s, r, ip = 0, op = STORY_FRAMES }) {
  return {
    ddd: 0,
    ind: nextIndex++,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: prop(o, still(100)),
      r: prop(r, still(0)),
      p: prop(p, still([pivot[0], pivot[1], 0])),
      a: still([pivot[0], pivot[1], 0]),
      s: prop(s, still([100, 100, 100])),
    },
    ao: 0,
    // Lottie paints `shapes[0]` on top, so the callers author back-to-front
    // (background first) and we flip it here.
    shapes: [...shapes].reverse(),
    ip,
    op,
    st: 0,
    bm: 0,
  };
}

/** The soft drop shadow under each card, faked with two offset blurred-ish rects. */
const cardShadow = (x, y, w, h, r) => [
  group([rect(x + 2, y + 7, w - 4, h, r), fill(C.ink, 4)], 'Shadow far'),
  group([rect(x + 1, y + 3, w - 2, h, r), fill(C.ink, 6)], 'Shadow near'),
];

const card = (x, y, w, h, r = 16) => [
  ...cardShadow(x, y, w, h, r),
  group([rect(x, y, w, h, r), fill(C.white), stroke(C.light, 1.5)], 'Card'),
];

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

/*
 * A triangle, not a diagonal line: Authgear sits at the apex with the AI agent
 * and the MCP server along the base. That is the shape of the relationship —
 * both parties deal with Authgear, and once consent is granted the agent talks
 * to the server directly along the base of the triangle.
 *
 * Every card's contents are positioned from its own box below, so moving a
 * card moves its artwork with it.
 */
const AUTH = { x: 176, y: 16, w: 168, h: 184 };
const AGENT = { x: 20, y: 340, w: 150, h: 108 };
const SERVER = { x: 350, y: 322, w: 150, h: 126 };

const centre = (b) => [b.x + b.w / 2, b.y + b.h / 2];

/** Shared y for the base of the triangle, so that connector renders flat. */
const BASE_Y = Math.round((AGENT.y + AGENT.h / 2 + SERVER.y + SERVER.h / 2) / 2);

// Storyboard beats, in frames at 60fps.
const T = {
  agentIn: 0,
  authIn: 9,
  serverIn: 18,
  cardsDone: 48, // 0.8s
  bubbleIn: 48,
  lineStart: 54,
  lineDone: 90, // 1.5s
  input1: 90,
  input2: 108,
  check1: 132,
  check2: 144,
  buttonPress: 156,
  linkStart: 168, // 2.8s — consent granted, so the agent may reach the server
  linkDone: 228, // 3.8s
  badgeIn: 222,
  tool1: 228,
  tool2: 234,
  tool3: 240,
  checkLeg: 228,
  glowStart: 228,
  glowEnd: 270,
  settle: 282, // 4.7s — everything is at rest well before the last frame
};

// ---------------------------------------------------------------------------
// SVG path → Lottie bezier
// ---------------------------------------------------------------------------

/**
 * Parses an SVG path into Lottie contours. Supports M/L/H/V/C and Z, absolute
 * and relative — which is everything the Authgear mark uses. No arcs, no
 * quadratics, so there is nothing to approximate.
 */
function parseSvgPath(d) {
  const tokens = d.match(/[MmLlHhVvCcZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
  const contours = [];
  let contour = null;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let cmd = '';
  let i = 0;
  const num = () => parseFloat(tokens[i++]);
  const push = (vx, vy) => {
    contour.v.push([vx, vy]);
    contour.i.push([0, 0]);
    contour.o.push([0, 0]);
  };

  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    switch (cmd) {
      case 'M':
      case 'm': {
        const nx = num();
        const ny = num();
        x = cmd === 'M' ? nx : x + nx;
        y = cmd === 'M' ? ny : y + ny;
        startX = x;
        startY = y;
        contour = { v: [], i: [], o: [], c: false };
        contours.push(contour);
        push(x, y);
        // Further coordinate pairs after a moveto are an implicit lineto.
        cmd = cmd === 'M' ? 'L' : 'l';
        break;
      }
      case 'L':
      case 'l': {
        const nx = num();
        const ny = num();
        x = cmd === 'L' ? nx : x + nx;
        y = cmd === 'L' ? ny : y + ny;
        push(x, y);
        break;
      }
      case 'H':
      case 'h': {
        const nx = num();
        x = cmd === 'H' ? nx : x + nx;
        push(x, y);
        break;
      }
      case 'V':
      case 'v': {
        const ny = num();
        y = cmd === 'V' ? ny : y + ny;
        push(x, y);
        break;
      }
      case 'C':
      case 'c': {
        const rel = cmd === 'c';
        const ox = rel ? x : 0;
        const oy = rel ? y : 0;
        const c1x = ox + num();
        const c1y = oy + num();
        const c2x = ox + num();
        const c2y = oy + num();
        const px = ox + num();
        const py = oy + num();
        const last = contour.v.length - 1;
        contour.o[last] = [c1x - contour.v[last][0], c1y - contour.v[last][1]];
        push(px, py);
        contour.i[contour.v.length - 1] = [c2x - px, c2y - py];
        x = px;
        y = py;
        break;
      }
      case 'Z':
      case 'z': {
        contour.c = true;
        // A path that closes back onto its first point carries a duplicate
        // vertex; Lottie implies the closing segment instead.
        const first = contour.v[0];
        const last = contour.v[contour.v.length - 1];
        if (
          contour.v.length > 1 &&
          Math.abs(first[0] - last[0]) < 1e-6 &&
          Math.abs(first[1] - last[1]) < 1e-6
        ) {
          contour.i[0] = contour.i[contour.v.length - 1];
          contour.v.pop();
          contour.i.pop();
          contour.o.pop();
        }
        x = startX;
        y = startY;
        break;
      }
      default:
        i += 1;
    }
  }
  return contours;
}

const contourBounds = (contours) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const c of contours) {
    c.v.forEach(([vx, vy], idx) => {
      for (const [px, py] of [[vx, vy], [vx + c.i[idx][0], vy + c.i[idx][1]], [vx + c.o[idx][0], vy + c.o[idx][1]]]) {
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
      }
    });
  }
  return { minX, minY, maxX, maxY };
};

const contourToShape = (c, scale, tx, ty) => ({
  ty: 'sh',
  d: 1,
  ks: {
    a: 0,
    k: {
      i: c.i.map(([px, py]) => [px * scale, py * scale]),
      o: c.o.map(([px, py]) => [px * scale, py * scale]),
      v: c.v.map(([px, py]) => [px * scale + tx, py * scale + ty]),
      c: c.c,
    },
  },
  nm: 'Path',
});

/**
 * The Authgear mark, read from the real logo asset so it cannot drift. Only
 * the first `MARK_PATHS` paths are the symbol — the rest are the wordmark.
 */
const MARK_PATHS = 7;

function logoMark(cx, cy, height, color) {
  const svg = fs.readFileSync(path.join(ROOT, 'public/images/authgear-logo.svg'), 'utf8');
  const tags = [...svg.matchAll(/<path[^>]*>/g)].slice(0, MARK_PATHS).map((m) => m[0]);
  const paths = tags.map((tag) => ({
    d: tag.match(/\sd="([^"]+)"/)[1],
    evenOdd: /fill-rule="evenodd"/.test(tag),
  }));

  const parsed = paths.map((pp) => ({ ...pp, contours: parseSvgPath(pp.d) }));
  const b = contourBounds(parsed.flatMap((pp) => pp.contours));
  const scale = height / (b.maxY - b.minY);
  const tx = cx - ((b.minX + b.maxX) / 2) * scale;
  const ty = cy - ((b.minY + b.maxY) / 2) * scale;

  // One group per source path so each keeps its own fill rule.
  return parsed.map((pp, idx) =>
    group(
      [
        ...pp.contours.map((c) => contourToShape(c, scale, tx, ty)),
        { ...fill(color), r: pp.evenOdd ? 2 : 1 },
      ],
      `Logo ${idx + 1}`,
    ),
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

/** White tick, drawn around (cx, cy). */
const checkMark = (cx, cy, scale = 1, color = C.white, width = 2.4) =>
  group(
    [
      bezier([
        [cx - 4.6 * scale, cy + 0.2 * scale],
        [cx - 1.4 * scale, cy + 3.4 * scale],
        [cx + 4.8 * scale, cy - 3.6 * scale],
      ]),
      stroke(color, width * scale),
    ],
    'Check',
  );

const sparkle = (cx, cy) => group([star(cx, cy, 9, 2.6), fill(C.ink)], 'Sparkle');

/** Tool icons on the server card. `color` is an animated colour property. */
const wrenchIcon = (cx, cy, color) => {
  const hx = cx - 3.4;
  const hy = cy - 3.4;
  const r = 5.2;
  const k = r * 0.5523;
  // Half a ring, so the jaw is open on the upper left, away from the handle
  // that leaves the closed side at 45°.
  const ring = [315, 45, 135].map((deg) => {
    const a = (deg * Math.PI) / 180;
    const dir = [-Math.sin(a), Math.cos(a)];
    return {
      v: [hx + r * Math.cos(a), hy + r * Math.sin(a)],
      t: [
        [-k * dir[0], -k * dir[1]],
        [k * dir[0], k * dir[1]],
      ],
    };
  });
  return group(
    [
      bezier(
        ring.map((pt) => pt.v),
        false,
        ring.map((pt) => pt.t),
      ),
      bezier([
        [hx + 3.7, hy + 3.7],
        [cx + 7.4, cy + 7.4],
      ]),
      stroke(color, 2.2),
    ],
    'Wrench',
  );
};

const docIcon = (cx, cy, color) =>
  group(
    [
      rectC(cx, cy, 12, 15, 2),
      bezier([
        [cx - 3.4, cy - 3],
        [cx + 3.4, cy - 3],
      ]),
      bezier([
        [cx - 3.4, cy + 1],
        [cx + 3.4, cy + 1],
      ]),
      bezier([
        [cx - 3.4, cy + 5],
        [cx + 1, cy + 5],
      ]),
      stroke(color, 1.7),
    ],
    'Document',
  );

const databaseIcon = (cx, cy, color) =>
  group(
    [
      ellipse(cx, cy - 5.2, 14, 5.4),
      bezier([
        [cx - 7, cy - 5.2],
        [cx - 7, cy + 5.2],
      ]),
      bezier([
        [cx + 7, cy - 5.2],
        [cx + 7, cy + 5.2],
      ]),
      bezier(
        [
          [cx - 7, cy],
          [cx + 7, cy],
        ],
        false,
        [
          [[0, 0], [0, 2.6]],
          [[0, 2.6], [0, 0]],
        ],
      ),
      bezier(
        [
          [cx - 7, cy + 5.2],
          [cx + 7, cy + 5.2],
        ],
        false,
        [
          [[0, 0], [0, 2.6]],
          [[0, 2.6], [0, 0]],
        ],
      ),
      stroke(color, 1.7),
    ],
    'Database',
  );

// ---------------------------------------------------------------------------
// Layers
// ---------------------------------------------------------------------------

const layers = [];

/** Fade + 12px rise, ease-out. */
const riseIn = (pivot, start) => ({
  o: anim([
    { t: start, v: 0, ease: EASE.out },
    { t: start + 30, v: 100 },
  ]),
  p: anim([
    { t: start, v: [pivot[0], pivot[1] + 12, 0], ease: EASE.out },
    { t: start + 30, v: [pivot[0], pivot[1], 0] },
  ]),
});

// --- 3. MCP server card (drawn first so it sits behind nothing important) ---

const serverPivot = centre(SERVER);
const sx = (dx) => SERVER.x + dx;
const sy = (dy) => SERVER.y + dy;
const toolColor = (onAt) =>
  colorAnim([
    { t: 0, hex: C.grey, ease: EASE.linear },
    { t: onAt, hex: C.grey, ease: EASE.inOut },
    { t: onAt + 10, hex: C.blue },
  ]);

layers.push(
  layer({
    nm: 'Server card',
    pivot: serverPivot,
    ...riseIn(serverPivot, T.serverIn),
    shapes: [
      ...card(SERVER.x, SERVER.y, SERVER.w, SERVER.h),
      // Server icon: three stacked bars, each with a status dot
      ...[0, 1, 2].flatMap((i) => [
        group([rect(sx(46), sy(13 + i * 15), 58, 11, 3), stroke(C.ink, 1.6)], `Server bar ${i + 1}`),
        group([ellipse(sx(52.5), sy(18.5 + i * 15), 3.4, 3.4), fill(C.ink)], `Server dot ${i + 1}`),
      ]),
      // Three tool rows
      group([wrenchIcon(sx(21), sy(73), toolColor(T.tool1))], 'Tool 1'),
      group([rect(sx(37), sy(69), 96, 8, 4), fill(C.light)], 'Tool row 1 bar'),
      group([docIcon(sx(21), sy(93), toolColor(T.tool2))], 'Tool 2'),
      group([rect(sx(37), sy(89), 82, 8, 4), fill(C.light)], 'Tool row 2 bar'),
      group([databaseIcon(sx(21), sy(113), toolColor(T.tool3))], 'Tool 3'),
      group([rect(sx(37), sy(109), 90, 8, 4), fill(C.light)], 'Tool row 3 bar'),
    ],
  }),
);

// Glow: one slow pulse around the server card once the link lands.
layers.push(
  layer({
    nm: 'Server glow',
    pivot: serverPivot,
    o: anim([
      { t: T.glowStart, v: 0, ease: EASE.out },
      { t: T.glowStart + 14, v: 100, ease: EASE.inOut },
      { t: T.glowEnd, v: 0 },
    ]),
    s: anim([
      { t: T.glowStart, v: [100, 100, 100], ease: EASE.out },
      { t: T.glowEnd, v: [108, 108, 108] },
    ]),
    // Two concentric rings, wide-and-faint over narrow-and-stronger, so the
    // edge falls off instead of reading as a hard border.
    shapes: [
      group(
        [rect(SERVER.x - 5, SERVER.y - 5, SERVER.w + 10, SERVER.h + 10, 20), stroke(C.blue, 18, { opacity: 7 })],
        'Glow outer',
      ),
      group(
        [rect(SERVER.x - 1, SERVER.y - 1, SERVER.w + 2, SERVER.h + 2, 17), stroke(C.blue, 7, { opacity: 16 })],
        'Glow inner',
      ),
    ],
  }),
);

// Blue check badge on the server card's top-right corner.
const badge = [sx(136), sy(9)];
layers.push(
  layer({
    nm: 'Server badge',
    pivot: badge,
    o: anim([
      { t: T.badgeIn, v: 0, ease: EASE.out },
      { t: T.badgeIn + 6, v: 100 },
    ]),
    s: anim([
      { t: T.badgeIn, v: [0, 0, 100], ease: EASE.out },
      { t: T.badgeIn + 10, v: [114, 114, 100], ease: EASE.inOut },
      { t: T.badgeIn + 20, v: [100, 100, 100] },
    ]),
    shapes: [
      group([ellipse(badge[0], badge[1], 28, 28), fill(C.white)], 'Badge ring'),
      group([ellipse(badge[0], badge[1], 24, 24), fill(C.blue)], 'Badge'),
      checkMark(badge[0], badge[1], 1, C.white, 2.4),
    ],
  }),
);

// --- 2. Authgear card ---

const authPivot = centre(AUTH);
const INPUT_X = AUTH.x + 16;
const INPUT_W = AUTH.w - 32;
const gy = (dy) => AUTH.y + dy;

layers.push(
  layer({
    nm: 'Authgear card',
    pivot: authPivot,
    ...riseIn(authPivot, T.authIn),
    shapes: [
      ...card(AUTH.x, AUTH.y, AUTH.w, AUTH.h),
      ...logoMark(authPivot[0], AUTH.y + 28, 24, C.blue),
      // Empty input bars
      group([rect(INPUT_X, gy(50), INPUT_W, 16, 5), fill(C.light)], 'Input 1'),
      group([rect(INPUT_X, gy(74), INPUT_W, 16, 5), fill(C.light)], 'Input 2'),
      // Permission rows — the grey bar next to each checkbox
      group([rect(INPUT_X + 26, gy(108), INPUT_W - 42, 8, 4), fill(C.light)], 'Scope bar 1'),
      group([rect(INPUT_X + 26, gy(132), INPUT_W - 58, 8, 4), fill(C.light)], 'Scope bar 2'),
      // Empty checkboxes
      group([rect(INPUT_X, gy(104), 16, 16, 4), stroke(C.light, 2)], 'Checkbox 1'),
      group([rect(INPUT_X, gy(128), 16, 16, 4), stroke(C.light, 2)], 'Checkbox 2'),
    ],
  }),
);

// Input bars filling from the left, one after the other.
[
  { y: gy(58), start: T.input1, nm: 'Input 1 fill' },
  { y: gy(82), start: T.input2, nm: 'Input 2 fill' },
].forEach(({ y, start, nm }) => {
  layers.push(
    layer({
      nm,
      pivot: [INPUT_X, y],
      s: anim([
        { t: start, v: [0, 100, 100], ease: EASE.out },
        { t: start + 18, v: [100, 100, 100] },
      ]),
      shapes: [group([rect(INPUT_X, y - 8, INPUT_W, 16, 5), fill(C.grey)], 'Bar')],
    }),
  );
});

// Checkboxes ticking: blue fill plus a white check.
[
  { y: gy(112), start: T.check1, nm: 'Checkbox 1 tick' },
  { y: gy(136), start: T.check2, nm: 'Checkbox 2 tick' },
].forEach(({ y, start, nm }) => {
  layers.push(
    layer({
      nm,
      pivot: [INPUT_X + 8, y],
      o: anim([
        { t: start, v: 0, ease: EASE.out },
        { t: start + 5, v: 100 },
      ]),
      s: anim([
        { t: start, v: [60, 60, 100], ease: EASE.out },
        { t: start + 12, v: [100, 100, 100] },
      ]),
      shapes: [
        group([rect(INPUT_X, y - 8, 16, 16, 4), fill(C.blue)], 'Box'),
        checkMark(INPUT_X + 8, y, 0.78, C.white, 2.4),
      ],
    }),
  );
});

// Consent button — squashes to 96% and springs back, as if clicked.
const buttonPivot = [authPivot[0], gy(164)];
layers.push(
  layer({
    nm: 'Consent button',
    pivot: buttonPivot,
    o: anim([
      { t: T.input1, v: 0, ease: EASE.out },
      { t: T.input1 + 12, v: 100 },
    ]),
    s: anim([
      { t: T.buttonPress, v: [100, 100, 100], ease: EASE.inOut },
      { t: T.buttonPress + 6, v: [96, 92, 100], ease: EASE.out },
      { t: T.buttonPress + 16, v: [101.5, 103, 100], ease: EASE.inOut },
      { t: T.buttonPress + 24, v: [100, 100, 100] },
    ]),
    shapes: [
      group([rect(INPUT_X, gy(154), INPUT_W, 20, 6), fill(C.blue)], 'Button'),
      checkMark(buttonPivot[0], buttonPivot[1], 0.9, C.white, 2.4),
    ],
  }),
);

// --- 1. AI agent card ---

const agentPivot = centre(AGENT);
const ax = (dx) => AGENT.x + dx;
const ay = (dy) => AGENT.y + dy;

layers.push(
  layer({
    nm: 'Agent card',
    pivot: agentPivot,
    ...riseIn(agentPivot, T.agentIn),
    shapes: [
      ...card(AGENT.x, AGENT.y, AGENT.w, AGENT.h),
      // Header bar: three dots and a hairline under them
      group([ellipse(ax(17), ay(15), 5, 5), ellipse(ax(29), ay(15), 5, 5), ellipse(ax(41), ay(15), 5, 5), fill(C.grey)], 'Window dots'),
      group([bezier([[ax(0), ay(26)], [ax(150), ay(26)]]), stroke(C.light, 1.5)], 'Header rule'),
      sparkle(ax(132), ay(15)),
      // First chat bubble: placeholder bars in a grey bubble
      group([rect(ax(13), ay(36), 92, 34, 9), fill(C.light, 55), stroke(C.light, 1.5)], 'Bubble 1'),
      group([rect(ax(21), ay(43), 72, 6, 3), rect(ax(21), ay(55), 54, 6, 3), fill(C.grey, 70)], 'Bubble 1 bars'),
    ],
  }),
);

// The new message that pops in once the agent asks to connect.
const bubble2 = [ax(97), ay(87)];
layers.push(
  layer({
    nm: 'Agent bubble 2',
    pivot: bubble2,
    o: anim([
      { t: T.bubbleIn, v: 0, ease: EASE.out },
      { t: T.bubbleIn + 6, v: 100 },
    ]),
    s: anim([
      { t: T.bubbleIn, v: [40, 40, 100], ease: EASE.out },
      { t: T.bubbleIn + 12, v: [105, 105, 100], ease: EASE.inOut },
      { t: T.bubbleIn + 20, v: [100, 100, 100] },
    ]),
    shapes: [
      group([rectC(bubble2[0], bubble2[1], 88, 30, 9), fill(C.blue, 10), stroke(C.blue, 1.5, { opacity: 45 })], 'Bubble 2'),
      group(
        [rectC(bubble2[0] - 4, bubble2[1] - 5, 62, 6, 3), rectC(bubble2[0] - 13, bubble2[1] + 5, 44, 6, 3), fill(C.blue, 55)],
        'Bubble 2 bars',
      ),
    ],
  }),
);

// --- The dotted connector, agent → Authgear ---

layers.push(
  layer({
    nm: 'Connector',
    o: anim([
      { t: T.lineStart, v: 0, ease: EASE.out },
      { t: T.lineStart + 8, v: 100 },
    ]),
    shapes: [
      group(
        [
          bezier(
            [
              [ax(120), ay(0)],
              [AUTH.x + 36, AUTH.y + AUTH.h + 2],
            ],
            false,
            [
              [[0, 0], [24, -50]],
              [[-28, 46], [0, 0]],
            ],
          ),
          trim(
            anim([
              { t: T.lineStart, v: 0, ease: EASE.inOut },
              { t: T.lineDone, v: 100 },
            ]),
          ),
          stroke(C.blue, 2.4, { dash: [5, 7] }),
        ],
        'Dotted line',
      ),
    ],
  }),
);

// --- The agent → MCP server connection ---
//
// The payoff: once consent is granted the agent can reach the server directly.
// A solid line, against the dashed "asks to connect" one, so the pair reads as
// request then established connection. It runs straight along the base of the
// triangle, closing the shape.

layers.push(
  layer({
    nm: 'Agent to server link',
    o: anim([
      { t: T.linkStart, v: 0, ease: EASE.out },
      { t: T.linkStart + 8, v: 100 },
    ]),
    shapes: [
      group(
        [
          bezier(
            // Straight and dead level, edge to edge: the one direct connection
            // in the scene. BASE_Y splits the two cards' centres so the line
            // stays flat even though the cards are different heights.
            [
              [AGENT.x + AGENT.w + 2, BASE_Y],
              [SERVER.x - 2, BASE_Y],
            ],
          ),
          trim(
            anim([
              { t: T.linkStart, v: 0, ease: EASE.inOut },
              { t: T.linkDone, v: 100 },
            ]),
          ),
          stroke(C.blue, 2.8),
        ],
        'Link',
      ),
    ],
  }),
);

// --- The MCP server → Authgear leg ---
//
// Closes the third side of the triangle. It is the relationship step 3 of the
// page describes — the server checks the token on every request — so it draws
// on as the server lights up. Dashed and dimmer than the base: a lookup, not a
// data path.

layers.push(
  layer({
    nm: 'Server to Authgear leg',
    o: anim([
      { t: T.checkLeg, v: 0, ease: EASE.out },
      { t: T.checkLeg + 10, v: 55 },
    ]),
    shapes: [
      group(
        [
          bezier(
            [
              [SERVER.x + 30, SERVER.y - 2],
              [AUTH.x + AUTH.w - 36, AUTH.y + AUTH.h + 2],
            ],
            false,
            [
              [[0, 0], [-24, -50]],
              [[28, 46], [0, 0]],
            ],
          ),
          trim(
            anim([
              { t: T.checkLeg, v: 0, ease: EASE.inOut },
              { t: T.checkLeg + 36, v: 100 },
            ]),
          ),
          stroke(C.blue, 2.2, { dash: [5, 7] }),
        ],
        'Check leg',
      ),
    ],
  }),
);

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

const animation = {
  v: '5.7.5',
  fr: FR,
  ip: 0,
  op: OP,
  w: W,
  h: H,
  nm: 'MCP hero',
  ddd: 0,
  assets: [],
  // Same rule as `shapes`: the first layer is the topmost one, and the scene
  // above is written back-to-front.
  layers: [...layers].reverse(),
  markers: [],
};

/**
 * Scale every time value in the finished comp. Keyframe times live on animated
 * properties (`{ a: 1, k: [{ t, … }] }`) wherever they appear — layer
 * transforms, trim paths, stroke colours — so walk the whole tree rather than
 * trying to enumerate them.
 */
function scaleTime(node) {
  if (Array.isArray(node)) {
    node.forEach(scaleTime);
    return;
  }
  if (!node || typeof node !== 'object') return;
  if (node.a === 1 && Array.isArray(node.k)) {
    for (const kf of node.k) {
      if (typeof kf.t === 'number') kf.t = Math.round(kf.t * TIME_SCALE);
    }
  }
  if (node.ty === 4) {
    node.ip = Math.round(node.ip * TIME_SCALE);
    node.op = Math.round(node.op * TIME_SCALE);
  }
  for (const value of Object.values(node)) scaleTime(value);
}

scaleTime(animation.layers);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(animation));

const bytes = fs.statSync(OUT).size;
console.log(
  `wrote ${path.relative(ROOT, OUT)} — ${layers.length} layers, ${OP} frames ` +
    `(${(OP / FR).toFixed(2)}s at ${FR}fps), ${(bytes / 1024).toFixed(1)} KB`,
);
if (bytes > 150 * 1024) {
  console.error('ERROR: over the 150 KB budget for this file');
  process.exit(1);
}
