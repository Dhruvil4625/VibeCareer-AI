"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Pause,
  CheckCircle2, 
  Zap, 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Search, 
  KanbanSquare,
  X,
  Volume2,
  VolumeX,
  RefreshCw,
  ExternalLink,
  Laptop,
  Mic,
  Cpu
} from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { Magnetic } from "@/components/shared/Magnetic";

const highlights = [
  "ATS-Optimized Resumes",
  "AI Career Coach",
  "Mock Interviews",
  "Job Matching",
];

const floatingBadges = [
  { label: "Resume Score: 94%", emoji: "📄", position: "top-20 left-8 md:left-20", delay: 0 },
  { label: "Interview Ready!", emoji: "🎤", position: "top-40 right-8 md:right-24", delay: 0.4 },
  { label: "+12 Job Matches", emoji: "🎯", position: "bottom-32 left-8 md:left-32", delay: 0.8 },
  { label: "Offer Received 🎉", emoji: "🏆", position: "bottom-20 right-8 md:right-16", delay: 1.2 },
];

export function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* 3D Background Design Layers */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="cyber-grid-3d" />
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Floating 3D Crystal Wafers & Background Orbs (Light mode unique interactive accents) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* Parallax Crystal 1 (Top Left) */}
        <div className="parallax-layer-1 absolute top-[12%] left-[10%] w-40 h-28">
          <div className="glass-wafer animate-wafer-1 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/20 via-violet-400/20 to-cyan-400/25 rounded-[inherit] mix-blend-overlay" />
            <div className="absolute inset-px border border-white/50 rounded-[inherit]" />
          </div>
        </div>
        
        {/* Parallax Crystal 2 (Middle Right) */}
        <div className="parallax-layer-2 absolute top-[38%] right-[8%] w-32 h-44">
          <div className="glass-wafer animate-wafer-2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-fuchsia-400/20 to-amber-400/25 rounded-[inherit] mix-blend-overlay" />
            <div className="absolute inset-px border border-white/50 rounded-[inherit]" />
          </div>
        </div>

        {/* Parallax Crystal 3 (Bottom Left) */}
        <div className="parallax-layer-3 absolute bottom-[18%] left-[12%] w-48 h-24">
          <div className="glass-wafer animate-wafer-3 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-400/20 via-rose-400/20 to-emerald-400/25 rounded-[inherit] mix-blend-overlay" />
            <div className="absolute inset-px border border-white/50 rounded-[inherit]" />
          </div>
        </div>

        {/* Parallax Crystal 4 (Top Right) */}
        <div className="parallax-layer-1 absolute top-[15%] right-[15%] w-28 h-28" style={{ transitionDelay: "50ms" }}>
          <div className="glass-wafer animate-wafer-1 w-full h-full" style={{ animationDelay: "-3s" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-indigo-400/25 rounded-[inherit] mix-blend-overlay" />
            <div className="absolute inset-px border border-white/50 rounded-[inherit]" />
          </div>
        </div>

        {/* Parallax Background Orb 1 (Top Left Area) */}
        <div className="parallax-layer-2 absolute top-[22%] left-[4%] w-36 h-36">
          <div className="orb-3d w-full h-full" />
        </div>

        {/* Parallax Background Orb 2 (Bottom Right Area) */}
        <div className="parallax-layer-3 absolute bottom-[12%] right-[12%] w-48 h-48">
          <div className="orb-3d orb-3d-cyan w-full h-full" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Parallax Background Orb 3 (Mid Right Area) */}
        <div className="parallax-layer-1 absolute top-[48%] left-[78%] w-24 h-24">
          <div className="orb-3d w-full h-full" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      {/* Floating Badges */}
      {floatingBadges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: badge.delay + 1, duration: 0.5, ease: "easeOut" }}
          className={`absolute ${badge.position} hidden lg:flex items-center gap-2 glass rounded-2xl px-4 py-2 shadow-[var(--shadow-lg)] z-10`}
          style={{
            border: "1px solid var(--border-default)",
            animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <span className="text-lg">{badge.emoji}</span>
          <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
            {badge.label}
          </span>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-sm font-medium border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50"
          style={{ color: "var(--brand-primary)" }}
        >
          <Sparkles className="w-4 h-4" />
          Powered by Gemini AI
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">New</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
        >
          Land Your{" "}
          <span className="gradient-text">Dream Job</span>
          <br />
          With the Power of{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          The complete AI career platform. Build ATS-beating resumes, generate
          personalized cover letters, track applications, and ace interviews —
          all in one beautiful workspace.
        </motion.p>

        {/* Highlight Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {highlights.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-full px-3 py-1"
              style={{
                background: "var(--bg-muted)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-default)",
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Magnetic>
            <Link
              href="/sign-up"
              id="hero-cta-primary"
              className="btn-primary px-8 py-4 text-base animate-pulse-glow"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Magnetic>
          <Magnetic>
            <button
              id="hero-cta-secondary"
              onClick={() => setShowDemo(true)}
              className="inline-flex items-center gap-3 px-6 py-4 text-base font-semibold rounded-xl border border-[var(--border-default)] transition-all duration-200 hover:bg-[var(--bg-muted)] hover:border-[var(--border-strong)] group"
              style={{ color: "var(--text-primary)" }}
            >
              <span className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-violet-600 dark:text-violet-400 ml-0.5" />
              </span>
              Watch Demo
            </button>
          </Magnetic>
        </motion.div>

        {/* 3D Interactive Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-4xl mx-auto mb-16 relative px-4"
        >
          {/* Neon shadow backing glow */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-sky-600/30 opacity-40 blur-2xl animate-pulse-glow" />
          
          <TiltCard className="w-full">
            <div className="conic-glow-wrapper">
              <div className="conic-glow-spinner" />
              <div className="conic-glow-content p-4 md:p-6 overflow-hidden text-left font-sans select-none">
                {/* Header simulation */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                      VibeCareer <span className="gradient-text">AI</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                </div>

                {/* Grid: Sidebar + Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Sidebar */}
                  <div className="hidden md:flex flex-col gap-1 pr-4 border-r border-[var(--border-default)]">
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-violet-500/10 text-violet-500 text-xs font-semibold">
                      <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                    </div>
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-muted)]">
                      <FileText className="w-3.5 h-3.5" /> Resume Builder
                    </div>
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-muted)]">
                      <MessageSquare className="w-3.5 h-3.5" /> AI Coach
                    </div>
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-muted)]">
                      <Search className="w-3.5 h-3.5" /> Job Search
                    </div>
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-muted)]">
                      <KanbanSquare className="w-3.5 h-3.5" /> Job Tracker
                    </div>
                  </div>

                  {/* Dashboard Main View */}
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left content stack: ATS & AI Bullets */}
                    <div className="md:col-span-2 space-y-4 layer-depth-1">
                      {/* ATS gauge */}
                      <div className="card p-4 relative overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>ATS Strength Assessment</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold">Excellent</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-emerald-500/20">
                            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow" />
                            <span className="font-black text-sm text-emerald-500">89%</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Resume Optimized</p>
                            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Targeting: Senior React Developer</p>
                          </div>
                        </div>
                      </div>

                      {/* Bullet optimization */}
                      <div className="card p-4" style={{ background: "var(--bg-subtle)" }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>AI Suggestion</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500 font-semibold">Gemini Flash</span>
                        </div>
                        <div className="space-y-2">
                          <div className="p-2 rounded border border-red-500/20 bg-red-500/5 text-[10px] line-through text-red-400">
                            "I helped build the company website using React and CSS."
                          </div>
                          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-semibold text-emerald-500 flex items-start gap-1.5">
                            <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            <span>"Engineered responsive web apps using React 19, improving page load speed by 35%."</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: AI Coach chat bubble (parallax height) */}
                    <div className="card p-4 flex flex-col justify-between layer-depth-2" style={{ background: "var(--bg-subtle)" }}>
                      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[var(--border-default)]">
                        <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-xs font-black" style={{ color: "var(--text-primary)" }}>AI Coach</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto" />
                      </div>

                      {/* Chat dialog simulation */}
                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[140px] pr-1">
                        <div className="bg-[var(--bg-muted)] p-2 rounded-lg text-[10px] text-[var(--text-secondary)]">
                          How can I negotiate a higher developer salary?
                        </div>
                        <div className="bg-violet-500/10 border border-violet-500/10 p-2 rounded-lg text-[10px] text-[var(--text-primary)] font-medium leading-relaxed">
                          ✨ Focus on your past value metrics. Mention: "At my last role, I drove a 14% increase in user retention..."
                        </div>
                      </div>

                      {/* Typing simulate */}
                      <div className="mt-2 pt-2 border-t border-[var(--border-default)] flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                        <span>Ask AI Coach...</span>
                        <ArrowRight className="w-3 h-3 text-violet-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Floating 3D balls decoration */}
          <div className="orb-3d w-20 h-20 -top-8 -right-8" />
          <div className="orb-3d orb-3d-cyan w-16 h-16 -bottom-10 -left-6" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#7c3aed", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-[var(--bg-base)] flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: color, zIndex: 5 - i }}
                >
                  {["A", "B", "C", "D", "E"][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Trusted by <span className="font-bold" style={{ color: "var(--text-primary)" }}>10,000+</span> job seekers
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-[var(--border-default)]" />

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="font-bold text-emerald-500">87%</span> of users land interviews within 30 days
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
        }}
      />

      {/* Interactive Watch Demo Video Player Modal */}
      <AnimatePresence>
        {showDemo && (
          <DemoModal onClose={() => setShowDemo(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Subcomponent: Genuinely Interactive Video Demo Modal
function DemoModal({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"dashboard" | "resume" | "coach" | "interview" | "linkedin" | "tracker" | "architecture">("dashboard");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to synthesize text-to-speech voiceover
  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isMuted || !isPlaying) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05; // Narration pacing speed
    utterance.volume = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Playback timer loop (28s duration loop: 4 seconds per tab)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 28) {
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Synchronize Active Subpage Tab based on playback progress
  useEffect(() => {
    if (progress < 4) {
      setActiveTab("dashboard");
    } else if (progress < 8) {
      setActiveTab("resume");
    } else if (progress < 12) {
      setActiveTab("coach");
    } else if (progress < 16) {
      setActiveTab("interview");
    } else if (progress < 20) {
      setActiveTab("linkedin");
    } else if (progress < 24) {
      setActiveTab("tracker");
    } else {
      setActiveTab("architecture");
    }
  }, [progress]);

  // Handle active speech narrations when activeTab, isPlaying, or isMuted changes
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const narrationScript = {
      dashboard: "Welcome to VibeCareer AI. This is your Career Command Center, where you can track your career readiness score, unlocked achievements, and monthly trends.",
      resume: "Build ATS-optimized resumes using our split editor workspace. Simply click the AI Boost button to let Gemini upgrade your experience bullets with STAR metrics.",
      coach: "Chat with your personal AI Career Coach for guidance on salary negotiations, interview prep, or career transitions.",
      interview: "Prep for interviews using our Mock Interview Simulator. Record your spoken answers and receive detailed feedback ratings and model answers.",
      linkedin: "Optimize your LinkedIn profile to pull in recruiters. Analyze your visibility metrics and find predicted job fits instantly.",
      tracker: "Organize your job search with our drag-and-drop Kanban tracker. Shift jobs between columns as you advance through rounds.",
      architecture: "For recruiters checking your portfolio, the System Design tab outlines the technical database schemas and AI request pipelines."
    };

    speak(narrationScript[activeTab]);
  }, [activeTab, isPlaying, isMuted]);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const gridRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - gridRect.left;
    const width = gridRect.width;
    const clickedProgress = Math.min(27, Math.max(0, Math.floor((clickX / width) * 28)));
    setProgress(clickedProgress);
  };

  const formattedTime = (sec: number) => {
    const s = sec % 60;
    return `0:${s < 10 ? "0" + s : s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      {/* Background click dismiss */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.93, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="w-full max-w-4xl rounded-2xl border border-[var(--border-strong)] overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] relative z-10 font-sans"
        style={{
          background: "var(--bg-card)",
        }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)]" style={{ background: "var(--bg-subtle)" }}>
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="VibeCareer logo" className="w-5 h-5 rounded-md" />
            <span className="font-extrabold text-xs tracking-tight" style={{ color: "var(--text-primary)" }}>
              VibeCareer AI <span className="text-[10px] text-[var(--brand-primary)] px-1.5 py-0.5 rounded bg-[var(--brand-primary)]/10 font-mono">Demo Player</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-up"
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-violet-500 hover:underline"
            >
              Sign Up to Try Live <ExternalLink className="w-2.5 h-2.5" />
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Simulation Screen */}
        <div className="aspect-video w-full bg-[#0a0514] relative overflow-hidden flex flex-col justify-between p-4 md:p-6 select-none">
          {/* Neon shadow backing glow inside video */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,transparent_70%)] pointer-events-none" />

          {/* Simulated Tab Menu */}
          <div className="flex flex-wrap justify-center gap-1.5 z-10 max-w-full">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "resume", label: "Resume Builder", icon: FileText },
              { id: "coach", label: "AI Coach", icon: MessageSquare },
              { id: "interview", label: "Mock Interview", icon: Mic },
              { id: "linkedin", label: "LinkedIn AI", icon: Sparkles },
              { id: "tracker", label: "App. Tracker", icon: KanbanSquare },
              { id: "architecture", label: "System Design", icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setProgress(
                      tab.id === "dashboard" ? 0 :
                      tab.id === "resume" ? 4 :
                      tab.id === "coach" ? 8 :
                      tab.id === "interview" ? 12 :
                      tab.id === "linkedin" ? 16 :
                      tab.id === "tracker" ? 20 : 24
                    );
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold transition-all border ${
                    isActive
                      ? "bg-violet-600/10 border-violet-500/40 text-violet-400"
                      : "bg-black/45 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Simulation Frame */}
          <div className="flex-1 my-4 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* Tab 1: Dashboard (progress 0-4) */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-md rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                      <LayoutDashboard className="w-3 h-3" /> Career Command Center
                    </span>
                    <span className="text-[9px] text-[#10b981] font-bold">↑ Active Track</span>
                  </div>

                  <div className="flex items-center justify-around gap-4 py-1">
                    {/* SVG Radial Gauge */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="transparent"
                            stroke="#7c3aed"
                            strokeWidth="4"
                            strokeDasharray={175.9}
                            animate={{ strokeDashoffset: 175.9 * (1 - 0.89) }}
                            transition={{ duration: 1.2 }}
                          />
                        </svg>
                        <span className="absolute font-black text-xs text-white">89%</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">Readiness Score</span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="bg-white/5 border border-white/5 rounded px-2.5 py-1.5">
                        <span className="text-[8px] text-gray-400 block font-semibold">Monthly Progress</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          ↑ +14 points this month
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded px-2.5 py-1.5">
                        <span className="text-[8px] text-gray-400 block font-semibold">Unlocked Badges</span>
                        <div className="flex gap-1.5 mt-1">
                          <span title="ATS Score > 90" className="text-xs">🏆</span>
                          <span title="Resume Uploaded" className="text-xs">📄</span>
                          <span title="Mock Interview Completed" className="text-xs">🎤</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Resume Builder (progress 4-8) */}
              {activeTab === "resume" && (
                <motion.div
                  key="resume-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FileText className="w-3 h-3" /> ATS Scanner Audits
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">Resume Optimized</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center space-y-1">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="transparent"
                            stroke={progress >= 6.5 ? "#10b981" : "#ec4899"}
                            strokeWidth="4"
                            strokeDasharray={175.9}
                            animate={{ strokeDashoffset: progress >= 6.5 ? 175.9 * (1 - 0.94) : 175.9 * (1 - 0.51) }}
                            transition={{ duration: 1.0 }}
                          />
                        </svg>
                        <span className="absolute font-black text-xs text-white">
                          {progress >= 6.5 ? "94%" : "51%"}
                        </span>
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">ATS Score</span>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <div className="text-[9px] text-gray-500 font-medium">Scanning Experience Bullet:</div>
                      <div className="bg-red-500/10 border border-red-500/10 rounded p-1.5 text-[8.5px] text-red-400 line-through">
                        "Built websites with React."
                      </div>
                      {progress >= 5.5 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-emerald-500/10 border border-emerald-500/20 rounded p-1.5 text-[8.5px] text-emerald-400 font-medium flex items-start gap-1"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>"Engineered responsive web applications using React 19, improving page load speed by 35%."</span>
                        </motion.div>
                      ) : (
                        <div className="h-[34px] rounded border border-dashed border-white/10 flex items-center justify-center text-[8px] text-gray-600 animate-pulse">
                          AI Optimizer analyzing...
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: AI Coach Chat (progress 8-12) */}
              {activeTab === "coach" && (
                <motion.div
                  key="coach-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3.5"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> Career Coach Consult
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">Gemini Active</span>
                    </div>
                  </div>

                  <div className="space-y-3 min-h-[90px] flex flex-col justify-end text-[9px]">
                    <div className="bg-white/5 p-2 rounded-xl text-gray-300 max-w-[85%] self-end">
                      How should I negotiate salary for a remote Software Engineer position?
                    </div>

                    {progress >= 10 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-violet-500/10 border border-violet-500/20 p-2.5 rounded-xl text-violet-300 max-w-[90%] self-start flex gap-2"
                      >
                        <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[9.5px] text-white">Gemini Coach</p>
                          <p className="leading-relaxed">
                            "Highlight quantifiable metrics. Pitch: 'I optimized render logic reducing bundle size by 40%.' Target 10-15% above standard bounds."
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 self-start bg-white/5 px-3 py-2 rounded-xl">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Coach typing...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Mock Interview (progress 12-16) */}
              {activeTab === "interview" && (
                <motion.div
                  key="interview-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Mic className="w-3 h-3" /> Interview Simulator
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">Session Scorecard</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                      <div className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Active Question:</div>
                      <p className="text-[9.5px] font-semibold text-white leading-normal">
                        "Describe a major architectural failure you handled."
                      </p>
                      
                      <div className="flex gap-0.5 items-center h-5 bg-white/5 rounded px-2">
                        <span className="text-[7.5px] text-gray-500 uppercase font-mono mr-1.5">Voice Rec:</span>
                        <div className="flex items-end gap-0.5 h-2">
                          {[2,4,7,3,9,5,8,4,6,2].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-0.5 bg-violet-400 rounded-full"
                              style={{ height: `${h * 1.5}px` }}
                              animate={{ height: isPlaying ? [`${h}px`, `${Math.max(2, h * (Math.sin(progress) + 1))}px`, `${h}px`] : `${h}px` }}
                              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-l border-white/5 pl-4 flex flex-col justify-center space-y-2">
                      {progress >= 14 ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">Overall Rating</span>
                            <span className="text-[9px] font-bold text-[#10b981]">9.2 / 10</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1">
                            <div className="bg-[#10b981] h-1 rounded-full" style={{ width: "92%" }} />
                          </div>
                          <p className="text-[8px] text-violet-400 italic">
                            "Excellent STAR layout, balanced database trade-offs."
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                          <div className="h-1.5 w-full bg-white/5 rounded animate-pulse" />
                          <div className="h-6 w-full bg-white/5 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 5: LinkedIn AI (progress 16-20) */}
              {activeTab === "linkedin" && (
                <motion.div
                  key="linkedin-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-md rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> LinkedIn AI Audit
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">Profile Analyzer</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center space-y-1">
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="28" cy="28" r="24" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                          <motion.circle
                            cx="28"
                            cy="28"
                            r="24"
                            fill="transparent"
                            stroke="#0ea5e9"
                            strokeWidth="3"
                            strokeDasharray={150.8}
                            animate={{ strokeDashoffset: 150.8 * (1 - 0.76) }}
                            transition={{ duration: 1.2 }}
                          />
                        </svg>
                        <span className="absolute font-black text-[10px] text-white">76%</span>
                      </div>
                      <span className="text-[7px] uppercase tracking-wider text-gray-400 font-bold">Search Value</span>
                    </div>

                    <div className="col-span-2 space-y-1.5">
                      <span className="text-[8px] text-gray-500 font-semibold block">Predicted Role Fits:</span>
                      <div className="space-y-1">
                        <div>
                          <div className="flex justify-between text-[8px] font-semibold text-gray-300">
                            <span>Software Engineer</span>
                            <span>94%</span>
                          </div>
                          <div className="w-full bg-white/5 h-0.5 rounded-full">
                            <div className="bg-sky-400 h-0.5 rounded-full" style={{ width: "94%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[8px] font-semibold text-gray-300">
                            <span>Solutions Architect</span>
                            <span>81%</span>
                          </div>
                          <div className="w-full bg-white/5 h-0.5 rounded-full">
                            <div className="bg-sky-400 h-0.5 rounded-full" style={{ width: "81%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 6: App Tracker (progress 20-24) */}
              {activeTab === "tracker" && (
                <motion.div
                  key="tracker-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <KanbanSquare className="w-3 h-3" /> Kanban Job Tracker
                    </span>
                    <span className="text-[8px] text-gray-500 uppercase font-mono">Drag & Drop Sim</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 h-24">
                    {/* Applied Column */}
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-1.5 relative overflow-hidden">
                      <span className="text-[8px] font-bold uppercase text-gray-400 block border-b border-white/5 pb-0.5">Applied</span>
                      {progress < 22 ? (
                        <motion.div
                          layoutId="google-card"
                          className="bg-violet-600/10 border border-violet-500/20 rounded p-1.5 text-[8.5px] text-white flex justify-between items-center"
                        >
                          <div>
                            <p className="font-bold">Google</p>
                            <p className="text-[7.5px] text-gray-400">Software Engineer</p>
                          </div>
                          <span className="text-[9px]">🏢</span>
                        </motion.div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center border border-dashed border-white/5 rounded text-[8px] text-gray-600">
                          Empty
                        </div>
                      )}
                    </div>

                    {/* Interviewing Column */}
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col gap-1.5 relative overflow-hidden">
                      <span className="text-[8px] font-bold uppercase text-gray-400 block border-b border-white/5 pb-0.5">Interviewing</span>
                      {progress >= 22 ? (
                        <motion.div
                          layoutId="google-card"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="bg-violet-600/10 border border-violet-500/20 rounded p-1.5 text-[8.5px] text-white flex justify-between items-center"
                        >
                          <div>
                            <p className="font-bold">Google</p>
                            <p className="text-[7.5px] text-gray-400">Software Engineer</p>
                          </div>
                          <span className="text-[9px]">🏢</span>
                        </motion.div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center border border-dashed border-white/5 rounded text-[8px] text-gray-600">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 7: System Design (progress 24-28) */}
              {activeTab === "architecture" && (
                <motion.div
                  key="architecture-sim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3.5"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Cpu className="w-3 h-3" /> System Architecture
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono">99.98% SLA Active</span>
                  </div>

                  <div className="flex items-center justify-around gap-2 text-[9px] py-2">
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="font-bold text-white">Client</span>
                      <span className="text-[7.5px] text-gray-500">React 19</span>
                    </div>
                    <span className="text-gray-600 font-bold">→</span>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="font-bold text-white">API Layer</span>
                      <span className="text-[7.5px] text-gray-500">Next.js API</span>
                    </div>
                    <span className="text-gray-600 font-bold">→</span>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="font-bold text-white">Gemini AI</span>
                      <span className="text-[7.5px] text-gray-500">Pro 2.5</span>
                    </div>
                    <span className="text-gray-600 font-bold">→</span>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex flex-col items-center">
                      <span className="font-bold text-white">Prisma DB</span>
                      <span className="text-[7.5px] text-gray-500">Postgres</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Bottom Overlay Player Controls */}
          <div className="w-full space-y-2 bg-black/60 border border-white/5 p-2 rounded-xl backdrop-blur-md z-10">
            {/* Clickable progress slider */}
            <div
              onClick={handleProgressBarClick}
              className="w-full h-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer relative transition-all"
            >
              <div
                className="absolute top-0 left-0 bottom-0 bg-violet-500 rounded-full flex items-center justify-end"
                style={{ width: `${(progress / 28) * 100}%` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white border border-violet-600 shadow-md scale-0 group-hover:scale-100 absolute" />
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 text-white hover:text-violet-400 hover:bg-white/5 rounded cursor-pointer transition-all"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-1 hover:text-white hover:bg-white/5 rounded cursor-pointer transition-all"
                  title="Restart Demo"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-white hover:bg-white/5 rounded cursor-pointer transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <span className="font-mono text-[10px]">
                  {formattedTime(progress)} / 0:28
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold hidden sm:inline">1080p 60fps</span>
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="btn-primary px-3 py-1.5 text-[9px] font-bold rounded-lg uppercase tracking-wider shadow-none"
                >
                  Launch App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
