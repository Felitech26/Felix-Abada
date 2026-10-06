import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

/**
 * Generated sound, no audio files. A slow cinematic synth score (four warm
 * chords, a soft arpeggio, wide echo) that opens up as the page scrolls, plus
 * crisp interface sounds: a digital tick on hover, a soft thump on press, and
 * a rush when the menu opens or closes. Off by default; the visitor turns it on.
 */

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode; // pad brightness, opened by scrolling
  noise: AudioBuffer;
  space: GainNode; // send into the echo
}

interface SoundApi {
  on: boolean;
  toggle: () => void;
  play: (kind: 'tick' | 'click' | 'sweep') => void;
}

const SoundContext = createContext<SoundApi>({ on: false, toggle: () => {}, play: () => {} });
export const useSound = () => useContext(SoundContext);

const KEY = 'sound';
const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

// Am9 → Fmaj7 → Cmaj7 → Em7: slow, open, cinematic. MIDI note numbers.
const CHORDS = [
  [45, 57, 60, 64, 71],
  [41, 57, 60, 64, 69],
  [48, 55, 59, 64, 67],
  [40, 55, 59, 62, 67],
];
const BAR = 8; // seconds per chord

function build(): Engine {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -20;
  comp.ratio.value = 3;
  master.connect(comp).connect(ctx.destination);

  // wide ping-pong echo
  const space = ctx.createGain();
  const wet = ctx.createGain();
  wet.gain.value = 0.4;
  wet.connect(master);
  [
    [0.375, -0.7],
    [0.5, 0.7],
  ].forEach(([time, pan]) => {
    const d = ctx.createDelay(2);
    d.delayTime.value = time;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 2200;
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    space.connect(d);
    d.connect(tone).connect(fb).connect(d);
    tone.connect(p).connect(wet);
  });

  // pad bus: detuned saws through a warm low-pass that slowly breathes
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 650;
  filter.Q.value = 1.2;
  const padBus = ctx.createGain();
  padBus.gain.value = 0.028;
  filter.connect(padBus);
  padBus.connect(master);
  padBus.connect(space);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 220;
  lfo.connect(lfoDepth).connect(filter.frequency);
  lfo.start();

  // arpeggio bus
  const arpBus = ctx.createGain();
  arpBus.gain.value = 0.05;
  arpBus.connect(master);
  const arpSend = ctx.createGain();
  arpSend.gain.value = 0.7;
  arpBus.connect(arpSend).connect(space);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  // chord voices fade in and out across each bar, overlapping into the next
  const playChord = (notes: number[], at: number) => {
    notes.forEach((n, i) => {
      [-7, 7].forEach((detune) => {
        const o = ctx.createOscillator();
        o.type = i === 0 ? 'triangle' : 'sawtooth';
        o.frequency.value = hz(n);
        o.detune.value = detune;
        const g = ctx.createGain();
        const peak = i === 0 ? 0.9 : 0.45;
        g.gain.setValueAtTime(0, at);
        g.gain.linearRampToValueAtTime(peak, at + 2.5);
        g.gain.setValueAtTime(peak, at + BAR - 0.5);
        g.gain.linearRampToValueAtTime(0, at + BAR + 2.5);
        const p = ctx.createStereoPanner();
        p.pan.value = detune < 0 ? -0.35 : 0.35;
        o.connect(g).connect(p).connect(filter);
        o.start(at);
        o.stop(at + BAR + 2.6);
      });
    });
  };

  // a soft pluck walking up and down the chord, eighth notes at 80 bpm
  const pluck = (freq: number, at: number, level: number) => {
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.Q.value = 4;
    f.frequency.setValueAtTime(2400, at);
    f.frequency.exponentialRampToValueAtTime(300, at + 0.25);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(level, at + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.4);
    o.connect(f).connect(g).connect(arpBus);
    o.start(at);
    o.stop(at + 0.45);
  };

  const STEP = 0.375;
  const pattern = [1, 2, 3, 4, 3, 2, 1, 3];
  let bar = 0;
  let nextBar = ctx.currentTime + 0.2;
  const schedule = () => {
    // look ahead and queue whole bars before they are due
    while (nextBar < ctx.currentTime + 1) {
      const chord = CHORDS[bar % CHORDS.length];
      playChord(chord, nextBar);
      const steps = Math.floor(BAR / STEP);
      for (let s = 0; s < steps; s++) {
        // the arpeggio thins out every other bar so it never becomes busy
        if (bar % 2 === 1 && s % 2 === 1) continue;
        const note = chord[pattern[s % pattern.length]] + 12;
        pluck(hz(note), nextBar + s * STEP, s % 4 === 0 ? 0.9 : 0.55);
      }
      nextBar += BAR;
      bar++;
    }
  };
  schedule();
  window.setInterval(schedule, 500);

  return { ctx, master, filter, noise, space };
}

