// Copyright (c) 2026 Kubai087. Licensed under the Kubai Icons License; see LICENSE.
// Geometry and rendering for the two-tone solid style (双色面性). The rules are in GUIDE.md;
// this file implements them. Reuse it as is: new icons only call these helpers.
//
// The canvas is a 16 grid (viewBox 0 0 16 16): one unit is one pixel at 16px. Coordinates may
// fall on half or quarter units; the style doesn't snap to whole pixels.

const n = (v) => +v.toFixed(3);

// Corner radii by role (GUIDE.md section 4), sizes measured as drawn (square icons before scaling).
//   R3 3    outer corner of a landscape body 14 x 12
//   R  2.5  outer corner of any other body whose short side is 9.5 or more
//   M  2    outer corner of a portrait body 12 x 14, or a short side of 6 to under 9.5
//   r  1.5  outer corner, short side 3.5 to under 6; tabs, stubs, ear cups
//   S  1    seam: a narrower part beside a wider one across a gap (a box under its lid)
//   q  1    thin bar 2.5 thick; t 0.75 for 2 thick (0.4 x the thickness, to the nearest 0.25)
// A straight cut through one outline, and an inner joint where a tab meets its body, are 0.
export const R3 = 3, R = 2.5, M = 2, r = 1.5, S = 1, q = 1, t = 0.75;
// Detail weights (GUIDE.md section 5): lines and slots D, strokes K, the gap between parts W.
export const D = 1.25, K = 1.5, W = 1;

// Corner smoothing, the way Hugeicons draws it: two cubics per corner. The curve starts
// 1.8 x the radius before the corner and passes 0.293 x the radius in from each edge at its
// middle, exactly where a circle of that radius would, so it reads as that radius but meets the
// straight edges without a kink. If an edge is too short the run shortens and the radius stays;
// if even the radius doesn't fit (capsule ends), the corner becomes the largest circular arc
// that fits.
export const CORNER = { RUN: 1.8, C1: 1.057, C2: 0.586, MID: 0.293 };
const CIRCLE_T = 0.5523;

/**
 * Closed outline through pts = [{ x, y, c }], clockwise, each corner rounded with radius c.
 * Each edge is shared between its two corners in proportion to their radii.
 */
export function poly(pts) {
  const N = pts.length;
  const len = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const share = (a, b) => (a.c + b.c ? (len(a, b) * a.c) / (a.c + b.c) : 0);
  const at = (P, u, k) => `${n(P.x + u.x * k)} ${n(P.y + u.y * k)}`;
  let d = '';
  pts.forEach((P, i) => {
    const A = pts[(i - 1 + N) % N], B = pts[(i + 1) % N];
    const la = len(A, P), lb = len(P, B);
    const back = { x: (A.x - P.x) / la, y: (A.y - P.y) / la }, fwd = { x: (B.x - P.x) / lb, y: (B.y - P.y) / lb };
    const c = P.c, max = c > 0 ? Math.min(share(P, A), share(P, B)) : 0;
    if (!c) { d += `${i ? 'L' : 'M'}${at(P, back, 0)}`; return; }
    if (max <= c) {
      const k = (1 - CIRCLE_T) * max;
      d += `${i ? 'L' : 'M'}${at(P, back, max)}C${at(P, back, k)} ${at(P, fwd, k)} ${at(P, fwd, max)}`;
      return;
    }
    const run = Math.min(CORNER.RUN * c, max), c1 = Math.min(CORNER.C1 * c, run), c2 = CORNER.C2 * c, m = CORNER.MID * c;
    const mid = `${n(P.x + (back.x + fwd.x) * m)} ${n(P.y + (back.y + fwd.y) * m)}`;
    d += `${i ? 'L' : 'M'}${at(P, back, run)}C${at(P, back, c1)} ${at(P, back, c2)} ${mid}C${at(P, fwd, c2)} ${at(P, fwd, c1)} ${at(P, fwd, run)}`;
  });
  return d + 'Z';
}

/** Rounded rectangle; c is one radius or [top-left, top-right, bottom-right, bottom-left]. */
export function rr(x, y, w, h, c = 0) {
  const [a, b, e, f] = Array.isArray(c) ? c : [c, c, c, c];
  return poly([{ x, y, c: a }, { x: x + w, y, c: b }, { x: x + w, y: y + h, c: e }, { x, y: y + h, c: f }]);
}

/** Capsule: a rectangle whose short ends are half circles (lines, slots, bars, a brim). */
export const pill = (x, y, w, h) => rr(x, y, w, h, Math.min(w, h) / 2);

/** Circle. */
export const circ = (cx, cy, c) => `M${n(cx - c)} ${n(cy)}A${c} ${c} 0 1 1 ${n(cx + c)} ${n(cy)}A${c} ${c} 0 1 1 ${n(cx - c)} ${n(cy)}Z`;

/**
 * Rounded body with tabs standing on its top edge (a folder tab, a camera bump, a lid handle).
 * tabs: [{ x, w, h, c }], left to right; a tab at the body's left edge runs flush with it.
 * Tabs meet the body with square inner corners.
 */
