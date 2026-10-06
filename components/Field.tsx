import { useEffect, useRef } from 'react';

/**
 * The immersive layer behind the page: one cloud of points that morphs between
 * forms as the story scrolls. Globe → lattice → gyroscope → city grid → helix →
 * torus → globe with routes → spiral. Monochrome, drawn in the theme's ink.
 *
 * Sections mark their place with `data-scene` (0 → 1). Points ease toward the
 * blended target, scatter from the cursor, and spread with scroll speed.
 */

const TAU = Math.PI * 2;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Shape = Float32Array; // x,y,z triples, unit scale

const ACCRA = { lat: 5.6037, lon: -0.187 };
const ROUTES = [
  { lat: 38.7223, lon: -9.1393 }, // Lisbon
  { lat: 41.3874, lon: 2.1686 }, // Barcelona
  { lat: 40.4168, lon: -3.7038 }, // Madrid
  { lat: 51.5074, lon: -0.1278 }, // London
  { lat: 40.7128, lon: -74.006 }, // New York
  { lat: -22.9068, lon: -43.1729 }, // Rio de Janeiro
  { lat: 25.2048, lon: 55.2708 }, // Dubai
  { lat: 35.6762, lon: 139.6503 }, // Tokyo
];

function onSphere(lat: number, lon: number, r = 1): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.cos(lo) * r, Math.sin(la) * r, -Math.cos(la) * Math.sin(lo) * r];
}

function buildShapes(N: number): Shape[] {
  const r = rng(7);
  const make = (fn: (i: number) => [number, number, number]) => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const [x, y, z] = fn(i);
      a[i * 3] = x;
      a[i * 3 + 1] = y;
      a[i * 3 + 2] = z;
    }
    return a;
  };

  // 0 globe: Fibonacci sphere
  const golden = Math.PI * (3 - Math.sqrt(5));
  const globe = make((i) => {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    return [Math.cos(th) * rad, y, Math.sin(th) * rad];
  });

  // 1 lattice: points snapped to a grid on the faces of a cube
  const g = 16;
  const lattice = make(() => {
    const face = Math.floor(r() * 6);
    const u = (Math.round(r() * g) / g) * 2 - 1;
    const v = (Math.round(r() * g) / g) * 2 - 1;
    const s = 0.72;
    const axis = face >> 1;
    const sign = face & 1 ? 1 : -1;
    const p: [number, number, number] = [0, 0, 0];
    p[axis] = sign * s;
    p[(axis + 1) % 3] = u * s;
    p[(axis + 2) % 3] = v * s;
    return p;
  });

  // 2 gyroscope: three orthogonal rings around a small core
  const gyro = make((i) => {
    const k = i % 4;
    const a = r() * TAU;
    const j = (r() - 0.5) * 0.03;
    if (k === 3) {
      const y = r() * 2 - 1;
      const rad = Math.sqrt(1 - y * y) * 0.22;
      return [Math.cos(a) * rad, y * 0.22, Math.sin(a) * rad];
    }
    const R = 1 + j;
    if (k === 0) return [Math.cos(a) * R, Math.sin(a) * R, j];
    if (k === 1) return [Math.cos(a) * R * 0.86, j, Math.sin(a) * R * 0.86];
    return [j, Math.cos(a) * R * 0.72, Math.sin(a) * R * 0.72];
  });

  // 3 city grid: a square plane of points (the wave is added while drawing)
  const side = Math.ceil(Math.sqrt(N));
  const grid = make((i) => {
    const gx = (i % side) / (side - 1);
    const gz = Math.floor(i / side) / (side - 1);
    return [(gx * 2 - 1) * 1.5, 0, (gz * 2 - 1) * 1.5];
  });

  // 4 helix: two strands with rungs between them
  const helix = make((i) => {
    const t = r();
    const ang = t * TAU * 3.2;
    const y = (t * 2 - 1) * 1.25;
    const k = i % 5;
    if (k === 4) {
      const f = r();
      const a1 = ang;
      const a2 = ang + Math.PI;
      return [lerp(Math.cos(a1), Math.cos(a2), f) * 0.42, y, lerp(Math.sin(a1), Math.sin(a2), f) * 0.42];
    }
    const a = k % 2 ? ang + Math.PI : ang;
    return [Math.cos(a) * 0.42 + (r() - 0.5) * 0.03, y, Math.sin(a) * 0.42 + (r() - 0.5) * 0.03];
  });

  // 5 torus
  const torus = make(() => {
    const u = r() * TAU;
    const v = r() * TAU;
    const R = 0.78;
    const rr = 0.3;
    return [(R + rr * Math.cos(v)) * Math.cos(u), rr * Math.sin(v), (R + rr * Math.cos(v)) * Math.sin(u)];
  });

  // 6 spiral: a two-armed disc
  const spiral = make((i) => {
    const arm = i % 2;
    const t = Math.pow(r(), 0.7);
    const a = t * TAU * 1.6 + arm * Math.PI + (r() - 0.5) * 0.5;
    const rad = 0.12 + t * 1.25;
    const spread = (r() - 0.5) * 0.12 * (1 - t * 0.5);
    return [Math.cos(a) * rad + spread, (r() - 0.5) * 0.06, Math.sin(a) * rad + spread];
  });

  return [globe, lattice, gyro, grid, helix, torus, spiral];
}

