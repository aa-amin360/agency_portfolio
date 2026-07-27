// File: src/components/Work.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/src/context/ContentContext";

interface CardProps {
  project: any;
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
        className={`relative w-full max-w-5xl rounded-3xl p-8 sm:p-12 bg-neutral-900 border border-neutral-800 shadow-2xl shadow-black transition-all duration-300 ${project.border || "hover:border-indigo-500/80"} group overflow-hidden`}
      >
        {/* Inner Ambient Glow over solid background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.glowGradient || "from-indigo-600/40 via-purple-600/20 to-transparent"} opacity-60 pointer-events-none -z-10`} />

        {/* Top Header inside Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${project.accentColor || "bg-indigo-500"} animate-ping`} />
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
              {project.tags?.map((tag: string) => (
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
  const { content } = useContent();
  const projects = content.projects;
  
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

      {/* 3D Stacking Cards Deck powered by Admin Context */}
      <div className="relative">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={project.id || i}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i * (1 / Math.max(1, projects.length)), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}