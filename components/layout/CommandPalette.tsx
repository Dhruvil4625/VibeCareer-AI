"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FileText,
  Mail,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
  Zap,
  ArrowRight,
  Command,
  Home,
} from "lucide-react";

const commands = [
  { id: "dashboard",  label: "Dashboard",           icon: LayoutDashboard, href: "/dashboard",           color: "#7c3aed", group: "Pages" },
  { id: "resume",     label: "Resume Builder",       icon: FileText,        href: "/resume",              color: "#7c3aed", group: "Pages" },
  { id: "cover",      label: "Cover Letter",         icon: Mail,            href: "/cover-letter",        color: "#10b981", group: "Pages" },
  { id: "jobs",       label: "Job Search",           icon: Search,          href: "/jobs",                color: "#3b82f6", group: "Pages" },
  { id: "tracker",    label: "Application Tracker",  icon: KanbanSquare,    href: "/tracker",             color: "#f59e0b", group: "Pages" },
  { id: "coach",      label: "AI Career Coach",      icon: MessageSquare,   href: "/coach",               color: "#ec4899", group: "Pages" },
  { id: "interview",  label: "Mock Interview",       icon: Mic,             href: "/interview",           color: "#8b5cf6", group: "Pages" },
  { id: "linkedin",   label: "LinkedIn Optimizer",   icon: Linkedin,        href: "/profile-optimizer",   color: "#0ea5e9", group: "Pages" },
  { id: "home",       label: "Back to Home",         icon: Home,            href: "/",                    color: "#6b7280", group: "Navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = query.trim()
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.href.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose]
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) { setQuery(""); setSelected(0); }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) { navigate(filtered[selected].href); }
      if (e.key === "Escape") { onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, navigate, onClose]);

  const groups = [...new Set(filtered.map((c) => c.group))];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
              }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 border-b"
                style={{ borderColor: "var(--border-default)" }}
              >
                <Search className="w-5 h-5 flex-shrink-0" style={{ color: "var(--brand-primary)" }} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, tools, actions..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "var(--text-primary)" }}
                />
                <kbd
                  className="text-[10px] px-1.5 py-0.5 rounded border font-mono"
                  style={{
                    background: "var(--bg-muted)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-muted)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  groups.map((group) => (
                    <div key={group}>
                      <p
                        className="text-[10px] font-semibold uppercase tracking-wider px-4 py-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {group}
                      </p>
                      {filtered
                        .filter((c) => c.group === group)
                        .map((cmd, i) => {
                          const globalIdx = filtered.indexOf(cmd);
                          const Icon = cmd.icon;
                          const isSelected = globalIdx === selected;
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => navigate(cmd.href)}
                              onMouseEnter={() => setSelected(globalIdx)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all"
                              style={{
                                background: isSelected ? `${cmd.color}10` : "transparent",
                                borderLeft: isSelected ? `2px solid ${cmd.color}` : "2px solid transparent",
                              }}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: `${cmd.color}15` }}
                              >
                                <Icon className="w-4 h-4" style={{ color: cmd.color }} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                  {cmd.label}
                                </p>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                  {cmd.href}
                                </p>
                              </div>
                              {isSelected && (
                                <ArrowRight className="w-4 h-4" style={{ color: cmd.color }} />
                              )}
                            </button>
                          );
                        })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-t text-[10px]"
                style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border font-mono" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border font-mono" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>↵</kbd>
                    Open
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" style={{ color: "var(--brand-primary)" }} />
                  <span>VibeCareer AI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
