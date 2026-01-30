import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { goparkly } from '@/public/assets';
import { HiArrowUpRight } from 'react-icons/hi2';

interface Props {
    isDarkMode: boolean;
}

export default function FeaturedProject({ isDarkMode }: Props) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const yContent = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-32 bg-current relative overflow-hidden">
            {/* Background Inverse */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />

            <div className="relative px-6 lg:px-32 max-w-8xl mx-auto z-10 w-full">

                {/* Header */}
                <div className={`flex justify-between items-end mb-20 ${isDarkMode ? 'text-black' : 'text-white'}`}>
                    <div>
                        <span className="block font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-70">
                            Signature Project
                        </span>
                        <h2 className="text-[clamp(3rem,6vw,7rem)] font-bold font-titleFont leading-none">
                            goParkly
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="font-mono text-xs uppercase tracking-widest opacity-70 mb-2">Role</p>
                        <p className="text-xl font-bold">CTO & Co-Founder</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-current border-opacity-20">

                    {/* Image Section */}
                    <div className="lg:col-span-8 relative h-[60vh] lg:h-[80vh] overflow-hidden border-r border-current border-opacity-10">
                        <motion.div style={{ scale: imgScale }} className="relative w-full h-full">
                            <Image
                                src={goparkly}
                                alt="goParkly Interface"
                                fill
                                className="object-cover"
                            />
                            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/10' : 'bg-white/10'}`} />
                        </motion.div>
                    </div>

                    {/* Details Section */}
                    <div className={`lg:col-span-4 p-10 flex flex-col justify-between
                   ${isDarkMode ? 'bg-[#f0f0f0] text-black' : 'bg-[#111] text-white'}
                `}>
                        <div className="space-y-12">
                            <div>
                                <h3 className="font-bold text-2xl mb-4">The Challenge</h3>
                                <p className="opacity-70 text-sm leading-relaxed">
                                    Urban mobility in Africa is fragmented. We needed a system capable of handling thousands of concurrent reservations while bridging the gap between low-tech parking lots and high-tech users.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-2xl mb-4">The Impact</h3>
                                <ul className="space-y-3 text-sm opacity-70 font-mono">
                                    <li className="flex justify-between border-b border-current border-opacity-20 pb-2">
                                        <span>Uptime</span>
                                        <span>99.99%</span>
                                    </li>
                                    <li className="flex justify-between border-b border-current border-opacity-20 pb-2">
                                        <span>Transactions</span>
                                        <span>50k+ processed</span>
                                    </li>
                                    <li className="flex justify-between border-b border-current border-opacity-20 pb-2">
                                        <span>Coverage</span>
                                        <span>Pan-African</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <a href="https://www.goparkly.co" target="_blank" className="group mt-12 inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                            View Live Platform
                            <div className="bg-current text-white dark:text-black w-8 h-8 rounded-full flex items-center justify-center group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                                <HiArrowUpRight className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
