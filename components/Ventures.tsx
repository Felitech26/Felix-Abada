import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Panel, { Heading, Check, Words, Rise } from './Panel';
import { ParkingScene, FootballScene } from './VentureScenes';
import { ventures, Venture } from './content';

const ease = [0.16, 1, 0.3, 1] as const;

function Title({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <h3 ref={ref} className="overflow-hidden pb-[0.1em] font-titleFont text-[clamp(2.75rem,7vw,6rem)] italic leading-[0.95]">
      <motion.span className="block" initial={{ y: '105%' }} animate={inView ? { y: 0 } : {}} transition={{ duration: 1.2, ease }}>
        {children}
      </motion.span>
    </h3>
  );
}

function Case({ v, index }: { v: Venture; index: number }) {
  const [role, period] = v.role.split(' · ');

  return (
    <article data-scene={v.scene} className="flex flex-col gap-8">
      {/* header */}
      <div className="on-world flex flex-wrap items-end justify-between gap-6 border-b border-fg/15 pb-6">
        <div>
          <Rise>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              Case {String(index + 1).padStart(2, '0')} · {v.meta}
            </p>
          </Rise>
          <div className="mt-3">
            <Title>{v.name}</Title>
          </div>
        </div>
        <Rise delay={0.1} className="font-mono text-[11px] uppercase tracking-[0.2em] md:text-right">
          <p>{role}</p>
          <p className="mt-1 text-muted">{period}</p>
        </Rise>
      </div>

      {/* live viewport */}
      <Panel glow={false} depth={0.7} className="p-2 md:p-3">
        <div className="flex items-center justify-between gap-3 px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] md:px-2 md:pb-3">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
              </span>
              Live<span className="hidden md:inline"> · {v.id === 'goparkly' ? 'Smart parking' : 'Player tracking'}</span>
            </span>
            <a
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-2 py-1 transition-colors duration-300 hover:bg-fg hover:text-bg"
            >
              {v.url} ↗
            </a>
        </div>
        <div className={`relative w-full overflow-hidden ${v.id === 'goparkly' ? 'aspect-square' : 'aspect-[4/3]'} md:aspect-[16/9] lg:aspect-[21/9]`}>
          {v.id === 'goparkly' ? <ParkingScene /> : <FootballScene />}
        </div>
      </Panel>

      {/* detail */}
      <div className="on-world grid gap-10 md:grid-cols-12">
        <Words className="text-[15px] leading-relaxed text-fg/75 md:col-span-5 md:text-base" text={v.summary} />
        <ul className="flex flex-col gap-3 md:col-span-4">
          {v.points.map((p, j) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.8, ease, delay: 0.15 + j * 0.07 }}
              className="flex gap-3 border-b border-fg/10 pb-3 text-[15px] leading-snug text-fg/75 transition-[color,transform] duration-300 hover:translate-x-1 hover:text-fg"
            >
              <Check />
              {p}
            </motion.li>
          ))}
        </ul>
        <Rise delay={0.2} className="flex flex-col gap-6 md:col-span-3 md:items-end">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {v.chips.map((c) => (
              <span key={c} className="border border-fg/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 hover:border-fg">
                {c}
              </span>
            ))}
          </div>
          <a href={v.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4">
            <span className="link-line pb-1 font-mono text-[11px] uppercase tracking-[0.22em]">Visit {v.name}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-fg/30 transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              ↗
            </span>
          </a>
        </Rise>
      </div>
    </article>
  );
}

export default function Ventures() {
  return (
    <section id="work" data-chapter="Work" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <Heading label="Selected work">
        Two ventures. <span className="text-fg/40">One standard.</span>
      </Heading>
      <div className="mt-16 flex flex-col gap-[clamp(6rem,12vw,10rem)]">
        {ventures.map((v, i) => (
          <Case key={v.id} v={v} index={i} />
        ))}
      </div>
    </section>
  );
}
