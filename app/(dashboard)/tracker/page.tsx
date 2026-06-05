"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  KanbanSquare,
  Plus,
  Briefcase,
  Building2,
  X,
  ExternalLink,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { ApplicationStatus } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { generateId } from "@/lib/utils";

interface TrackerApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
  salary?: string;
  jobUrl?: string;
  appliedAt?: string;
  notes?: string;
  updatedAt: string;
}

const COLUMNS: { key: ApplicationStatus; label: string; color: string; emoji: string }[] = [
  { key: "WISHLIST", label: "Wishlist", color: "#8b83a3", emoji: "⭐" },
  { key: "APPLIED", label: "Applied", color: "#3b82f6", emoji: "📤" },
  { key: "INTERVIEW", label: "Interview", color: "#f59e0b", emoji: "🎤" },
  { key: "OFFER", label: "Offer", color: "#10b981", emoji: "🎉" },
  { key: "REJECTED", label: "Rejected", color: "#ef4444", emoji: "❌" },
];

const INITIAL_DATA: TrackerApplication[] = [
  { id: "1", company: "Google", role: "Senior Software Engineer", status: "INTERVIEW", location: "Bangalore", salary: "₹50L", updatedAt: new Date().toISOString(), appliedAt: "2026-05-20" },
  { id: "2", company: "Stripe", role: "Product Manager", status: "APPLIED", location: "Remote", updatedAt: new Date().toISOString() },
  { id: "3", company: "Vercel", role: "Frontend Developer", status: "WISHLIST", location: "Remote", updatedAt: new Date().toISOString() },
  { id: "4", company: "OpenAI", role: "AI Research Engineer", status: "APPLIED", location: "San Francisco", updatedAt: new Date().toISOString() },
];

