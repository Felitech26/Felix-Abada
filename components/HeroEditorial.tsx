import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { profileImg } from '@/public/assets';

interface Props {
    isDarkMode: boolean;
}

export default function HeroEditorial({ isDarkMode }: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 3D Rotation transforms
    const rotateX = useTransform(y, [-100, 100], [10, -10]); // Reduced rotation for elegance
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    // Gloss/Sheen effect movement
    const sheenX = useTransform(x, [-100, 100], [-20, 20]);
    const sheenY = useTransform(y, [-100, 100], [-20, 20]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        x.set(mouseX);
        y.set(mouseY);
    }

    return (
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-32 bg-transparent relative overflow-hidden flex items-center justify-center">

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3"
                    >
                        <div className={`h-px w-8 ${isDarkMode ? 'bg-white/60' : 'bg-black/60'}`} />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-80">Software Engineer | Tech Executive | CTO at <a href="https://goparkly.co" target="_blank">goParkly.co</a></span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-bold font-titleFont leading-[1.1]"
                    >
                        Engineering solutions <br />
                        <span className="italic font-serif font-light opacity-80">that transform ideas</span> <br />
                        into impact.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-md font-light leading-relaxed opacity-70 max-w-xl"
                    >
                        I am Felix Abada. A Tech Executive and Strategic Leader based in Ghana, bridging the gap between complex engineering and scalable business impact. Currently defining the future of urban mobility at <span className="font-medium border-b border-current"><a href="https://goparkly.co" target="_blank">goParkly.co</a></span>
                    </motion.p>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex items-center gap-4 flex-wrap"
                    >
                        <span className="text-sm opacity-60">Lets connect</span>
                        <div className="flex items-center gap-4">
                            {/* LinkedIn */}
                            <a href="https://gh.linkedin.com/in/felix-abada-11707a1aa" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/felix.abada.52/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/nii.devs/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="https://wa.me/233508591078" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Let's Talk Button */}
                    <motion.a
                        href="tel:+233508591078"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={`group relative inline-flex items-center gap-2 px-6 py-3 border overflow-hidden transition-all duration-500 ${isDarkMode
                            ? 'border-white/50 text-white hover:text-black'
                            : 'border-black/50 text-black hover:text-white'
                            }`}
                    >
                        {/* Sliding background fill */}
                        <div
                            className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out ${isDarkMode ? 'bg-white' : 'bg-black'
                                }`}
                        />

                        {/* Button content */}
                        <span className="relative z-10 font-medium transition-colors duration-500">
                            Let&apos;s talk
                        </span>
                    </motion.a>
                </div>

                {/* Futuristic 3D Hover/Tilt Design */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center perspective-[2000px]"
                >
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => { x.set(0); y.set(0); }}
                        className="relative group w-full max-w-sm aspect-[2/3] cursor-none"
                    >


                        {/* Corner Brackets (Floating) */}
                        <div className="absolute inset-0 pointer-events-none z-30" style={{ transform: "translateZ(30px)" }}>
                            <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-current opacity-60" />
                            <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-current opacity-60" />
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-current opacity-60" />
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-current opacity-60" />
                        </div>

                        {/* Image Container with depth */}
                        <div className="relative w-full h-full overflow-hidden shadow-2xl bg-black/5" style={{ transform: "translateZ(0px)" }}>
                            <Image
                                src={profileImg}
                                alt="Felix Abada"
                                fill
                                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                priority
                                quality={100}
                                sizes="(max-width: 738px) 100vw, (max-width: 1024px) 50vw, 600px"
                            />

                            {/* Subtle tint overlay on hover */}
                            <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-20 ${isDarkMode ? 'bg-blue-500' : 'bg-black'}`} />
                        </div>

                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
