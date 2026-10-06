import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/** One-tap light/dark switch for the header. Follows the system until the visitor chooses. */
export default function ThemeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains('dark'));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystem = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('theme');
      } catch {}
      if (saved !== 'light' && saved !== 'dark') root.classList.toggle('dark', mq.matches);
    };
    mq.addEventListener('change', onSystem);
    return () => {
      mo.disconnect();
      mq.removeEventListener('change', onSystem);
    };
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="group pointer-events-auto relative flex w-[42px] items-center justify-center border border-fg/20 bg-bg/60 backdrop-blur-md transition-colors duration-500 hover:border-fg"
    >
      <span className="relative block h-4 w-4 overflow-hidden rounded-full border border-fg">
        <motion.span
          className="absolute inset-y-0 left-0 w-1/2 bg-fg"
          animate={{ x: dark ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 border border-fg"
        initial={false}
        animate={{ opacity: [0, 0.6, 0], scale: [1, 1.25, 1.4] }}
        transition={{ duration: 0.7 }}
        key={String(dark)}
      />
    </button>
  );
}
