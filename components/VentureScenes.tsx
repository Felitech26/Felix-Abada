import { useEffect, useRef } from 'react';

/**
 * Live, theme-aware illustrations for the work cases, drawn in the page's ink.
 * goParkly: a car finds its reserved bay and parks.
 * ScoutVerse: player vision, one player tracked across the pitch with live speed.
 */

type RGB = [number, number, number];
interface Palette {
  ink: (a?: number) => string;
  paper: (a?: number) => string;
}
type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: Palette, dt: number) => void;
type Setup = (w: number, h: number) => Draw;

const TAU = Math.PI * 2;
const MONO = '"IBM Plex Mono", ui-monospace, monospace';

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function read(name: string, fallback: RGB): RGB {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return v.length === 3 && v.every((n) => !isNaN(n)) ? (v as RGB) : fallback;
}

function palette(): Palette {
  const f = read('--fg', [12, 12, 12]);
  const b = read('--bg', [250, 250, 250]);
  return {
    ink: (a = 1) => `rgba(${f[0]},${f[1]},${f[2]},${a})`,
    paper: (a = 1) => `rgba(${b[0]},${b[1]},${b[2]},${a})`,
  };
}

function useScene(setup: Setup) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let draw: Draw = () => {};
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = false;
    let pal = palette();
    let last = performance.now();
    const start = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(ctx, w, h, reduce ? 6 : (now - start) / 1000, pal, reduce ? 0 : dt);
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = setup(w, h);
      render(performance.now());
    };
    const loop = (now: number) => {
      render(now);
      frame = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduce) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      pal = palette();
      if (!visible || reduce) render(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [setup]);

  return ref;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function dotGrid(ctx: CanvasRenderingContext2D, w: number, h: number, p: Palette, gap = 18) {
  ctx.fillStyle = p.ink(0.07);
  for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) ctx.fillRect(x, y, 1, 1);
}

function tag(ctx: CanvasRenderingContext2D, p: Palette, x: number, y: number, text: string, solid = true) {
  ctx.font = `500 10px ${MONO}`;
  const tw = ctx.measureText(text).width;
  const bx = Math.round(x - tw / 2 - 7);
  ctx.fillStyle = solid ? p.ink(1) : p.paper(0.9);
  ctx.fillRect(bx, y - 13, tw + 14, 19);
  if (!solid) {
    ctx.strokeStyle = p.ink(0.8);
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + 0.5, y - 12.5, tw + 13, 18);
  }
  ctx.fillStyle = solid ? p.paper(1) : p.ink(1);
  ctx.fillText(text, bx + 7, y);
}

/* ======================= goParkly: the parking lot ======================= */

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

