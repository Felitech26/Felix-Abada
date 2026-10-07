import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Panel, { Heading, Words, Rise, ArrowUpRight } from './Panel';
import Magnetic from './Magnetic';
import useLocalClock from '@/hooks/useLocalClock';
import { EMAIL, PHONE_DISPLAY, WHATSAPP, socials, contactTopics } from './content';

const ease = [0.16, 1, 0.3, 1] as const;
const MAX = 1000;

/** Underlined input that sits inside the sentence. */
function Blank({ id, name, placeholder, type = 'text', required = false, width, autoComplete }: { id: string; name: string; placeholder: string; type?: string; required?: boolean; width: string; autoComplete?: string }) {
  return (
    <span className="relative inline-block max-w-full align-baseline" style={{ width }}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-label={placeholder}
        className="peer w-full border-0 border-b border-fg/30 bg-transparent px-1 pb-1 font-titleFont italic text-fg placeholder:text-fg/30 focus:outline-none"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-expo peer-focus:scale-x-100" aria-hidden="true" />
    </span>
  );
}

function Channel({ label, value, href, external = true }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="btn-sweep group flex items-center justify-between gap-4 border-b border-fg/10 px-1 py-4 transition-all duration-500 [--sweep:rgb(var(--fg))] hover:px-4 hover:text-bg"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">{label}</span>
        <span className="mt-1 block truncate text-base">{value}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 transition-transform duration-500 ease-expo group-hover:rotate-45">
        <ArrowUpRight />
      </span>
    </a>
  );
}

export default function Contact() {
  const { time, place } = useLocalClock();
  const [topic, setTopic] = useState(contactTopics[0]);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chars, setChars] = useState(0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const company = String(f.get('company') || '').trim();
    const from = String(f.get('email') || '').trim();
    const message = String(f.get('message') || '').trim();
    const subject = `${topic}: ${name}${company ? `, ${company}` : ''}`;
    const body = `Hi Felix,\n\n${message}\n\n${name}${company ? `\n${company}` : ''}\n${from}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the address is visible to select */
    }
  };

  const toTop = () => {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" data-scene={1} data-chapter="Contact" className="relative">
      <div className="wrap pb-16 pt-[clamp(4rem,10vw,8rem)]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Heading label="Over to you" className="lg:col-span-7">
            Let&apos;s build <span className="text-fg/40">the future.</span>
          </Heading>
          <Words
            className="on-world text-[15px] leading-relaxed text-fg/70 md:text-base lg:col-span-5"
            text="Open to collaboration, investment, and partnerships. Whether you're an investor, founder, or ecosystem builder, let's explore how technology can create lasting impact."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Panel depth={0.5} className="p-6 md:p-10 lg:col-span-8">
            <form onSubmit={submit} className="flex flex-col gap-10">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                <span>New message</span>
                <span className="normal-case tracking-[0.08em]">To: {EMAIL}</span>
              </div>

              <p className="font-titleFont text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.75]">
                Hi Felix, my name is <Blank id="contact-name" name="name" placeholder="your name" required autoComplete="name" width="11ch" /> from{' '}
                <Blank id="contact-company" name="company" placeholder="company" autoComplete="organization" width="10ch" />. I&apos;d like to talk about
              </p>

              <fieldset className="-mt-6">
                <legend className="sr-only">Topic</legend>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      aria-pressed={topic === t}
                      className={`relative border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                        topic === t ? 'border-fg text-bg' : 'border-fg/20 text-fg/75 hover:border-fg hover:text-fg'
                      }`}
                    >
                      {topic === t && <motion.span layoutId="topic-pill" className="absolute inset-0 bg-fg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <p className="font-titleFont text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.75]">
                You can reach me at <Blank id="contact-email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" width="15ch" />.
              </p>

              <label className="flex flex-col gap-3">
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  <span>A little more context</span>
                  <span className="tabular-nums">
                    {chars} / {MAX}
                  </span>
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  maxLength={MAX}
                  onChange={(e) => setChars(e.target.value.length)}
                  placeholder="What are you building, and where could I help?"
                  className="field resize-none"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-6 border-t border-fg/10 pt-6">
                <p className="max-w-xs text-sm leading-relaxed text-muted">Sending opens your email app with everything filled in, ready to go.</p>
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="btn-sweep group inline-flex items-center gap-4 bg-fg px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-bg [--sweep:rgb(var(--muted))]"
                  >
                    <span className="roll">
                      <span>Send message</span>
                      <span aria-hidden="true">Send message</span>
                    </span>
                    <span aria-hidden="true" className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Magnetic>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="border-l-2 border-fg pl-4 text-sm leading-relaxed"
                    role="status"
                  >
                    Your email app should now be open with the message ready. If nothing opened, write to {EMAIL} directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Panel>

          <Rise delay={0.15} className="on-world flex flex-col lg:col-span-4">
            <p className="eyebrow mb-2">Direct lines</p>
            <div className="border-t border-fg/10">
              <Channel label="Email" value={EMAIL} href={`mailto:${EMAIL}`} external={false} />
              <Channel label="WhatsApp" value={PHONE_DISPLAY} href={WHATSAPP} />
              <Channel label="LinkedIn" value="Felix Abada" href={socials[0].href} />
            </div>
            <button type="button" onClick={copy} className="mt-4 w-fit font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg">
              {copied ? 'Email copied ✓' : 'Copy email address'}
            </button>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-fg/10 pt-6 font-mono text-[11px] uppercase tracking-[0.18em]">
              <div className="grid gap-2">
                <span className="text-muted">Local time</span>
                <span className="tabular-nums">{place} {time}</span>
              </div>
              <div className="grid gap-2">
                <span className="text-muted">Status</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>
            </div>
          </Rise>
        </div>
      </div>

      <div className="wrap on-world">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-fg/15 py-7 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="text-fg/70">© {new Date().getFullYear()} Felix Abada</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="roll text-fg/80 hover:text-fg">
                  <span>{s.label}</span>
                  <span aria-hidden="true">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={toTop} className="group inline-flex items-center gap-2">
            <span className="roll">
              <span>Back to top</span>
              <span aria-hidden="true">Back to top</span>
            </span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
