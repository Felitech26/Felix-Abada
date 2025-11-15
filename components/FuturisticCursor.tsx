import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface FuturisticCursorProps {
  isDarkMode: boolean;
}

export default function FuturisticCursor({ isDarkMode }: FuturisticCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseVelocity, setMouseVelocity] = useState(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Different spring configs for smoother animations
  const springConfig = { damping: 30, stiffness: 500 };
  const springConfigSlow = { damping: 20, stiffness: 200 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const cursorXSpringSlow = useSpring(cursorX, springConfigSlow);
  const cursorYSpringSlow = useSpring(cursorY, springConfigSlow);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const moveCursor = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;

      // Calculate velocity for dynamic effects
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (deltaTime || 1);
      setMouseVelocity(Math.min(velocity * 2, 5));

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-cursor')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render custom cursor on mobile devices
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot - precise and small */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isDarkMode ? 'bg-white' : 'bg-black'
          }`}
          animate={{
            width: isClicking ? 3 : isHovering ? 0 : 5,
            height: isClicking ? 3 : isHovering ? 0 : 5,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 600,
          }}
        />
      </motion.div>

      {/* Outer ring - sleek and minimal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full border ${
            isDarkMode ? 'border-white/50' : 'border-black/50'
          }`}
          animate={{
            width: isHovering ? 35 : isClicking ? 20 : 28,
            height: isHovering ? 35 : isClicking ? 20 : 28,
            opacity: isClicking ? 0.3 : isHovering ? 0.8 : 0.6,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 400,
          }}
        />
      </motion.div>

      {/* Slow follower ring for depth */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorXSpringSlow,
          y: cursorYSpringSlow,
        }}
      >
        <motion.div
          className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full border ${
            isDarkMode ? 'border-white/20' : 'border-black/20'
          }`}
          animate={{
            width: isHovering ? 42 : 36,
            height: isHovering ? 42 : 36,
            opacity: isHovering ? 0.5 : 0.3,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 200,
          }}
        />
      </motion.div>

      {/* Simple dot on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div
            className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}
            style={{
              width: 6,
              height: 6,
              boxShadow: isDarkMode
                ? '0 0 12px rgba(255, 255, 255, 0.5)'
                : '0 0 12px rgba(0, 0, 0, 0.3)'
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          <motion.div
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              isDarkMode ? 'border-white/40' : 'border-black/40'
            }`}
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 40, height: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* Motion trail particles */}
      {mouseVelocity > 2 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9994]"
          style={{
            x: cursorXSpringSlow,
            y: cursorYSpringSlow,
          }}
        >
          <motion.div
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isDarkMode ? 'bg-white/20' : 'bg-black/20'
            }`}
            animate={{
              width: [4, 8, 4],
              height: [4, 8, 4],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </>
  );
}
