import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowLongDown } from 'react-icons/hi2';

interface HeroProps {
    isDarkMode: boolean;
}

export default function HeroManifesto({ isDarkMode }: HeroProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col justify-center px-6 lg:px-32 overflow-hidden">

            {/* Background Architectural Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className={`absolute left-6 lg:left-32 top-0 bottom-0 w-px ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                <div className={`absolute right-6 lg:right-32 top-0 bottom-0 w-px ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                <div className={`absolute top-1/2 left-0 right-0 h-px ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Role & Label */}
                <div className="flex items-center gap-4 mb-8 overflow-hidden">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-px w-12 ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    />
                    <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-mono text-xs uppercase tracking-[0.3em] font-medium"
                    >
                        Tech Executive | CTO | Co-Founder
                    </motion.span>
                </div>

                {/* Main Title - Massive */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(3.5rem,9vw,11rem)] font-bold leading-[0.9] -ml-[0.05em] tracking-tighter font-titleFont"
                    >
                        FELIX ABADA
                    </motion.h1>
                </div>

                {/* Subtitle / Vision */}
                <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-1 hidden lg:block">
                        {/* Structural spacer */}
                    </div>
                    <div className="lg:col-span-7">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl md:text-3xl font-light leading-snug"
                        >
                            Visionary Technology Leader with <span className={isDarkMode ? 'text-white font-normal' : 'text-black font-normal'}>African Roots</span> and <span className={isDarkMode ? 'text-white font-normal' : 'text-black font-normal'}>Global Reach</span>.
                        </motion.p>
                    </div>
                    <div className="lg:col-span-4 flex items-end justify-end lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex items-center gap-4 animate-bounce"
                        >
                            <div className={`w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-50`}>
                                <HiArrowLongDown />
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Explore Vision</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
