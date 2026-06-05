"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10K+", label: "Active Users", description: "Job seekers accelerating their careers" },
  { value: "94%", label: "ATS Pass Rate", description: "Resumes that get past automated filters" },
  { value: "3.2×", label: "More Interviews", description: "Compared to manually crafted resumes" },
  { value: "30 days", label: "Avg. Time to Offer", description: "From signup to receiving an offer" },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p
        className="text-4xl md:text-5xl font-black mb-2 gradient-text"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {stat.value}
      </p>
      <p className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        {stat.label}
      </p>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        {stat.description}
      </p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div
        className="max-w-5xl mx-auto px-6 py-12 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(16,185,129,0.04) 100%)",
          border: "1px solid var(--border-default)",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
