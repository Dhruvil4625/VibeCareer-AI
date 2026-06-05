"use client";

import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Last updated: June 6, 2026
            </p>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-40" />
              <img
                src={mounted && resolvedTheme === "light" ? "/images/legal_hero_light.png" : "/images/legal_hero.png"}
                alt="Privacy Policy"
                className="w-full h-[160px] md:h-[240px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
          </div>

          {/* Policy Doc Content */}
          <div className="card p-8 md:p-12 leading-relaxed flex flex-col gap-6 text-[var(--text-secondary)] text-sm">
            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li><strong>Account Credentials:</strong> Standard registration info (email address, password) or OAuth tokens if you sign up via Google or GitHub.</li>
              <li><strong>Resume Content:</strong> The text, bullet experience points, certifications, and details you input into our split resume editor.</li>
              <li><strong>Mock Interview Audio:</strong> Browser microphone recordings you capture during mock rounds (which are processed solely for speech analysis).</li>
            </ul>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              2. How We Use Information
            </h2>
            <p>
              We process information in accordance with your preferences:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>To compile and score resumes against ATS grading algorithms.</li>
              <li>To provide response scorecards and recommendations for behavioral or technical interview rounds.</li>
              <li>To deliver automated transactional emails (welcome messages and platform catalog updates) when you access your dashboard.</li>
            </ul>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              3. Data Security & Encryption
            </h2>
            <p>
              Your data security is our highest priority. We store credentials securely using salted hashing algorithm configurations (bcryptjs). Our cloud database (Neon serverless PostgreSQL) utilizes secure socket layer (SSL) connection tunnels to prevent intercept actions.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              4. Sharing & Disclosure
            </h2>
            <p>
              VibeCareer AI does not sell, trade, or distribute user personal details or resume logs to external recruitment firms or corporate third parties. Your details remain entirely private and accessible only under your authenticated account session.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              5. Contact Us
            </h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, contact the developer Dhruvil Ramolia directly at <a href="mailto:ramoliadk@gmail.com" className="text-[var(--brand-primary)] hover:underline">ramoliadk@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
