import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scramble from './Scramble';

const ease = [0.16, 1, 0.3, 1] as const;

const lines = [
  { text: 'Engineering solutions', cls: '' },
  { text: 'that transform ideas', cls: 'italic text-outline' },
  { text: 'into impact.', cls: '' },
];

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const spread = useTransform(scrollYProgress, [0, 1], ['-0.015em', '0.02em']);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section ref={ref} id="top" data-scene={0} data-chapter="Intro" className="relative flex min-h-[100svh] flex-col pb-10 pt-24 md:pb-24 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 58% 46% at 50% 48%, rgb(var(--bg) / 0.82), transparent 76%)' }}
      />

      <motion.div style={{ y, opacity: fade }} className="wrap on-world relative flex flex-1 flex-col items-center justify-center text-center">
        <motion.h1 {...enter(0.1)} className="eyebrow flex items-center gap-3 text-[10px] md:gap-4 md:text-[11px]">
          <span className="hidden h-px w-8 bg-fg md:block" aria-hidden="true" />
          <Scramble text="Felix Abada · Software Engineer & CTO · Accra, Ghana" play={ready} duration={1000} />
          <span className="hidden h-px w-8 bg-fg md:block" aria-hidden="true" />
        </motion.h1>

        <motion.p style={{ letterSpacing: spread }} className="mt-7 font-titleFont text-[length:clamp(2.4rem,min(8.4vw,6.4vw+1rem,11.5vh),6.25rem)] leading-[1]">
          {lines.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className={`block ${l.cls}`}
                initial={{ y: '110%', rotate: 2 }}
                animate={ready ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 1.3, ease, delay: 0.2 + i * 0.12 }}
                style={{ transformOrigin: '0% 100%' }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </motion.p>

      </motion.div>

      <div className="wrap on-world relative mt-10 md:mt-12">
        <div className="grid items-end gap-8 border-t border-fg/15 pt-6 lg:grid-cols-12 lg:gap-12">
        <motion.p {...enter(0.85)} className="max-w-md text-[15px] leading-relaxed text-fg/70 lg:col-span-5">
          I am Felix Abada, a software engineer and tech executive based in Accra, Ghana, bridging the gap between complex engineering and
          scalable business impact. Currently defining the future of urban mobility at{' '}
          <a href="https://www.goparkly.co" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg">
            goParkly.co
          </a>{' '}
          and reshaping football scouting through AI at{' '}
          <a href="https://scoutverse-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg">
            ScoutVerse.ai
          </a>
          .
        </motion.p>
        <motion.dl {...enter(0.95)} className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 lg:col-span-7">
        {[
          { k: 'Currently', a: 'CTO & Co-Founder, goParkly', b: 'Founder & CEO, ScoutVerse.ai' },
          { k: 'Based in', a: 'Accra, Ghana', b: 'GMT · working globally' },
          { k: 'Status', a: 'Open to strategic', b: 'opportunities', live: true },
        ].map((m) => (
          <div key={m.k} className={`group border-l border-fg/15 pl-4 transition-colors duration-500 hover:border-fg ${m.k === 'Currently' ? 'col-span-2 md:col-span-1' : ''}`}>
            <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {m.live && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
              )}
              {m.k}
            </dt>
            <dd className="mt-2 text-[14px] leading-snug">
              {m.a}
              <br />
              <span className="text-fg/60">{m.b}</span>
            </dd>
          </div>
        ))}
        </motion.dl>
        </div>
      </div>
    </section>
  );
}
