import { motion } from 'framer-motion';

interface Props {
    isDarkMode: boolean;
}

export default function VisionContact({ isDarkMode }: Props) {
    return (
        <section className="py-32 px-6 lg:px-32 relative overflow-hidden">

            {/* Background Texture - subtle dots */}
            <div className="absolute inset-0 z-0 opacity-[0.05]"
                style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center">

                {/* Leadership Philosophy */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6 px-4 py-1 border border-current rounded-full"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-widest">Leadership Philosophy</span>
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-titleFont leading-relaxed italic opacity-80"
                    >
                        "Platforms are built not just with code, but with culture—where collaboration, trust, and long-term thinking drive sustainable innovation."
                    </motion.h3>
                </div>


                {/* Vision Statement - The "Musk" moment */}
                <div className="mb-40">
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-tight mb-8">
                        To lead the creation of <span className="opacity-40">transformative</span> technology platforms that empower people.
                    </h2>
                    <p className="text-lg opacity-60 max-w-2xl mx-auto">
                        Connecting Africa to global opportunity through engineering excellence, strategic clarity, and human-centered design.
                    </p>
                </div>

                {/* Executive Call to Action */}
                <div className={`p-12 md:p-20 border border-current border-opacity-10 bg-opacity-[0.02] ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
                    <h2 className="text-4xl md:text-6xl font-bold font-titleFont mb-8">Let's Build the Future</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-12 opacity-70">
                        Open to collaboration, investment, and partnerships. Whether you’re an investor, founder, or ecosystem builder, let's explore how technology can create lasting impact.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <a href="mailto:felitech26@outlook.com" className={`px-10 py-4 font-mono text-sm uppercase tracking-widest border border-current transition-all
                  ${isDarkMode
                                ? 'hover:bg-white hover:text-black'
                                : 'hover:bg-black hover:text-white'}
               `}>
                            Contact Executive Office
                        </a>
                        <a href="https://gh.linkedin.com/in/felix-abada-11707a1aa" className="font-mono text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
                            <span>LinkedIn Profile</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
