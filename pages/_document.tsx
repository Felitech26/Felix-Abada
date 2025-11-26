import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=5" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=5" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=5" />

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
