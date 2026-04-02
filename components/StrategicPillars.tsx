import { motion } from 'framer-motion';
import { TbChessKnight, TbWorldLatitude, TbDeviceDesktopAnalytics, TbUsersGroup, TbBulb } from 'react-icons/tb';

interface Props {
    isDarkMode: boolean;
}

const pillars = [
    {
        icon: TbChessKnight,
        title: "Strategic Leadership",
        desc: "Aligning technology with long-term business vision and operational excellence.",
        accent: "from-amber-500/20 to-orange-500/20",
        accentBorder: "group-hover:border-amber-500/40",
        iconAccent: "group-hover:text-amber-500",
    },
    {
        icon: TbBulb,
        title: "Scalable Innovation",
        desc: "Designing systems that grow seamlessly with users, markets, and opportunity.",
        accent: "from-blue-500/20 to-cyan-500/20",
        accentBorder: "group-hover:border-blue-500/40",
        iconAccent: "group-hover:text-blue-500",
    },
    {
        icon: TbWorldLatitude,
        title: "Global Perspective",
        desc: "Benchmarking international models and adapting them for local and regional relevance.",
        accent: "from-emerald-500/20 to-teal-500/20",
        accentBorder: "group-hover:border-emerald-500/40",
        iconAccent: "group-hover:text-emerald-500",
    },
    {
        icon: TbDeviceDesktopAnalytics,
        title: "Platform Thinking",
        desc: "Building digital infrastructure that empowers people, businesses, and ecosystems.",
        accent: "from-violet-500/20 to-purple-500/20",
        accentBorder: "group-hover:border-violet-500/40",
        iconAccent: "group-hover:text-violet-500",
    },
    {
        icon: TbUsersGroup,
        title: "Mentorship & Culture",
        desc: "Leading with empathy, clarity, and a commitment to developing others.",
        accent: "from-rose-500/20 to-pink-500/20",
        accentBorder: "group-hover:border-rose-500/40",
        iconAccent: "group-hover:text-rose-500",
    }
];

export default function StrategicPillars({ isDarkMode }: Props) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="py-24 px-6 lg:px-32">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">Core Competencies</span>
                    <h2 className="text-4xl lg:text-6xl font-bold font-titleFont mt-4">Five Pillars of Impact</h2>
                </motion.div>

                {/* Top Row: 3 Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
                >
                    {pillars.slice(0, 3).map((pillar, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`group relative p-10 min-h-[300px] flex flex-col justify-between rounded-sm border transition-all duration-500
                                ${isDarkMode
                                    ? `bg-[#0a0a0a] border-white/[0.06] hover:border-white/20 ${pillar.accentBorder}`
                                    : `bg-white border-black/[0.06] hover:border-black/15 ${pillar.accentBorder}`
                                }
                            `}
                        >
                            {/* Subtle gradient glow on hover */}
                            <div className={`absolute inset-0 rounded-sm bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 flex justify-between items-start">
                                <span className={`font-mono text-xs ${isDarkMode ? 'text-white/20' : 'text-black/20'} group-hover:opacity-60 transition-opacity`}>0{i + 1}</span>
                                <pillar.icon className={`text-3xl opacity-30 group-hover:opacity-100 transition-all duration-500 ${pillar.iconAccent}`} />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 font-titleFont group-hover:translate-x-1 transition-transform duration-300">
                                    {pillar.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/40 group-hover:text-white/70' : 'text-black/40 group-hover:text-black/70'} transition-colors duration-500`}>
                                    {pillar.desc}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${pillar.accent.replace('/20', '/60')} group-hover:w-full transition-all duration-700 ease-out`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Row: 2 Centered Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                >
                    {pillars.slice(3, 5).map((pillar, i) => (
                        <motion.div
                            key={i + 3}
                            variants={itemVariants}
                            className={`group relative p-10 min-h-[300px] flex flex-col justify-between rounded-sm border transition-all duration-500
                                ${isDarkMode
                                    ? `bg-[#0a0a0a] border-white/[0.06] hover:border-white/20 ${pillar.accentBorder}`
                                    : `bg-white border-black/[0.06] hover:border-black/15 ${pillar.accentBorder}`
                                }
                            `}
                        >
                            {/* Subtle gradient glow on hover */}
                            <div className={`absolute inset-0 rounded-sm bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 flex justify-between items-start">
                                <span className={`font-mono text-xs ${isDarkMode ? 'text-white/20' : 'text-black/20'} group-hover:opacity-60 transition-opacity`}>0{i + 4}</span>
                                <pillar.icon className={`text-3xl opacity-30 group-hover:opacity-100 transition-all duration-500 ${pillar.iconAccent}`} />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 font-titleFont group-hover:translate-x-1 transition-transform duration-300">
                                    {pillar.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-white/40 group-hover:text-white/70' : 'text-black/40 group-hover:text-black/70'} transition-colors duration-500`}>
                                    {pillar.desc}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${pillar.accent.replace('/20', '/60')} group-hover:w-full transition-all duration-700 ease-out`} />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
