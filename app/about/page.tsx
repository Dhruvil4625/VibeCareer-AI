"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Github, Linkedin, Mail, Phone, Code, Cpu, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
              <Award className="w-3.5 h-3.5" />
              Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              Empowering Careers Through <span className="gradient-text">AI Innovation</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              VibeCareer AI is built to democratize professional advancement. We leverage advanced large language models to help job seekers stand out, optimize resumes, and master interviews.
            </p>
          </motion.div>
        </div>

        {/* Glow decorations */}
        <div className="hero-glow hero-glow-primary opacity-10" />
      </section>

      {/* Project Overview */}
      <section className="py-16 px-6 border-t border-[var(--border-default)]" style={{ background: "var(--bg-subtle)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8 hover:border-[var(--brand-strong)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 text-violet-600 border border-violet-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>AI Orchestration</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Using Google Gemini AI, we analyze resume bullet points, calculate ATS match scores, generate custom cover letters, and simulate realistic interview rounds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8 hover:border-[var(--brand-strong)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-600 border border-emerald-500/20">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>Modern Architecture</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Built on Next.js 16 with a serverless PostgreSQL database (Neon) and Prisma ORM, providing lightning-fast page loading and state management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-8 hover:border-[var(--brand-strong)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-600 border border-pink-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>ATS Optimizations</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Engineered with industry-standard resume structures to bypass corporate filters and rank your qualifications higher in applicant tracking systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Spotlight */}
      <section className="py-20 px-6 border-t border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              Meet the Developer
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              The brain behind the engineering and architecture of VibeCareer AI.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              {/* Profile Image / Avatar Placeholder with beautiful CSS */}
              <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-tr from-violet-600 to-pink-600 p-1 shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:rotate-6">
                  <div className="w-full h-full rounded-[20px] bg-[var(--bg-card)] flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-[var(--brand-primary)]">DR</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-70">Developer</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                  Dhruvil Ramolia
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: "var(--brand-primary)" }}>
                  Lead Full Stack & AI Integration Developer
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                  Dhruvil is a software engineer specializing in Next.js web application development, cloud databases, and generative AI workflow systems. He created VibeCareer AI to bridge the gap between candidate qualifications and technical recruiting systems.
                </p>

                {/* Contact list & Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-[var(--text-secondary)]">
                  <a href="mailto:ramoliadk@gmail.com" className="flex items-center justify-center md:justify-start gap-2.5 hover:text-[var(--brand-primary)] transition-colors">
                    <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
                    ramoliadk@gmail.com
                  </a>
                  <a href="tel:+919909945734" className="flex items-center justify-center md:justify-start gap-2.5 hover:text-[var(--brand-primary)] transition-colors">
                    <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                    +91 9909945734
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href="https://github.com/Dhruvil4625"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] font-semibold text-xs transition-all hover:bg-[var(--bg-muted)] hover:border-[var(--brand-primary)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub Portfolio
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhruvil-ramolia-3b9026266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] font-semibold text-xs transition-all hover:bg-[var(--bg-muted)] hover:border-[var(--brand-primary)]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Connection
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
