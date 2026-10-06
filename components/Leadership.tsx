import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Panel, { Heading } from './Panel';
import { ScrollWords } from './Reveal';
import { leadershipNotes, pillars } from './content';

const ease = [0.16, 1, 0.3, 1] as const;

const inputs = ['vision', 'market', 'talent', 'data'];
const outputs = ['platforms shipped', 'teams grown', '99.9% reliability', 'lasting growth'];

/* tiny glyphs drawn inside the diagram nodes */
const glyph: Record<string, string> = {
  vision: 'M-5 0c2.5-3.5 7.5-3.5 10 0-2.5 3.5-7.5 3.5-10 0zM0 -1.4a1.4 1.4 0 1 1 0 2.8a1.4 1.4 0 1 1 0-2.8z',
  market: 'M-5 4v-3M-1.7 4v-6M1.7 4v-4M5 4v-8',
  talent: 'M0-5a2.2 2.2 0 1 1 0 4.4a2.2 2.2 0 1 1 0-4.4zM-4.5 5c.8-3 2.4-4 4.5-4s3.7 1 4.5 4',
  data: 'M-4.5-3.5c0-1.4 9-1.4 9 0v7c0 1.4-9 1.4-9 0zM-4.5 0c0 1.4 9 1.4 9 0M-4.5-3.5c0 1.4 9 1.4 9 0',
  'platforms shipped': 'M0-5l5 2.5-5 2.5-5-2.5zM-5 1l5 2.5 5-2.5M-5 4l5 2.5 5-2.5',
  'teams grown': 'M-2.6-4a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6zM2.8-3.4a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3zM-6 4.5c.6-2.4 1.8-3.2 3.4-3.2s2.8.8 3.4 3.2M1 4.5c.5-2 1.4-2.6 2.6-2.6s2 .6 2.5 2.6',
  '99.9% reliability': 'M0-5.5l4.5 1.8v3.2c0 3-2 4.8-4.5 6-2.5-1.2-4.5-3-4.5-6v-3.2zM-2-.2l1.5 1.6 2.8-3',
  'lasting growth': 'M-5 4l3.5-3.5 2.5 2 4-4.5M1.5-2h3.5v3.5',
};

function Node({ x, y, label, below = true, stacked = false, d }: { x: number; y: number; label: string; below?: boolean; stacked?: boolean; d: number }) {
  const lines = stacked ? label.split(' ') : [label];
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay: d }}
      style={{ transformOrigin: `${x}px ${y}px` }}
      className="group/node"
    >
      <circle cx={x} cy={y} r="17" className="fill-bg stroke-fg transition-all duration-300 group-hover/node:fill-fg/10" strokeWidth="1.2" />
      <path d={glyph[label]} transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      {lines.map((ln, j) => (
        <text key={ln} x={x} y={(below ? y + 34 : y - 26) + j * 15} textAnchor="middle" className="fill-fg font-mono text-[12px]">
          {ln}
        </text>
      ))}
    </motion.g>
  );
}

function Flow({ d, delay }: { d: string; delay: number }) {
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease, delay }}
      />
      <path d={d} fill="none" stroke="currentColor" strokeOpacity="0.85" strokeWidth="2" className="flow" />
    </>
  );
}

function Hub({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <motion.g initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: d }} style={{ transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r="30" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="1 4">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur="24s" repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r="22" className="fill-bg" stroke="currentColor" strokeWidth="1.4" />
      <path d={`M${x} ${y - 9}l3 9-3 9-3-9z`} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x={x} y={y + 44} textAnchor="middle" className="fill-fg font-mono text-[12px]">
        strategy
      </text>
    </motion.g>
  );
}

function Standards({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <motion.g initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: d }} style={{ transformOrigin: `${x}px ${y}px` }}>
      <rect x={x - 20} y={y - 20} width="40" height="40" className="fill-bg" stroke="currentColor" strokeWidth="1.4" />
      <path d={`M${x - 7} ${y}l5 5 9-10`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x} y={y + 44} textAnchor="middle" className="fill-fg font-mono text-[12px]">
        standards
      </text>
    </motion.g>
  );
}

