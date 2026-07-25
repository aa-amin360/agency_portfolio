"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import HeroCanvas from "@/src/components/HeroCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-16 overflow-hidden">
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-20" />

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 z-10">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs sm:text-sm text-neutral-300 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Accepting New Projects & Scale-ups</span>
        </motion.div>

        {/* Main Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
        >
          Crafting Digital <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Experiences That Scale
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed"
        >
          We are a full-service software agency specializing in high-performance Web Apps, Mobile Apps, Custom Websites, and CMS platforms like Shopify, WordPress, and Wix.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
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

        {/* Quick Tech Highlights / Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-6 sm:gap-12 mt-12 pt-8 border-t border-neutral-800/60 w-full max-w-2xl text-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl sm:text-2xl">
              <Globe className="w-5 h-5" /> Custom Web
            </div>
            <span className="text-xs text-neutral-500 mt-1">Next.js & React</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xl sm:text-2xl">
              <Smartphone className="w-5 h-5" /> Mobile Apps
            </div>
            <span className="text-xs text-neutral-500 mt-1">iOS & Android</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-xl sm:text-2xl">
              <Code2 className="w-5 h-5" /> Any CMS
            </div>
            <span className="text-xs text-neutral-500 mt-1">WP, Shopify, Wix</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}