/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from "next/image";
import { profileImg, bev, united, logo1, logo2 } from "@/public/assets";
import { TbBrandGithub } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io5";
import ThemeToggle from '@/components/ThemeToggle';
import FuturisticCursor from '@/components/FuturisticCursor';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <title>Felix Abada</title>
        <meta name="description" content="Felix Abada - Full Stack Web Developer based in Ghana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/Images/logo2.svg" type="image/svg+xml" />
      </Head>

      {/* Futuristic Custom Cursor */}
      <FuturisticCursor isDarkMode={isDarkMode} />

      <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-background-dark text-text-dark-primary' : 'bg-background text-text-primary'}`}>
        {/* Simple Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
          isDarkMode
            ? 'bg-background-dark/80 border-border-dark-mode'
            : 'bg-background/80 border-border'
        }`}>
          <div className="w-full px-3 lg:px-[8rem]">
            <div className="flex items-center justify-between h-16 md:h-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-7 h-7 md:w-7 md:h-7"
              >
                <Image
                  src={isDarkMode ? logo1 : logo2}
                  alt="Felix Abada Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {['Work', 'About', 'Contact'].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`group relative px-4 py-2 text-sm font-medium overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? 'text-text-dark-primary hover:text-text-dark-primary'
                        : 'text-text-primary hover:text-text-primary'
                    }`}
                  >
                    {/* Futuristic background effect */}
                    <span className={`absolute inset-0 transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-text-dark-primary/5 to-text-dark-primary/10 opacity-0 group-hover:opacity-100'
                        : 'bg-gradient-to-r from-text-primary/5 to-text-primary/10 opacity-0 group-hover:opacity-100'
                    }`} />

                    {/* Top border animation */}
                    <span className={`absolute top-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`} />

                    {/* Bottom border animation */}
                    <span className={`absolute bottom-0 right-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`} />

                    {/* Corner accents */}
                    <span className={`absolute top-0 left-0 w-1 h-0 transition-all duration-300 delay-75 group-hover:h-2 ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`} />
                    <span className={`absolute bottom-0 right-0 w-1 h-0 transition-all duration-300 delay-75 group-hover:h-2 ${
                      isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                    }`} />

                    {/* Text with glow effect on hover */}
                    <span className={`relative z-10 transition-all duration-300 ${
                      isDarkMode
                        ? 'group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                        : 'group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                    }`}>
                      {item}
                    </span>
                  </a>
                ))}

                {/* Separator */}
                <div className={`w-px h-6 mx-2 ${
                  isDarkMode ? 'bg-border-dark-mode' : 'bg-border'
                }`} />

                {/* Theme Toggle */}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm shadow-2xl"
              style={{
                backgroundColor: isDarkMode ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)',
                borderLeft: isDarkMode ? 'none' : '1px solid #e5e5e5',
                opacity: 1
              }}
              initial={{ x: '100%', opacity: 1 }}
              animate={{ x: isMenuOpen ? 0 : '100%', opacity: 1 }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`absolute top-6 right-6 p-2 ${
                  isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col  h-full p-8 pt-24">
                {/* Navigation Links */}
                <nav className="flex-1 space-y-8">
                  {['Work', 'About', 'Contact'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        x: isMenuOpen ? 0 : 20
                      }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-3xl font-bold font-titleFont ${
                          isDarkMode
                            ? 'text-white hover:text-gray-400'
                            : 'text-black hover:text-gray-600'
                        } transition-colors`}
                      >
                        {item}
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Social Links */}
                <motion.div
                  className={`border-t pt-8 ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-200'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <p className={`text-xs uppercase tracking-widest mb-6 font-medium ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Connect
                  </p>
                  <div className="flex items-center gap-5">
                    {[
                      { icon: TbBrandGithub, href: 'https://github.com/Felitech26' },
                      { icon: FaLinkedinIn, href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
                      { icon: FaInstagram, href: 'https://www.instagram.com/nii.devs/' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full border transition-all ${
                          isDarkMode
                            ? 'border-gray-800 hover:border-white text-white'
                            : 'border-gray-200 hover:border-black text-black'
                        }`}
                      >
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </nav>

        {/* Animated Banner Text */}
        <section id='about' className="relative overflow-hidden pt-[6rem] md:pt-36 pb-12 md:pb-16">
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
          className="relative overflow-hidden pt-4 md:pt-6 pb-16 md:pb-24"
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
                <div className="space-y-2">
                  <p className={`text-xs uppercase tracking-wider ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}>
                    Co-Founder & CTO at goParkly.co
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-titleFont font-bold leading-tight">
                    Felix Abada
                  </h1>
                </div>

                <p className={`text-base max-w-xl leading-relaxed ${
                  isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                }`}>
                A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building
                  high-performing teams and products that solve real problems, bridging the gap between
                  visionary design and robust implementation.
                </p>
                <p className={`text-base max-w-xl leading-relaxed ${
                  isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                }`}>
                Focused on long-term impact, I translate complex challenges into elegant,
                 user-centric solutions that deliver measurable value. 
                 I’m committed to operational excellence, long-term value creation, 
                 and using technology to solve meaningful problems—whether for cities, companies, or communities.
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center gap-4">
                  <p className={`text-sm ${
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  }`}>
                    See what I've been doing on
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/Felitech26"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        isDarkMode
                          ? 'text-text-dark-tertiary hover:text-text-dark-primary'
                          : 'text-text-tertiary hover:text-text-primary'
                      }`}
                    >
                      <TbBrandGithub className="text-xl" />
                    </a>
                    <a
                      href="https://gh.linkedin.com/in/felix-abada-11707a1aa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        isDarkMode
                          ? 'text-text-dark-tertiary hover:text-text-dark-primary'
                          : 'text-text-tertiary hover:text-text-primary'
                      }`}
                    >
                      <FaLinkedinIn className="text-lg" />
                    </a>
                    <a
                      href="https://www.facebook.com/felix.abada.52/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        isDarkMode
                          ? 'text-text-dark-tertiary hover:text-text-dark-primary'
                          : 'text-text-tertiary hover:text-text-primary'
                      }`}
                    >
                      <FaFacebookF className="text-lg" />
                    </a>
                    <a
                      href="https://www.instagram.com/nii.devs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        isDarkMode
                          ? 'text-text-dark-tertiary hover:text-text-dark-primary'
                          : 'text-text-tertiary hover:text-text-primary'
                      }`}
                    >
                      <FaInstagram className="text-lg" />
                    </a>
                  </div>
                </div>

                {/* Let's Talk Button */}
                <div>
                  <a
                    href="//wa.me/233508591078"
                    target="_blank"
                    className={`inline-flex items-center gap-2 px-6 py-3 font-medium text-sm rounded transition-colors ${
                      isDarkMode
                        ? 'bg-text-dark-primary text-background-dark hover:bg-text-dark-secondary'
                        : 'bg-text-primary text-background hover:bg-text-secondary'
                    }`}
                  >
                    Let's talk
                    <IoLogoWhatsapp className="text-lg" />
                  </a>
                </div>
              </motion.div>

              {/* Futuristic Image Design */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Work Section */}
        <section id="work" className={`py-16 md:py-24 px-2 md:px-3 lg:px-4 ${
          isDarkMode ? 'bg-background-dark-secondary' : 'bg-background-light'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className={`font-mono text-sm ${
                isDarkMode ? 'text-text-dark-tertiary' : 'text-text-tertiary'
              }`}>01</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-titleFont font-bold">
                Featured Work
              </h2>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-border-dark-mode' : 'bg-border'
              }`} />
            </div>

            <div className="space-y-16 md:space-y-24">
              {/* Project 1 - Bev Couture */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a
                  href="https://bev-couture.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className={`relative rounded-lg overflow-hidden border hover-lift transition-colors ${
                      isDarkMode ? 'border-border-dark-mode' : 'border-border'
                    }`}>
                      <div className="relative aspect-video">
                        <Image
                          src={bev}
                          alt="Bev Couture"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className={`text-2xl md:text-3xl font-titleFont font-bold transition-colors ${
                        isDarkMode
                          ? 'group-hover:text-text-dark-secondary'
                          : 'group-hover:text-text-secondary'
                      }`}>
                        Bev Couture
                      </h3>
                      <p className={`text-base md:text-lg leading-relaxed ${
                        isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                      }`}>
                        A premium fashion e-commerce platform featuring
                        seamless shopping experience, elegant design, and
                        modern web technologies for optimal performance.
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {['Fashion', 'E-commerce', 'Full Stack'].map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                              isDarkMode
                                ? 'border-border-dark-mode text-text-dark-secondary'
                                : 'border-border text-text-secondary'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-sm">View Project</span>
                        <HiOutlineArrowNarrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Project 2 - United Development */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <a
                  href="https://united-development-company.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 lg:order-1">
                      <h3 className={`text-2xl md:text-3xl font-titleFont font-bold transition-colors ${
                        isDarkMode
                          ? 'group-hover:text-text-dark-secondary'
                          : 'group-hover:text-text-secondary'
                      }`}>
                        United Development Company
                      </h3>
                      <p className={`text-base md:text-lg leading-relaxed ${
                        isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                      }`}>
                        Professional real estate portfolio showcasing
                        premier properties and development projects with
                        stunning visuals and intuitive navigation.
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {['Real Estate', 'Portfolio', 'Frontend'].map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                              isDarkMode
                                ? 'border-border-dark-mode text-text-dark-secondary'
                                : 'border-border text-text-secondary'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-sm">View Project</span>
                        <HiOutlineArrowNarrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div className={`relative rounded-lg overflow-hidden border hover-lift lg:order-2 transition-colors ${
                      isDarkMode ? 'border-border-dark-mode' : 'border-border'
                    }`}>
                      <div className="relative aspect-video">
                        <Image
                          src={united}
                          alt="United Development Company"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-2 md:px-3 lg:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <span className={`font-mono text-sm ${
                isDarkMode ? 'text-text-dark-tertiary' : 'text-text-tertiary'
              }`}>02</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-titleFont font-bold">
                Let's Connect
              </h2>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-border-dark-mode' : 'bg-border'
              }`} />
            </div>

            <p className={`text-lg text-center mb-12 max-w-2xl mx-auto ${
              isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
            }`}>
              Currently open to new opportunities and collaborations.
              Let's create something amazing together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CiMail, label: 'Email Me', href: 'mailto:felitech26@outlook.com' },
                { icon: TbBrandGithub, label: 'GitHub', href: 'https://github.com/Felitech26' },
                { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/nii.devs/' },
                { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/felix.abada.52/' },
                { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center justify-between p-6 border rounded hover-lift transition-all ${
                    isDarkMode
                      ? 'border-border-dark-mode hover:border-text-dark-primary'
                      : 'border-border hover:border-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <contact.icon className="text-xl" />
                    <span className="font-medium">{contact.label}</span>
                  </div>
                  <HiOutlineArrowNarrowRight className={
                    isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
                  } />
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="//wa.me/233508591078"
                target="_blank"
                className={`inline-flex items-center gap-2 px-8 py-4 font-medium rounded transition-colors ${
                  isDarkMode
                    ? 'bg-text-dark-primary text-background-dark hover:bg-text-dark-secondary'
                    : 'bg-text-primary text-background hover:bg-primary-light'
                }`}
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Start a Conversation</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-2 md:px-3 lg:px-4 border-t transition-colors ${
          isDarkMode ? 'border-border-dark-mode' : 'border-border'
        }`}>
          <div className="max-w-7xl mx-auto">
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
                  © {new Date().getFullYear()} Felix Abada. All rights reserved.
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
