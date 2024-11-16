"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";


type Header = {
  phrase: string,
  className?: string
}

function Header3({ phrase, className }: Header) {
  const topRef = useRef(null);
  const top = useInView(topRef, { once: true });

  const EASING = [0.83, 0, 0.17, 1]
  const DELAY = 0.006

  return (
    <h3
      ref={topRef}
      className={`${className} text-textDark text-[17px] flex justify-center items-center
       font-medium leading-[1.4] overflow-hidden`}
    >
      {phrase.split("").map((letter, i) => {
        return (
          <motion.span
            initial={{ y: "100%", rotateZ: 5 }}
            animate={
              top && {
                y: 0,
                rotateZ: 0,
                transition: {
                  duration: 0.6,
                  delay: i * DELAY,
                  ease: EASING,
                },
              }
            }
            key={`${letter}_${i}`}
            className="inline-block"
          >
            {letter === " " ? <span className="mr-1"></span> : letter}
          </motion.span>
        );
      })}
    </h3>
  );
}

export default Header3;
