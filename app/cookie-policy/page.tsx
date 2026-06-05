"use client";

import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Shield } from "lucide-react";

export default function CookiePolicyPage() {
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
              Cookie <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Last updated: June 6, 2026
            </p>
          </div>

          {/* Cookie Doc Content */}
          <div className="card p-8 md:p-12 leading-relaxed flex flex-col gap-6 text-[var(--text-secondary)] text-sm">
            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              1. What are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when you visit a website. They help the site recognize your device and save preferences or authentication states over time.
            </p>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              2. Cookies We Use
            </h2>
            <p>
              VibeCareer AI uses cookies for essential functionalities and site preferences:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li><strong>Essential Session Cookies:</strong> NextAuth uses encrypted JWT cookies to keep you signed in while navigating between dashboard modules. Disabling these cookies will prevent you from logging in.</li>
              <li><strong>Theme Preferences:</strong> `next-themes` stores your theme preference (Light or Dark mode) to render the correct design immediately upon page load, avoiding visual flickers.</li>
              <li><strong>Local Storage Preferences:</strong> We use local storage tokens to store preferences such as chosen AI model selections or interface configs.</li>
            </ul>

            <h2 className="text-xl font-bold border-b border-[var(--border-default)] pb-3 mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              3. Managing Your Cookies
            </h2>
            <p>
              You can block or delete cookies directly inside your web browser settings. Please note that if you block essential authentication cookies, you will not be able to log in or use VibeCareer AI's dashboard tools.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
