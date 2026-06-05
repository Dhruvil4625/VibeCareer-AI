"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { ArrowLeft, Calendar, Clock, BookOpen, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const articlesData = {
  "1": {
    title: "How to Beat the ATS: The Definitive 2026 Guide",
    subtitle: "Bypass corporate screening filters and rank your resume first with AI-backed parsing structures.",
    category: "Resumes",
    date: "June 2, 2026",
    readTime: "6 min read",
    image: "/images/ats_article.png",
    gradient: "from-violet-600 to-indigo-600",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed">
          In the modern recruiting landscape, over <strong>98% of Fortune 500 companies</strong> utilize Applicant Tracking Systems (ATS) to screen candidates. Before a human recruiter ever sees your resume, it must first be successfully parsed and ranked by an algorithm. Understanding how these systems work is the single most important step in landing your dream job.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          1. The ATS Parsing Engine Explained
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          An ATS reads your resume, extracts its plain text, and maps it into structured database fields (such as <em>work experience</em>, <em>skills</em>, and <em>education</em>). If your resume format is too complex—for example, if you use double columns, sidebars, charts, or graphical skill bars—the parser will fail to extract the text correctly. This results in scrambled data, causing the system to automatically assign you a low match score.
        </p>

        <div className="card p-6 border-l-4 border-violet-500 my-2">
          <h4 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>💡 Key Formatting Rule: Keep it Linear</h4>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Always use a single-column, standard linear layout. Avoid embedding text inside graphic elements, custom text boxes, or placing your primary contact details in headers or footers, which many older ATS parsers ignore.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          2. The Importance of Keyword Context
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          ATS algorithms rank candidates by matching the terms in the target job description against the keywords found in the candidate's resume. Simply stuffing keywords at the bottom of your page is no longer effective; modern semantic search engines look for context. They verify if your skills are linked directly to measurable achievements under your work experiences.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          3. Structuring Bullet Points for Maximum Score
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Every experience bullet point should follow the <strong>Action-Context-Result</strong> framework:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
          <li>Start with a high-impact action verb (e.g., <em>Engineered</em>, <em>Optimized</em>, <em>Spearheaded</em>).</li>
          <li>Add context explaining the task (e.g., <em>redesigned the relational PostgreSQL database schemas</em>).</li>
          <li>State a measurable result (e.g., <em>improving query response times by 32%</em>).</li>
        </ul>

        <div className="mt-6 p-6 rounded-2xl" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--brand-primary)" }}>
            <Sparkles className="w-4 h-4" /> Ready to Grade Your Resume?
          </h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Our built-in AI Resume Workspace analyzes your experience points in real-time, calculates your ATS rating, and provides actionable bullet upgrades using Google Gemini.
          </p>
          <Link href="/sign-up" className="btn-primary inline-flex text-xs py-2 px-4">
            Optimize My Resume Now
          </Link>
        </div>
      </div>
    )
  },
  "2": {
    title: "Top 10 Career Transitions Powered by Gemini AI",
    subtitle: "Bridge your skills gap, identify adjacent roles, and formulate 30/60/90-day transition roadmaps.",
    category: "Career Advice",
    date: "May 28, 2026",
    readTime: "8 min read",
    image: "/images/transitions_article.png",
    gradient: "from-fuchsia-600 to-pink-600",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed">
          Switching industries or career paths is one of the most challenging transitions a professional can undertake. Historically, candidates had to rely on trial-and-error to find matching skills. Today, large language models like Google Gemini can analyze hundreds of career pathways to map out exact transitions.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          1. Understanding Skill Adjacency
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Every profession shares common transferable skills. For example, a QA Engineer already possesses strong debugging capabilities, system logic understanding, and structured writing skills. Gemini AI maps these existing capabilities directly to adjacent paths (like Backend Engineering or Systems Operations), minimizing the training overhead.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          2. The Top 5 AI-Recommended Switches for 2026
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Based on our database analytics, these are the highest-success transition tracks:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]">
            <h5 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>QA Engineer → Backend Developer</h5>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Focus on Node.js/Python server APIs and database schemas.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]">
            <h5 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>Manual Tester → Automation Engineer</h5>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Learn JavaScript/TypeScript for Playwright or Selenium scripting.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]">
            <h5 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>Project Manager → Product Owner</h5>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Focus on agile prioritizations, metrics tracking, and product design.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]">
            <h5 className="font-bold text-xs mb-1" style={{ color: "var(--text-primary)" }}>Customer Support → Customer Success Manager</h5>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Upskill on account metrics, churn management, and corporate accounts.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          3. Structuring Your 30/60/90-Day Plan
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          A successful switch requires structure:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
          <li><strong>Days 1–30 (Foundations):</strong> Master the core technical stack (e.g., learn TypeScript syntax and React component cycles).</li>
          <li><strong>Days 31–60 (Project Build):</strong> Build 2 full-stack projects showcasing real database integrations and host them live.</li>
          <li><strong>Days 61–90 (Visibility):</strong> Align your resume formatting and optimize your LinkedIn keyword rankings for recruiter visibility.</li>
        </ul>

        <div className="mt-6 p-6 rounded-2xl" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--brand-primary)" }}>
            <Sparkles className="w-4 h-4" /> Switch Paths with Confidence
          </h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Get connected with your personal 24/7 AI Career Coach to outline custom roadmaps, review cover letters, and prepare scripts.
          </p>
          <Link href="/sign-up" className="btn-primary inline-flex text-xs py-2 px-4">
            Talk to My Coach
          </Link>
        </div>
      </div>
    )
  },
  "3": {
    title: "Mastering the Behavioral Interview: Tips & Scorecards",
    subtitle: "Deliver high-impact STAR answers and analyze your voice speech metrics.",
    category: "Interviews",
    date: "May 15, 2026",
    readTime: "5 min read",
    image: "/images/interview_article.png",
    gradient: "from-emerald-600 to-teal-600",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed">
          Behavioral interviews ("tell me about a time you...") represent the most critical hurdle in modern engineering and management hiring. Companies are no longer evaluating just code execution; they are assessing communication skills, metrics ownership, and cultural alignment.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          1. The STAR Method Architecture
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Every behavioral story must follow the STAR format:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
          <li><strong>Situation (10%):</strong> Establish context (e.g., <em>"During our Q3 release, client load surged, crashing the API servers..."</em>).</li>
          <li><strong>Task (10%):</strong> State the problem goal (e.g., <em>"I was tasked with restoring server stability and reducing latency."</em>).</li>
          <li><strong>Action (60%):</strong> Details of what <strong>you</strong> specifically did (e.g., <em>"I added Redis cache nodes and refactored SQL joins."</em>).</li>
          <li><strong>Result (20%):</strong> Hard statistics measuring success (e.g., <em>"Throughput improved by 45% and latency dropped below 200ms."</em>).</li>
        </ul>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          2. Top Red Flags to Avoid
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Avoid these common pitfalls when narrating your experiences:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
          <li><strong>Using "We" instead of "I":</strong> Recruiters want to know your individual contribution, not the team's general actions.</li>
          <li><strong>Failing to state a Result:</strong> A story without a measurable metric outcome feels incomplete and lacks credibility.</li>
          <li><strong>Talking negatively about past employers:</strong> Frame past friction purely as structural learning opportunities.</li>
        </ul>

        <div className="mt-6 p-6 rounded-2xl" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--brand-primary)" }}>
            <Sparkles className="w-4 h-4" /> Practice Behavioral Mock Rounds
          </h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Use our voice-enabled AI Mock Interviewer. Speak directly into your mic, receive instant scorecards, circular charts, and model replies!
          </p>
          <Link href="/sign-up" className="btn-primary inline-flex text-xs py-2 px-4">
            Start Mock Interview
          </Link>
        </div>
      </div>
    )
  },
  "4": {
    title: "Why LinkedIn Keywords Can Triple Recruiter Profile Hits",
    subtitle: "Optimize headline copy and draw search hits from recruiting filters.",
    category: "LinkedIn",
    date: "April 30, 2026",
    readTime: "4 min read",
    image: "/images/linkedin_article.png",
    gradient: "from-blue-600 to-cyan-600",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed">
          Recruiters do not search for candidates manually by browsing random profiles. They use powerful search portals (such as LinkedIn Recruiter) that filter candidates based on strict keyword queries. If your profile is missing these key technical tags, you are invisible.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          1. Understanding Search Indexing
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          LinkedIn indexes profiles using a search engine indexer. High-weight areas include your **Headline**, **Job Titles**, and **Skills List**. Injecting high-conversion keywords into these key zones increases the probability of your profile showing up in recruiter searches.
        </p>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          2. Crafting a High-Conversion Headline
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Avoid generic headlines like "Looking for new opportunities" or "Software Engineer". Instead, use a keyword-rich formula:
        </p>
        <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] my-3">
          <p className="text-xs font-mono" style={{ color: "var(--brand-primary)" }}>
            [Target Role] | [Core Skills] | [Achievement/Metric]
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Example: <em>"Full Stack Engineer | React, Next.js, Node.js, TypeScript | Built scalable APIs serving 50k+ active users"</em>
          </p>
        </div>

        <h3 className="text-xl font-bold mt-4" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
          3. Auditing Your Profile Details
        </h3>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          Verify these sections are fully complete:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
          <li><strong>About Section:</strong> Include a summary of your core tech stack, achievements, and contact details.</li>
          <li><strong>Skills list:</strong> Pin your top 3 skills matching standard job listings (e.g. Next.js, Prisma, PostgreSQL).</li>
          <li><strong>Featured Link:</strong> Link to your portfolio hosting your Next.js application grids or GitHub repository.</li>
        </ul>

        <div className="mt-6 p-6 rounded-2xl" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--brand-primary)" }}>
            <Sparkles className="w-4 h-4" /> Run a LinkedIn Audit
          </h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Our built-in LinkedIn Visibility Auditor scans your credentials, checks keyword strengths, and generates copyable high-converting headlines.
          </p>
          <Link href="/sign-up" className="btn-primary inline-flex text-xs py-2 px-4">
            Optimize My Profile
          </Link>
        </div>
      </div>
    )
  }
};

export default function BlogPostPage({ params }: PageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedParams = use(params);
  const id = resolvedParams.id as keyof typeof articlesData;
  const article = articlesData[id];

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "var(--bg-base)" }}>
        <h1 className="text-2xl font-black mb-4">Article Not Found</h1>
        <Link href="/blog" className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold mb-8 transition-colors text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
              <BookOpen className="w-3.5 h-3.5" />
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              {article.title}
            </h1>
            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {article.subtitle}
            </p>

            <div className="flex items-center gap-6 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-30" />
            <img
              src={mounted && resolvedTheme === "light" ? article.image.replace(/\.png$/, "_light.png") : article.image}
              alt={article.title}
              className="w-full h-[260px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </motion.div>

          {/* Article Content */}
          <div className="card p-8 md:p-12 relative overflow-hidden">
            {article.content}
          </div>

        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
