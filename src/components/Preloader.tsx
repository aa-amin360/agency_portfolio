// File: src/components/Preloader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep loading screen for 2.4 seconds to complete cube tumble cycles
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) {
        setTimeout(onComplete, 900);
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          exit={{
            // Clockwise Pivot Exit anchored at Bottom-Left (0% 100%)
            clipPath: [
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",       // Full Screen
              "polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)",     // Diagonal Cut
              "polygon(100% 100%, 100% 100%, 100% 100%, 0% 100%)"  // Collapsed to Bottom-Right
            ],
          }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-950 to-neutral-950 text-white select-none pointer-events-auto shadow-2xl"
        >
          {/* Ambient Glow Light */}
          <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[150px] rounded-full pointer-events-none" />

          {/* Centered Animated Container */}
          <div className="relative z-10 flex flex-col items-center gap-5">
            
            {/* 5 Small Tumbling Cubes */}
            <div className="flex items-center gap-1.5 perspective-1000">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotateX: [0, 180, 360],
                    rotateZ: [0, 90, 0],
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.12, // Staggered tumbling sequence
                  }}
                  className="w-3.5 h-3.5 bg-white rounded-[2px] shadow-md shadow-white/40"
                />
              ))}
            </div>

            {/* LOADING Text */}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[11px] font-black tracking-[0.4em] uppercase text-indigo-200 font-mono mt-1"
            >
              LOADING
            </motion.span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}