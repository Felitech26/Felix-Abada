import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta name="description" content="Felix Abada - A Tech Executive Based in Ghana, leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products that solve real problems." />
        <meta name="keywords" content="Felix Abada, Software Engineer, Tech Executive, Ghana, goParkly, Web Developer, Portfolio" />
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

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Shortcut icon for browsers */}
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-title" content="Felix Abada" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color - Multiple for different contexts */}
        <meta name="theme-color" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/android-chrome-512x512.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional SEO for browser search */}
        <meta name="application-name" content="Felix Abada Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.felixabada.com" />
        <meta property="og:title" content="Felix Abada - Tech Executive & Software Engineer" />
        <meta property="og:description" content="Leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products." />
        <meta property="og:image" content="https://www.felixabada.com/og-image.png" />
        <meta property="og:logo" content="https://www.felixabada.com/android-chrome-512x512.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.felixabada.com" />
        <meta name="twitter:title" content="Felix Abada - Tech Executive & Software Engineer" />
        <meta name="twitter:description" content="Leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products." />
        <meta name="twitter:image" content="https://www.felixabada.com/twitter-image.png" />

        {/* Google Search Logo - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Felix Abada",
              "alternateName": "Felix Abada Portfolio",
              "url": "https://www.felixabada.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.felixabada.com/android-chrome-512x512.png",
                "width": 512,
                "height": 512
              },
              "image": "https://www.felixabada.com/og-image.png",
              "sameAs": [
                "https://github.com/Felitech26",
                "https://gh.linkedin.com/in/felix-abada-11707a1aa",
                "https://www.facebook.com/felix.abada.52/",
                "https://www.instagram.com/nii.devs/"
              ],
              "founder": {
                "@type": "Person",
                "name": "Felix Abada",
                "jobTitle": "CTO & Co-Founder",
                "image": "https://www.felixabada.com/android-chrome-512x512.png"
              }
            })
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};