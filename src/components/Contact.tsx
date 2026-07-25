// File: src/components/Contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Mail, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";

const serviceOptions = ["Custom Web App", "Mobile App", "Shopify / CMS", "UI/UX & Motion"];
const budgetOptions = ["$1k - $3k", "$3k - $7k", "$7k+"];

export default function Contact() {
  const [selectedService, setSelectedService] = useState("Custom Web App");
  const [selectedBudget, setSelectedBudget] = useState("$3k - $7k");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 bg-neutral-950 border-t border-neutral-800/80 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Let's Build Together
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Have a Project <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                in Mind?
              </span>
            </h2>

            <p className="text-neutral-400 text-base leading-relaxed">
              Tell us about your goals, budget, and timeline. We'll get back to you with a complete roadmap within 24 hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-800/80">
              <div className="flex items-center gap-3 text-neutral-300 text-sm">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@softwareagency.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300 text-sm">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Global Remote Team / Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-2xl shadow-2xl">
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Proposal Request Received!</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    Thanks for reaching out! Our lead architect will review your project scope and contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      I'm looking for...
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                            selectedService === service
                              ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                              : "bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Budget */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Estimated Budget Range
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                            selectedBudget === budget
                              ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                              : "bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project goals, timelines, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Send Project Scope</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <span className="text-neutral-400 font-semibold">Software Agency</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Twitter / X <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}