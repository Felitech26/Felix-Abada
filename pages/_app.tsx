import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Component {...pageProps} />
    </MotionConfig>
  );
}
