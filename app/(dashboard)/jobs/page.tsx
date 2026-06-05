"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Wifi,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import type { Job } from "@/types";
import { cn, scoreToColor } from "@/lib/utils";

// Mock job data (replace with real API integration)
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹40L - ₹60L",
    description: "Build next-generation products at scale. Work with distributed systems, machine learning infrastructure, and core search algorithms.",
    requirements: ["React", "TypeScript", "Go", "Distributed Systems"],
    tags: ["Engineering", "Backend", "Scale"],
    url: "#",
    remote: true,
    postedAt: "2 days ago",
    matchScore: 94,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Stripe",
    location: "Remote",
    salary: "₹35L - ₹50L",
    description: "Drive the product strategy for Stripe's next-generation payments infrastructure. Partner with engineering, design, and data teams.",
    requirements: ["Product Strategy", "Agile", "SQL", "APIs"],
    tags: ["Product", "FinTech", "Remote"],
    url: "#",
    remote: true,
    postedAt: "1 day ago",
    matchScore: 78,
  },
  {
    id: "3",
    title: "ML Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    salary: "$180K - $250K",
    description: "Research and develop state-of-the-art machine learning models. Work alongside world-class AI researchers.",
    requirements: ["Python", "PyTorch", "LLMs", "CUDA"],
    tags: ["AI/ML", "Research", "LLMs"],
    url: "#",
    remote: false,
    postedAt: "3 hours ago",
    matchScore: 85,
  },
  {
    id: "4",
    title: "Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    salary: "$120K - $160K",
    description: "Build the future of web development tooling. Work on Next.js, deployment pipelines, and developer experience.",
    requirements: ["React", "Next.js", "TypeScript", "Node.js"],
    tags: ["Frontend", "DevTools", "Remote"],
    url: "#",
    remote: true,
    postedAt: "5 hours ago",
    matchScore: 96,
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Zomato",
    location: "Delhi, India",
    salary: "₹25L - ₹40L",
    description: "Drive data-driven decisions for Zomato's hyperlocal delivery operations. Build predictive models for demand forecasting.",
    requirements: ["Python", "ML", "SQL", "Spark"],
    tags: ["Data Science", "Consumer Tech", "India"],
    url: "#",
    remote: false,
    postedAt: "1 week ago",
    matchScore: 72,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    salary: "₹20L - ₹35L",
    description: "Design and maintain Razorpay's cloud infrastructure. Ensure high availability of India's leading payments platform.",
    requirements: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    tags: ["DevOps", "Cloud", "FinTech"],
    url: "#",
    remote: true,
    postedAt: "2 days ago",
    matchScore: 68,
  },
];

function JobCard({ job, onSave, isSaved }: { job: Job; onSave: (id: string) => void; isSaved: boolean }) {
  const scoreColor = job.matchScore
    ? job.matchScore >= 85 ? "#10b981" : job.matchScore >= 70 ? "#f59e0b" : "#ef4444"
    : "#6b7280";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 hover:shadow-[var(--shadow-md)] transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Company avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: `hsl(${job.company.charCodeAt(0) * 17 % 360}, 65%, 55%)` }}
          >
            {job.company[0]}
          </div>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              {job.title}
            </h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {job.company}
            </p>
          </div>
        </div>

        {/* Match score */}
        {job.matchScore && (
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
            style={{ background: `${scoreColor}15`, color: scoreColor }}
          >
            <TrendingUp className="w-3 h-3" />
            {job.matchScore}% match
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <MapPin className="w-3 h-3" />{job.location}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <Briefcase className="w-3 h-3" />{job.salary}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
          <Clock className="w-3 h-3" />{job.postedAt}
        </span>
        {job.remote && (
          <span className="flex items-center gap-1 text-xs text-emerald-500">
            <Wifi className="w-3 h-3" />Remote
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs mb-3 leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.requirements.slice(0, 4).map((req) => (
          <span
            key={req}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: "var(--bg-muted)", color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
          >
            {req}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
          style={{ color: "var(--text-primary)" }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Job
        </a>
        <button
          onClick={() => onSave(job.id)}
          className="w-9 h-9 rounded-xl border border-[var(--border-default)] flex items-center justify-center hover:bg-[var(--bg-muted)] transition-all"
          title={isSaved ? "Unsave" : "Save job"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4" style={{ color: "var(--brand-primary)" }} />
          ) : (
            <Bookmark className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          )}
        </button>
        <button
          className="flex-1 btn-primary py-2 text-xs"
        >
          Quick Apply
        </button>
      </div>
    </motion.div>
  );
}

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = MOCK_JOBS.filter((job) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.tags.some((t) => t.toLowerCase().includes(q));
    return matchesQuery && (!remoteOnly || job.remote);
  }).sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
          <Search className="w-5 h-5" style={{ color: "#3b82f6" }} />
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
            AI Job Search
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Jobs ranked by AI match score based on your profile
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4 flex items-center gap-3">
        <Search className="w-5 h-5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by role, company, or skill..."
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "var(--text-primary)" }}
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={cn(
                "w-9 h-5 rounded-full relative transition-all cursor-pointer",
                remoteOnly ? "bg-blue-500" : "bg-[var(--bg-muted)] border border-[var(--border-default)]"
              )}
            >
              <div
                className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                  remoteOnly ? "left-4" : "left-0.5"
                )}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Remote Only
            </span>
          </label>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all" style={{ color: "var(--text-secondary)" }}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </motion.div>

      {/* Results */}
      <div>
        <p className="text-xs font-medium mb-4" style={{ color: "var(--text-muted)" }}>
          {filtered.length} jobs found · Sorted by AI match score
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <JobCard job={job} onSave={toggleSave} isSaved={savedJobs.has(job.id)} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
            <p className="text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>No jobs found</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try a different search or remove filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
