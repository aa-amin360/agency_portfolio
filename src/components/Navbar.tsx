"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Stack", href: "#stack" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl shadow-black/50"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight text-white group-hover:text-neutral-300 transition-colors">
            Agency<span className="text-indigo-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="hoverBg"
                  className="absolute inset-0 bg-neutral-800/60 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          >
            <span>Book a Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-neutral-300 hover:text-white p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 md:hidden p-6 rounded-3xl bg-neutral-900/95 border border-neutral-800 backdrop-blur-2xl shadow-2xl flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-300 hover:text-white transition-colors py-2 border-b border-neutral-800/50"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-medium text-black bg-white hover:bg-neutral-200 transition-colors"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}