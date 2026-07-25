// File: src/components/Work.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Apex AI — Next-Gen SaaS Platform",
    category: "Custom Web App / Next.js",
    metric: "3.2x User Growth",
    description: "Architected a full-stack AI platform with real-time WebSockets, GSAP interactive dashboard, and Stripe payments.",
    tags: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    glowGradient: "from-indigo-600/40 via-purple-600/20 to-transparent",
    border: "hover:border-indigo-500/80",
    accentColor: "bg-indigo-500",
  },
  {
    id: 2,
    title: "Luxe Atelier — High-End Fashion Store",
    category: "Shopify E-Commerce",
    metric: "+180% Sales Conversion",
    description: "Custom headless Shopify theme with 3D product previews (Three.js), smooth cart animations, and instant checkout.",
    tags: ["Shopify", "Three.js", "Liquid", "Tailwind"],
    glowGradient: "from-pink-600/40 via-rose-600/20 to-transparent",
    border: "hover:border-pink-500/80",
    accentColor: "bg-pink-500",
  },
  {
    id: 3,
    title: "NeuraHealth — Mobile Fitness Tracker",
    category: "Mobile App / iOS & Android",
    metric: "100k+ Active Downloads",
    description: "Cross-platform mobile application featuring health telemetry tracking, custom micro-interactions, and dark mode UI.",
    tags: ["React Native", "Flutter", "Node.js", "Figma"],
    glowGradient: "from-cyan-600/40 via-blue-600/20 to-transparent",
    border: "hover:border-cyan-500/80",
    accentColor: "bg-cyan-500",
  },
];

interface CardProps {
  project: (typeof projects)[0];
  index: number;
  progress: any;
  range: number[];
  targetScale: number;
}

function Card({ project, index, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Perspective Transforms
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotateX = useTransform(progress, range, [0, -10]);

  return (
    <div
      ref={containerRef}
      className="sticky top-28 flex items-center justify-center mb-12 perspective-1000"
    >
      <motion.div
        style={{
          scale,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        // Solid bg-neutral-900 used to block 100% of underlying card text bleed-through
        className={`relative w-full max-w-5xl rounded-3xl p-8 sm:p-12 bg-neutral-900 border border-neutral-800 shadow-2xl shadow-black transition-all duration-300 ${project.border} group overflow-hidden`}
      >
        {/* Inner Ambient Glow over solid background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.glowGradient} opacity-60 pointer-events-none -z-10`} />

        {/* Top Header inside Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${project.accentColor} animate-ping`} />
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300 bg-neutral-950/80 px-3 py-1 rounded-full border border-neutral-800">
              {project.category}
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {project.metric}
          </span>
        </div>

        {/* Content & Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-neutral-950/90 border border-neutral-800 rounded-lg text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-300 shadow-xl group-hover:scale-105"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" ref={containerRef} className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Selected Works
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Crafted With Precision & Impact
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base">
          Scroll down to explore how we stack real results for ambitious brands.
        </p>
      </div>

      {/* 3D Stacking Cards Deck */}
      <div className="relative">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={project.id}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}