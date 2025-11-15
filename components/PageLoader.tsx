'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            {/* Animated logo/text */}
            <motion.div
              className="text-6xl md:text-8xl font-titleFont font-bold text-gradient"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              FA
            </motion.div>

            {/* Circular progress */}
            <svg className="absolute -inset-8" width="200" height="200">
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{
                  pathLength: { duration: 2, ease: 'easeInOut' },
                  rotate: { duration: 2, ease: 'linear' },
                }}
                style={{ transformOrigin: 'center' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FFF0" />
                  <stop offset="100%" stopColor="#B026FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent-cyan/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="absolute bottom-20 text-light-60 text-sm tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            LOADING EXPERIENCE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
