"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, FileSearch, BriefcaseIcon, Trophy } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    color: "#7c3aed",
    title: "Create Your Profile",
    description:
      "Sign up in 30 seconds. Tell us your current role, target position, and skills. VibeCareer AI builds a personalized career strategy just for you.",
  },
  {
    step: "02",
    icon: FileSearch,
    color: "#10b981",
    title: "Build Your Materials",
    description:
      "Our AI generates an ATS-optimized resume and compelling cover letters tailored to each company. Upload an existing resume and we'll enhance it instantly.",
  },
  {
    step: "03",
    icon: BriefcaseIcon,
    color: "#3b82f6",
    title: "Search & Apply Smarter",
    description:
      "Discover jobs with AI-powered match scores. Track all your applications in a beautiful Kanban board. Never lose track of an opportunity again.",
  },
  {
    step: "04",
    icon: Trophy,
    color: "#f59e0b",
    title: "Ace Your Interviews",
    description:
      "Practice with our AI mock interviewer and get detailed feedback. Your career coach will help you negotiate the best possible offer.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            From Signup to{" "}
            <span className="gradient-text">Dream Offer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Four simple steps to transform your job search with the power of AI
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-px hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--border-strong), transparent)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mb-0 shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}10 100%)`,
                      border: `2px solid ${step.color}30`,
                    }}
                  >
                    <Icon className="w-10 h-10" style={{ color: step.color }} />
                  </div>
                  {/* Step number */}
                  <div
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full text-xs font-black text-white flex items-center justify-center"
                    style={{ background: step.color }}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
