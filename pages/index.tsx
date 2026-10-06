import { useState } from "react";
import Head from "next/head";
import Field from "@/components/Field";
import HUD from "@/components/HUD";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Interlude from "@/components/Interlude";
import About from "@/components/About";
import Disciplines from "@/components/Disciplines";
import Ventures from "@/components/Ventures";
import Leadership from "@/components/Leadership";
import Where from "@/components/Where";
import Contact from "@/components/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Head>
        <title>Felix Abada — Technology Executive | CTO & Founder</title>
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
              "affiliation": {
                "@type": "Organization",
                "name": "ScoutVerse.ai",
                "url": "https://scoutverse-frontend.vercel.app/"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Ghana Technology University College"
              },
              "nationality": {
                "@type": "Country",
                "name": "Ghana"
              },
              "url": "https://www.felixabada.com",
              "image": "https://www.felixabada.com/assets/Images/felix_google.png",
              "sameAs": [
                "https://gh.linkedin.com/in/felix-abada-11707a1aa",
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

      <Field />
      <Preloader onDone={() => setReady(true)} />
      <HUD ready={ready} />
      <Navbar ready={ready} />

      <div className="relative z-10">
        <main>
          <Hero ready={ready} />
          <Interlude code="01 / Who is behind it" text="Meet the engineer." scene={0.07} />
          <About />
          <Disciplines />
          <Interlude code="02 / Selected work" text="Now, the work." scene={0.3} />
          <Ventures />
          <Interlude code="03 / Method" text="How it gets built." scene={0.55} />
          <Leadership />
          <Interlude code="04 / Reach" text="Wider still." scene={0.76} />
          <Where />
          <Interlude code="05 / Contact" text="Your move." scene={0.94} />
        </main>
        <Contact />
      </div>
    </>
  );
}