export function body(x, y, w, h, rad, tabs = []) {
  const [a, b, e, f] = Array.isArray(rad) ? rad : [rad, rad, rad, rad];
  const pts = [];
  let rest = tabs;
  if (tabs[0] && tabs[0].x === x) {
    const tb = tabs[0];
    pts.push({ x, y: y - tb.h, c: tb.c }, { x: x + tb.w, y: y - tb.h, c: tb.c }, { x: x + tb.w, y, c: 0 });
    rest = tabs.slice(1);
  } else pts.push({ x, y, c: a });
  for (const tb of rest) pts.push({ x: tb.x, y, c: 0 }, { x: tb.x, y: y - tb.h, c: tb.c }, { x: tb.x + tb.w, y: y - tb.h, c: tb.c }, { x: tb.x + tb.w, y, c: 0 });
  pts.push({ x: x + w, y, c: b }, { x: x + w, y: y + h, c: e }, { x, y: y + h, c: f });
  return poly(pts);
}

// Layers, drawn in order (later layers on top).
//   L(d, opts)   a shape: filled, or stroked with round ends when opts.sw is set
//   opts.tone    'a' (primary, default) or 'b' (secondary)
//   opts.cut     [C(d, sw?)]: shapes knocked out of this layer only, in white
//   opts.gap     clear band of this width cut round the layer out of the layers below it
//   opts.clip    draw only the part of this shape inside the clip shape: a piece of the body in
//                the primary (an envelope flap, a screen band) keeps the body's exact corners
export const L = (d, opts = {}) => ({ d, ...opts });
export const C = (d, sw) => ({ d, sw });
export const Bt = { tone: 'b' };

// Key shapes (GUIDE.md section 2), after Material's system icons scaled to 16. Each icon names
// one in `key`; its whole outline, tabs and handles included, fills that shape.
export const KEYLINES = {
  live: [1, 1, 14, 14],          // the live area: nothing goes outside
  circle: [8, 8, 7],             // diameter 14
  inner: [8, 8, 4],              // diameter 8: where inner details sit
  square: [1.5, 1.5, 13, 13],    // drawn on a 12 x 12 box at 2..14, then scaled up (FIT)
  landscape: [1, 2, 14, 12],     // most wide objects
  wide: [1, 2.5, 14, 11],        // objects that are long in life: a battery, a ticket, a cloud
  portrait: [2, 1, 12, 14]
};
// Square icons are drawn on 12 x 12 and scaled about the centre to 13 x 13, so their area
// matches the rectangles'. Strokes and gaps are divided back so line weights stay the same.
export const FIT = { square: 13 / 12 };

/** Box [x0, y0, x1, y1] of a key shape. */
export function keyBox(key) {
  const k = KEYLINES[key];
  return k.length === 3 ? [k[0] - k[2], k[1] - k[2], k[0] + k[2], k[1] + k[2]] : [k[0], k[1], k[0] + k[2], k[1] + k[3]];
}

// Colours (GUIDE.md section 3). The secondary is the primary at 40% over white.
export const TONES = { a: '#4767F0', b: '#B5C2F9' };
export function secondary(primary, alpha = 0.4) {
  const h = primary.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return '#' + c.map((v) => Math.round(255 - (255 - v) * alpha).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** SVG markup for one icon definition { key, layers }. */
export function render(icon, { size = 16, a = TONES.a, b = TONES.b, id = 'i' } = {}) {
  const k = FIT[icon.key] || 1;
  const ink = (l) => (l.tone === 'b' ? b : a);
  const defs = [];
  const shape = (s, paint, extra = 0) => s.sw
    ? `<path d="${s.d}" fill="none" stroke="${paint}" stroke-width="${n((s.sw + extra) / k)}" stroke-linecap="round" stroke-linejoin="round"/>`
    : extra
      ? `<path d="${s.d}" fill="${paint}" stroke="${paint}" stroke-width="${n(extra / k)}" stroke-linejoin="round"/>`
      : `<path d="${s.d}" fill="${paint}"/>`;
  const box = 'maskUnits="userSpaceOnUse" x="-2" y="-2" width="20" height="20"><rect x="-2" y="-2" width="20" height="20" fill="#fff"/>';
  let out = '';
  icon.layers.forEach((l, i) => {
    if (l.gap) {
      defs.push(`<mask id="${id}-gap${i}" ${box}${shape(l, '#000', l.gap * 2)}</mask>`);
      out = `<g mask="url(#${id}-gap${i})">${out}</g>`;
    }
    let piece = shape(l, ink(l));
    if (l.clip) {
      defs.push(`<clipPath id="${id}-clip${i}" clipPathUnits="userSpaceOnUse"><path d="${l.clip}"/></clipPath>`);
      piece = `<g clip-path="url(#${id}-clip${i})">${piece}</g>`;
    }
    if (l.cut?.length) {
      defs.push(`<mask id="${id}-cut${i}" ${box}${l.cut.map((c) => shape(c, '#000')).join('')}</mask>`);
      piece = `<g mask="url(#${id}-cut${i})">${piece}</g>`;
    }
    out += piece;
  });
  if (k !== 1) out = `<g transform="translate(8 8) scale(${n(k)}) translate(-8 -8)">${out}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}">${defs.length ? `<defs>${defs.join('')}</defs>` : ''}${out}</svg>`;
}
