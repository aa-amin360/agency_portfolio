// File: src/components/Process.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Palette, Cpu, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const steps = [
  {
    id: "01",
    title: "Discovery & Architecture",
    tagline: "Planning the Blueprint for Scale",
    icon: Compass,
    color: "from-indigo-500 to-blue-500",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    description:
      "We dive deep into your project requirements, user personas, and technical scope. We choose the right tech stack (Custom Web, Flutter, or Shopify/WordPress) and design the database architecture.",
    deliverables: ["Product Requirements Document", "System & DB Architecture", "Tech Stack Finalization", "Project Roadmap & Timeline"],
  },
  {
    id: "02",
    title: "UI/UX & Interactive Design",
    tagline: "High-Fidelity 3D Prototypes",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    description:
      "Our designers craft sleek, conversion-focused UI/UX design systems in Figma and interactive 3D motion prototypes in Framer/Spline to visualize the exact user experience before coding.",
    deliverables: ["Figma Design System", "Interactive Prototypes", "3D & Motion Assets", "User Experience Wireframes"],
  },
  {
    id: "03",
    title: "Full-Stack Development",
    tagline: "Pixel-Perfect High-Speed Coding",
    icon: Cpu,
    color: "from-cyan-500 to-teal-500",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    description:
      "We write clean, modular, and scalable code using Next.js, React, Node.js, Flutter, or custom CMS platforms. Integrated with GSAP & Three.js for butter-smooth 60fps animations.",
    deliverables: ["Clean Modular Codebase", "CMS / Admin Integration", "API & Payment Setup", "60fps Smooth Animations"],
  },
  {
    id: "04",
    title: "Testing, Launch & Scale",
    tagline: "100/100 Lighthouse & Zero Friction",
    icon: Rocket,
    color: "from-amber-500 to-orange-500",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description:
      "Rigorous cross-browser testing, mobile responsiveness checks, Core Web Vitals optimization, and automated CI/CD deployment. We don't just launch; we help you scale.",
    deliverables: ["Core Web Vitals Audit (100 Score)", "SEO & Metadata Setup", "Domain & Server Deployment", "Post-Launch Maintenance Support"],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-28 px-6 max-w-7xl mx-auto">
      {/* Background Subtle Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          How We Build
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Execution Engine
        </h2>
        <p className="text-neutral-400 text-base">
          Click through our 4-phase engineering process from strategy to final deployment.
        </p>
      </div>

      {/* Interactive Process Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Navigation Steps */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "group relative w-full text-left p-6 rounded-3xl border transition-all duration-300 backdrop-blur-xl flex items-center justify-between overflow-hidden",
                  isActive
                    ? "bg-neutral-900/90 border-indigo-500/50 shadow-xl shadow-indigo-500/10"
                    : "bg-neutral-950/40 border-neutral-800/80 hover:bg-neutral-900/40 hover:border-neutral-700"
                )}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className={cn("absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b", step.color)}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105",
                      isActive ? "bg-neutral-800 text-white shadow-inner" : "bg-neutral-900 text-neutral-400"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? "text-indigo-400" : "text-neutral-500")} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                      Phase {step.id}
                    </span>
                    <h3 className={cn("text-base font-bold transition-colors", isActive ? "text-white" : "text-neutral-400")}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <ArrowRight
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isActive ? "text-indigo-400 translate-x-1" : "text-neutral-600 opacity-0 group-hover:opacity-100"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Stage Preview Terminal */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 backdrop-blur-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Background Accent Glow */}
              <div
                className={cn(
                  "absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br opacity-20 blur-3xl pointer-events-none",
                  steps[activeStep].color
                )}
              />

              <div>
                {/* Header Badge & ID */}
                <div className="flex items-center justify-between mb-6">
                  <span className={cn("px-3.5 py-1 rounded-full text-xs font-semibold border", steps[activeStep].badgeColor)}>
                    {steps[activeStep].tagline}
                  </span>
                  <span className="text-4xl font-extrabold text-neutral-800 font-mono">
                    {steps[activeStep].id}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-6 border-t border-neutral-800/80">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                    Key Deliverables & Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[activeStep].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Footer */}
              <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>STAGE {activeStep + 1} OF 4</span>
                <span className="text-indigo-400 font-semibold">ENGINEERING READY →</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}