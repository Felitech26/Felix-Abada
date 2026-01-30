import { motion } from 'framer-motion';
import { TbBrandNextjs, TbBrandTypescript, TbBrandAws, TbBrandDocker, TbBrandReact } from 'react-icons/tb';
import { SiPostgresql, SiKubernetes, SiTailwindcss, SiNodedotjs } from "react-icons/si";

interface Props {
    isDarkMode: boolean;
}

export default function TechTicker({ isDarkMode }: Props) {
    const techs = [
        { name: 'Next.js', icon: TbBrandNextjs },
        { name: 'TypeScript', icon: TbBrandTypescript },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'AWS', icon: TbBrandAws },
        { name: 'Docker', icon: TbBrandDocker },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'React', icon: TbBrandReact },
        { name: 'Tailwind', icon: SiTailwindcss },
    ];

    return (
        <section className={`py-12 border-y ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
            <div className="px-6 lg:px-32">
                <div className="flex gap-12 overflow-hidden py-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    >
                        {[...techs, ...techs, ...techs].map((t, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <t.icon className="text-2xl" />
                                <span className="font-mono text-sm uppercase">{t.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
