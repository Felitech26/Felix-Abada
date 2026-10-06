import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const wipe = [0.76, 0, 0.24, 1] as const;

const steps = [
  { at: 0, label: 'Loading interface' },
  { at: 40, label: 'Building the field' },
  { at: 80, label: 'Almost ready' },
  { at: 100, label: 'Welcome' },
];

function Line({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className={`block ${className}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Intro: the motto rises in solid ink while a large counter runs to 100 and a
 * status line names each step. Then the screen splits and parts. Waits for the
 * particle field to be ready so the reveal never shows an empty page.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('is-loading');
    window.lenis?.stop();

    let worldReady = !!(window as unknown as { __worldReady?: boolean }).__worldReady;
    let counted = false;
    const finish = () => {
      setShow(false);
      document.documentElement.classList.remove('is-loading');
      window.lenis?.start();
      window.scrollTo(0, 0);
    };
    const maybe = () => worldReady && counted && setTimeout(finish, 450);
    const onReady = () => {
      worldReady = true;
      maybe();
    };
    window.addEventListener('world:ready', onReady);
    const safety = setTimeout(onReady, 4000);
    const c = animate(0, 100, {
      duration: reduce ? 0.1 : 2.4,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        counted = true;
        maybe();
      },
    });
    return () => {
      c.stop();
      clearTimeout(safety);
      window.removeEventListener('world:ready', onReady);
      document.documentElement.classList.remove('is-loading');
    };
  }, []);

  const step = [...steps].reverse().find((s) => count >= s.at) ?? steps[0];

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div key="preloader" className="fixed inset-0 z-[10000]" exit={{ opacity: 1 }} transition={{ duration: 1.1 }}>
          <motion.div className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: 'rgb(var(--bg))' }} exit={{ y: '-100%' }} transition={{ duration: 1.1, ease: wipe }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: 'rgb(var(--bg))' }} exit={{ y: '100%' }} transition={{ duration: 1.1, ease: wipe }} />

          <motion.div className="absolute inset-0 flex flex-col justify-between px-gutter py-6 text-fg md:py-8" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
            {/* top bar */}
            <motion.div
              className="flex items-center justify-between border-b border-fg/15 pb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span>Felix Abada</span>
              <span className="text-fg/60">Accra, Ghana</span>
            </motion.div>

            {/* motto */}
            <div className="text-center">
              <h2 className="font-titleFont text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.02]">
                <Line delay={0.15}>Greatness is engineered,</Line>
                <Line delay={0.3} className="italic">
                  not given.
                </Line>
              </h2>
              <motion.p
                className="mt-6 font-mono text-[11px] uppercase tracking-[0.26em] text-fg/60"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Software Engineer · Tech Executive · CTO
              </motion.p>
            </div>

            {/* progress */}
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/50">Status</span>
                  <span className="relative block h-5 overflow-hidden font-mono text-[12px] uppercase tracking-[0.2em]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={step.label}
                        className="block"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.45, ease }}
                      >
                        {step.label}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
                <span className="font-titleFont text-[clamp(3rem,9vw,7rem)] leading-[0.8] tabular-nums">
                  {String(count).padStart(3, '0')}
                  <span className="ml-1 align-top font-mono text-[12px] tracking-normal text-fg/60">%</span>
                </span>
              </div>
              <div className="relative h-[2px] w-full bg-fg/10">
                <div className="absolute inset-y-0 left-0 bg-fg" style={{ width: `${count}%` }} />
                {[25, 50, 75].map((m) => (
                  <span key={m} className={`absolute top-1/2 h-2 w-px -translate-y-1/2 ${count >= m ? 'bg-fg' : 'bg-fg/30'}`} style={{ left: `${m}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
