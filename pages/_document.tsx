import { Html, Head, Main, NextScript } from 'next/document';

// Applies the saved (or system) theme before first paint so there is no flash.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Meta Tags */}
        
        <meta name="keywords" content="Felix Abada, software engineer Ghana, software developer Ghana, software engineer Accra, full-stack developer Ghana, software developer Africa, CTO Ghana, tech executive Africa, goParkly, ScoutVerse.ai" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="geo.region" content="GH-AA" />
        <meta name="geo.placename" content="Accra" />
        <meta name="geo.position" content="5.6037;-0.1870" />
        <meta name="ICBM" content="5.6037, -0.1870" />
        <meta name="author" content="Felix Abada" />

        {/* Favicon - Multiple sizes for better browser and search engine support */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-title" content="Felix Abada" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafafa" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#060606" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/android-chrome-512x512.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <meta name="application-name" content="Felix Abada Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.felixabada.com" />
        <meta property="og:site_name" content="Felix Abada" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Felix Abada — Software Engineer & CTO in Accra, Ghana" />
        <meta property="og:description" content="Software engineer, full-stack developer and CTO based in Accra, Ghana. Co-Founder of goParkly and Founder of ScoutVerse.ai." />
        <meta property="og:image" content="https://www.felixabada.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Felix Abada, software engineer and CTO in Accra, Ghana" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.felixabada.com" />
        <meta name="twitter:title" content="Felix Abada — Software Engineer & CTO in Accra, Ghana" />
        <meta name="twitter:description" content="Software engineer, full-stack developer and CTO based in Accra, Ghana. Co-Founder of goParkly and Founder of ScoutVerse.ai." />
        <meta name="twitter:image" content="https://www.felixabada.com/og-image.png" />
        <meta name="twitter:image:alt" content="Felix Abada, software engineer and CTO in Accra, Ghana" />


        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
