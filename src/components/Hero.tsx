// File: src/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import HeroCanvas from "@/src/components/HeroCanvas";
import AsciiArt from "@/src/components/AsciiArt";
import { useContent } from "@/src/context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    // Removed forced min-h-screen & flex centering to eliminate top and bottom black voids
    <section className="relative pt-28 pb-12 px-6 overflow-hidden">
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-20" />

      {/* Compact Content Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Headline & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center gap-5 w-full">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md text-xs sm:text-sm font-medium text-neutral-300 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>{hero.badge}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] w-full"
          >
            {hero.titleLine1} <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {hero.titleLine2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-1 w-full sm:w-auto"
          >
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-neutral-800 bg-neutral-900/70 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-sm backdrop-blur-md transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Quick Tech Highlights Footer Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-neutral-800/80 w-full"
          >
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm sm:text-base">
                <Globe className="w-4 h-4 shrink-0" /> Custom Web
              </div>
              <span className="text-xs text-neutral-500 mt-1 block">Next.js & React</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm sm:text-base">
                <Smartphone className="w-4 h-4 shrink-0" /> Mobile Apps
              </div>
              <span className="text-xs text-neutral-500 mt-1 block">iOS & Android</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm sm:text-base">
                <Code2 className="w-4 h-4 shrink-0" /> Any CMS
              </div>
              <span className="text-xs text-neutral-500 mt-1 block">WP, Shopify, Wix</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Integrated ASCII Portrait Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <AsciiArt />
        </motion.div>

      </div>
    </section>
  );
}