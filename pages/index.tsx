/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import { profileImg, bev, united, logo1, logo2, goparkly } from "@/public/assets";
import { TbBrandGithub } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io5";
import FuturisticCursor from '@/components/FuturisticCursor';
import Navbar from '@/components/Navbar';

// Professional Project Card Component with Subtle Images
function ProjectCard({ href, title, description, category, image, tags, features, metrics, isDarkMode, index }: {
  href: string;
  title: string;
  description: string;
  category: string;
  image: any;
  tags: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  isDarkMode: boolean;
  index: number;
}) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={`group relative p-8 md:p-10 border transition-all duration-500 ${
          isDarkMode
            ? 'border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04]'
            : 'border-black/10 hover:border-black/30 bg-black/[0.01] hover:bg-black/[0.02]'
        }`}
        style={{ y }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute top-0 left-0 w-full h-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
          <div className={`absolute top-0 left-0 h-full w-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute bottom-0 right-0 w-full h-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
          <div className={`absolute bottom-0 right-0 h-full w-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Image */}
            <motion.div
              className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden border"
              style={{
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className={`absolute inset-0 ${
                isDarkMode ? 'bg-black/20' : 'bg-white/10'
              }`} />
            </motion.div>
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-mono ${
                  isDarkMode ? 'text-white/40' : 'text-black/40'
                }`}>
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className={`text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 border ${
                  isDarkMode ? 'border-white/20 text-white/60' : 'border-black/20 text-black/60'
                }`}>
                  {category}
                </span>
              </div>
              <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold font-titleFont mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {title}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed ${
                isDarkMode ? 'text-white/70' : 'text-black/70'
              }`}>
                {description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                isDarkMode ? 'text-white/40' : 'text-black/40'
              }`}>
                Key Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                      isDarkMode ? 'bg-white/60' : 'bg-black/60'
                    }`} />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-white/60' : 'text-black/60'
                    }`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* View Project Link */}
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-2"
              whileHover={{ x: 5 }}
            >
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                View Live Project
              </span>
              <motion.svg
                className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  x: [0, 4, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.a>
          </div>

          {/* Right Column - Metrics */}
          <div className="space-y-6">
            <p className={`text-xs font-mono uppercase tracking-wider ${
              isDarkMode ? 'text-white/40' : 'text-black/40'
            }`}>
              Project Impact
            </p>
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`pb-6 border-b ${
                  isDarkMode ? 'border-white/10' : 'border-black/10'
                } last:border-0`}
              >
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  {metric.value}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-white/60' : 'text-black/60'
                }`}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial check
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Felix Abada - Software Engineer</title>
        <meta name="description" content="A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products that solve real problems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.felixabada.com" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Felix Abada | Full Stack Engineer & CTO" />
        <meta property="og:description" content="A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products that solve real problems." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.felixabada.com" />
        <meta property="og:image" content="https://www.felixabada.com/assets/Images/profile.png" />
        <meta property="og:site_name" content="Felix Abada Portfolio" />
        <meta property="profile:first_name" content="Felix" />
        <meta property="profile:last_name" content="Abada" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Felix Abada | Full Stack Engineer & CTO" />
        <meta name="twitter:description" content="A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co." />
        <meta name="twitter:image" content="https://www.felixabada.com/assets/Images/profile.png" />

        {/* Additional SEO */}
        <meta name="author" content="Felix Abada" />
        <meta name="keywords" content="Felix Abada, Software Engineer, Full Stack Developer, CTO, goParkly, Ghana, Web Development" />

        {/* Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Felix Abada",
              "url": "https://www.felixabada.com",
              "image": "https://www.felixabada.com/assets/Images/profile.png",
              "jobTitle": "Full Stack Engineer & CTO",
              "worksFor": {
                "@type": "Organization",
                "name": "goParkly"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Accra",
                "addressCountry": "Ghana"
              },
              "email": "felitech26@outlook.com",
              "sameAs": [
                "https://github.com/Felitech26",
                "https://gh.linkedin.com/in/felix-abada-11707a1aa",
                "https://www.facebook.com/felix.abada.52/",
                "https://www.instagram.com/nii.devs/"
              ],
              "description": "Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products that solve real problems.",
              "knowsAbout": ["Software Engineering", "Full Stack Development", "Web Development", "Smart Mobility", "Engineering Leadership"]
            })
          }}
        />

        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Felix Abada Portfolio",
              "url": "https://www.felixabada.com",
              "description": "Portfolio website of Felix Abada, Full Stack Engineer and CTO at goParkly",
              "author": {
                "@type": "Person",
                "name": "Felix Abada"
              }
            })
          }}
        />
      </Head>

      {/* Futuristic Custom Cursor */}
      <FuturisticCursor isDarkMode={isDarkMode} />

      {/* Navbar Component */}
      <Navbar isDarkMode={isDarkMode} />

      <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-background-dark text-text-dark-primary' : 'bg-background text-text-primary'}`}>

        {/* Animated Banner Text */}
        <section id="hero" className="relative overflow-hidden pt-[6rem] md:pt-36 pb-12 md:pb-16">
          <div className="w-full px-3 lg:px-[8rem]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.h2
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${
                  isDarkMode ? 'text-text-dark-primary' : 'text-text-primary'
                }`}
                style={{
                  fontFamily: "'Bodoni Moda', Didot, 'Didot LT STD', 'Hoefler Text', Garamond, 'Times New Roman', serif",
                  letterSpacing: '-0.02em',
                  fontWeight: '700',
                }}
              >
                <motion.span
                  className="block mb-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Full Stack Engineer
                </motion.span>
                <motion.span
                  className={`block ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  crafting digital experiences
                </motion.span>
              </motion.h2>
            </motion.div>
          </div>

          {/* Parallax background elements */}
          <motion.div
            className={`absolute top-1/4 right-10 w-32 h-32 rounded-full opacity-5 blur-3xl ${
              isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
            }`}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={`absolute bottom-1/4 left-10 w-40 h-40 rounded-full opacity-5 blur-3xl ${
              isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
            }`}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </section>

        {/* Hero Section */}
        <section
          id="about"
          className="relative overflow-hidden pt-4 md:pt-6 pb-12 md:pb-16"
        >
          <div className="w-full px-3 lg:px-[8rem]">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-12 lg:gap-20">
              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                <div className="space-y-2 overflow-hidden">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`text-xs uppercase tracking-wider ${
                      isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                    }`}
                  >
                    Co-Founder & CTO at goParkly.co
                  </motion.p>
                  <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-3xl lg:text-4xl font-titleFont font-bold leading-tight"
                  >
                    Felix Abada
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`text-base max-w-xl leading-relaxed ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}
                >
                  A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building
                  high-performing teams and products that solve real problems, bridging the gap between
                  visionary design and robust implementation.
                </motion.p>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`text-base max-w-xl leading-relaxed ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}
                >
                  Focused on long-term impact, I translate complex challenges into elegant,
                  user-centric solutions that deliver measurable value.
                  I'm committed to operational excellence, long-term value creation,
                  and using technology to solve meaningful problems—whether for cities, companies, or communities.
                </motion.p>

                {/* Social Media Icons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <p className={`text-sm ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}>
                    See what I've been doing on
                  </p>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: TbBrandGithub, href: 'https://github.com/Felitech26', size: 'text-xl' },
                      { icon: FaLinkedinIn, href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa', size: 'text-lg' },
                      { icon: FaFacebookF, href: 'https://www.facebook.com/felix.abada.52/', size: 'text-lg' },
                      { icon: FaInstagram, href: 'https://www.instagram.com/nii.devs/', size: 'text-lg' },
                    ].map((social, idx) => (
                      <motion.a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                        whileHover={{ scale: 1.2, y: -2 }}
                        className={`transition-colors ${
                          isDarkMode
                            ? 'text-text-dark-tertiary hover:text-text-dark-primary'
                            : 'text-text-tertiary hover:text-text-primary'
                        }`}
                      >
                        <social.icon className={social.size} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Let's Talk Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.a
                    href="https://wa.me/233508591078"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 font-medium text-sm rounded transition-colors ${
                      isDarkMode
                        ? 'bg-text-dark-primary text-background-dark hover:bg-text-dark-secondary'
                        : 'bg-text-primary text-background hover:bg-text-secondary'
                    }`}
                  >
                    Let's talk
                    <IoLogoWhatsapp className="text-lg" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Futuristic Image Design */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative order-first lg:order-last flex items-center justify-center"
              >
                <div className="relative group w-full max-w-sm">
                  {/* Static border with pulsing glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-gray-100"
                    style={{
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(200, 200, 200, 0.3)'
                    }}
                    animate={{
                      
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Corner brackets with expand animation */}
                  <div className="absolute -top-3 -left-3 w-16 h-16">
                    <motion.div
                      className="absolute top-0 left-0 border-t-2 border-l-2"
                      style={{
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.5)'
                      }}
                      animate={{
                        width: ['40%', '60%', '40%'],
                        height: ['40%', '60%', '40%']
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-16 h-16">
                    <motion.div
                      className="absolute top-0 right-0 border-t-2 border-r-2"
                      style={{
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.5)'
                      }}
                      animate={{
                        width: ['40%', '60%', '40%'],
                        height: ['40%', '60%', '40%']
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-16 h-16">
                    <motion.div
                      className="absolute bottom-0 left-0 border-b-2 border-l-2"
                      style={{
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.5)'
                      }}
                      animate={{
                        width: ['40%', '60%', '40%'],
                        height: ['40%', '60%', '40%']
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16">
                    <motion.div
                      className="absolute bottom-0 right-0 border-b-2 border-r-2"
                      style={{
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(200, 200, 200, 0.5)'
                      }}
                      animate={{
                        width: ['40%', '60%', '40%'],
                        height: ['40%', '60%', '40%']
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    />
                  </div>

                  {/* Main image */}
                  <div className="relative aspect-square p-2">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={profileImg}
                        alt="Felix Abada"
                        fill
                        className="object-contain"
                        priority
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      />
                    </div>
                  </div>

                  {/* Corner dots indicators */}
                  <motion.div
                    className={`absolute top-2 left-2 w-1.5 h-1.5 rounded-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className={`absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div
                    className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Futuristic Work Section */}
        <section id="work" className={`relative py-12 md:py-16 overflow-hidden ${
          isDarkMode ? 'bg-background-dark' : 'bg-background'
        }`}>
          {/* Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: isDarkMode
                ? 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)'
                : 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative w-full px-3 lg:px-[8rem]">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-14"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
                  <motion.div
                    className={`w-full h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
                <span className={`text-xs font-mono uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-white/50' : 'text-black/50'
                }`}>
                  [01] Selected Projects
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-titleFont">
                Featured Work
              </h2>
            </motion.div>

            {/* Featured Project - goParkly */}
            <div className="mb-16 md:mb-20">
              <ProjectCard
                href="https://www.goparkly.co/"
                title="goParkly"
                description="A smart parking platform revolutionizing urban mobility worldwide. As CTO & Co-Founder, I lead the engineering team building scalable solutions that connect drivers with available parking spaces in real-time, reducing congestion and optimizing city infrastructure."
                category="SMART MOBILITY"
                image={goparkly}
                tags={['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']}
                features={[
                  'Real-time Parking Availability',
                  'Mobile Payment Integration',
                  'Felix AI Parking Assistant',
                  'Admin Dashboard & Analytics',
                  'Multi-tenant Architecture',
                  'Scalable Cloud Infrastructure'
                ]}
                metrics={[
                  { label: 'Active Users', value: '10K+' },
                  { label: 'Parking Sessions', value: '50K+' },
                  { label: 'Cities Served', value: '3+' }
                ]}
                isDarkMode={isDarkMode}
                index={0}
              />
            </div>

            {/* Other Projects - Simple List */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`text-xs font-mono uppercase tracking-[0.2em] mb-6 ${
                  isDarkMode ? 'text-white/40' : 'text-black/40'
                }`}
              >
                Other Projects
              </motion.p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Bev Couture',
                    description: 'Premium fashion e-commerce platform with seamless shopping experience',
                    category: 'E-Commerce',
                    href: 'https://bev-couture.vercel.app/',
                    features: ['Secure Stripe Payments', 'Real-time Inventory', 'Mobile-First Design', 'Admin Dashboard']
                  },
                  {
                    title: 'United Development Company',
                    description: 'Corporate website for a leading real estate development firm in Ghana',
                    category: 'Corporate',
                    href: 'https://united-development-company.vercel.app/',
                    features: ['Company Profile', 'Project Portfolio', 'Team Section', 'Inquiry Form']
                  }
                ].map((project, idx) => (
                  <motion.a
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group block p-6 border transition-all duration-300 ${
                      isDarkMode
                        ? 'border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04]'
                        : 'border-black/10 hover:border-black/30 bg-black/[0.01] hover:bg-black/[0.02]'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className={`text-xs font-mono uppercase tracking-wider ${
                          isDarkMode ? 'text-white/40' : 'text-black/40'
                        }`}>
                          {project.category}
                        </span>
                        <h3 className={`text-lg md:text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {project.title}
                        </h3>
                      </div>
                      <motion.div
                        className={`${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <HiOutlineArrowNarrowRight className="text-2xl" />
                      </motion.div>
                    </div>
                    <p className={`text-sm mb-3 ${
                      isDarkMode ? 'text-white/60' : 'text-black/60'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className={`text-xs px-2 py-1 rounded ${
                            isDarkMode
                              ? 'bg-white/5 text-white/50'
                              : 'bg-black/5 text-black/50'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Futuristic Contact Section */}
        <section id="contact" className={`relative py-12 md:py-16 overflow-hidden ${
          isDarkMode ? 'bg-background-dark' : 'bg-background'
        }`}>
          {/* Minimalist Futuristic Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: isDarkMode
                  ? 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)'
                  : 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.02) 0%, transparent 50%)'
              }}
            />

            {/* Single animated horizontal line - left */}
            <motion.div
              className={`absolute top-1/2 left-0 h-[1px] w-24 ${
                isDarkMode ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent' : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'
              }`}
              animate={{
                x: [0, 60, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Single animated horizontal line - right */}
            <motion.div
              className={`absolute top-1/3 right-0 h-[1px] w-32 ${
                isDarkMode ? 'bg-gradient-to-l from-transparent via-white/20 to-transparent' : 'bg-gradient-to-l from-transparent via-black/15 to-transparent'
              }`}
              animate={{
                x: [0, -40, 0],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Minimal corner brackets */}
            <div className={`absolute top-8 left-8 w-12 h-12`}>
              <div className={`absolute top-0 left-0 w-6 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              <div className={`absolute top-0 left-0 h-6 w-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>
            <div className={`absolute bottom-8 right-8 w-12 h-12`}>
              <div className={`absolute bottom-0 right-0 w-6 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
              <div className={`absolute bottom-0 right-0 h-6 w-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>

            {/* Single pulsing dot - right side */}
            <motion.div
              className={`absolute top-1/4 right-[15%] w-1 h-1 rounded-full ${
                isDarkMode ? 'bg-white/40' : 'bg-black/30'
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Single pulsing dot - left side */}
            <motion.div
              className={`absolute bottom-1/3 left-[10%] w-1 h-1 rounded-full ${
                isDarkMode ? 'bg-white/30' : 'bg-black/20'
              }`}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative w-full px-3 lg:px-[8rem]">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
                  <motion.div
                    className={`w-full h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
                <span className={`text-xs font-mono uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-white/50' : 'text-black/50'
                }`}>
                  [02] Get In Touch
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-titleFont mb-6">
                Let's Connect
              </h2>

              {/* Animated Divider */}
              <motion.div
                className="h-[1px] relative overflow-hidden max-w-md"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
              >
                <motion.div
                  className="absolute inset-0 h-full"
                  style={{
                    background: isDarkMode
                      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.4), transparent)'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Left Column - Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative w-2 h-2"
                      animate={{
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={`w-full h-full rounded-full ${
                        isDarkMode ? 'bg-green-400' : 'bg-green-500'
                      }`} />
                      <motion.div
                        className={`absolute inset-0 rounded-full ${
                          isDarkMode ? 'bg-green-400' : 'bg-green-500'
                        }`}
                        animate={{
                          scale: [1, 2.5, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    <span className={`text-base ${
                      isDarkMode ? 'text-white/90' : 'text-black/90'
                    }`}>
                      Available for work
                    </span>
                  </div>
                </div>

                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                    isDarkMode ? 'text-white/40' : 'text-black/40'
                  }`}>
                    Location
                  </p>
                  <p className={`text-base ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}>
                    Accra, Ghana
                  </p>
                </div>

                <div>
                  <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                    isDarkMode ? 'text-white/40' : 'text-black/40'
                  }`}>
                    Response Time
                  </p>
                  <p className={`text-base ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}>
                    Usually within 4 hours
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {[
                  { icon: CiMail, label: 'Email', value: 'felitech26@outlook.com', href: 'mailto:felitech26@outlook.com' },
                  { icon: IoLogoWhatsapp, label: 'WhatsApp', value: '+233 50 859 1078', href: '//wa.me/233508591078' },
                ].map((contact, idx) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block p-6 border transition-all duration-300 ${
                      isDarkMode
                        ? 'border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04]'
                        : 'border-black/10 hover:border-black/30 bg-black/[0.01] hover:bg-black/[0.02]'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`absolute top-0 right-0 w-full h-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                      <div className={`absolute top-0 right-0 h-full w-[1px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                    </div>

                    <div className="flex items-start gap-4">
                      <contact.icon className={`text-2xl mt-1 ${
                        isDarkMode ? 'text-white/60' : 'text-black/60'
                      }`} />
                      <div className="flex-1">
                        <p className={`text-xs font-mono uppercase tracking-wider mb-1 ${
                          isDarkMode ? 'text-white/40' : 'text-black/40'
                        }`}>
                          {contact.label}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {contact.value}
                        </p>
                      </div>
                      <motion.div
                        className={`${isDarkMode ? 'text-white/40' : 'text-black/40'}`}
                        animate={{
                          x: [0, 5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <HiOutlineArrowNarrowRight className="text-xl" />
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${
                isDarkMode ? 'text-white/40' : 'text-black/40'
              }`}>
                Connect on Social
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: TbBrandGithub, label: 'GitHub', href: 'https://github.com/Felitech26' },
                  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
                  { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/nii.devs/' },
                  { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/felix.abada.52/' },
                ].map((social, idx) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative px-6 py-4 border transition-all ${
                      isDarkMode
                        ? 'border-white/20 text-white hover:border-white/50'
                        : 'border-black/20 text-black hover:border-black/50'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: isDarkMode
                        ? '0 10px 30px rgba(255,255,255,0.1)'
                        : '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                    aria-label={social.label}
                  >
                    {/* Hover Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${
                        isDarkMode ? 'bg-white' : 'bg-black'
                      }`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex items-center gap-2">
                      <social.icon className="text-base" />
                      <span className="text-xs font-mono">{social.label}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-3 lg:px-[8rem] border-t transition-colors ${
          isDarkMode ? 'border-border-dark-mode' : 'border-border'
        }`}>
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-7 h-7">
                  <Image
                    src={isDarkMode ? logo1 : logo2}
                    alt="Felix Abada Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={`hidden sm:block w-px h-6 ${
                  isDarkMode ? 'bg-border-dark-mode' : 'bg-border'
                }`} />
                <p className={`text-sm text-center sm:text-left ${
                  isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                }`}>
                  © {new Date().getFullYear()} Felix Abada
                </p>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { icon: TbBrandGithub, href: 'https://github.com/Felitech26' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/nii.devs/' },
                  { icon: FaFacebookF, href: 'https://www.facebook.com/felix.abada.52/' },
                  { icon: FaLinkedinIn, href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 border rounded transition-colors ${
                      isDarkMode
                        ? 'border-border-dark-mode hover:border-text-dark-primary'
                        : 'border-border hover:border-text-primary'
                    }`}
                  >
                    <social.icon className={`transition-colors ${
                      isDarkMode
                        ? 'text-text-dark-secondary hover:text-text-dark-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    }`} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
