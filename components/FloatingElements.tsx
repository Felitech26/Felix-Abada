'use client';

import { motion } from 'framer-motion';

export default function FloatingElements() {
  const elements = [
    { size: 200, x: '10%', y: '20%', delay: 0, duration: 8 },
    { size: 150, x: '80%', y: '15%', delay: 1, duration: 10 },
    { size: 100, x: '70%', y: '70%', delay: 2, duration: 12 },
    { size: 120, x: '15%', y: '80%', delay: 1.5, duration: 9 },
    { size: 80, x: '50%', y: '50%', delay: 0.5, duration: 11 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: `radial-gradient(circle, ${
              index % 3 === 0
                ? 'rgba(0, 255, 240, 0.1)'
                : index % 3 === 1
                ? 'rgba(176, 38, 255, 0.1)'
                : 'rgba(0, 150, 255, 0.1)'
            } 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 border border-accent-cyan/20 rounded-lg"
        style={{ transform: 'rotate(45deg)' }}
        animate={{
          rotate: [45, 90, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-accent-purple/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
