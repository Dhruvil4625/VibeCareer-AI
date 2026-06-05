"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const blogPosts = [
  {
    id: 1,
    title: "How to Beat the ATS: The Definitive 2026 Guide",
    excerpt: "Learn how Applicant Tracking Systems scan resumes and discover the best formatting structures, keyword densities, and styles to ensure your profile ranks first.",
    category: "Resumes",
    date: "June 2, 2026",
    readTime: "6 min read",
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    id: 2,
    title: "Top 10 Career Transitions Powered by Gemini AI",
    excerpt: "Switching industries doesn't have to be daunting. Discover how AI career models match your existing skills to adjacent roles and map out transition steps.",
    category: "Career Advice",
    date: "May 28, 2026",
    readTime: "8 min read",
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    id: 3,
    title: "Mastering the Behavioral Interview: Tips & Scorecards",
    excerpt: "Unpack behavioral round questions using the STAR framework. Learn how to draft bullet points and check your speech metrics using our simulation engines.",
    category: "Interviews",
    date: "May 15, 2026",
    readTime: "5 min read",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: 4,
    title: "Why LinkedIn Keywords Can Triple Recruiter Profile Hits",
    excerpt: "Recruiters search LinkedIn using strict queries. Optimize your profile sections, extract tags, and leverage high-conversion headlines to draw views.",
    category: "LinkedIn",
    date: "April 30, 2026",
    readTime: "4 min read",
    gradient: "from-blue-600 to-cyan-600",
  },
];

const categories = ["All", "Resumes", "Interviews", "LinkedIn", "Career Advice"];

export default function BlogPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
                <BookOpen className="w-3.5 h-3.5" />
                VibeCareer Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                Inside Career <span className="gradient-text">Acceleration</span>
              </h1>
              <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
                Stay up to date with resume audits, speech mock interview feedback, and corporate hiring trends.
              </p>

              {/* Hero Image */}
              <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-40" />
                <img
                  src={mounted && resolvedTheme === "light" ? "/images/blog_hero_light.png" : "/images/blog_hero.png"}
                  alt="VibeCareer Blog"
                  className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer"
                style={{
                  background: selectedCategory === cat ? "var(--brand-primary)" : "var(--bg-subtle)",
                  border: selectedCategory === cat ? "1px solid var(--brand-primary)" : "1px solid var(--border-default)",
                  color: selectedCategory === cat ? "var(--text-on-brand)" : "var(--text-primary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card flex flex-col justify-between overflow-hidden hover:border-[var(--brand-strong)] transition-all group"
              >
                {/* Header Gradient Block */}
                <div className={`h-40 bg-gradient-to-br ${post.gradient} p-6 flex flex-col justify-between text-white relative`}>
                  <div className="absolute inset-0 bg-black/10 opacity-30 mix-blend-overlay" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit relative z-10">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-semibold text-white/90 relative z-10">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/blog/${post.id}`} className="block group/title">
                      <h3 className="text-xl font-bold mb-3 group-hover/title:text-[var(--brand-primary)] transition-colors line-clamp-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm leading-relaxed mb-6 line-clamp-3 text-[var(--text-secondary)]">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)] hover:gap-3 transition-all w-fit"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
