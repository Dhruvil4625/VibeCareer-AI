"use client";

import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TermsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
              <Shield className="w-3.5 h-3.5" />
              Legal Documents
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Last updated: June 6, 2026
            </p>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-40" />
              <img
                src={mounted && resolvedTheme === "light" ? "/images/legal_hero_light.png" : "/images/legal_hero.png"}
                alt="Terms of Service"
                className="w-full h-[160px] md:h-[240px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
          </div>

          {/* Terms Doc Content */}
          <div className="card p-8 md:p-12 leading-relaxed flex flex-col gap-6 text-[var(--text-secondary)] text-sm">
            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using VibeCareer AI, you accept and agree to be bound by these Terms of Service. If you do not agree, you must not use or access our services.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              2. Account Responsibility
            </h2>
            <p>
              You are responsible for safeguarding your VibeCareer AI account password. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate registration and profile details (email, name, experience metrics) to ensure proper system operations.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              3. Service Availability & Limits
            </h2>
            <p>
              We provide AI resume enhancements, LinkedIn profile auditing, and mock interview scorecards. While we aim to provide 100% uptime, services may occasionally experience temporary interruptions due to cloud hosting maintenance or API model rate limits.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              4. Prohibited Uses
            </h2>
            <p>
              You agree not to bypass security tokens, abuse API rate limits, deploy malicious scraping bots against our systems, or submit defamatory or harmful inputs into the chat or resume inputs.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              5. Intellectual Property
            </h2>
            <p>
              All software components, visual elements, graphics, and layout structures of VibeCareer AI remain the intellectual property of VibeCareer AI and its developer, Dhruvil Ramolia.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
