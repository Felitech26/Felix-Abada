import { useState } from "react";
import { SITE, TITLE, DESCRIPTION, SHARE_TITLE, SHARE_DESCRIPTION, OG_IMAGE, OG_IMAGE_ALT, structuredData } from "@/components/seo";
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
        <link rel="canonical" href={`${SITE}/`} />

        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Felix" />
        <meta property="profile:last_name" content="Abada" />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:site_name" content="Felix Abada" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={SHARE_TITLE} />
        <meta property="og:description" content={SHARE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SHARE_TITLE} />
        <meta name="twitter:description" content={SHARE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

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
