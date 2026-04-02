import { motion } from 'framer-motion';

interface Props {
    isDarkMode: boolean;
}

export default function VisionContact({ isDarkMode }: Props) {
    return (
        <section className="py-24 md:py-32 px-6 lg:px-24 relative overflow-hidden">

            {/* Background Texture - subtle dots */}
            <div className="absolute inset-0 z-0 opacity-[0.05]"
                style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Leadership Philosophy */}
                <div className="mb-32 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        className="inline-block mb-5"
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">Leadership Philosophy</span>
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-4xl font-light leading-relaxed opacity-90"
                    >
                        <span className="font-titleFont italic">&ldquo;Platforms are built not just with code, but with culture—</span>
                        <span className="opacity-60">where collaboration, trust, and long-term thinking drive sustainable innovation.&rdquo;</span>
                    </motion.h3>
                </div>


                {/* Vision Statement - Split Layout */}
                <div className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end border-t border-current border-opacity-10 pt-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 md:mb-0">
                            To lead the creation of <span className="font-titleFont italic opacity-50">transformative</span> technology platforms.
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xl font-light opacity-60 leading-relaxed max-w-md ml-auto">
                            Connecting Africa to global opportunity through engineering excellence, strategic clarity, and human-centered design.
                        </p>
                    </motion.div>
                </div>

                {/* Executive Call to Action - Split Layout */}
                <div className="border-t border-current border-opacity-10 pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-light font-titleFont mb-6">Let&apos;s Build<br />the Future</h2>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex flex-col justify-between h-full"
                        >
                            <p className="text-lg font-light opacity-60 leading-relaxed mb-12 max-w-lg">
                                Open to collaboration, investment, and partnerships. Whether you&apos;re an investor, founder, or ecosystem builder, let&apos;s explore how technology can create lasting impact.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                                <a href="mailto:felitech26@outlook.com" className={`group relative px-8 py-3 font-mono text-xs uppercase tracking-widest border border-current transition-all
                                    ${isDarkMode
                                        ? 'hover:bg-white hover:text-black'
                                        : 'hover:bg-black hover:text-white'}
                                `}>
                                    <span className="relative z-10">Contact Executive Office</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
