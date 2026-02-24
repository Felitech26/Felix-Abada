/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import FuturisticCursor from '@/components/FuturisticCursor';
import Navbar from '@/components/Navbar';
import HeroEditorial from '@/components/HeroEditorial';
import TechTicker from '@/components/TechTicker';
import AboutNarrative from '@/components/AboutNarrative';
import FeaturedProjectClean from '@/components/FeaturedProjectClean';
import VisionContact from '@/components/VisionContact';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Felix Abada — Software Engineer | Tech Executive | CTO</title>
        <meta name="description" content="Visionary Technology Leader with African Roots. CTO at goParkly." />
        <link rel="canonical" href="https://www.felixabada.com" />

        {/* JSON-LD Schema for Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Felix Abada",
              "jobTitle": "Chief Technology Officer",
              "worksFor": {
                "@type": "Organization",
                "name": "goParkly",
                "url": "https://goparkly.co"
              },
              "url": "https://www.felixabada.com",
              "image": "https://www.felixabada.com/assets/Images/felix.png",
              "sameAs": [
                "https://gh.linkedin.com/in/felix-abada-11707a1aa",
                "https://www.facebook.com/felix.abada.52/",
                "https://www.instagram.com/nii.devs/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Accra",
                "addressCountry": "Ghana"
              }
            })
          }}
        />
      </Head>

      <FuturisticCursor isDarkMode={isDarkMode} />
      <Navbar isDarkMode={isDarkMode} />

      <main className={`min-h-screen font-body transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-[#e0e0e0]' : 'bg-[#fafafa] text-[#1a1a1a]'}`}>

        {/* HERO: Authentic Editorial */}
        <HeroEditorial isDarkMode={isDarkMode} />

        {/* ABOUT: Narrative Bio */}
        <div id="about">
          <AboutNarrative isDarkMode={isDarkMode} />
        </div>

        {/* WORK: Clean Project Showcase */}
        <div id="work">
          <FeaturedProjectClean isDarkMode={isDarkMode} />
        </div>

        {/* VISION & CONTACT */}
        <div id="contact">
          <VisionContact isDarkMode={isDarkMode} />
        </div>

        {/* FOOTER */}
        <footer className={`py-8 px-6 lg:px-32 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest opacity-40">
            <p>© {new Date().getFullYear()} Felix Abada.</p>
            <p>Accra, Ghana</p>
          </div>
        </footer>

      </main>
    </>
  );
}
