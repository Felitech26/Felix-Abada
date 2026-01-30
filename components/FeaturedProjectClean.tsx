import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { goparkly } from '@/public/assets';
import { HiArrowLongRight } from 'react-icons/hi2';

interface Props {
    isDarkMode: boolean;
}

export default function FeaturedProjectClean({ isDarkMode }: Props) {
    return (
        <section className="py-12 px-6 lg:px-32">
            <div className="max-w-7xl mx-auto">

                {/* Subtle Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex items-center justify-between"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-40">Selected Work</span>
                </motion.div>

                {/* Project Card */}
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 shadow-2xl shadow-black/5 dark:shadow-white/5 order-2 lg:order-1"
                    >
                        <Image
                            src={goparkly}
                            alt="goParkly Platform"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${isDarkMode ? 'bg-black/20' : 'bg-black/5'}`} />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2 mb-10 lg:mb-0"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-full
                            ${isDarkMode ? 'border-white/20' : 'border-black/20'}
                        `}>
                                PropTech
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">2023 — Present</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold font-titleFont mb-6">
                            goParkly
                        </h2>

                        <p className="text-base leading-relaxed font-light opacity-80 mb-8 max-w-md">
                            Revolutionizing urban mobility globally. A smart parking platform engineered to bridge the gap between drivers and spaces through real-time data, Ai architecture and seamless payments.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-8 text-sm font-mono opacity-50">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest mb-1">Role</span>
                                    CTO & Co-Founder
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest mb-1">Impact</span>
                                    99.9% Uptime
                                </div>
                            </div>

                            <a href="https://www.goparkly.co" target="_blank" className="mt-8 inline-flex items-center gap-3 text-sm font-medium border-b border-current pb-1 hover:opacity-60 transition-opacity w-fit">
                                Visit Platform <HiArrowLongRight />
                            </a>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
