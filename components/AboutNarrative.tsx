import { motion } from 'framer-motion';

interface Props {
    isDarkMode: boolean;
}

export default function AboutNarrative({ isDarkMode }: Props) {
    return (
        <section className="py-12 px-6 lg:px-32 relative">
            <div className="max-w-4xl mx-auto space-y-12">

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-light leading-relaxed"
                >
                    <span className="font-titleFont font-bold italic opacity-40 pr-4">&ldquo;</span>
                    My mission is simple: To build resilient systems that empower people, businesses and simplify lives through engineering excellence.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-light text-md leading-relaxed opacity-80">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="mb-6">
                            Rooted in Africa but operating with a global perspective, I focus on diagnosing complex systemic issues and architecting solutions that drive long-term value. Technology, to me, is not just about lines of code—it’s about creating ecosystems where innovation can thrive.
                        </p>
                        <p>
                            In my role as Co-Founder and CTO, I&apos;ve learned that engineering excellence goes beyond technical mastery—it&apos;s about empowering teams, fostering collaboration, and staying committed to delivering meaningful solutions with precision.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="mb-6">
                            My work is guided by three core principles:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="font-mono text-xs mt-1 opacity-50">01</span>
                                <span><strong>Scalable Innovation:</strong> Designing platforms that grow seamlessly with market demands and business needs.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-mono text-xs mt-1 opacity-50">02</span>
                                <span><strong>Platform Thinking:</strong> Building technical foundations that enables ideas to become sustainable products.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-mono text-xs mt-1 opacity-50">03</span>
                                <span><strong>Human-Centric Design:</strong> Prioritizing the real-world impact on the end user above all else.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
