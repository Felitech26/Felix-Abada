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

  // Split text into characters for futuristic stagger effect
  const characters = MOTIVATION_TEXT.split("");

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#fafafa] dark:bg-[#050505] text-[#1a1a1a] dark:text-[#e0e0e0] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="relative perspective-[1000px]">
            {/* Minimalist Grid Line for depth */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-0 bg-current opacity-20"
              initial={{ height: 0 }}
              animate={{ height: "200px" }}
              transition={{ duration: 1, ease: "circOut" }}
            />

            <motion.div 
              className="flex font-mono text-xs md:text-sm tracking-[0.4em] uppercase font-semibold text-center mt-[100px]"
            >
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.04, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block relative z-10"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
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
