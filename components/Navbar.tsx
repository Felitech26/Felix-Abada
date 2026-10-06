import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { logo1, logo2 } from '@/public/assets';
import Scramble from './Scramble';
import ThemeToggle from './ThemeToggle';
import ThemeSwitch from './ThemeSwitch';
import { SoundToggle } from './Sound';
import { navLinks, socials, EMAIL } from './content';

const ease = [0.16, 1, 0.3, 1] as const;
const wipe = [0.76, 0, 0.24, 1] as const;

function useAccraTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Africa/Accra' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function MenuLink({ index, label, note, href, onClick, open }: { index: number; label: string; note: string; href: string; onClick: () => void; open: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <li className="overflow-hidden border-b border-fg/10">
      <motion.a
        href={href}
        onClick={onClick}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.9, ease, delay: 0.25 + index * 0.06 }}
        className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-2 md:py-3"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg/50">
          <Scramble text={String(index + 1).padStart(2, '0')} play={open} duration={500} />
        </span>
        <span className="relative block overflow-hidden">
          <span className="block font-titleFont text-[length:clamp(2.25rem,min(6vw,8vh),5rem)] leading-[1.05] transition-transform duration-700 ease-expo group-hover:translate-x-4 group-hover:italic">
            {label}
          </span>
        </span>
        <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.18em] text-fg/50 md:block">
          <Scramble text={note} play={hover} duration={450} />
        </span>
        <span
          aria-hidden="true"
          className="col-start-2 h-px origin-left scale-x-0 bg-fg transition-transform duration-700 ease-expo group-hover:scale-x-100"
        />
      </motion.a>
    </li>
  );
}

export default function Navbar({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const time = useAccraTime();

  useEffect(() => {
    if (open) window.lenis?.stop();
    else window.lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[80]"
      >
        <div className="flex items-start justify-between px-gutter py-5">
          <a href="#top" className={`pointer-events-auto flex items-center gap-3 transition-opacity duration-500 ${open ? 'opacity-0' : ''}`} aria-label="Felix Abada, back to top">
            <span className="relative block h-7 w-5">
              <Image src={logo2} alt="" fill className="object-contain dark:hidden" priority />
              <Image src={logo1} alt="" fill className="hidden object-contain dark:block" priority />
            </span>
          </a>

          <div className="flex items-stretch gap-2">
          {!open && <SoundToggle />}
          {!open && <ThemeSwitch />}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group pointer-events-auto relative flex items-center gap-4 border border-fg/20 bg-bg/60 py-2.5 pl-4 pr-3 backdrop-blur-md transition-colors duration-500 hover:border-fg"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.24em]">
              <Scramble text={open ? 'Close' : 'Menu'} play={hover || open} duration={400} />
            </span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <motion.span className="absolute left-0 top-0 h-px w-full bg-fg" animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.5, ease }} />
              <motion.span className="absolute bottom-0 right-0 h-px bg-fg" animate={open ? { y: -5, rotate: -45, width: '100%' } : { y: 0, rotate: 0, width: '60%' }} transition={{ duration: 0.5, ease }} />
            </span>
            {/* corner ticks */}
            <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-fg" aria-hidden="true" />
            <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-fg" aria-hidden="true" />
          </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain"
            style={{ backgroundColor: 'rgb(var(--bg))' }}
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.9, ease: wipe }}
          >
            {/* scan line sweeping down as the menu opens */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-px bg-fg/60"
              initial={{ top: '0%', opacity: 1 }}
              animate={{ top: '100%', opacity: 0 }}
              transition={{ duration: 1.1, ease: wipe }}
            />
            <div className="grid-lines !absolute" aria-hidden="true" />

            <div className="relative flex min-h-full flex-col px-gutter pb-6 pt-20 md:pt-24">
              <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <nav className="lg:col-span-8" aria-label="Sections">
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fg/50">
                    <Scramble text="Index / Navigate" play={open} />
                  </p>
                  <ul className="border-t border-fg/10">
                    {navLinks.map((l, i) => (
                      <MenuLink key={l.href} index={i} label={l.label} note={l.note} href={l.href} open={open} onClick={() => setOpen(false)} />
                    ))}
                  </ul>
                </nav>

                <motion.aside
                  className="grid content-center gap-7 border-t border-fg/10 pt-8 font-mono text-[11px] uppercase tracking-[0.18em] lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.45 }}
                >
                  <div className="grid gap-2">
                    <span className="text-fg/50">Status</span>
                    <span className="flex items-center gap-2 normal-case tracking-normal text-base font-body">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Open to strategic opportunities
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <span className="text-fg/50">Local time</span>
                      <span className="tabular-nums">Accra {time}</span>
                    </div>
                    <div className="grid gap-2">
                      <span className="text-fg/50">Position</span>
                      <span>5.60°N 0.19°W</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <span className="text-fg/50">Write</span>
                    <a href={`mailto:${EMAIL}`} className="link-line w-fit break-all font-body text-base normal-case tracking-normal">
                      {EMAIL}
                    </a>
                  </div>
                  <div className="grid gap-3">
                    <span className="text-fg/50">Elsewhere</span>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {socials.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="roll hover:text-fg">
                          <span>{s.label}</span>
                          <span aria-hidden="true">{s.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <span className="text-fg/50">Display</span>
                    <ThemeToggle />
                  </div>
                </motion.aside>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/50">
                <span>Felix Abada © {new Date().getFullYear()}</span>
                <span>
                  <Scramble text="Greatness is engineered, not given." play={open} duration={1100} />
                </span>
                <span>Esc to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
