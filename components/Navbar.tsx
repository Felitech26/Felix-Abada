import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { logo1, logo2 } from "@/public/assets";
import { TbBrandGithub } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isDarkMode: boolean;
}

export default function Navbar({ isDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDarkMode
          ? 'bg-background-dark/80 border-border-dark-mode'
          : 'bg-background/80 border-border'
      }`}>
        <div className="w-full px-3 lg:px-[8rem]">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="cursor-pointer" aria-label="Navigate to home">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-7 h-7 md:w-7 md:h-7"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={isDarkMode ? logo1 : logo2}
                  alt="Felix Abada Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`group relative px-4 py-2 text-sm font-medium overflow-hidden transition-all duration-300 ${
                    isDarkMode
                      ? 'text-text-dark-primary hover:text-text-dark-primary'
                      : 'text-text-primary hover:text-text-primary'
                  }`}
                >
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-text-dark-primary/5 to-text-dark-primary/10 opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-r from-text-primary/5 to-text-primary/10 opacity-0 group-hover:opacity-100'
                  }`} />

                  <span className={`absolute top-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                    isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                  }`} />

                  <span className={`absolute bottom-0 right-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                    isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                  }`} />

                  <span className={`absolute top-0 left-0 w-1 h-0 transition-all duration-300 delay-75 group-hover:h-2 ${
                    isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                  }`} />
                  <span className={`absolute bottom-0 right-0 w-1 h-0 transition-all duration-300 delay-75 group-hover:h-2 ${
                    isDarkMode ? 'bg-text-dark-primary' : 'bg-text-primary'
                  }`} />

                  <span className={`relative z-10 transition-all duration-300 ${
                    isDarkMode
                      ? 'group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                      : 'group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                  }`}>
                    {item}
                  </span>
                </a>
              ))}

              <div className={`w-px h-6 mx-2 ${
                isDarkMode ? 'bg-border-dark-mode' : 'bg-border'
              }`} />

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
                aria-label="Toggle menu"
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
      </nav>

      {/* Futuristic Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Animated Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Futuristic Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-[90%] max-w-sm overflow-hidden"
              style={{
                backgroundColor: isDarkMode ? '#000000' : '#ffffff'
              }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Grid Background */}
              <motion.div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: isDarkMode
                    ? 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)'
                    : 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              {/* Glowing Accent Line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(180deg, transparent, #ffffff, transparent)'
                    : 'linear-gradient(180deg, transparent, #000000, transparent)',
                  boxShadow: isDarkMode ? '0 0 20px rgba(255,255,255,0.5)' : '0 0 20px rgba(0,0,0,0.3)'
                }}
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Content Container */}
              <div
                className="relative h-full flex flex-col"
                style={{
                  backgroundColor: isDarkMode ? '#000000' : '#ffffff'
                }}
              >
                {/* Futuristic Header */}
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    {/* Animated Menu Text */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
                        <motion.div
                          className={`w-full h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </div>
                      <span className={`text-sm font-mono tracking-wider ${
                        isDarkMode ? 'text-white/80' : 'text-black/80'
                      }`}>
                        FELIX ABADA
                      </span>
                    </motion.div>

                    {/* Close Button */}
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Close menu"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Animated Divider */}
                  <motion.div
                    className="mt-4 h-[1px] relative overflow-hidden"
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
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 flex flex-col justify-center px-6 space-y-4">
                  {['Work', 'About', 'Contact'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.1,
                        type: 'spring',
                        stiffness: 100
                      }}
                    >
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="group relative block py-4 px-6 overflow-hidden"
                      >
                        {/* Hover Background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: isDarkMode
                              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'
                              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)'
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Corner Brackets */}
                        <div className="absolute top-3 left-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className={`absolute top-0 left-0 w-full h-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                          <div className={`absolute top-0 left-0 h-full w-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                        </div>
                        <div className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className={`absolute bottom-0 right-0 w-full h-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                          <div className={`absolute bottom-0 right-0 h-full w-[2px] ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                        </div>

                        {/* Content */}
                        <div className="relative flex items-center gap-6">
                          {/* Number */}
                          <span className={`text-xs font-mono ${
                            isDarkMode ? 'text-white/30' : 'text-black/30'
                          } group-hover:text-opacity-60 transition-all`}>
                            [0{index + 1}]
                          </span>

                          {/* Item Text */}
                          <span className={`text-3xl font-bold tracking-tight ${
                            isDarkMode ? 'text-white' : 'text-black'
                          } group-hover:translate-x-2 transition-transform duration-300`}>
                            {item}
                          </span>

                          {/* Arrow */}
                          <motion.svg
                            className={`w-6 h-6 ml-auto opacity-0 group-hover:opacity-100 ${
                              isDarkMode ? 'text-white' : 'text-black'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Futuristic Footer */}
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Divider */}
                    <div className="relative mb-6 h-[1px] overflow-hidden"
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
                          x: ['100%', '-100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                      <p className={`text-[10px] font-mono uppercase tracking-[0.3em] ${
                        isDarkMode ? 'text-white/40' : 'text-black/40'
                      }`}>
                        Connect
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      {[
                        { icon: TbBrandGithub, href: 'https://github.com/Felitech26', label: 'GitHub' },
                        { icon: FaLinkedinIn, href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa', label: 'LinkedIn' },
                        { icon: FaInstagram, href: 'https://www.instagram.com/nii.devs/', label: 'Instagram' }
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`relative p-4 border transition-all ${
                            isDarkMode
                              ? 'border-white/20 text-white hover:border-white/50'
                              : 'border-black/20 text-black hover:border-black/50'
                          }`}
                          style={{
                            clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                          }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: isDarkMode
                              ? '0 0 20px rgba(255,255,255,0.2)'
                              : '0 0 20px rgba(0,0,0,0.1)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <social.icon className="text-lg" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
