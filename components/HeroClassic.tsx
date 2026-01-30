import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { profileImg } from '@/public/assets';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Props {
    isDarkMode: boolean;
}

export default function HeroClassic({ isDarkMode }: Props) {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (heroTextRef.current) {
                gsap.to(heroTextRef.current, {
                    yPercent: 40,
                    ease: 'none',
                    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
                });
            }

            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    y: -30,
                    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
                })
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">

            {/* 1. ORIGINAL GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
            />

            <div className="w-full px-6 lg:px-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* TEXT CONTENT (Updated with Executive Messaging) */}
                    <div ref={heroTextRef} className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <span className={`h-[1px] w-12 ${isDarkMode ? 'bg-white/40' : 'bg-black/40'}`} />
                            <span className="text-sm font-mono uppercase tracking-[0.3em] opacity-60">Tech Executive | CTO</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[1.1] tracking-tight font-titleFont"
                        >
                            Building the <br />
                            <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>digital infrastructure</span> <br />
                            for Africa's future.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mt-10 text-xl md:text-2xl max-w-2xl leading-relaxed opacity-80"
                        >
                            Visionary Technology Leader with African Roots and Global Reach.
                            Currently solving urban mobility challenges globally as CTO at <span className="font-bold border-b">goParkly</span>.
                        </motion.p>
                    </div>

                    {/* 2. ORIGINAL FUTURISTIC IMAGE COMPONENT (With new content in frame) */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <motion.div
                            ref={imageRef}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative w-full max-w-md aspect-[4/5] p-4 group"
                        >
                            {/* Rotating Borders */}
                            <motion.div
                                className={`absolute inset-0 border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className={`absolute inset-4 border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-current opacity-40" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-current opacity-40" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-current opacity-40" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-current opacity-40" />

                            {/* Main Image */}
                            <div className="relative h-full w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image src={profileImg} alt="Felix Abada" fill className="object-cover" />
                                <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'}`} />
                            </div>

                            {/* Floating Tech Label */}
                            <motion.div
                                className={`absolute -right-8 top-1/2 -translate-y-1/2 py-2 px-4 backdrop-blur-md border ${isDarkMode ? 'bg-black/80 border-white/20' : 'bg-white/80 border-black/20'}`}
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="font-mono text-xs uppercase tracking-widest">System Architect</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3. ORIGINAL SCROLL INDICATOR */}
            <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 hidden md:flex">
                <span className="text-[10px] font-mono uppercase rotate-90 origin-bottom translate-y-8">Scroll</span>
                <div className={`w-[1px] h-24 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
            </div>

        </section>
    );
}