function DiagramWide() {
  const ys = [50, 125, 200, 275];
  return (
    <svg viewBox="0 0 1000 330" className="hidden h-auto w-full md:block" role="img" aria-label="Vision, market, talent and data feed strategy; strategy passes through standards to produce platforms shipped, teams grown, 99.9% reliability and lasting growth.">
      {ys.map((y, i) => (
        <Flow key={`l${y}`} d={`M187 ${y} C 320 ${y}, 330 162, 448 162`} delay={0.2 + i * 0.08} />
      ))}
      <Flow d="M492 162 L 556 162" delay={0.5} />
      {ys.map((y, i) => (
        <Flow key={`r${y}`} d={`M600 162 C 700 162, 710 ${y}, 813 ${y}`} delay={0.6 + i * 0.08} />
      ))}
      {inputs.map((l, i) => (
        <Node key={l} x={170} y={ys[i]} label={l} d={0.1 + i * 0.06} />
      ))}
      <Hub x={470} y={162} d={0.4} />
      <Standards x={578} y={162} d={0.55} />
      {outputs.map((l, i) => (
        <Node key={l} x={830} y={ys[i]} label={l} d={0.7 + i * 0.06} />
      ))}
    </svg>
  );
}

function DiagramTall() {
  const xs = [45, 135, 225, 315];
  return (
    <svg viewBox="0 0 360 600" className="h-auto w-full md:hidden" role="img" aria-label="Vision, market, talent and data feed strategy; strategy passes through standards to produce platforms shipped, teams grown, 99.9% reliability and lasting growth.">
      {xs.map((x, i) => (
        <Flow key={`t${x}`} d={`M${x} 58 C ${x} 150, 180 140, 180 222`} delay={0.2 + i * 0.08} />
      ))}
      <Flow d="M180 266 L 180 306" delay={0.5} />
      {xs.map((x, i) => (
        <Flow key={`b${x}`} d={`M180 350 C 180 430, ${x} 420, ${x} 508`} delay={0.6 + i * 0.08} />
      ))}
      {inputs.map((l, i) => (
        <Node key={l} x={xs[i]} y={40} label={l} below={false} d={0.1 + i * 0.06} />
      ))}
      <Hub x={180} y={244} d={0.4} />
      <Standards x={180} y={328} d={0.55} />
      {outputs.map((l, i) => (
        <Node key={l} x={xs[i]} y={525} label={l} stacked d={0.7 + i * 0.06} />
      ))}
    </svg>
  );
}

export default function Leadership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section id="leadership" data-scene={0.6} data-chapter="Leadership" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <Heading label="How I lead">
        From vision <span className="text-fg/40">to impact.</span>
      </Heading>

      <Panel className="mt-12 p-5 md:p-10" depth={0.5} glow={false}>
        <div className="px-1 py-4 md:px-6">
          <DiagramWide />
          <DiagramTall />
        </div>
        <div ref={ref} className="mt-8 grid gap-4 md:grid-cols-3">
          {leadershipNotes.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="border border-fg/10 bg-fg/[0.03] p-5 transition-colors duration-500 hover:border-fg/40"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{n.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/70">{n.text}</p>
            </motion.div>
          ))}
        </div>
      </Panel>

      <div className="on-world mt-[clamp(5rem,10vw,8rem)]">
        <p className="eyebrow">Leadership philosophy</p>
        <ScrollWords
          className="mt-6 max-w-5xl font-titleFont text-[clamp(1.9rem,4vw,3.6rem)] italic leading-[1.15]"
          text="“Platforms are built not just with code, but with culture, where collaboration, trust and long-term thinking drive sustainable innovation.”"
        />
      </div>

      <div className="mt-16 grid gap-px border border-fg/10 bg-fg/10 md:grid-cols-2 lg:grid-cols-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className="group bg-panel/80 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-panel/95"
          >
            <span className="block h-px w-6 bg-gold transition-all duration-700 ease-expo group-hover:w-14" aria-hidden="true" />
            <h3 className="mt-5 font-titleFont text-xl italic">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg/65">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
