// File: src/components/TechStack.tsx
"use client";

import { motion } from "framer-motion";

const row1 = [
  { name: "Next.js", category: "Custom Web" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "GSAP", category: "Animation" },
  { name: "Three.js", category: "3D Motion" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Backend" },
  { name: "GraphQL", category: "API" },
];

const row2 = [
  { name: "Shopify", category: "CMS & E-Com" },
  { name: "WordPress", category: "CMS" },
  { name: "Wix", category: "CMS" },
  { name: "Squarespace", category: "CMS" },
  { name: "Flutter", category: "Mobile App" },
  { name: "React Native", category: "Mobile App" },
  { name: "Figma", category: "UI/UX" },
  { name: "Framer", category: "Web Design" },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-20 bg-neutral-950/80 border-y border-neutral-800/60 overflow-hidden">
      {/* Background Gradient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-purple-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20">
          Powered By Cutting-Edge Tech
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4">
          Technologies We Master & Build With
        </h2>
      </div>

      {/* Edge Gradient Mask Overlay for Seamless Fade Effect */}
      <div className="relative flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        
        {/* Row 1: Left to Right Marquee */}
        <div className="flex overflow-hidden w-full select-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            className="flex gap-4 flex-nowrap min-w-max"
          >
            {[...row1, ...row1].map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-indigo-500/40 backdrop-blur-md transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-semibold text-white">{item.name}</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="flex overflow-hidden w-full select-none">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-4 flex-nowrap min-w-max"
          >
            {[...row2, ...row2].map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-purple-500/40 backdrop-blur-md transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-semibold text-white">{item.name}</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}