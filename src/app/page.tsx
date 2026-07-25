// File: src/app/page.tsx
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import TechStack from "@/src/components/TechStack";
import Work from "@/src/components/Work";
import Process from "../components/Process";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="relative bg-neutral-950 text-white min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white">
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