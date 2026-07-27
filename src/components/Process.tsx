// File: src/components/Process.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useContent } from "@/src/context/ContentContext";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { content } = useContent();
  const steps = content.process;

  // Scroll height & speed untouched (400vh)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.clientHeight - window.innerHeight;
      
      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(0.99, currentScroll / totalHeight));

      if (progress < 0.25) setActiveStep(0);
      else if (progress < 0.50) setActiveStep(1);
      else if (progress < 0.75) setActiveStep(2);
      else setActiveStep(3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Scroll height kept untouched at h-[400vh]
    <section ref={containerRef} id="process" className="relative h-[400vh] bg-neutral-950">
      
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-neutral-800/80 pb-6">
          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            How we work<span className="text-indigo-500">.</span>
          </h2>
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            // PROCESS PIPELINE
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Numbered List */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id || idx}
                  onClick={() => setActiveStep(idx)}
                  className="cursor-pointer group flex items-start gap-4 transition-all duration-300"
                >
                  {/* Single Sliding Active Cube */}
                  <div className="w-4 h-4 pt-1.5 shrink-0 flex items-center justify-center">
                    {isActive ? (
                      <motion.div
                        layoutId="activeProcessSquare"
                        className="w-3.5 h-3.5 rounded-sm bg-indigo-500 shadow-lg shadow-indigo-500/70"
                        transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    )}
                  </div>

                  {/* Text Header & Body */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-xs font-mono font-bold transition-colors duration-300",
                          isActive ? "text-indigo-400" : "text-neutral-600"
                        )}
                      >
                        {step.id}
                      </span>
                      <h3
                        className={cn(
                          "text-xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300",
                          isActive ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-neutral-400 text-xs sm:text-sm leading-relaxed pt-2"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Fluid Card Transition (300ms ease-in-out fade & slide) */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[400px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-2xl shadow-2xl shadow-black overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Badge & ID */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                    {steps[activeStep]?.badge || `PHASE 0${activeStep + 1}`}
                  </span>
                  <span className="text-4xl font-black text-neutral-800 font-mono">
                    {steps[activeStep]?.id || `0${activeStep + 1}`}
                  </span>
                </div>

                <h4 className="text-xl sm:text-3xl font-bold text-white mb-6">
                  {steps[activeStep]?.title}
                </h4>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-6 border-t border-neutral-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-3">
                    Key Execution Artifacts:
                  </span>
                  {steps[activeStep]?.deliverables?.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Step Dots Footer */}
                <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>STEP {activeStep + 1} OF 4</span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          dot === activeStep ? "bg-indigo-500 w-6" : "bg-neutral-800"
                        )}
                      />
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}