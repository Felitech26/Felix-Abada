import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Scramble from './Scramble';
import useLocalClock from '@/hooks/useLocalClock';

interface Chapter {
  label: string;
  top: number;
}

/**
 * The fixed instrument layer: column grid, corner marks, position and clock
 * bottom-left, the current chapter bottom-right, and a progress rail with a
 * tick for every chapter.
 */
export default function HUD({ ready }: { ready: boolean }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);
  const { time, place, zone } = useLocalClock(true);
  const { scrollYProgress } = useScroll();
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    let list: Chapter[] = [];
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      list = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]')).map((el) => ({
        label: el.dataset.chapter || '',
        top: Math.min(1, (el.getBoundingClientRect().top + window.scrollY) / max),
      }));
      setChapters(list);
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;
      setPct(Math.round(p * 100));
      const mid = window.scrollY + window.innerHeight * 0.45;
      let idx = 0;
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el, i) => {
        if (el.getBoundingClientRect().top + window.scrollY <= mid) idx = i;
      });
      setActive(idx);
    };
    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const current = chapters[active]?.label ?? '';

  return (
    <>
      <div className="grid-lines hidden md:block" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        {/* corner crosshairs */}
        {['left-3 top-3', 'right-3 top-3', 'left-3 bottom-3', 'right-3 bottom-3'].map((p) => (
          <span key={p} className={`absolute hidden h-3 w-3 md:block ${p}`}>
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-fg/50" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg/50" />
          </span>
        ))}

        {/* bottom-left: the visitor's clock */}
        <div className="absolute bottom-6 left-gutter hidden md:block">
          <span className="tabular-nums">{place} {time} {zone}</span>
        </div>

        {/* bottom-right: chapter readout */}
        <div className="absolute bottom-6 right-gutter hidden items-end gap-4 text-right md:flex">
          <div className="grid gap-1">
            <span className="text-fg">
              {String(active + 1).padStart(2, '0')} / {String(Math.max(chapters.length, 1)).padStart(2, '0')} —{' '}
              <Scramble key={current} text={current} play duration={500} />
            </span>
            <span className="tabular-nums text-fg/40">{String(pct).padStart(3, '0')}% scrolled</span>
          </div>
        </div>

        {/* right rail with chapter ticks */}
        <div className="absolute right-6 top-1/2 hidden h-[44vh] w-px -translate-y-1/2 bg-fg/15 lg:block">
          <motion.div className="absolute inset-x-0 top-0 h-full origin-top bg-fg" style={{ scaleY: rail }} />
          {chapters.map((c, i) => (
            <span
              key={c.label}
              className={`absolute -left-[3px] h-[7px] w-[7px] border border-fg transition-colors duration-500 ${i <= active ? 'bg-fg' : 'bg-bg'}`}
              style={{ top: `calc(${c.top * 100}% - 3px)` }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
