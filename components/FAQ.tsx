import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, Rise } from './Panel';
import { faqs } from './seo';

const ease = [0.16, 1, 0.3, 1] as const;

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" data-scene={0.9} data-chapter="Questions" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <div className="grid gap-10 lg:grid-cols-12">
        <Heading label="Questions" className="lg:col-span-4">
          Good to <span className="text-fg/40">know.</span>
        </Heading>

        <Rise className="on-world lg:col-span-8">
          <ul className="border-t border-fg/15">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="border-b border-fg/15">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-titleFont text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug transition-transform duration-500 ease-expo group-hover:translate-x-1">
                          {f.q}
                        </span>
                      </span>
                      <span className="relative block h-3 w-3 shrink-0" aria-hidden="true">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg" />
                        <motion.span
                          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-fg"
                          animate={{ scaleY: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.4, ease }}
                        />
                      </span>
                    </button>
                  </h3>
                  {/* answers stay in the page for search engines; only their height animates */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-8 text-[15px] leading-relaxed text-fg/70 md:pl-9 md:text-base">{f.a}</p>
                    </motion.div>
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Rise>
      </div>
    </section>
  );
}
