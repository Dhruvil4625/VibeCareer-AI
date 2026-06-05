"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Mail,
  Search,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Calendar,
  Trophy,
  Award,
  Sparkles,
  Lock,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Application } from "@prisma/client";

interface DashboardClientProps {
  applications: Application[];
  stats: {
    totalApplications: number;
    interviews: number;
    offers: number;
    careerScore: number;
    resumesCreated: number;
    coverLettersCreated: number;
  };
  userName: string;
}

const quickActions = [
  { href: "/resume", label: "Build Resume", icon: FileText, color: "#8b5cf6", description: "Create ATS-ready resume" },
  { href: "/cover-letter", label: "Write Cover Letter", icon: Mail, color: "#10b981", description: "AI-powered cover letters" },
  { href: "/jobs", label: "Search Jobs", icon: Search, color: "#3b82f6", description: "Find matching roles" },
  { href: "/tracker", label: "Track Apps", icon: KanbanSquare, color: "#f59e0b", description: "Manage applications" },
  { href: "/coach", label: "Career Coach", icon: MessageSquare, color: "#ec4899", description: "Get AI guidance" },
  { href: "/interview", label: "Mock Interview", icon: Mic, color: "#8b5cf6", description: "Practice & improve" },
  { href: "/profile-optimizer", label: "LinkedIn AI", icon: Linkedin, color: "#0ea5e9", description: "Optimize your profile" },
];

const statusColors: Record<string, string> = {
  WISHLIST: "#6b7280",
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
};

const statusLabels: Record<string, string> = {
  WISHLIST: "Wishlist",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer 🎉",
  REJECTED: "Rejected",
};

