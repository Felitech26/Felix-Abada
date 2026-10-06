import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-+=*';

/**
 * Text that decodes from random glyphs into the real string, left to right.
 * Replays whenever `play` flips to true (on view, on hover, on open).
 */
export default function Scramble({ text, play = true, duration = 700, className = '' }: { text: string; play?: boolean; duration?: number; className?: string }) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!play) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed || ch === ' ') s += ch;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [play, text, duration]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
