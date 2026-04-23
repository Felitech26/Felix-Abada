'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const MOTIVATION_TEXT = "GREATNESS IS ENGINEERED, NOT GIVEN.";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total loading sequence time: 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Split into words so the text can wrap cleanly on small screens
  // while individual characters still animate with the stagger effect.
  const words = MOTIVATION_TEXT.split(" ");

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#e0e0e0] overflow-hidden px-4"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="relative perspective-[1000px] w-full max-w-[92vw] flex flex-col items-center">
            {/* Minimalist Grid Line for depth */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-0 bg-current opacity-20"
              initial={{ height: 0 }}
              animate={{ height: "200px" }}
              transition={{ duration: 1, ease: "circOut" }}
            />

            <motion.div
              className="flex flex-wrap justify-center gap-x-2 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold text-center mt-[100px] max-w-full"
            >
              {words.map((word, wIndex) => {
                const prevChars = words.slice(0, wIndex).reduce((acc, w) => acc + w.length, 0);
                return (
                  <span key={wIndex} className="inline-flex whitespace-nowrap">
                    {word.split("").map((char, cIndex) => (
                      <motion.span
                        key={cIndex}
                        initial={{ opacity: 0, y: 20, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: (prevChars + cIndex) * 0.04,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="inline-block relative z-10"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </motion.div>

            {/* Glowing Accent dot tracking text */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-none bg-current opacity-50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2,
                delay: 0.5,
                ease: "easeInOut"
              }}
              style={{ left: "calc(50% - 150px)", width: "300px", height: "1px" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
