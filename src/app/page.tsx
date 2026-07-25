// File: src/app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import TechStack from "@/src/components/TechStack";
import Work from "@/src/components/Work";
import Process from "@/src/components/Process";
import Contact from "@/src/components/Contact";
import Preloader from "@/src/components/Preloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* High-Impact Orange Diagonal Slice Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section with 3D Canvas */}
      <Hero />

      {/* Services Bento Grid Section */}
      <Services />

      {/* Tech Stack Infinite Marquee */}
      <TechStack />

      {/* 3D Perspective Card Stacking Portfolio */}
      <Work />

      {/* Interactive Workflow Execution Engine */}
      <Process />

      {/* Interactive Contact & Project Scope Form */}
      <Contact />
    </main>
  );
}