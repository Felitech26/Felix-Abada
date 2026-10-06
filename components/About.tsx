import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { felixPortrait } from '@/public/assets';
import Panel, { Heading, Words } from './Panel';
import { Tilt, CountUp } from './Interactions';
import { credentials } from './content';

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imgRef, { once: true, margin: '0px 0px -15% 0px' });
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="about" data-scene={0.14} data-chapter="About" className="wrap py-[clamp(4rem,10vw,8rem)]">
      <Heading label="Who I am">
        Building ecosystems, <span className="text-fg/40">not just platforms.</span>
      </Heading>

      <Panel className="mt-12 grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
        <div ref={imgRef} className="lg:col-span-5">
          <Tilt className="group aspect-[4/5] w-full" max={7}>
            <motion.div
              className="relative h-full w-full overflow-hidden bg-tint"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              data-cursor="Hello"
            >
              <motion.div className="absolute inset-[-8%]" style={{ y: imgY }}>
                <Image src={felixPortrait} alt="Portrait of Felix Abada" fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover object-top" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to strategic opportunities
              </div>
            </motion.div>
          </Tilt>
        </div>

        <div className="flex flex-col justify-between gap-10 lg:col-span-7">
          <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-fg/70 md:text-base">
            <Words
              className="font-titleFont text-[clamp(1.5rem,2.4vw,2rem)] italic leading-snug text-fg"
              text="“My mission is simple: to build resilient systems that empower people, businesses and simplify lives through engineering excellence.”"
            />
            <Words
              delay={0.2}
              text="Felix Abada is a visionary Tech Executive and CTO with a mission to build scalable, resilient, and impactful platforms that empower communities and businesses across Africa and beyond. With a leadership style rooted in clarity, innovation, and mentorship, Felix bridges local ingenuity with global standards, transforming ideas into systems that endure, inspire, and scale."
            />
            <Words
              delay={0.3}
              text="Rooted in Africa but operating with a global perspective, I focus on diagnosing complex systemic issues and architecting solutions that drive long-term value. Technology, to me, is not just about lines of code. It’s about creating ecosystems where innovation can thrive."
            />
          </div>

          <dl className="grid grid-cols-3 border-t border-fg/15">
            {credentials.map((c, i) => (
              <div key={c.label} className={`group flex flex-col gap-2 pt-6 ${i ? 'border-l border-fg/15 pl-4 md:pl-6' : ''}`}>
                <dd className="font-titleFont text-[clamp(1.6rem,3vw,2.6rem)] italic leading-none transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                  <CountUp value={c.value} />
                </dd>
                <dt className="font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-muted">{c.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Panel>
    </section>
  );
}
