"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with your job search",
    color: "#7c3aed",
    features: [
      "1 AI Resume (Basic)",
      "3 Cover Letters / month",
      "Job Search & Saving",
      "Application Tracker (up to 20)",
      "5 AI Coach messages / day",
      "3 Mock Interviews / month",
      "Community Support",
    ],
    cta: "Get Started Free",
    href: "/sign-up",
    featured: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "₹499",
    period: "per month",
    description: "Everything you need to land your next role faster",
    color: "#10b981",
    features: [
      "Unlimited AI Resumes",
      "Unlimited Cover Letters",
      "Advanced ATS Checker",
      "Unlimited Application Tracking",
      "Unlimited AI Coach",
      "Unlimited Mock Interviews",
      "LinkedIn Profile Optimizer",
      "Career Roadmap Generator",
      "Priority AI (Faster responses)",
      "PDF Export & Templates",
      "Priority Support",
    ],
    cta: "Start Pro Trial",
    href: "/sign-up?plan=pro",
    featured: true,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            Simple Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            Invest in Your{" "}
            <span className="gradient-text">Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Start free, upgrade when you&apos;re ready. No credit card required.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.featured
                    ? "shadow-[var(--shadow-xl)]"
                    : "card"
                }`}
                style={
                  plan.featured
                    ? {
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #1e1b4b 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }
                    : {}
                }
              >
                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                    Most Popular 🔥
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: plan.featured ? "rgba(255,255,255,0.15)" : `${plan.color}15`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: plan.featured ? "white" : plan.color }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-bold text-lg"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: plan.featured ? "white" : "var(--text-primary)",
                      }}
                    >
                      {plan.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}
                    >
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className="text-5xl font-black"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: plan.featured ? "white" : "var(--text-primary)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm ml-1"
                    style={{ color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}
                  >
                    /{plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: plan.featured ? "#34d399" : plan.color }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: plan.featured ? "rgba(255,255,255,0.85)" : "var(--text-secondary)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  id={`pricing-cta-${plan.name.toLowerCase()}`}
                  className={`w-full py-3 text-center font-semibold text-sm rounded-xl transition-all duration-200 ${
                    plan.featured
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "btn-primary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm mt-8"
          style={{ color: "var(--text-muted)" }}
        >
          🔒 No credit card required · Cancel anytime · Data encrypted & secure
        </motion.p>
      </div>
    </section>
  );
}
