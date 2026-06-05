"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    avatar: "PS",
    avatarColor: "#7c3aed",
    rating: 5,
    text: "VibeCareer AI completely transformed my job search. The AI resume builder scored my resume at 94% ATS compatibility and I got 3× more callbacks within 2 weeks!",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "Stripe",
    avatar: "MJ",
    avatarColor: "#10b981",
    rating: 5,
    text: "The AI cover letter generator is mind-blowing. It wrote company-specific letters that actually sounded like me — got me an interview at my dream company.",
  },
  {
    name: "Aisha Patel",
    role: "Data Scientist",
    company: "OpenAI",
    avatar: "AP",
    avatarColor: "#3b82f6",
    rating: 5,
    text: "The mock interview feature helped me ace my technical round. The AI feedback was incredibly detailed — better than any human mock interview I've ever done.",
  },
  {
    name: "James Wei",
    role: "UX Designer",
    company: "Figma",
    avatar: "JW",
    avatarColor: "#f59e0b",
    rating: 5,
    text: "Tracked 47 applications in the Kanban board without losing my mind. The application tracker alone is worth the subscription price.",
  },
  {
    name: "Sofia Rodriguez",
    role: "Marketing Lead",
    company: "Notion",
    avatar: "SR",
    avatarColor: "#ec4899",
    rating: 5,
    text: "The LinkedIn optimizer rewrote my profile and my recruiter views tripled in one week. I went from 2 to 18 recruiters reaching out monthly.",
  },
  {
    name: "Raj Kumar",
    role: "Backend Engineer",
    company: "Vercel",
    avatar: "RK",
    avatarColor: "#8b5cf6",
    rating: 5,
    text: "The career coach gave me a 90-day roadmap to transition from backend dev to ML engineer. Incredibly actionable and personalized. Couldn't be happier.",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonials[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      className="card p-6 flex flex-col gap-4 relative"
    >
      <Quote
        className="w-8 h-8 absolute top-4 right-4 opacity-10"
        style={{ color: testimonial.avatarColor }}
      />
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
      {/* Text */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: testimonial.avatarColor }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            {testimonial.name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {testimonial.role} at{" "}
            <span className="font-medium" style={{ color: testimonial.avatarColor }}>
              {testimonial.company}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--brand-primary)" }}
          >
            Loved by Thousands
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            Real Results,{" "}
            <span className="gradient-text">Real People</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Join 10,000+ job seekers who accelerated their careers with VibeCareer AI
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
