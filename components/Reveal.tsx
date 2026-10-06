import { ReactNode, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

/** Letters rise out of a mask, one after another. */
export function Letters({
  text,
  play,
  delay = 0,
  stagger = 0.045,
  className = '',
}: {
  text: string;
  play: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: '110%' }}
          animate={play ? { y: 0 } : { y: '110%' }}
          transition={{ duration: 1.1, ease, delay: delay + i * stagger }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** A block that slides up into place the first time it enters the viewport. */
export function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Lines of a heading rise out of masks when scrolled into view. */
export function MaskLines({ lines, className = '', lineClassName = '' }: { lines: ReactNode[]; className?: string; lineClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
