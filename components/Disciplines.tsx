import { motion } from 'framer-motion';
import Panel, { Heading, Check, Words } from './Panel';
import { disciplines, IconName } from './content';

/** Small constellation-style marks drawn in champagne dots and lines. */
function Icon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' as const };
  return (
    <motion.svg
      viewBox="0 0 32 32"
      className="h-8 w-8 text-fg"
      whileHover={{ rotate: 18, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      aria-hidden="true"
    >
      {name === 'compass' && (
        <>
          <circle cx="16" cy="16" r="11" {...common} strokeDasharray="1 3.2" />
          <path d="M16 7l3 9-3 9-3-9z" {...common} />
          <circle cx="16" cy="16" r="1.6" fill="currentColor" />
        </>
      )}
      {name === 'layers' && (
        <>
          <path d="M16 6l10 5-10 5-10-5z" {...common} />
          <path d="M6 16l10 5 10-5" {...common} strokeDasharray="1 3" />
          <path d="M6 21l10 5 10-5" {...common} strokeDasharray="1 3" />
        </>
      )}
      {name === 'spark' && (
        <>
          <path d="M16 5c.6 6 4.9 10.4 11 11-6.1.6-10.4 5-11 11-.6-6-4.9-10.4-11-11 6.1-.6 10.4-5 11-11z" {...common} />
          <circle cx="25" cy="7" r="1.2" fill="currentColor" />
          <circle cx="7" cy="25" r="1" fill="currentColor" />
        </>
      )}
    </motion.svg>
  );
}

export default function Disciplines() {
  return (
    <section data-scene={0.22} data-chapter="Expertise" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <Heading label="What I do">
        Three disciplines, <span className="text-fg/40">led properly.</span>
      </Heading>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {disciplines.map((d, i) => (
          <Panel key={d.title} delay={i * 0.12} depth={0.6 + i * 0.35} className="group flex flex-col gap-6 p-7">
            <div className="flex items-center gap-4">
              <Icon name={d.icon} />
              <h3 className="font-titleFont text-2xl italic">{d.title}</h3>
            </div>
            <Words className="text-base text-fg" text={d.line} delay={0.3 + i * 0.1} />
            <ul className="flex flex-col gap-3 border-t border-fg/10 pt-5">
              {d.points.map((p, j) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.1 + j * 0.07 }}
                  className="flex gap-3 text-[15px] leading-snug text-fg/70 transition-[color,transform] duration-300 hover:translate-x-1 hover:text-fg"
                >
                  <Check />
                  {p}
                </motion.li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </section>
  );
}
