import { useState } from "react";
import { SITE, TITLE, DESCRIPTION, structuredData } from "@/components/seo";
import FAQ from "@/components/FAQ";
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
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={SITE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
          <FAQ />
          <Interlude code="05 / Contact" text="Your move." scene={0.94} />
        </main>
        <Contact />
      </div>
    </>
  );
}