/* scene value → [shape index]; the globe returns for "where" */
const KEYS: { at: number; shape: number }[] = [
  { at: 0, shape: 0 },
  { at: 0.14, shape: 1 },
  { at: 0.22, shape: 2 },
  { at: 0.38, shape: 3 },
  { at: 0.47, shape: 4 },
  { at: 0.6, shape: 5 },
  { at: 0.86, shape: 0 },
  { at: 1, shape: 6 },
];

function blendAt(t: number) {
  let i = 0;
  while (i < KEYS.length - 2 && t > KEYS[i + 1].at) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const k = smooth((t - a.at) / (b.at - a.at));
  return { a: a.shape, b: b.shape, k };
}

function readInk(): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim().split(/\s+/).map(Number);
  return v.length === 3 && v.every((n) => !isNaN(n)) ? (v as [number, number, number]) : [10, 10, 10];
}

export default function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let N = 0;
    let shapes: Shape[] = [];
    let pos = new Float32Array(0); // current (eased) positions
    let seeds = new Float32Array(0);
    const BUCKETS = 12;
    const counts = new Int32Array(BUCKETS);
    let bx = new Float32Array(0);
    let ink = readInk();
    let t = 0;
    let markers: { y: number; v: number }[] = [];
    let mx = -9999;
    let my = -9999;
    let tiltX = 0;
    let tiltY = 0;
    let lastScroll = window.scrollY;
    let speed = 0;
    let frame = 0;
    let built = { w: 0, h: 0 };
    const start = performance.now();

    const measure = () => {
      markers = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { y: r.top + window.scrollY + r.height / 2, v: parseFloat(el.dataset.scene || '0') };
        })
        .sort((a, b) => a.y - b.y);
    };

    const target = () => {
      if (!markers.length) return 0;
      const c = window.scrollY + window.innerHeight / 2;
      if (c <= markers[0].y) return markers[0].v;
      for (let i = 0; i < markers.length - 1; i++) {
        const a = markers[i];
        const b = markers[i + 1];
        if (c <= b.y) return lerp(a.v, b.v, (c - a.y) / Math.max(1, b.y - a.y));
      }
      return markers[markers.length - 1].v;
    };

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const nextN = W < 700 ? 1500 : 2800;
      if (nextN !== N) {
        N = nextN;
        shapes = buildShapes(N);
        pos = new Float32Array(shapes[0]);
        bx = new Float32Array(N * BUCKETS * 2);
        const r = rng(99);
        seeds = new Float32Array(N);
        for (let i = 0; i < N; i++) seeds[i] = r();
      }
      built = { w: W, h: H };
      measure();
    };

    // great-circle routes from Accra, lifted off the surface
    const routes = ROUTES.map((c) => {
      const a = onSphere(ACCRA.lat, ACCRA.lon);
      const b = onSphere(c.lat, c.lon);
      const pts: [number, number, number][] = [];
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const om = Math.acos(Math.min(1, Math.max(-1, dot)));
      for (let s = 0; s <= 40; s++) {
        const f = s / 40;
        const k1 = Math.sin((1 - f) * om) / Math.sin(om);
        const k2 = Math.sin(f * om) / Math.sin(om);
        const lift = 1 + Math.sin(f * Math.PI) * 0.18 * om;
        pts.push([(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift]);
      }
      return pts;
    });

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      const goal = target();
      t = reduce ? goal : t + (goal - t) * 0.06;

      const sc = window.scrollY;
      speed = lerp(speed, Math.min(1, Math.abs(sc - lastScroll) / 60), 0.1);
      lastScroll = sc;

      const { a, b, k } = blendAt(t);
      const A = shapes[a];
      const B = shapes[b];
      const wGrid = (a === 3 ? 1 - k : 0) + (b === 3 ? k : 0);
      const wSpiral = (a === 6 ? 1 - k : 0) + (b === 6 ? k : 0);
      const wGlobe = (a === 0 ? 1 - k : 0) + (b === 0 ? k : 0);

      const mobile = W < 900;
      const heroPull = 1 - smooth(t / 0.09);
      const cx = W * 0.5;
      const cy = H * 0.5;
      const dim = (1 - 0.5 * heroPull) * (mobile ? 0.6 : 1);
      const R = (mobile ? Math.min(W * 0.4, H * 0.28) : Math.min(W, H) * 0.34) * (1 + speed * 0.12);

      tiltX = lerp(tiltX, mx > -9000 ? ((my / H) - 0.5) * 0.3 : 0, 0.04);
      tiltY = lerp(tiltY, mx > -9000 ? ((mx / W) - 0.5) * 0.5 : 0, 0.04);
      const rotY = (reduce ? 0 : time * 0.12) + t * Math.PI * 1.5 + tiltY;
      const rotX = 0.28 + (wGrid + wSpiral) * 0.55 + tiltX;
      const cY = Math.cos(rotY);
      const sY = Math.sin(rotY);
      const cX = Math.cos(rotX);
      const sX = Math.sin(rotX);
      const persp = 3.2;

      ctx.clearRect(0, 0, W, H);
      const [ir, ig, ib] = ink;
      const ease = reduce ? 1 : 0.075;
      const wave = wGrid * 0.16;

      for (let q = 0; q < BUCKETS; q++) counts[q] = 0;
      for (let i = 0; i < N; i++) {
        const j = i * 3;
        let tx = lerp(A[j], B[j], k);
        let ty = lerp(A[j + 1], B[j + 1], k);
        let tz = lerp(A[j + 2], B[j + 2], k);
        if (wave > 0) ty += Math.sin(tx * 3 + time * 1.4) * Math.cos(tz * 3 + time) * wave;
        // gentle breathing so nothing is ever perfectly still
        const br = 1 + Math.sin(time * 0.8 + seeds[i] * TAU) * 0.012;
        tx *= br;
        ty *= br;
        tz *= br;

        pos[j] += (tx - pos[j]) * ease * (0.6 + seeds[i] * 0.8);
        pos[j + 1] += (ty - pos[j + 1]) * ease * (0.6 + seeds[i] * 0.8);
        pos[j + 2] += (tz - pos[j + 2]) * ease * (0.6 + seeds[i] * 0.8);

        const x = pos[j];
        const y = pos[j + 1];
        const z = pos[j + 2];
        // rotate Y then X
        const x1 = x * cY + z * sY;
        const z1 = -x * sY + z * cY;
        const y2 = y * cX - z1 * sX;
        const z2 = y * sX + z1 * cX;
        const p = persp / (persp - z2);
        let px = cx + x1 * R * p;
        let py = cy - y2 * R * p;

        // scatter away from the cursor
        const dx = px - mx;
        const dy = py - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const d = Math.sqrt(d2) || 1;
          const push = (1 - d / 120) * 26;
          px += (dx / d) * push;
          py += (dy / d) * push;
        }

        const depth = Math.min(1, Math.max(0, (z2 + 1.4) / 2.8));
        const q = Math.min(BUCKETS - 1, Math.floor(depth * BUCKETS));
        const o = (q * N + counts[q]++) * 2;
        bx[o] = px;
        bx[o + 1] = py;
      }
      for (let q = 0; q < BUCKETS; q++) {
        const n = counts[q];
        if (!n) continue;
        const depth = (q + 0.5) / BUCKETS;
        const size = 0.6 + depth * 1.3;
        const half = size / 2;
        ctx.fillStyle = `rgba(${ir},${ig},${ib},${(0.12 + depth * 0.7) * dim})`;
        ctx.beginPath();
        for (let m = 0; m < n; m++) {
          const o = (q * N + m) * 2;
          ctx.rect(bx[o] - half, bx[o + 1] - half, size, size);
        }
        ctx.fill();
      }

      // the globe: Accra marker and routes out to the world
      if (wGlobe > 0.05) {
        const project = (v: [number, number, number]) => {
          const x1 = v[0] * cY + v[2] * sY;
          const z1 = -v[0] * sY + v[2] * cY;
          const y2 = v[1] * cX - z1 * sX;
          const z2 = v[1] * sX + z1 * cX;
          const p = persp / (persp - z2);
          return { x: cx + x1 * R * p, y: cy - y2 * R * p, z: z2 };
        };
        const ac = project(onSphere(ACCRA.lat, ACCRA.lon, 1.01));
        const front = clamp01((ac.z + 0.15) / 0.4);
        const routesA = wGlobe * smooth((t - 0.7) / 0.1);

        if (routesA > 0.02) {
          ctx.lineWidth = 1;
          routes.forEach((pts, ri) => {
            const head = ((time * 0.35 + ri * 0.17) % 1) * pts.length;
            ctx.beginPath();
            let started = false;
            pts.forEach((v, s) => {
              const q = project(v);
              if (q.z < -0.2) {
                started = false;
                return;
              }
              if (!started) {
                ctx.moveTo(q.x, q.y);
                started = true;
              } else ctx.lineTo(q.x, q.y);
              if (Math.abs(s - head) < 1) {
                ctx.save();
                ctx.fillStyle = `rgba(${ir},${ig},${ib},${routesA})`;
                ctx.fillRect(q.x - 1.8, q.y - 1.8, 3.6, 3.6);
                ctx.restore();
              }
            });
            ctx.strokeStyle = `rgba(${ir},${ig},${ib},${0.35 * routesA})`;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
          });
          ctx.setLineDash([]);
        }

        const markA = wGlobe * front * (1 - heroPull);
        if (markA > 0.02) {
          const pulse = (time % 2) / 2;
          ctx.strokeStyle = `rgba(${ir},${ig},${ib},${markA * (1 - pulse)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ac.x, ac.y, 4 + pulse * 22, 0, TAU);
          ctx.stroke();
          ctx.fillStyle = `rgba(${ir},${ig},${ib},${markA})`;
          ctx.fillRect(ac.x - 2.5, ac.y - 2.5, 5, 5);
          // leader line and label, flipped left when it would run off screen
          const dir = ac.x + 130 > W ? -1 : 1;
          ctx.beginPath();
          ctx.moveTo(ac.x + 6 * dir, ac.y - 6);
          ctx.lineTo(ac.x + 34 * dir, ac.y - 34);
          ctx.lineTo(ac.x + 112 * dir, ac.y - 34);
          ctx.strokeStyle = `rgba(${ir},${ig},${ib},${markA * 0.7})`;
          ctx.stroke();
          ctx.font = '500 10px "IBM Plex Mono", ui-monospace, monospace';
          ctx.textAlign = dir > 0 ? 'left' : 'right';
          ctx.fillText('ACCRA', ac.x + 38 * dir, ac.y - 40);
          ctx.fillStyle = `rgba(${ir},${ig},${ib},${markA * 0.55})`;
          ctx.fillText('5.60°N 0.19°W', ac.x + 38 * dir, ac.y - 22);
          ctx.textAlign = 'left';
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    build();
    t = target();
    for (let i = 0; i < 1; i++) draw(performance.now());
    (window as unknown as { __worldReady?: boolean }).__worldReady = true;
    window.dispatchEvent(new Event('world:ready'));

    if (!reduce) frame = requestAnimationFrame(loop);
    const onScrollReduced = () => draw(performance.now());
    if (reduce) window.addEventListener('scroll', onScrollReduced, { passive: true });

    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.innerWidth !== built.w || Math.abs(window.innerHeight - built.h) > 140) build();
        else measure();
        if (reduce) draw(performance.now());
      }, 160);
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    const mo = new MutationObserver(() => {
      ink = readInk();
      if (reduce) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScrollReduced);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
