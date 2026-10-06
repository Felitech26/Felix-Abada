import { ReactNode, useRef } from 'react';
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Scramble from './Scramble';
import { spotlightMove } from './Interactions';
import useMediaQuery from '@/hooks/useMediaQuery';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Glass panel that is never static: it rises and unblurs on first view, then
 * keeps moving with the scroll (depth parallax, a 3D tilt-in and settle) and
 * leans toward the cursor. `depth` sets how far it drifts.
 */
export default function Panel({
  children,
  className = '',
  delay = 0,
  depth = 1,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  depth?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const wide = useMediaQuery('(min-width: 960px)');
  const travel = (wide ? 70 : 24) * depth;

  const y = useTransform(sp, [0, 1], [travel, -travel]);
  const scrollTilt = useTransform(sp, [0, 0.4, 0.6, 1], wide ? [14, 0, 0, -8] : [6, 0, 0, -3]);
  const scale = useTransform(sp, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.96]);

  // pointer lean
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const leanX = useSpring(py, { stiffness: 140, damping: 18 });
  const leanY = useSpring(px, { stiffness: 140, damping: 18 });
  const rotateX = useTransform([scrollTilt, leanX], ([a, b]) => (a as number) + (b as number));

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (glow) spotlightMove(e);
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    py.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
  };

  // grid placement and outer spacing belong on the moving wrapper, everything else on the panel
  const outer = className
    .split(/\s+/)
    .filter((c) => /^(?:[a-z]+:)*(?:col-|order-|row-|mt-|mb-|self-)/.test(c))
    .join(' ');
  const inner = className
    .split(/\s+/)
    .filter((c) => c && !/^(?:[a-z]+:)*(?:col-|order-|row-|mt-|mb-|self-)/.test(c))
    .join(' ');

  return (
    <motion.div style={{ y, perspective: 1200 }} className={outer}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX, rotateY: leanY, scale, transformOrigin: '50% 100%' }}
        initial={{ opacity: 0, filter: 'blur(12px)', clipPath: 'inset(18% 0% 0% 0%)' }}
        animate={inView ? { opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.2, ease, delay }}
        className={`panel h-full ${glow ? 'spotlight' : ''} ${inner}`}
      >
        <span className="tick tl" aria-hidden="true" />
        <span className="tick tr" aria-hidden="true" />
        <span className="tick bl" aria-hidden="true" />
        <span className="tick br" aria-hidden="true" />
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Section heading: the label decodes, then the italic line rises out of a mask. */
export function Heading({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wide = useMediaQuery('(min-width: 960px)');
  const x = useTransform(scrollYProgress, [0, 1], wide ? [-30, 30] : [0, 0]);
  return (
    <div ref={ref} className={`on-world ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <motion.span className="block h-px w-8 origin-left bg-fg" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, ease }} />
        <Scramble text={label} play={inView} duration={650} />
      </p>
      <motion.h2 style={{ x }} className="mt-5 overflow-hidden pb-[0.12em] font-titleFont text-[clamp(2.4rem,5.4vw,4.75rem)] italic leading-[1.02]">
        <motion.span
          className="block"
          initial={{ y: '105%', rotate: 2 }}
          animate={inView ? { y: 0, rotate: 0 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          style={{ transformOrigin: '0% 100%' }}
        >
          {children}
        </motion.span>
      </motion.h2>
    </div>
  );
}

/** Paragraph whose words rise into place, one after another, when scrolled into view. */
export function Words({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + Math.min(i * 0.018, 0.9) }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

/** Generic block reveal: slides up and unblurs on view. */
export function Rise({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3em] h-3.5 w-3.5 shrink-0 text-fg" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
