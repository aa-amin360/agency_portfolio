// File: src/app/admin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useContent } from "@/src/context/ContentContext";
import {
  Save,
  RotateCcw,
  Eye,
  Layout,
  Briefcase,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";

export default function AdminPage() {
  const { content, saveAllContent, resetToDefault } = useContent();

  const [activeTab, setActiveTab] = useState<"hero" | "projects" | "process">("hero");
  const [saveNotice, setSaveNotice] = useState(false);

  // Local state initialized with current content
  const [heroData, setHeroData] = useState(content.hero);
  const [projectsData, setProjectsData] = useState(content.projects);
  const [processData, setProcessData] = useState(content.process);

  const handleSave = () => {
    // Atomic single call save function
    saveAllContent({
      hero: heroData,
      projects: projectsData,
      process: processData,
    });
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  const handleReset = () => {
    resetToDefault();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 sm:p-12 selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" /> CMS Admin Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Website Content Manager
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 transition-colors"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-rose-400 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {saveNotice ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saveNotice ? "Saved Live!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "hero"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Hero Section</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "projects"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio / Projects</span>
          </button>

          <button
            onClick={() => setActiveTab("process")}
            className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "process"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Process Steps</span>
          </button>
        </div>

        {/* Content Editor Window */}
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl">
          
          {/* TAB 1: HERO SECTION */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-4">
                Edit Hero Section Content
              </h2>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={heroData.badge}
                  onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    Title Line 1
                  </label>
                  <input
                    type="text"
                    value={heroData.titleLine1}
                    onChange={(e) => setHeroData({ ...heroData, titleLine1: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                    Title Line 2 (Gradient Color)
                  </label>
                  <input
                    type="text"
                    value={heroData.titleLine2}
                    onChange={(e) => setHeroData({ ...heroData, titleLine2: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                  Subtitle / Agency Bio
                </label>
                <textarea
                  rows={3}
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-4">
                Edit Portfolio Case Studies
              </h2>

              {projectsData.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                    <span>PROJECT #{idx + 1}</span>
                    <span>ID: {project.id}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const updated = [...projectsData];
                          updated[idx].title = e.target.value;
                          setProjectsData(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => {
                          const updated = [...projectsData];
                          updated[idx].category = e.target.value;
                          setProjectsData(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(e) => {
                        const updated = [...projectsData];
                        updated[idx].description = e.target.value;
                        setProjectsData(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PROCESS */}
          {activeTab === "process" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-4">
                Edit Process Steps
              </h2>

              {processData.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                    <span>PHASE {step.id}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Step Title
                    </label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...processData];
                        updated[idx].title = e.target.value;
                        setProcessData(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                      Step Description
                    </label>
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...processData];
                        updated[idx].description = e.target.value;
                        setProcessData(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}