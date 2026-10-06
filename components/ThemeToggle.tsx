import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'system';
const options: Theme[] = ['light', 'dark', 'system'];

function apply(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

/** Segmented Light / Dark / System switch. Remembers the choice. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {}
    const initial: Theme = saved === 'light' || saved === 'dark' ? saved : 'system';
    setTheme(initial);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let cur: string | null = null;
      try {
        cur = localStorage.getItem('theme');
      } catch {}
      if (cur !== 'light' && cur !== 'dark') apply('system');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
    apply(t);
  };

  return (
    <div className="relative inline-grid grid-cols-3 border border-fg/20" role="radiogroup" aria-label="Colour theme">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={theme === o}
          onClick={() => choose(o)}
          className={`relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
            theme === o ? 'text-bg' : 'text-fg/70 hover:text-fg'
          }`}
        >
          {theme === o && <motion.span layoutId="theme-pill" className="absolute inset-0 bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  );
}