const parkingSetup: Setup = (w, h) => {
  const rand = rng(21);
  const laneY = h * 0.5;
  const laneHalf = Math.max(24, h * 0.085);
  const depth = Math.min(100, h * 0.3);
  const bayW = Math.max(38, Math.min(58, w / 15));
  const n = Math.max(6, Math.floor((w - 48) / bayW));
  const x0 = (w - n * bayW) / 2;
  const CW = bayW * 0.56;
  const CL = Math.min(depth * 0.7, CW * 1.9);
  const R = laneHalf * 0.9;

  interface Bay {
    x: number;
    row: -1 | 1;
    occ: number;
    want: number;
    label: string;
  }
  const bays: Bay[] = [];
  ([-1, 1] as const).forEach((row) => {
    for (let i = 0; i < n; i++) {
      const on = rand() < 0.6 ? 1 : 0;
      bays.push({ x: x0 + i * bayW + bayW / 2, row, occ: on, want: on, label: `${row < 0 ? 'A' : 'B'}${String(i + 1).padStart(2, '0')}` });
    }
  });
  const bayY = (row: number) => laneY + row * (laneHalf + depth / 2);

  let target: Bay = bays[0];
  const pick = () => {
    let options = bays.filter((b) => b.want < 0.5 && b.x > R + CL + 40);
    if (!options.length) {
      const occupied = bays.filter((b) => b.x > R + CL + 40);
      const b = occupied[Math.floor(rand() * occupied.length)];
      b.want = 0;
      b.occ = 0;
      options = [b];
    }
    target = options[Math.floor(rand() * options.length)];
  };
  pick();

  const CYCLE = 7.5;
  let cycleStart = 0;

  // position along the route: lane → quarter turn → into the bay
  const route = (s: number) => {
    const startX = -CL;
    const s1 = target.x - R - startX;
    const arc = (R * Math.PI) / 2;
    const s2 = Math.abs(bayY(target.row) - (laneY + target.row * R));
    const total = s1 + arc + s2;
    const d = s * total;
    const row = target.row;
    if (d <= s1) return { x: startX + d, y: laneY, a: 0 };
    if (d <= s1 + arc) {
      const k = (d - s1) / arc;
      const start = -row * (Math.PI / 2);
      const ang = start + (0 - start) * k;
      const cx = target.x - R;
      const cy = laneY + row * R;
      return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang), a: ang + row * (Math.PI / 2) };
    }
    const k = (d - s1 - arc) / s2;
    return { x: target.x, y: laneY + row * R + row * s2 * k, a: row * (Math.PI / 2) };
  };

  const drawCar = (ctx: CanvasRenderingContext2D, p: Palette, x: number, y: number, a: number, mode: 'parked' | 'active', alpha = 1) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a);
    ctx.globalAlpha = alpha;
    rrect(ctx, -CL / 2, -CW / 2, CL, CW, CW * 0.3);
    if (mode === 'active') {
      ctx.fillStyle = p.ink(1);
      ctx.fill();
      ctx.fillStyle = p.paper(0.85);
      ctx.fillRect(CL * 0.1, -CW * 0.34, CL * 0.15, CW * 0.68);
      ctx.fillRect(-CL * 0.36, -CW * 0.3, CL * 0.09, CW * 0.6);
      ctx.fillRect(CL / 2 - 2.5, -CW * 0.36, 2, CW * 0.18);
      ctx.fillRect(CL / 2 - 2.5, CW * 0.18, 2, CW * 0.18);
    } else {
      ctx.fillStyle = p.ink(0.07);
      ctx.fill();
      ctx.strokeStyle = p.ink(0.45);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = p.ink(0.2);
      ctx.fillRect(CL * 0.1, -CW * 0.32, CL * 0.13, CW * 0.64);
    }
    ctx.restore();
  };

  return (ctx, w, h, t, p, dt) => {
    let u = (t - cycleStart) / CYCLE;
    if (u >= 1) {
      target.want = 1;
      target.occ = 1;
      const leaving = bays.filter((b) => b.want > 0.5 && b !== target);
      if (leaving.length) leaving[Math.floor(rand() * leaving.length)].want = 0;
      pick();
      cycleStart = t;
      u = 0;
    }
    for (const b of bays) b.occ += (b.want - b.occ) * Math.min(1, dt * 2.5);

    ctx.fillStyle = p.paper(1);
    ctx.fillRect(0, 0, w, h);
    dotGrid(ctx, w, h, p);

    // lane
    ctx.strokeStyle = p.ink(0.3);
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 10]);
    ctx.lineDashOffset = 0;
    ctx.beginPath();
    ctx.moveTo(0, laneY);
    ctx.lineTo(w, laneY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = p.ink(0.12);
    ctx.beginPath();
    ctx.moveTo(0, laneY - laneHalf);
    ctx.lineTo(w, laneY - laneHalf);
    ctx.moveTo(0, laneY + laneHalf);
    ctx.lineTo(w, laneY + laneHalf);
    ctx.stroke();

    // entry arrow on the lane
    ctx.fillStyle = p.ink(0.35);
    for (let ax = 30; ax < w; ax += Math.max(180, w / 4)) {
      ctx.beginPath();
      ctx.moveTo(ax, laneY - 5);
      ctx.lineTo(ax + 8, laneY);
      ctx.lineTo(ax, laneY + 5);
      ctx.fill();
    }

    // bays
    ctx.strokeStyle = p.ink(0.35);
    ctx.lineWidth = 1;
    ([-1, 1] as const).forEach((row) => {
      const near = laneY + row * laneHalf;
      const far = near + row * depth;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const x = x0 + i * bayW;
        ctx.moveTo(x, near);
        ctx.lineTo(x, far);
      }
      ctx.moveTo(x0, far);
      ctx.lineTo(x0 + n * bayW, far);
      ctx.stroke();
    });
    ctx.font = `500 9px ${MONO}`;
    ctx.fillStyle = p.ink(0.35);
    ctx.textAlign = 'center';
    for (const b of bays) {
      const far = laneY + b.row * (laneHalf + depth);
      ctx.fillText(b.label, b.x, far + (b.row < 0 ? -6 : 13));
    }
    ctx.textAlign = 'start';

    for (const b of bays) if (b.occ > 0.02 && b !== target) drawCar(ctx, p, b.x, bayY(b.row), b.row * (Math.PI / 2), 'parked', b.occ);

    // reserved bay
    const parked = u > 0.62;
    const by = bayY(target.row);
    ctx.strokeStyle = p.ink(0.85);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -t * 18;
    ctx.strokeRect(target.x - bayW / 2 + 4, by - depth / 2 + 4, bayW - 8, depth - 8);
    ctx.setLineDash([]);
    ctx.fillStyle = p.ink(0.05 + (parked ? 0.05 : 0.04 * (0.5 + 0.5 * Math.sin(t * 4))));
    ctx.fillRect(target.x - bayW / 2 + 4, by - depth / 2 + 4, bayW - 8, depth - 8);

    // car on its route
    const drive = Math.min(1, u / 0.62);
    const pos = route(easeOut(drive));
    if (!parked) {
      ctx.strokeStyle = p.ink(0.35);
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      for (let s = easeOut(drive); s <= 1.0001; s += 0.02) {
        const q = route(Math.min(1, s));
        ctx.lineTo(q.x, q.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }
    drawCar(ctx, p, pos.x, pos.y, pos.a, 'active');

    // status tag beside the bay
    const tagY = laneY + target.row * (laneHalf + depth) + (target.row < 0 ? -22 : 34);
    const tx = Math.min(w - 70, Math.max(70, target.x));
    if (parked) tag(ctx, p, tx, tagY, `${target.label} · PARKED ✓`);
    else tag(ctx, p, tx, tagY, `${target.label} · RESERVED`, false);

    // pulse ring while the bay waits
    if (!parked) {
      const k = (t * 0.8) % 1;
      ctx.strokeStyle = p.ink(0.5 * (1 - k));
      ctx.beginPath();
      ctx.arc(target.x, by, 6 + k * 26, 0, TAU);
      ctx.stroke();
    }

    const free = bays.filter((b) => b.want < 0.5).length - (parked ? 0 : 0);
    ctx.font = `500 10px ${MONO}`;
    ctx.fillStyle = p.ink(0.6);
    ctx.fillText(`AVAILABLE ${String(free).padStart(2, '0')} / ${bays.length}`, 14, h - 14);
  };
};