export function DashboardClient({ applications, stats, userName }: DashboardClientProps) {
  const firstName = userName.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Calculate achievements
  const achievements = [
    {
      id: "first_resume",
      title: "First Step",
      description: "Uploaded your first resume",
      unlocked: stats.resumesCreated > 0,
      icon: FileText,
      color: "#8b5cf6",
    },
    {
      id: "tracker_pro",
      title: "Tracker Pro",
      description: "Tracking 3+ job opportunities",
      unlocked: stats.totalApplications >= 3,
      icon: KanbanSquare,
      color: "#f59e0b",
    },
    {
      id: "interview_ready",
      title: "Interview Ready",
      description: "Practiced mock interviews",
      unlocked: stats.interviews > 0,
      icon: Mic,
      color: "#ec4899",
    },
    {
      id: "elite_candidate",
      title: "Elite Status",
      description: "Career score above 70%",
      unlocked: stats.careerScore >= 70,
      icon: Award,
      color: "#10b981",
    },
  ];

  // SVG Gauge variables
  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(stats.careerScore, 100) / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-8 py-6">
      {/* 1. Hero-Level Subpage Header */}
      <div
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-[var(--shadow-elevated)] border border-[var(--border-default)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-2 max-w-2xl z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-violet-500">
              VibeCareer Dashboard Command Center
            </span>
          </div>
          <h1
            className="text-2xl md:text-3xl font-black leading-tight"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Review your AI resume performance ratings, track real-time applications, and boost interview callbacks.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/resume"
              className="btn-primary text-xs flex items-center gap-1.5 px-4 py-2 hover:scale-[1.02] transition-transform active:scale-[0.98]"
            >
              <FileText className="w-3.5 h-3.5" />
              Optimize Resume
            </Link>
            <Link
              href="/interview"
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all flex items-center gap-1.5 active:scale-[0.98]"
              style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}
            >
              <Mic className="w-3.5 h-3.5" />
              Practice Interview
            </Link>
          </div>
        </div>

        {/* Hero Header SVG Score Gauge */}
        <div className="flex items-center gap-4 bg-[var(--bg-card)]/50 backdrop-blur-md p-4 rounded-xl border border-[var(--border-default)] shadow-[var(--shadow-sm)]">
          <div className="relative w-18 h-18 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-[var(--border-default)]"
                strokeWidth={stroke}
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <motion.circle
                stroke={stats.careerScore >= 70 ? "#10b981" : "#7c3aed"}
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-base font-black" style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}>
                {stats.careerScore}
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[var(--text-muted)]">
                Score
              </span>
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-violet-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ↑ 14% this month
            </span>
            <h4 className="text-xs font-black" style={{ color: "var(--text-primary)" }}>
              Career Readiness
            </h4>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Based on ATS & interview mocks
            </p>
          </div>
        </div>
      </div>

      {/* 2. Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Applications", value: stats.totalApplications, icon: Briefcase, color: "#7c3aed" },
          { label: "Interviews", value: stats.interviews, icon: Calendar, color: "#f59e0b" },
          { label: "Offers Obtained", value: stats.offers, icon: Trophy, color: "#10b981" },
          { label: "Resumes Built", value: stats.resumesCreated, icon: FileText, color: "#3b82f6" },
          { label: "Cover Letters", value: stats.coverLettersCreated, icon: Mail, color: "#ec4899" },
          {
            label: "Skill Focus Areas",
            value: stats.careerScore >= 80 ? "Complete" : "3 Missing",
            icon: Award,
            color: stats.careerScore >= 70 ? "#10b981" : "#f59e0b",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3, scale: 1.02, rotate: 0.5 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              className="card p-4 flex flex-col justify-between h-32 border border-[var(--border-default)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-elevated)] transition-all cursor-default"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  Live
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl font-black" style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions & Navigation */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-4 bg-violet-500 rounded" />
              <h2
                className="text-sm font-black uppercase tracking-wider"
                style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}
              >
                Quick Actions
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)] hover:-translate-y-1 transition-all group text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${action.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: action.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                        {action.label}
                      </p>
                      <p className="text-[9px] mt-0.5 hidden sm:block" style={{ color: "var(--text-muted)" }}>
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Gamified Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-violet-500 rounded" />
                <h2
                  className="text-sm font-black uppercase tracking-wider"
                  style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}
                >
                  Career Achievements
                </h2>
              </div>
              <span className="text-[10px] font-bold text-violet-500">
                {achievements.filter((a) => a.unlocked).length} / {achievements.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      badge.unlocked
                        ? "border-violet-500/35 bg-violet-500/5 shadow-[var(--shadow-soft)] hover:scale-[1.02]"
                        : "border-[var(--border-default)] opacity-60 bg-[var(--bg-subtle)]"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center mb-2.5 relative ${
                        badge.unlocked ? "text-white" : "text-[var(--text-muted)]"
                      }`}
                      style={{
                        background: badge.unlocked
                          ? `linear-gradient(135deg, ${badge.color}, #5b21b6)`
                          : "var(--bg-muted)",
                      }}
                    >
                      {badge.unlocked ? (
                        <Icon className="w-4 h-4" />
                      ) : (
                        <Lock className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                      )}
                    </div>
                    <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {badge.title}
                    </h4>
                    <p className="text-[9px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {badge.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-violet-500 rounded" />
                <h2
                  className="text-sm font-black uppercase tracking-wider"
                  style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}
                >
                  Recent Tracking
                </h2>
              </div>
              <Link
                href="/tracker"
                className="text-[10px] font-bold flex items-center gap-1 hover:text-violet-600 transition-colors"
                style={{ color: "var(--brand-primary)" }}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-muted)] flex items-center justify-center mx-auto opacity-70">
                  <Briefcase className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    No applications yet
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Start tracking your dream role.
                  </p>
                </div>
                <Link
                  href="/tracker"
                  className="text-[10px] font-black text-violet-500 bg-violet-500/10 px-3 py-1.5 rounded-lg hover:bg-violet-500/25 transition-all inline-block"
                >
                  Start Tracking →
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {applications.map((app) => (
                  <li
                    key={app.id}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-muted)] border border-transparent hover:border-[var(--border-subtle)] transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: statusColors[app.status] ?? "#7c3aed" }}
                    >
                      {app.company[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                        {app.role}
                      </p>
                      <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                        {app.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${statusColors[app.status]}15`,
                          color: statusColors[app.status],
                        }}
                      >
                        {statusLabels[app.status]}
                      </span>
                      <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                        {formatRelativeTime(app.updatedAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* AI Banner */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2.5 border mt-6"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(16,185,129,0.03) 100%)",
              borderColor: "var(--border-default)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(124,58,237,0.1)" }}
              >
                <MessageSquare className="w-4 h-4" style={{ color: "#7c3aed" }} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  AI Career Insight 💡
                </p>
                <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {stats.totalApplications === 0
                    ? "Start by building your AI resume to get a higher ATS score and more callbacks."
                    : stats.interviews === 0
                    ? "Practice mock interviews with Gemini AI to improve your callback-to-offer rates."
                    : "Review salary negotiation strategies with your coach before signing offer letters."}
                </p>
              </div>
            </div>
            <Link
              href="/coach"
              className="btn-primary text-[10px] font-bold w-full py-2 flex items-center justify-center gap-1.5"
            >
              Ask AI Coach
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