/** Crisp digital tick: a very short band of noise. */
function tick(e: Engine, level: number) {
  const { ctx, master, noise } = e;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = 4200 + Math.random() * 1600;
  f.Q.value = 6;
  const g = ctx.createGain();
  g.gain.setValueAtTime(level, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
  src.connect(f).connect(g).connect(master);
  src.start(t, Math.random());
  src.stop(t + 0.04);
}

/** Press: a low soft thump with a bright blip on top. */
function press(e: Engine) {
  const { ctx, master, space } = e;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(180, t);
  o.frequency.exponentialRampToValueAtTime(60, t + 0.12);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.16, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.18);

  const b = ctx.createOscillator();
  b.type = 'sine';
  b.frequency.value = hz(88);
  const bg = ctx.createGain();
  bg.gain.setValueAtTime(0.035, t + 0.01);
  bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  b.connect(bg);
  bg.connect(master);
  bg.connect(space);
  b.start(t + 0.01);
  b.stop(t + 0.2);
}

/** Menu: a filtered rush that rises on open and falls on close. */
function rush(e: Engine, opening: boolean) {
  const { ctx, master, noise, space } = e;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.Q.value = 6;
  f.frequency.setValueAtTime(opening ? 200 : 4000, t);
  f.frequency.exponentialRampToValueAtTime(opening ? 4000 : 200, t + 0.55);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
  src.connect(f).connect(g);
  g.connect(master);
  g.connect(space);
  src.start(t);
  src.stop(t + 0.7);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const engine = useRef<Engine | null>(null);
  const onRef = useRef(false);
  const menuOpen = useRef(false);

  const ensure = () => {
    if (!engine.current) engine.current = build();
    if (engine.current.ctx.state === 'suspended') engine.current.ctx.resume();
    return engine.current;
  };

  const fade = (to: number) => {
    const e = engine.current;
    if (!e) return;
    const t = e.ctx.currentTime;
    e.master.gain.cancelScheduledValues(t);
    e.master.gain.setValueAtTime(e.master.gain.value, t);
    e.master.gain.linearRampToValueAtTime(to, t + 0.8);
  };

  const set = useCallback((next: boolean) => {
    onRef.current = next;
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? 'on' : 'off');
    } catch {}
    if (next) {
      ensure();
      fade(1);
    } else fade(0);
  }, []);

  const toggle = useCallback(() => set(!onRef.current), [set]);

  const play = useCallback((kind: 'tick' | 'click' | 'sweep') => {
    if (!onRef.current || !engine.current) return;
    const e = engine.current;
    if (kind === 'tick') tick(e, 0.06);
    else if (kind === 'click') press(e);
    else {
      menuOpen.current = !menuOpen.current;
      rush(e, menuOpen.current);
    }
  }, []);

  // a returning visitor who left sound on hears it again after their first interaction
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved !== 'on') return;
    const resume = () => {
      set(true);
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };
    window.addEventListener('pointerdown', resume);
    window.addEventListener('keydown', resume);
    return () => {
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };
  }, [set]);

  // interface sounds for every link and button
  useEffect(() => {
    let last: Element | null = null;
    let lastTick = 0;
    const over = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element | null)?.closest('a, button, [role="button"]') ?? null;
      if (el && el !== last && performance.now() - lastTick > 60) {
        lastTick = performance.now();
        play('tick');
      }
      last = el;
    };
    const down = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest('a, button, [role="button"]');
      if (!el || el.hasAttribute('data-sound-toggle')) return;
      if (el.getAttribute('aria-controls') === 'site-menu') play('sweep');
      else play('click');
    };
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    return () => {
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
    };
  }, [play]);

  // the pad opens up as the page goes on: dark at the top, brighter by the contact form
  useEffect(() => {
    const onScroll = () => {
      const e = engine.current;
      if (!e || !onRef.current) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;
      e.filter.frequency.setTargetAtTime(520 + p * 900, e.ctx.currentTime, 0.4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // go quiet when the tab is hidden
  useEffect(() => {
    const onVis = () => {
      const e = engine.current;
      if (!e) return;
      if (document.hidden) e.ctx.suspend();
      else if (onRef.current) e.ctx.resume();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return <SoundContext.Provider value={{ on, toggle, play }}>{children}</SoundContext.Provider>;
}

/** Header button: a speaker with sound waves while on, crossed out when muted. */
export function SoundToggle() {
  const { on, toggle } = useSound();
  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Turn sound off' : 'Turn sound on'}
      title={on ? 'Sound on' : 'Sound off'}
      className="group pointer-events-auto relative flex w-[42px] items-center justify-center border border-fg/20 bg-bg/60 backdrop-blur-md transition-colors duration-500 hover:border-fg"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity={on ? 1 : 0} />
        {on ? (
          <>
            <path d="M15.5 9.2a4 4 0 0 1 0 5.6" className="origin-left animate-[wave_1.6s_ease-in-out_infinite]" />
            <path d="M18.2 6.6a7.6 7.6 0 0 1 0 10.8" className="origin-left animate-[wave_1.6s_0.25s_ease-in-out_infinite]" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  );
}