/* ===================== ScoutVerse: player vision ===================== */

const footballSetup: Setup = (w, h) => {
  const rand = rng(11);
  const m = Math.max(18, Math.min(w, h) * 0.07);
  const P = { x: m, y: m + 6, w: w - m * 2, h: h - m * 2 - 22 };

  interface Runner {
    bx: number;
    by: number;
    ax: number;
    ay: number;
    fx: number;
    fy: number;
    ph: number;
    id: number;
  }
  const players: Runner[] = Array.from({ length: 16 }, (_, i) => ({
    bx: 0.1 + rand() * 0.8,
    by: 0.12 + rand() * 0.76,
    ax: 0.02 + rand() * 0.05,
    ay: 0.02 + rand() * 0.06,
    fx: 0.15 + rand() * 0.3,
    fy: 0.15 + rand() * 0.3,
    ph: rand() * 10,
    id: i + 2,
  }));
  const focus = players[0];
  Object.assign(focus, { bx: 0.48, by: 0.5, ax: 0.26, ay: 0.24, fx: 0.31, fy: 0.23, id: 7 });

  const pos = (p: Runner, s: number) => [
    P.x + P.w * (p.bx + Math.sin(s * p.fx + p.ph) * p.ax),
    P.y + P.h * (p.by + Math.cos(s * p.fy + p.ph * 1.3) * p.ay),
  ];

  let dist = 0;
  let top = 0;

  const lines = (ctx: CanvasRenderingContext2D, p: Palette) => {
    ctx.strokeStyle = p.ink(0.28);
    ctx.lineWidth = 1;
    ctx.strokeRect(P.x, P.y, P.w, P.h);
    ctx.beginPath();
    ctx.moveTo(P.x + P.w / 2, P.y);
    ctx.lineTo(P.x + P.w / 2, P.y + P.h);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(P.x + P.w / 2, P.y + P.h / 2, Math.min(P.w, P.h) * 0.16, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = p.ink(0.4);
    ctx.fillRect(P.x + P.w / 2 - 1.5, P.y + P.h / 2 - 1.5, 3, 3);
    const bw = P.w * 0.13;
    const bh = P.h * 0.52;
    const gw = P.w * 0.05;
    const gh = P.h * 0.24;
    ctx.strokeRect(P.x, P.y + (P.h - bh) / 2, bw, bh);
    ctx.strokeRect(P.x + P.w - bw, P.y + (P.h - bh) / 2, bw, bh);
    ctx.strokeRect(P.x, P.y + (P.h - gh) / 2, gw, gh);
    ctx.strokeRect(P.x + P.w - gw, P.y + (P.h - gh) / 2, gw, gh);
    ctx.strokeStyle = p.ink(0.5);
    ctx.lineWidth = 2;
    ctx.strokeRect(P.x - 6, P.y + (P.h - P.h * 0.12) / 2, 6, P.h * 0.12);
    ctx.strokeRect(P.x + P.w, P.y + (P.h - P.h * 0.12) / 2, 6, P.h * 0.12);
    // 0–100 grid ticks along the touchline
    ctx.fillStyle = p.ink(0.35);
    ctx.font = `500 8px ${MONO}`;
    for (let i = 0; i <= 10; i++) {
      const x = P.x + (P.w * i) / 10;
      ctx.fillRect(x - 0.5, P.y + P.h, 1, 4);
      if (i % 5 === 0) ctx.fillText(String(i * 10), x - (i === 10 ? 12 : i ? 5 : 0), P.y + P.h + 13);
    }
  };

  return (ctx, w, h, t, p, dt) => {
    const s = t;
    ctx.fillStyle = p.paper(1);
    ctx.fillRect(0, 0, w, h);
    dotGrid(ctx, w, h, p);
    lines(ctx, p);

    // everyone else, with faint motion trails
    for (const pl of players.slice(1)) {
      const [x, y] = pos(pl, s);
      ctx.strokeStyle = p.ink(0.15);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 10; i++) {
        const [qx, qy] = pos(pl, s - i * 0.12);
        if (i) ctx.lineTo(qx, qy);
        else ctx.moveTo(qx, qy);
      }
      ctx.stroke();
      ctx.fillStyle = p.ink(0.55);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, TAU);
      ctx.fill();
    }

    // the focus player's trail
    ctx.strokeStyle = p.ink(1);
    ctx.lineWidth = 2;
    for (let i = 0; i < 44; i++) {
      const [x1, y1] = pos(focus, s - i * 0.05);
      const [x2, y2] = pos(focus, s - (i + 1) * 0.05);
      ctx.globalAlpha = 0.7 * (1 - i / 44);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const [x, y] = pos(focus, s);
    const [px, py] = pos(focus, s - 0.1);
    const vx = (x - px) / 0.1;
    const vy = (y - py) / 0.1;
    const v = Math.hypot(vx, vy);
    // screen speed mapped to a match-like range
    const kmh = 11 + Math.min(1, v / (Math.min(w, h) * 0.45)) * 23;
    dist += (dt * kmh) / 3.6;
    top = Math.max(top, kmh);

    // ball, carried just ahead of the player
    if (v > 0.5) {
      const bxp = x + (vx / v) * 13;
      const byp = y + (vy / v) * 13;
      ctx.fillStyle = p.paper(1);
      ctx.strokeStyle = p.ink(1);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(bxp, byp, 3.4, 0, TAU);
      ctx.fill();
      ctx.stroke();
    }

    // velocity vector
    if (v > 0.5) {
      const len = 26 + Math.min(44, v * 0.25);
      const ex = x + (vx / v) * len;
      const ey = y + (vy / v) * len;
      const a = Math.atan2(vy, vx);
      ctx.strokeStyle = p.ink(0.85);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 8 * Math.cos(a - 0.45), ey - 8 * Math.sin(a - 0.45));
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 8 * Math.cos(a + 0.45), ey - 8 * Math.sin(a + 0.45));
      ctx.stroke();
    }

    // lock-on: rotating dashed ring and corner brackets
    ctx.strokeStyle = p.ink(1);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.lineDashOffset = -t * 14;
    ctx.beginPath();
    ctx.arc(x, y, 13 + Math.sin(t * 3) * 1.5, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    const B = 22;
    const L = 7;
    ctx.beginPath();
    [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ].forEach(([sx, sy]) => {
      ctx.moveTo(x + sx * B, y + sy * (B - L));
      ctx.lineTo(x + sx * B, y + sy * B);
      ctx.lineTo(x + sx * (B - L), y + sy * B);
    });
    ctx.stroke();
    ctx.fillStyle = p.ink(1);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, TAU);
    ctx.fill();

    const tx = Math.min(w - 90, Math.max(90, x));
    tag(ctx, p, tx, Math.max(20, y - 32), `PLAYER ${String(focus.id).padStart(2, '0')} · ${kmh.toFixed(1)} KM/H`);

    ctx.font = `500 10px ${MONO}`;
    ctx.fillStyle = p.ink(0.6);
    ctx.fillText(`DISTANCE ${(dist / 1000).toFixed(2)} KM`, 14, h - 10);
    const topText = `TOP SPEED ${top.toFixed(1)} KM/H`;
    ctx.fillText(topText, w - 14 - ctx.measureText(topText).width, h - 10);
  };
};

export function ParkingScene() {
  const ref = useScene(parkingSetup);
  return <canvas ref={ref} className="block h-full w-full" role="img" aria-label="Animation: a car drives into a parking lot and parks in the bay it reserved." />;
}

export function FootballScene() {
  const ref = useScene(footballSetup);
  return <canvas ref={ref} className="block h-full w-full" role="img" aria-label="Animation: players move on a football pitch while one is tracked with a speed label, trail and direction vector." />;
}
