import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Scramble from './Scramble';

/** A pause between chapters while the field changes form: a coded label and one line. */
export default function Interlude({ text, scene, code }: { text: string; scene: number; code: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-35% 0px -35% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.55, 0.75], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const line = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  return (
    <section ref={ref} data-scene={scene} className="relative flex h-[70vh] items-center justify-center px-gutter md:h-[100vh]" aria-label={text}>
      <motion.div style={{ opacity, y }} className="on-world flex flex-col items-center gap-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg/60">
          <Scramble text={code} play={inView} duration={600} />
        </span>
        <motion.span className="block h-px w-24 origin-center bg-fg" style={{ scaleX: line }} />
        <p className="font-titleFont text-[clamp(2.2rem,5.5vw,4.5rem)] italic">{text}</p>
      </motion.div>
    </section>
  );
}
