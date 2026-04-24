import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { goparkly, scoutverse } from '@/public/assets';
import { HiArrowLongRight } from 'react-icons/hi2';

interface Props {
    isDarkMode: boolean;
}

interface Project {
    name: string;
    tag: string;
    period: string;
    image: StaticImageData;
    description: string;
    role: string;
    impact: string;
    impactLabel: string;
    link?: string;
    linkLabel?: string;
}

const projects: Project[] = [
    {
        name: 'goParkly',
        tag: 'PropTech',
        period: '2025 — Present',
        image: goparkly,
        description:
            'Revolutionizing urban mobility globally. A smart parking platform engineered to bridge the gap between drivers and spaces through real-time data, AI architecture and seamless payments.',
        role: 'CTO & Co-Founder',
        impact: '99.9% Uptime',
        impactLabel: 'Impact',
        link: 'https://www.goparkly.co',
        linkLabel: 'Visit Platform',
    },
    {
        name: 'ScoutVerse.ai',
        tag: 'SportsTech · AI',
        period: '2026 — Present',
        image: scoutverse,
        description:
            'A full football ecosystem powered by AI — connecting players, scouts, agents, and clubs on one intelligent platform. At its core, a dual-brain engine turns mobile video into physics-verified analytics and powers deep AI-driven search across every profile, metric, and moment. From discovery to decision, ScoutVerse reimagines how the beautiful game finds, evaluates, and celebrates its talent.',
        role: 'Founder, CEO & CTO',
        impact: 'Dual-Brain AI',
        impactLabel: 'Engine',
    },
];

export default function FeaturedProjectClean({ isDarkMode }: Props) {
    return (
        <section className="py-12 px-6 lg:px-32">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    className="mb-12 flex items-center justify-between"
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-40">Selected Work</span>
                </motion.div>

                <div className="space-y-28 lg:space-y-40">
                    {projects.map((project, index) => {
                        const imageFirst = index % 2 === 0;
                        return (
                            <div
                                key={project.name}
                                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{ duration: 0.8 }}
                                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 shadow-md shadow-black/5 dark:shadow-white/5 ${
                                        imageFirst ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                                    }`}
                                >
                                    <Image
                                        src={project.image}
                                        alt={`${project.name} Platform`}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 ${isDarkMode ? 'bg-black/20' : 'bg-black/5'}`} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className={`mb-10 lg:mb-0 ${imageFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-full ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>
                                            {project.tag}
                                        </span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">{project.period}</span>
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-bold font-titleFont mb-6">
                                        {project.name}
                                    </h2>

                                    <p className="text-base leading-relaxed font-light opacity-80 mb-8 max-w-md">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-8 text-sm font-mono opacity-50">
                                            <div>
                                                <span className="block text-[10px] uppercase tracking-widest mb-1">Role</span>
                                                {project.role}
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase tracking-widest mb-1">{project.impactLabel}</span>
                                                {project.impact}
                                            </div>
                                        </div>

                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-8 inline-flex items-center gap-3 text-sm font-medium border-b border-current pb-1 hover:opacity-60 transition-opacity w-fit"
                                            >
                                                {project.linkLabel ?? 'Visit Platform'} <HiArrowLongRight />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
