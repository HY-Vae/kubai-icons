// Copyright (c) 2026 Kubai087. Licensed under the Kubai Icons License; see LICENSE.
// Example icons in the two-tone solid style (双色面性). Each icon is { label, key, layers }:
//   label   the Chinese name
//   key     the key shape it fills (KEYLINES in kit.mjs): circle, square, landscape, wide,
//           portrait or live
//   layers  drawn in order; the light body first (tone b), then the blue accents and details
// Read the one closest to a new object before drawing it, and append new icons the same way.
import { R3, R, M, r, S, q, t, D, K, rr, pill, circ, body, L, C, Bt } from './kit.mjs';

export const ICONS = {
  folder: {
    label: '文件夹',
    key: 'landscape',
    layers: [
      // One light folder; a short blue dash on the front marks it.
      L(body(1, 4, 14, 10, R, [{ x: 1, w: 6, h: 2, c: r }]), Bt),
      L(pill(10, 10.5, 2.5, D))
    ]
  },
  'file-text': {
    label: '文档',
    key: 'portrait',
    layers: [
      L(rr(2, 1, 12, 14, M), Bt),
      L(pill(5, 5.25, 6, D) + pill(5, 7.875, 6, D) + pill(5, 10.5, 3.5, D))
    ]
  },
  calendar: {
    label: '日历',
    key: 'square',
    layers: [
      L(rr(2, 3.5, 12, 10.5, R), Bt),
      L(pill(4.875, 2, D, 3) + pill(9.875, 2, D, 3)),
      L([5.25, 8, 10.75].map((x) => circ(x, 8.5, 0.5) + circ(x, 11.25, 0.5)).join(''))
    ]
  },
  camera: {
    label: '相机',
    key: 'square',
    layers: [
      L(body(2, 4, 12, 10, R, [{ x: 5, w: 6, h: 2, c: r }]), Bt),
      L(circ(8, 9, 2.75), { cut: [C(circ(8, 9, 1.5))] }),
      L(circ(11.75, 6.25, 0.6))
    ]
  },
  lock: {
    label: '锁',
    key: 'portrait',
    layers: [
      L('M4.75 7V5a3.25 3.25 0 0 1 6.5 0V7', { sw: K }),
      L(rr(2, 6.5, 12, 8.5, M), Bt),
      L(pill(7.375, 9.5, D, 2.5))
    ]
  },
  user: {
    label: '用户',
    key: 'square',
    layers: [
      L(circ(8, 5, 3)),
      L(rr(2, 9, 12, 5, [5, 5, r, r]), Bt)
    ]
  },
  'id-card': {
    label: '证件',
    key: 'landscape',
    layers: [
      L(rr(1, 2, 14, 12, R3), Bt),
      L(circ(5.25, 6.75, 1.5) + rr(3, 9.25, 4.5, 2.5, [2.25, 2.25, 0.75, 0.75])),
      L(pill(9.5, 6.25, 3.5, D) + pill(9.5, 9, 2.5, D))
    ]
  },
  building: {
    label: '建筑',
    key: 'square',
    layers: [
      // One tower: two columns of window bars and a door.
      L(rr(2, 2, 12, 12, R), Bt),
      L([4.5, 7, 9.5].map((y) => pill(4.5, y - 0.5, 2.25, D) + pill(9.25, y - 0.5, 2.25, D)).join('') + rr(7, 11, 2, 3, [1, 1, 0, 0]))
    ]
  },
  'book-open': {
    label: '书',
    key: 'landscape',
    layers: [
      L(rr(1, 2, 6.5, 12, [R3, 0, 0, R3]), Bt),
      L(rr(8.5, 2, 6.5, 12, [0, R3, R3, 0]), Bt),
      L(pill(3.25, 6, 2.5, D) + pill(3.25, 8.75, 2.5, D) + pill(10.25, 6, 2.5, D) + pill(10.25, 8.75, 2.5, D))
    ]
  },
  bell: {
    label: '铃铛',
    key: 'square',
    layers: [
      // Dome and brim are one light body; the knob and clapper are small blue accents.
      L('M3 10.5V8a5 5 0 0 1 10 0V10.5Z' + pill(2, 9.75, 12, 1.75), Bt),
      L(rr(7.25, 2, 1.5, 1.25, [0.75, 0.75, 0, 0]) + rr(6.75, 12.5, 2.5, 1.5, [0, 0, 1.25, 1.25]))
    ]
  },
  trash: {
    label: '垃圾桶',
    key: 'portrait',
    layers: [
      L(body(2, 2.5, 12, 1.5, 0.6, [{ x: 6.5, w: 3, h: 1.5, c: 0.6 }])),
      L(rr(3, 5, 10, 10, [S, S, R, R]), Bt),
      L(pill(6.25, 7.5, D, 5) + pill(8.75, 7.5, D, 5))
    ]
  },
  gift: {
    label: '礼物',
    key: 'square',
    layers: [
      // The bow is two loops tied by a knot, resting on the lid: elements either touch or keep a
      // gap of exactly 1, never something in between.
      L(circ(5.75, 4, 1.375) + circ(10.25, 4, 1.375), { sw: D }),
      L(rr(7.25, 3.75, 1.5, 2.25, [0.75, 0.75, 0, 0])),
      L(rr(2, 6, 12, 2.5, q), Bt),
      L(rr(3, 9.5, 10, 4.5, [S, S, r, r]), Bt),
      L(rr(7.25, 6, 1.5, 2.5) + rr(7.25, 9.5, 1.5, 4.5))
    ]
  },
  smile: {
    label: '笑脸',
    key: 'circle',
    layers: [
      L(circ(8, 8, 7), Bt),
      L(pill(5.375, 5.25, D, 2) + pill(9.375, 5.25, D, 2)),
      L('M5.5 9.25a2.5 2.5 0 0 0 5 0', { sw: D })
    ]
  },
  chat: {
    label: '对话',
    key: 'landscape',
    layers: [
      // One light bubble; the square corner says speech. Two blue lines.
      L(rr(1, 2, 14, 12, [R3, R3, R3, 0]), Bt),
      L(pill(4, 6, 8, D) + pill(4, 9, 5, D))
    ]
  },
  clock: {
    label: '时钟',
    key: 'circle',
    layers: [
      L(circ(8, 8, 7), Bt),
      L('M8 4.75V8H10.5', { sw: K })
    ]
  },
  image: {
    label: '图片',
    key: 'landscape',
    layers: [
      L(rr(1, 2, 14, 12, R3), Bt),
      L(circ(11.25, 5.5, 1.25) + 'M3 12A4.5 4.5 0 0 1 12 12Z')
    ]
  },
  ticket: {
    label: '票',
    key: 'wide',
    layers: [
      // The ticket and its stub, torn apart along the perforation: the tear cuts straight through one outline.
      L(rr(1, 2.5, 10, 11, [R, 0, 0, R]), { ...Bt, cut: [C(circ(1, 8, 1.25))] }),
      L(rr(12, 2.5, 3, 11, [0, r, r, 0]), { cut: [C(circ(15, 8, 1.25))] })
    ]
  },
  wallet: {
    label: '钱包',
    key: 'landscape',
    layers: [
      L(rr(1, 2, 14, 12, R3), Bt),
      L(pill(9.5, 6.25, 4.5, 3.5), { cut: [C(circ(11.25, 8, 0.75))] })
    ]
  },
  headphones: {
    label: '耳机',
    key: 'live',
    layers: [
      L('M1.625 10V8a6.375 6.375 0 0 1 12.75 0V10', { sw: 1.25, ...Bt }),
      L(rr(1, 9, 3.75, 6, r) + rr(11.25, 9, 3.75, 6, r))
    ]
  },
  mic: {
    label: '话筒',
    key: 'portrait',
    allow: { spacing: '立柱顶端藏在支架后面，它和话筒头之间的距离看不见，不算间距' },
    layers: [
      // Capsule 4.5..11.5 with its bottom centre at (8, 6); the stand is concentric with it, a
      // 1.125 gap out (inner radius 4.625). The capsule is the light body; stand and base are blue.
      L(rr(4.5, 1, 7, 8.5, 3.5), Bt),
      L('M2.75 4.75V6a5.25 5.25 0 0 0 10.5 0V4.75', { sw: 1.25 }),
      L(body(5, 13.5, 6, 1.5, 0.75, [{ x: 7.375, w: D, h: 2.5, c: 0 }]))
    ]
  },
  cloud: {
    label: '云',
    key: 'wide',
    layers: [
      // A blue sun tucked behind the light cloud: they overlap rather than float apart.
      L(circ(11.75, 5.75, 3.25)),
      L(pill(1, 8.5, 11, 5) + circ(6, 8.5, 3.5), Bt)
    ]
  },
  'shopping-bag': {
    label: '购物袋',
    key: 'portrait',
    layers: [
      L('M5 6.5V4.75a3 3 0 0 1 6 0V6.5', { sw: K }),
      L(rr(2, 6, 12, 9, [S, S, R, R]), Bt)
    ]
  },
  battery: {
    label: '电池',
    key: 'wide',
    layers: [
      L(rr(1, 2.5, 12.5, 11, R) + rr(13.5, 6, 1.5, 4, [0, 0.75, 0.75, 0]), Bt),
      L(pill(3.75, 5, D, 6) + pill(6.25, 5, D, 6) + pill(8.75, 5, D, 6))
    ]
  },
  archive: {
    label: '归档',
    key: 'square',
    layers: [
      L(rr(2, 2, 12, 3.5, r), Bt),
      L(rr(3, 6.5, 10, 7.5, [S, S, R, R]), Bt),
      L(pill(6.25, 8.75, 3.5, D))
    ]
  },
  mail: {
    label: '邮件',
    key: 'wide',
    layers: [
      // The flap is the top of the body itself, clipped by a circle: a round-bottomed flap
      // instead of a V, and the body's own corners, exactly.
      L(rr(1, 2.5, 14, 11, R), Bt),
      L(rr(1, 2.5, 14, 11, R), { clip: circ(8, -0.75, 8.75) })
    ]
  },
  printer: {
    label: '打印机',
    key: 'square',
    layers: [
      // Paper waiting on top, one gap above the body; the printed sheet comes out in blue, square
      // on the side cut off by the slot.
      L(rr(4.5, 2, 7, 2.5, q), Bt),
      L(rr(2, 5.5, 12, 6.5, M), Bt),
      L(rr(4.5, 9.5, 7, 4.5, [0, 0, r, r])),
      L(circ(11.25, 8, 0.5))
    ]
  }
};
