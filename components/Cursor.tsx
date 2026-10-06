import { useEffect, useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

/**
 * Blend-mode cursor. A small dot follows the pointer; over any element with
 * a `data-cursor` attribute it grows into a disc showing that label.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      setLabel(labelled?.dataset.cursor || null);
      setHoveringLink(!labelled && !!target?.closest('a, button, [role="button"]'));
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hoveringLink ? 44 : 10;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10001] mix-blend-difference"
      style={{ x, y }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black"
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.5 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
