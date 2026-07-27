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
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-20" />

      {/* 2-Column Responsive Layout Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Column: Headline, Subtitle & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs sm:text-sm text-neutral-300 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>{hero.badge}</span>
          </motion.div>

          {/* Main Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            {hero.titleLine1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {hero.titleLine2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/80 text-neutral-300 hover:text-white font-medium text-sm backdrop-blur-md transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Quick Tech Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-6 pt-6 border-t border-neutral-800/60 w-full"
          >
            <div>
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-sm sm:text-base">
                <Globe className="w-4 h-4" /> Custom Web
              </div>
              <span className="text-xs text-neutral-500 mt-0.5 block">Next.js & React</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-purple-400 font-bold text-sm sm:text-base">
                <Smartphone className="w-4 h-4" /> Mobile Apps
              </div>
              <span className="text-xs text-neutral-500 mt-0.5 block">iOS & Android</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-pink-400 font-bold text-sm sm:text-base">
                <Code2 className="w-4 h-4" /> Any CMS
              </div>
              <span className="text-xs text-neutral-500 mt-0.5 block">WP, Shopify, Wix</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: ASCII Portrait Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <AsciiArt />
        </motion.div>

      </div>
    </section>
  );
}