"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Search,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
  Zap,
  ChevronRight,
  Settings,
  X,
  Command,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",         label: "Dashboard",       icon: LayoutDashboard, color: "#7c3aed" },
  { href: "/resume",            label: "Resume Builder",  icon: FileText,        color: "#7c3aed" },
  { href: "/cover-letter",      label: "Cover Letters",   icon: Mail,            color: "#10b981" },
  { href: "/jobs",              label: "Job Search",      icon: Search,          color: "#3b82f6" },
  { href: "/tracker",           label: "App. Tracker",    icon: KanbanSquare,    color: "#f59e0b" },
  { href: "/coach",             label: "AI Coach",        icon: MessageSquare,   color: "#ec4899" },
  { href: "/interview",         label: "Mock Interview",  icon: Mic,             color: "#8b5cf6" },
  { href: "/profile-optimizer", label: "LinkedIn AI",     icon: Linkedin,        color: "#0ea5e9" },
  { href: "/architecture",      label: "System Design",   icon: Cpu,             color: "#8b5cf6" },
];

interface DashboardSidebarProps {
  user: { name?: string | null; email?: string | null; image?: string | null; };
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onCommandPalette?: () => void;
}

function SidebarContent({
  user,
  onClose,
  onCommandPalette,
}: {
  user: DashboardSidebarProps["user"];
  onClose?: () => void;
  onCommandPalette?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="p-5 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border-default)" }}
      >
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 group w-fit"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="font-bold text-base tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            Vibe<span className="gradient-text">Career</span>
          </span>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-muted)] transition-all"
          >
            <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
          </button>
        )}
      </div>

      {/* Command palette shortcut */}
      {onCommandPalette && (
        <div className="px-3 pt-3">
          <button
            onClick={onCommandPalette}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:bg-[var(--bg-muted)]"
            style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="flex-1 text-left text-xs">Search pages...</span>
            <div className="flex items-center gap-0.5">
              <kbd
                className="text-[9px] px-1 py-0.5 rounded font-mono"
                style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}
              >
                Ctrl
              </kbd>
              <kbd
                className="text-[9px] px-1 py-0.5 rounded font-mono"
                style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}
              >
                K
              </kbd>
            </div>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p
          className="text-xs font-semibold uppercase tracking-widest px-3 mb-3 mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          Main Menu
        </p>
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative overflow-hidden",
                    !isActive && "hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  )}
                  style={{
                    background: isActive ? `${item.color}12` : "transparent",
                    color: isActive ? item.color : "var(--text-secondary)",
                  }}
                >
                  {/* Active bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                      style={{ background: item.color }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: isActive ? `${item.color}20` : "transparent",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: isActive ? item.color : "inherit" }}
                    />
                  </div>

                  <span className="flex-1 truncate">{item.label}</span>

                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t" style={{ borderColor: "var(--border-default)" }}>
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--bg-muted)] transition-all mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>

        {/* User card */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            background: "var(--bg-muted)",
            border: "1px solid var(--border-default)",
          }}
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
            >
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
              {user.name ?? "User"}
            </p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
              {user.email ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar({
  user,
  mobileOpen = false,
  onMobileClose,
  onCommandPalette,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen sticky top-0 border-r border-[var(--border-default)] overflow-hidden"
        style={{
          background: "var(--bg-subtle)",
          width: "var(--sidebar-width)",
          minWidth: "var(--sidebar-width)",
        }}
      >
        <SidebarContent
          user={user}
          onCommandPalette={onCommandPalette}
        />
      </aside>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col border-r border-[var(--border-default)]"
              style={{
                background: "var(--bg-subtle)",
                width: "280px",
              }}
            >
              <SidebarContent
                user={user}
                onClose={onMobileClose}
                onCommandPalette={() => {
                  onMobileClose?.();
                  onCommandPalette?.();
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
