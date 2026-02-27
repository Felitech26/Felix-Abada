/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import FuturisticCursor from '@/components/FuturisticCursor';
import Navbar from '@/components/Navbar';
import HeroEditorial from '@/components/HeroEditorial';
import TechTicker from '@/components/TechTicker';
import AboutNarrative from '@/components/AboutNarrative';
import FeaturedProjectClean from '@/components/FeaturedProjectClean';
import StrategicPillars from '@/components/StrategicPillars';
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
        <meta name="description" content="Felix Abada — Software Engineer & CTO at goParkly.co based in Ghana. Building scalable tech platforms that transform urban mobility and drive innovation." />
        <link rel="canonical" href="https://www.felixabada.com" />

        {/* JSON-LD Schema for Google Knowledge Graph - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Felix Abada",
              "alternateName": "Felix Abada Orezimena",
              "givenName": "Felix",
              "familyName": "Abada",
              "jobTitle": "Chief Technology Officer & Co-Founder",
              "description": "Tech Executive and Strategic Leader based in Ghana, bridging the gap between complex engineering and scalable business impact. Currently defining the future of urban mobility at goParkly.co.",
              "worksFor": {
                "@type": "Organization",
                "name": "goParkly",
                "url": "https://goparkly.co",
                "description": "Smart parking platform revolutionizing urban mobility through real-time data, AI architecture and seamless payments."
              },
              "hasOccupation": [
                {
                  "@type": "Occupation",
                  "name": "Chief Technology Officer",
                  "occupationLocation": {
                    "@type": "City",
                    "name": "Accra, Ghana"
                  }
                },
                {
                  "@type": "Occupation",
                  "name": "Software Engineer"
                }
              ],
              "knowsAbout": [
                "Software Engineering",
                "Platform Architecture",
                "Full-Stack Development",
                "Artificial Intelligence",
                "Urban Mobility Technology",
                "PropTech",
                "Scalable Systems Design",
                "Team Leadership",
                "Product Strategy"
              ],
              "nationality": {
                "@type": "Country",
                "name": "Ghana"
              },
              "url": "https://www.felixabada.com",
              "image": "https://www.felixabada.com/assets/Images/felix_google.png",
              "sameAs": [
                "https://gh.linkedin.com/in/felix-abada-11707a1aa",
                "https://www.facebook.com/felix.abada.52/",
                "https://www.instagram.com/nii.devs/",
                "https://wa.me/233508591078"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Accra",
                "addressRegion": "Greater Accra",
                "addressCountry": "GH"
              }
            })
          }}
        />

        {/* JSON-LD Schema for WebSite - Helps Google understand site identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Felix Abada — Software Engineer | Tech Executive | CTO",
              "url": "https://www.felixabada.com",
              "description": "Personal portfolio of Felix Abada — Software Engineer, Tech Executive, and CTO at goParkly.co based in Accra, Ghana.",
              "author": {
                "@type": "Person",
                "name": "Felix Abada"
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

        {/* STRATEGIC PILLARS: Core Competencies */}
        <StrategicPillars isDarkMode={isDarkMode} />

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
