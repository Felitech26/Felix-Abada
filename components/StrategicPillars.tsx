import { motion } from 'framer-motion';
import { TbChessKnight, TbWorldLatitude, TbDeviceDesktopAnalytics, TbUsersGroup, TbBulb } from 'react-icons/tb';

interface Props {
    isDarkMode: boolean;
}

const pillars = [
    {
        icon: TbChessKnight,
        title: "Strategic Leadership",
        desc: "Aligning technology with long-term business vision and operational excellence."
    },
    {
        icon: TbBulb,
        title: "Scalable Innovation",
        desc: "Designing systems that grow with users, markets, and opportunity."
    },
    {
        icon: TbWorldLatitude,
        title: "Global Perspective",
        desc: "Benchmarking international models and adapting them for local and regional relevance."
    },
    {
        icon: TbDeviceDesktopAnalytics,
        title: "Platform Thinking",
        desc: "Building digital infrastructure that empowers people, businesses, and ecosystems."
    },
    {
        icon: TbUsersGroup,
        title: "Mentorship & Culture",
        desc: "Leading with empathy, clarity, and a commitment to developing others."
    }
];

export default function StrategicPillars({ isDarkMode }: Props) {
    return (
        <section className="py-24 px-6 lg:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">Core Competencies</span>
                    <h2 className="text-4xl lg:text-6xl font-bold font-titleFont mt-4">Five Pillars of Impact</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-current opacity-100 border border-current border-opacity-10">
                    {pillars.map((pillar, i) => (
                        <div
                            key={i}
                            className={`relative group p-10 h-[320px] flex flex-col justify-between transition-colors duration-500
                ${isDarkMode ? 'bg-[#050505] hover:bg-[#0a0a0a]' : 'bg-[#fafafa] hover:bg-white'}
                border-r border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}
              `}
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-xs opacity-30">0{i + 1}</span>
                                <pillar.icon className={`text-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 font-titleFont group-hover:translate-x-1 transition-transform duration-300">
                                    {pillar.title}
                                </h3>
                                <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                                    {pillar.desc}
                                </p>
                            </div>

                            {/* Hover Line */}
                            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-current transition-all duration-500 group-hover:w-full`} />
                        </div>
                    ))}

                    {/* Filler / CTA Box */}
                    <div className={`relative p-10 h-[320px] flex items-center justify-center
             ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}
          `}>
                        <span className="font-titleFont italic opacity-50 text-center">
                            "Strategy is the art of sacrifice."
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
