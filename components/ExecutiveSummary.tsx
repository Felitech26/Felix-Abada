import { motion } from 'framer-motion';

interface Props {
    isDarkMode: boolean;
}

export default function ExecutiveSummary({ isDarkMode }: Props) {
    return (
        <section className="py-24 lg:py-40 px-6 lg:px-32 relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Left: The "Hook" */}
                    <div className="sticky top-32 self-start">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-5xl font-bold font-titleFont mb-8 leading-tight"
                        >
                            Executive Summary
                        </motion.h2>
                        <div className={`h-px w-24 ${isDarkMode ? 'bg-white/30' : 'bg-black/30'}`} />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-12 font-mono text-xs leading-relaxed opacity-60 max-w-xs"
                        >
                            MISSION STATEMENT: <br />
                            To build resilient systems that empower people, businesses and simplify lives through engineering excellence.
                        </motion.div>
                    </div>

                    {/* Right: The Narrative */}
                    <div className="space-y-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-xl leading-relaxed opacity-90"
                        >
                            <span className="font-bold text-2xl md:text-3xl block mb-6">Building ecosystems, not just platforms.</span>

                            Felix Abada is a visionary Tech Executive and CTO with a mission to build scalable, resilient, and impactful platforms that empower communities and businesses across Africa and beyond. With a leadership style rooted in clarity, innovation, and mentorship, Felix bridges local ingenuity with global standards—transforming ideas into systems that endure, inspire, and scale.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl leading-relaxed opacity-80"
                        >
                            He is not just a builder of technology, but a shaper of ecosystems, committed to unlocking opportunity through engineering excellence and strategic foresight.
                        </motion.p>

                        {/* Signature / Accent */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            className={`pt-12 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
                        >
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="font-titleFont italic text-2xl">Felix Abada</p>
                                    <p className="font-mono text-[10px] uppercase tracking-widest mt-2 opacity-50">Chief Technology Officer</p>
                                </div>
                                {/* Abstract shape or logo element could go here */}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