function AddApplicationModal({ onAdd, onClose }: { onAdd: (app: Omit<TrackerApplication, "id" | "updatedAt">) => void; onClose: () => void }) {
  const [form, setForm] = useState({ company: "", role: "", status: "WISHLIST" as ApplicationStatus, location: "", salary: "", jobUrl: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.role) {
      toast.error("Company and role are required");
      return;
    }
    onAdd({ ...form });
    onClose();
    toast.success("Application successfully added!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md rounded-2xl p-6 shadow-[var(--shadow-xl)]"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
            Add New Application
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[var(--bg-muted)] flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: "company", label: "Company Name *", placeholder: "e.g. Stripe" },
            { key: "role", label: "Job Title / Role *", placeholder: "e.g. Software Engineer" },
            { key: "location", label: "Office Location", placeholder: "e.g. Bangalore, Remote" },
            { key: "salary", label: "Compensation Target", placeholder: "e.g. ₹30L - ₹45L" },
            { key: "jobUrl", label: "Job Description URL", placeholder: "e.g. https://careers.stripe.com/..." },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>{field.label}</label>
              <input
                value={form[field.key as keyof typeof form] as string}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>Board Column</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ApplicationStatus })}
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none cursor-pointer"
              style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
            >
              {COLUMNS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary w-full py-3 mt-3 text-xs font-bold cursor-pointer">
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function TrackerPage() {
  const [applications, setApplications] = useState<TrackerApplication[]>(INITIAL_DATA);
  const [showModal, setShowModal] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<ApplicationStatus | null>(null);

  const handleAdd = (app: Omit<TrackerApplication, "id" | "updatedAt">) => {
    setApplications((prev) => [
      ...prev,
      { ...app, id: generateId(), updatedAt: new Date().toISOString() },
    ]);
  };

  const handleDragStart = (id: string) => setDragging(id);
  const handleDragOver = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    setDragOverCol(status);
  };
  const handleDrop = (status: ApplicationStatus) => {
    if (!dragging) return;
    setApplications((prev) =>
      prev.map((a) => (a.id === dragging ? { ...a, status, updatedAt: new Date().toISOString() } : a))
    );
    setDragging(null);
    setDragOverCol(null);
    toast.success("Application status updated!");
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    toast.success("Application tracking dismissed");
  };

  const wishlistCount = applications.filter((a) => a.status === "WISHLIST").length;
  const appliedCount = applications.filter((a) => a.status === "APPLIED").length;
  const interviewCount = applications.filter((a) => a.status === "INTERVIEW").length;
  const offerCount = applications.filter((a) => a.status === "OFFER").length;

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      {/* 1. Hero-Level Subpage Header */}
      <div
        className="rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Board Pipeline</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            Application Tracker
          </h1>
          <p className="text-xs max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Stay organized through interviews and salary negotiation. Drag and drop cards to update status pipelines.
          </p>
        </div>

        {/* Stats Columns */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-6 bg-[var(--bg-card)] border border-[var(--border-default)] px-4 py-2 rounded-xl shadow-[var(--shadow-sm)] text-[10px]">
            <div>
              <p className="font-bold text-[var(--text-primary)]">{applications.length}</p>
              <p className="text-[var(--text-muted)]">Active</p>
            </div>
            <div className="border-l h-5 border-[var(--border-default)]" />
            <div>
              <p className="font-bold text-[#f59e0b]">{interviewCount}</p>
              <p className="text-[var(--text-muted)]">Interviews</p>
            </div>
            <div className="border-l h-5 border-[var(--border-default)]" />
            <div>
              <p className="font-bold text-[#10b981]">{offerCount}</p>
              <p className="text-[var(--text-muted)]">Offers</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs font-bold flex items-center gap-1.5 px-4 py-2.5 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[var(--shadow-sm)] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
          >
            <Plus className="w-4 h-4" /> Add Job
          </button>
        </div>
      </div>

      {/* 2. Empty Board State */}
      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 text-center max-w-xl mx-auto space-y-4 border border-[var(--border-default)] shadow-[var(--shadow-elevated)]"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--bg-muted)] flex items-center justify-center mx-auto">
            <KanbanSquare className="w-7 h-7 text-[#f59e0b]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              No applications tracked yet
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Add job applications you are interested in, applied to, or currently interviewing for to start visual tracking.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs font-bold inline-flex items-center gap-1.5 px-6 py-2.5 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
          >
            <Plus className="w-4 h-4" /> Track your first role
          </button>
        </motion.div>
      ) : (
        /* 3. Kanban Columns Board */
        <div className="flex gap-5 overflow-x-auto pb-6 select-none scrollbar">
          {COLUMNS.map((col) => {
            const colApps = applications.filter((a) => a.status === col.key);
            const isTarget = dragOverCol === col.key;
            return (
              <div
                key={col.key}
                className="flex-shrink-0 w-64 flex flex-col rounded-2xl p-4 border border-[var(--border-default)] transition-all h-[550px]"
                style={{
                  background: isTarget ? `${col.color}08` : "var(--bg-card)",
                  borderColor: isTarget ? col.color : "var(--border-default)",
                  boxShadow: isTarget ? `0 0 16px -4px ${col.color}40` : "var(--shadow-sm)",
                }}
                onDragOver={(e) => handleDragOver(e, col.key)}
                onDrop={() => handleDrop(col.key)}
                onDragLeave={() => setDragOverCol(null)}
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{col.emoji}</span>
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: `${col.color}15`, color: col.color }}
                  >
                    {colApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar">
                  <AnimatePresence mode="popLayout">
                    {colApps.map((app) => (
                      <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="group relative bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl p-4 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)] transition-all cursor-grab active:cursor-grabbing"
                        draggable
                        onDragStart={() => handleDragStart(app.id)}
                        onDragEnd={() => setDragging(null)}
                      >
                        {/* Upper card section */}
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ background: col.color }}
                            >
                              {app.company[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate leading-tight" style={{ color: "var(--text-primary)" }}>
                                {app.role}
                              </p>
                              <p className="text-[9px] font-medium truncate" style={{ color: "var(--text-muted)" }}>
                                {app.company}
                              </p>
                            </div>
                          </div>
                          
                          {/* Close/Dismiss tracking button — group class on parent ensures this hover transition is responsive */}
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="w-5 h-5 rounded hover:bg-[var(--bg-muted)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0"
                          >
                            <X className="w-3 h-3 text-[var(--text-muted)] hover:text-red-500" />
                          </button>
                        </div>

                        {/* Mid Details section */}
                        <div className="space-y-1 text-[9px]">
                          {app.location && (
                            <p className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                              <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                              {app.location}
                            </p>
                          )}
                          {app.salary && (
                            <p className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                              <DollarSign className="w-3 h-3 text-[var(--text-muted)]" />
                              {app.salary}
                            </p>
                          )}
                          <p className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                            <Calendar className="w-3 h-3 text-[var(--text-muted)]" />
                            {formatRelativeTime(app.updatedAt)}
                          </p>
                        </div>

                        {/* Lower Action Link */}
                        {app.jobUrl && (
                          <div className="pt-2 mt-2 border-t border-[var(--border-subtle)]">
                            <a
                              href={app.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[9px] font-bold hover:underline"
                              style={{ color: col.color }}
                            >
                              <ExternalLink className="w-3 h-3" /> Job Posting
                            </a>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Drag Target Area Indicator */}
                  {colApps.length === 0 && (
                    <div
                      className="h-24 rounded-xl border border-dashed border-[var(--border-default)] flex flex-col items-center justify-center text-center p-3 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Plus className="w-4 h-4 mb-1" style={{ color: "var(--text-muted)" }} />
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        Drop role here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <AddApplicationModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}
