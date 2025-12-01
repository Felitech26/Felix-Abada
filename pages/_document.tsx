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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.felixabada.com" />
        <meta property="og:title" content="Felix Abada - Tech Executive & Software Engineer" />
        <meta property="og:description" content="Leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products." />
        <meta property="og:image" content="https://www.felixabada.com/og-image.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.felixabada.com" />
        <meta name="twitter:title" content="Felix Abada - Tech Executive & Software Engineer" />
        <meta name="twitter:description" content="Leading engineering innovation at goParkly.co. Passionate about building high-performing teams and products." />
        <meta name="twitter:image" content="https://www.felixabada.com/twitter-image.png" />

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
