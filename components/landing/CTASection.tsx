"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #1e1b4b 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 60px rgba(124,58,237,0.4)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.4) 0%, transparent 60%)",
          }}
        />

        {/* Sparkle decoration */}
        <div className="absolute top-8 right-12 text-yellow-300 text-2xl animate-float">✨</div>
        <div className="absolute bottom-10 left-12 text-purple-300 text-xl animate-float" style={{ animationDelay: "1s" }}>⚡</div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium border border-white/20 bg-white/10">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white">Start your career transformation today</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ready to Land Your
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #34d399, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream Job?
            </span>
          </h2>

          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Join 10,000+ professionals who are using VibeCareer AI to accelerate
            their careers. Free to start, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              id="cta-section-primary"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold text-base rounded-xl hover:bg-violet-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              id="cta-section-secondary"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              See All Features
            </Link>
          </div>

          <p className="text-white/40 text-sm mt-6">
            No credit card · Free forever plan · Cancel pro anytime
          </p>
        </div>
      </motion.div>
    </section>
  );
}
