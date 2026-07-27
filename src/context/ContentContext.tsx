// File: src/context/ContentContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Default Initial Content
const initialContent = {
  hero: {
    badge: "Accepting New Projects & Scale-ups",
    titleLine1: "Crafting Digital",
    titleLine2: "Experiences That Scale",
    subtitle:
      "We are a full-service software agency specializing in high-performance Web Apps, Mobile Apps, Custom Websites, and CMS platforms like Shopify, WordPress, and Wix.",
  },
  projects: [
    {
      id: 1,
      title: "Apex AI — Next-Gen SaaS Platform",
      category: "Custom Web App / Next.js",
      metric: "3.2x User Growth",
      description:
        "Architected a full-stack AI platform with real-time WebSockets, GSAP interactive dashboard, and Stripe payments.",
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
      description:
        "Custom headless Shopify theme with 3D product previews (Three.js), smooth cart animations, and instant checkout.",
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
      description:
        "Cross-platform mobile application featuring health telemetry tracking, custom micro-interactions, and dark mode UI.",
      tags: ["React Native", "Flutter", "Node.js", "Figma"],
      glowGradient: "from-cyan-600/40 via-blue-600/20 to-transparent",
      border: "hover:border-cyan-500/80",
      accentColor: "bg-cyan-500",
    },
  ],
  process: [
    {
      id: "01",
      title: "Send us a brief.",
      description:
        "One paragraph is enough. We reply within 24 business hours with architectural breakdown, tech feasibility, and scope assessment.",
      badge: "PHASE 01 // DISCOVERY",
      deliverables: ["Product Architecture", "Tech Stack Selection", "Scope & Budget Mapping"],
    },
    {
      id: "02",
      title: "One conversation.",
      description:
        "You tell us where the brand is going. We give you a clear picture of the design artifacts, timeline, and cost before you commit to anything.",
      badge: "PHASE 02 // ROADMAP",
      deliverables: ["Figma UI/UX Wireframes", "Interactive 3D Prototypes", "Milestone Timeline"],
    },
    {
      id: "03",
      title: "Design and build.",
      description:
        "Custom-coded from the ground up using Next.js, React, Flutter, or Shopify/WordPress. Motion is the medium, running through every transition and interaction.",
      badge: "PHASE 03 // ENGINEERING",
      deliverables: ["Modular Custom Code", "60fps GSAP & 3D Motion", "CMS / Admin Integration"],
    },
    {
      id: "04",
      title: "Ship.",
      description:
        "Rigorous cross-browser testing, 100/100 Lighthouse performance, Core Web Vitals optimization, and seamless automated CI/CD deployment.",
      badge: "PHASE 04 // LAUNCH & SCALE",
      deliverables: ["Lighthouse 100 Audit", "SEO & Meta Optimization", "Production Server Deployment"],
    },
  ],
};

export type ContentType = typeof initialContent;

interface ContentContextType {
  content: ContentType;
  saveAllContent: (newContent: ContentType) => void;
  resetToDefault: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentType>(initialContent);

  // 1. Initial load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("agency_site_content");
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved content", e);
      }
    }
  }, []);

  // 2. Real-time cross-tab sync listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "agency_site_content" && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Storage sync error", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Atomic single-call save function
  const saveAllContent = (newContent: ContentType) => {
    setContent(newContent);
    localStorage.setItem("agency_site_content", JSON.stringify(newContent));
  };

  const resetToDefault = () => {
    localStorage.removeItem("agency_site_content");
    setContent(initialContent);
  };

  return (
    <ContentContext.Provider value={{ content, saveAllContent, resetToDefault }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}