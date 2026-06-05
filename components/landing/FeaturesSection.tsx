"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  Mail,
  Search,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
  Target,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    color: "#7c3aed",
    gradient: "from-violet-500/20 to-purple-500/10",
    title: "AI Resume Builder",
    description:
      "Create ATS-optimized resumes with AI-generated bullet points. Choose from 5+ premium templates and export to PDF instantly.",
    tags: ["ATS Checker", "PDF Export", "5+ Templates"],
  },
  {
    icon: Mail,
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-500/10",
    title: "Cover Letter Generator",
    description:
      "Generate compelling, tailored cover letters for any role. Pick your tone — professional, enthusiastic, or creative.",
    tags: ["3 Tone Options", "Company-Specific", "One-Click Generate"],
  },
  {
    icon: Search,
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-cyan-500/10",
    title: "AI Job Matching",
    description:
      "Search thousands of jobs and get AI-powered match scores based on your skills and experience. Apply smarter, not harder.",
    tags: ["Match Score", "Smart Filters", "Save & Track"],
  },
  {
    icon: KanbanSquare,
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-500/10",
    title: "Application Tracker",
    description:
      "Drag-and-drop Kanban board to manage your entire job search pipeline from Wishlist to Offer in one organized view.",
    tags: ["Kanban Board", "Status Updates", "Interview Reminders"],
  },
  {
    icon: MessageSquare,
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/10",
    title: "AI Career Coach",
    description:
      "Chat with your personal AI career coach for advice, skill gap analysis, and a personalized 30/60/90-day career roadmap.",
    tags: ["24/7 Available", "Personalized Plans", "Skill Gaps"],
  },
  {
    icon: Mic,
    color: "#8b5cf6",
    gradient: "from-purple-500/20 to-violet-500/10",
    title: "Mock Interviewer",
    description:
      "Practice behavioral, technical, and HR interview questions with real-time AI feedback on clarity, confidence, and content.",
    tags: ["AI Feedback", "3 Question Types", "Score Report"],
  },
  {
    icon: Linkedin,
    color: "#0ea5e9",
    gradient: "from-sky-500/20 to-blue-500/10",
    title: "LinkedIn Optimizer",
    description:
      "Paste your LinkedIn sections and let AI rewrite your headline, summary, and experience for maximum recruiter visibility.",
    tags: ["AI Rewrite", "Before/After", "Keyword Rich"],
  },
  {
    icon: Target,
    color: "#f97316",
    gradient: "from-orange-500/20 to-red-500/10",
    title: "Career Score",
    description:
      "Get your overall career readiness score based on your resume quality, applications, interview performance, and profile completeness.",
    tags: ["0-100 Score", "Improvement Tips", "Progress Tracking"],
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="card p-6 group relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: feature.color }} />
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {feature.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${feature.color}12`,
                color: feature.color,
                border: `1px solid ${feature.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            Everything You Need
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            One Platform.{" "}
            <span className="gradient-text">Infinite Opportunities.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Eight powerful AI-driven tools that cover every step of your job search journey
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
