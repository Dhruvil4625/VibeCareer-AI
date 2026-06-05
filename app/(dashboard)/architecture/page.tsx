"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  GitBranch,
  Server,
  Activity,
  HardDrive,
  Code,
  ShieldCheck,
  TrendingUp,
  Cpu as LLMIcon,
  Sparkles,
} from "lucide-react";

export default function ArchitecturePage() {
  const pipelineSteps = [
    {
      title: "1. Client Trigger",
      desc: "User inputs resume edits, requests an ATS scan, or posts a public LinkedIn profile audit URL.",
      tech: "React 19 / Framer Motion",
      color: "#8b5cf6",
    },
    {
      title: "2. Next.js API Layer",
      desc: "Secure router endpoints validate NextAuth JWT sessions and sanitize payloads.",
      tech: "Next.js Route Handlers",
      color: "#3b82f6",
    },
    {
      title: "3. AI Orchestrator",
      desc: "Constructs structured system prompts, injecting candidate DB context and target job requirements.",
      tech: "Google Gemini SDK",
      color: "#ec4899",
    },
    {
      title: "4. LLM Generation",
      desc: "Gemini models parse skills, generate tailormade STAR experiences, or rank role matching scores.",
      tech: "Gemini 2.5 Pro / Flash",
      color: "#10b981",
    },
    {
      title: "5. Prisma DB Sync",
      desc: "Updates schemas in PostgreSQL and returns sanitized JSON outputs to trigger client transitions.",
      tech: "Prisma ORM / Neon DB",
      color: "#f59e0b",
    },
  ];

  const dbModels = [
    { name: "User", fields: ["id (CUID)", "email", "name", "careerScore", "targetRole", "experienceLevel"] },
    { name: "Resume", fields: ["id (CUID)", "userId", "title", "template", "content (JSON)", "atsScore"] },
    { name: "Application", fields: ["id (CUID)", "userId", "company", "role", "status (Enum)", "updatedAt"] },
    { name: "CoachSession", fields: ["id (CUID)", "userId", "title", "messages (JSON)", "createdAt"] },
    { name: "InterviewSession", fields: ["id (CUID)", "userId", "role", "questions (JSON)", "overallScore"] },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 md:px-8 py-6">
      {/* 1. Hero-Level Header */}
      <div
        className="rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-500">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Engineering Specs</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            System Architecture & AI Pipeline
          </h1>
          <p className="text-xs max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Technical breakdown of VibeCareer AI's platform mechanics, database schemas, and generative model pipelines.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-6 bg-[var(--bg-card)] border border-[var(--border-default)] px-4 py-2 rounded-xl shadow-[var(--shadow-sm)] text-[10px]">
            <div>
              <p className="font-bold text-[var(--text-primary)]">Gemini Pro</p>
              <p className="text-[var(--text-muted)]">LLM Engine</p>
            </div>
            <div className="border-l h-5 border-[var(--border-default)]" />
            <div>
              <p className="font-bold text-[#10b981]">Postgres</p>
              <p className="text-[var(--text-muted)]">Database</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Flow Pipeline Diagram */}
      <div className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)] space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-violet-500 rounded" />
          <h2
            className="text-sm font-black uppercase tracking-wider font-sans"
            style={{ color: "var(--text-primary)" }}
          >
            End-To-End Request Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]/50 relative flex flex-col justify-between h-40 shadow-[var(--shadow-soft)] hover:border-[var(--border-strong)] transition-all"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: step.color }}>
                  {step.title}
                </span>
                <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-default)] flex-shrink-0">
                <span className="text-[8px] font-mono opacity-80" style={{ color: "var(--text-muted)" }}>
                  {step.tech}
                </span>
                <GitBranch className="w-3.5 h-3.5" style={{ color: step.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Tech Stack Specs & Database Models */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Specs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">Platform Specs</h2>
            </div>
            
            <div className="space-y-3.5">
              {[
                { title: "Next.js 16 (App Router)", subtitle: "Host Framework", icon: Server },
                { title: "Neon Postgres (Serverless)", subtitle: "Primary Data Store", icon: Database },
                { title: "Prisma client", subtitle: "Object-Relational Mapping", icon: Code },
                { title: "NextAuth.js v4", subtitle: "Session JWT Auth", icon: ShieldCheck },
                { title: "Gemini 2.5 Flash/Pro SDK", subtitle: "Generative Logic Model", icon: LLMIcon },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-violet-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{spec.title}</h4>
                      <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>{spec.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Performance stats */}
          <div className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">System Health</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "API Availability", value: "99.98%", trend: "100% SLA" },
                { label: "LLM Avg Latency", value: "1.4s", trend: "0.2s cache" },
                { label: "Token Efficiency", value: "94.2%", trend: "AST compression" },
                { label: "DB Connection Pool", value: "Active", trend: "20 max" },
              ].map((m) => (
                <div key={m.label} className="p-3 border border-[var(--border-default)] rounded-xl bg-[var(--bg-subtle)]">
                  <span className="text-[8px] uppercase font-bold text-[var(--text-muted)] block mb-1">{m.label}</span>
                  <span className="text-sm font-black text-[var(--text-primary)] block leading-none">{m.value}</span>
                  <span className="text-[8px] font-semibold text-[#10b981] mt-1 block">{m.trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Schemas Table */}
        <div className="lg:col-span-2">
          <div className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)] space-y-4 h-full">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">Prisma Database Schemas</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dbModels.map((model) => (
                <div
                  key={model.name}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]/40 space-y-2 hover:border-[var(--border-strong)] transition-all"
                >
                  <div className="flex items-center gap-2 border-b border-[var(--border-default)] pb-1.5 flex-shrink-0">
                    <Database className="w-3.5 h-3.5 text-violet-500" />
                    <h4 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{model.name} Schema</h4>
                  </div>
                  <ul className="space-y-1 font-mono text-[9px] text-[var(--text-secondary)]">
                    {model.fields.map((f) => (
                      <li key={f} className="flex justify-between">
                        <span>{f.split(" ")[0]}</span>
                        <span className="opacity-60 text-[8px]">{f.split(" ").slice(1).join(" ")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
