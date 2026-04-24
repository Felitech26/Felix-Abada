import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { logo1, logo2 } from '@/public/assets';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import UserInfo from './UserInfo';

interface NavbarProps {
  isDarkMode: boolean;
}

export default function Navbar({ isDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 lg:mt-8 px-0 md:px-4 pointer-events-none"
      >
        <div className={`pointer-events-auto flex items-center justify-between lg:px-6 py-2 lg:py-3 transition-all duration-500 ease-out rounded-none ${
          scrolled
            ? `px-4 backdrop-blur-xl border ${isDarkMode
                ? 'bg-black/40 border-white/10'
                : 'bg-white/40 border-black/10 shadow-[0_1px_4px_rgba(0,0,0,0.02)]'}`
            : 'px-3 bg-transparent border border-transparent'
          } ${scrolled ? 'w-[96%] lg:w-[60%]' : 'w-full lg:w-[80%]'}`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-6 h-6 lg:w-7 lg:h-7 flex-shrink-0 rounded-none"
            >
              <Image 
                src={isDarkMode ? logo1 : logo2} 
                alt="Felix Abada" 
                fill 
                className="object-contain" 
              />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className={`hidden lg:flex items-center gap-8 px-6 py-2 border transition-colors duration-500 ${
            scrolled
              ? 'bg-transparent border-transparent shadow-none'
              : `backdrop-blur-xl ${isDarkMode
                  ? 'bg-black/40 border-white/10'
                  : 'bg-white/40 border-black/10 shadow-[0_1px_4px_rgba(0,0,0,0.02)]'}`
          }`}>
            {['Work', 'About', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="relative group overflow-hidden"
              >
                <div className="flex flex-col">
                  <span className={`font-medium text-sm transition-transform duration-500 ease-out group-hover:-translate-y-full ${
                    isDarkMode ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {item}
                  </span>
                  <span className={`absolute top-full font-medium text-sm transition-transform duration-500 ease-out group-hover:-translate-y-full ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                    {item}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Actions & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            
            {/* Magnetic 'Let's Talk' Button (Desktop) */}
            <motion.a 
              href="tel:+233508591078"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden lg:flex items-center justify-center px-4 py-2 lg:px-5 lg:py-2.5 text-[10px] lg:text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-colors rounded-none ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              Let&apos;s talk
            </motion.a>

            <div className="lg:hidden">
              <ThemeToggle />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-none ${
                isDarkMode ? 'bg-white/10' : 'bg-black/5'
              }`}
            >
              <motion.div 
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                className={`w-4 h-[1.5px] ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              />
              <motion.div 
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className={`w-4 h-[1.5px] ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              />
              <motion.div 
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                className={`w-4 h-[1.5px] ${isDarkMode ? 'bg-white' : 'bg-black'}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Ultra Minimal Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 flex flex-col px-6 pt-32 pb-12 overflow-hidden ${
              isDarkMode ? 'bg-black/95' : 'bg-white/95'
            } backdrop-blur-3xl`}
          >
            <nav className="flex flex-col gap-8 flex-1 justify-center">
              {['Work', 'About', 'Contact'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-6xl font-light tracking-tighter hover:italic transition-all ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-between items-end border-t pt-8 border-current/10"
            >
              <a href="tel:+233508591078" className={`text-sm font-semibold tracking-wider hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Let&apos;s talk
              </a>
              <div className="flex gap-4">
                {[
                  { icon: FaFacebookF, href: 'https://www.facebook.com/felix.abada.52/' },
                  { icon: FaLinkedinIn, href: 'https://gh.linkedin.com/in/felix-abada-11707a1aa' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/nii.devs/' },
                  { icon: FaWhatsapp, href: 'https://wa.me/233508591078' }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
