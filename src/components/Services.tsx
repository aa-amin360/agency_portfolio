// File: src/components/Services.tsx
"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, ShoppingBag, Palette, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    id: "web",
    title: "Custom Web Development",
    description: "High-speed, scalable web applications built with Next.js, React, Node.js, and complex 3D/GSAP animations.",
    icon: Code2,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    border: "group-hover:border-indigo-500/50",
    tags: ["Next.js", "React", "Node.js", "Three.js", "GSAP"],
    featured: true,
  },
  {
    id: "cms",
    title: "CMS & E-Commerce",
    description: "Tailored e-commerce stores & business sites using WordPress, Shopify, Wix, and Squarespace.",
    icon: ShoppingBag,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    border: "group-hover:border-pink-500/50",
    tags: ["Shopify", "WordPress", "Wix", "Squarespace", "WooCommerce"],
    featured: false,
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Cross-platform iOS & Android mobile applications with native performance and smooth UI animations.",
    icon: Smartphone,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "group-hover:border-cyan-500/50",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    featured: false,
  },
  {
    id: "design",
    title: "UI/UX & Motion Design",
    description: "Figma wireframing, micro-interactions, 3D assets, and interactive Framer Motion prototypes.",
    icon: Palette,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "group-hover:border-amber-500/50",
    tags: ["Framer", "Figma", "Design Systems", "Interactive UI"],
    featured: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider"
        >
          Our Capabilities
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Everything You Need To Build & Scale Online
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-neutral-400 text-base sm:text-lg"
        >
          From complex SaaS platforms to full CMS e-commerce stores and mobile apps — we deliver top-tier engineering.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:scale-[1.01] shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10",
                service.featured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
              )}
            >
              {/* Background Ambient Glow */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10",
                  service.gradient
                )}
              />

              <div>
                {/* Top Bar: Icon & Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Skill Badges / Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800/50">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800/60 border border-neutral-700/40 text-neutral-300 group-hover:border-neutral-600 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}