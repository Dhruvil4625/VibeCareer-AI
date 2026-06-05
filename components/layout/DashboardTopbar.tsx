"use client";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  Menu,
  Search,
  LayoutDashboard,
  FileText,
  Mail,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
  Home,
  Settings,
  ChevronRight,
  CheckCircle2,
  Check,
  Trash2,
  Sparkles,
  Clock,
  X,
  Cpu,
} from "lucide-react";

const PAGE_META: Record<string, { label: string; icon: React.ElementType; color: string; parent?: string }> = {
  "/dashboard":         { label: "Dashboard",         icon: LayoutDashboard, color: "#7c3aed" },
  "/resume":            { label: "Resume Builder",     icon: FileText,        color: "#7c3aed",  parent: "/dashboard" },
  "/cover-letter":      { label: "Cover Letters",      icon: Mail,            color: "#10b981",  parent: "/dashboard" },
  "/jobs":              { label: "Job Search",          icon: Search,          color: "#3b82f6",  parent: "/dashboard" },
  "/tracker":           { label: "App. Tracker",        icon: KanbanSquare,    color: "#f59e0b",  parent: "/dashboard" },
  "/coach":             { label: "AI Career Coach",     icon: MessageSquare,   color: "#ec4899",  parent: "/dashboard" },
  "/interview":         { label: "Mock Interview",      icon: Mic,             color: "#8b5cf6",  parent: "/dashboard" },
  "/profile-optimizer": { label: "LinkedIn AI",         icon: Linkedin,        color: "#0ea5e9",  parent: "/dashboard" },
  "/settings":          { label: "Settings",            icon: Settings,        color: "#6b7280",  parent: "/dashboard" },
  "/architecture":      { label: "System Design",       icon: Cpu,             color: "#8b5cf6",  parent: "/dashboard" },
};

interface DashboardTopbarProps {
  user: { name?: string | null; email?: string | null; image?: string | null; };
  onMenuClick?: () => void;
  onCommandPalette?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardTopbar({ user, onMenuClick, onCommandPalette }: DashboardTopbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Define notification type
  interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    unread: boolean;
    type: "resume" | "tracker" | "linkedin" | "coach" | "general";
    href?: string;
  }

  // Initial state for notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "AI Resume Boost Complete",
      description: "Gemini optimized 5 bullet points in your Experience section.",
      time: "2 mins ago",
      unread: true,
      type: "resume",
      href: "/resume",
    },
    {
      id: "2",
      title: "Application Track Update",
      description: "Your application at Google has been moved to 'Interview'.",
      time: "2 hours ago",
      unread: true,
      type: "tracker",
      href: "/tracker",
    },
    {
      id: "3",
      title: "LinkedIn Analysis Audit",
      description: "Your public profile audit score stands at 72%. Try headline updates.",
      time: "1 day ago",
      unread: false,
      type: "linkedin",
      href: "/profile-optimizer",
    },
  ]);

  // Toast stack state
  const [toasts, setToasts] = useState<{
    id: string;
    title: string;
    description: string;
    type: "resume" | "tracker" | "linkedin" | "coach" | "general";
    href?: string;
  }[]>([]);

  useEffect(() => setMounted(true), []);

  const hasUnread = notifications.some((n) => n.unread);

  // Helper for notification style mappings
  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "resume":
        return { icon: FileText, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" };
      case "tracker":
        return { icon: KanbanSquare, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
      case "linkedin":
        return { icon: Linkedin, color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.1)" };
      case "coach":
        return { icon: MessageSquare, color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)" };
      default:
        return { icon: Bell, color: "#8b83a3", bg: "rgba(139, 131, 163, 0.1)" };
    }
  };

  // Trigger simulated/real-time notifications
  const triggerNotification = (
    title: string,
    description: string,
    type: "resume" | "tracker" | "linkedin" | "coach" | "general",
    href?: string
  ) => {
    const id = Date.now().toString();
    const newNotif: NotificationItem = {
      id,
      title,
      description,
      time: "Just now",
      unread: true,
      type,
      href,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Create a new toast alert
    const newToast = { id, title, description, type, href };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Toast dismiss handler
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Simulation timer for showcase
  useEffect(() => {
    if (!mounted) return;

    // Simulated event 1: Resume optimized suggestions
    const timer1 = setTimeout(() => {
      triggerNotification(
        "AI Resume Suggestions Ready",
        "Gemini drafted 3 tailored cover letter suggestions for your Google application.",
        "resume",
        "/cover-letter"
      );
    }, 10000);

    // Simulated event 2: LinkedIn analysis score boost
    const timer2 = setTimeout(() => {
      triggerNotification(
        "LinkedIn Profile Score Boost",
        "Your score improved by +12% after adding recommended focus keywords.",
        "linkedin",
        "/profile-optimizer"
      );
    }, 28000);

    // Simulated event 3: Mock interview prep recommendation
    const timer3 = setTimeout(() => {
      triggerNotification(
        "Interview Prep Alert",
        "New behavioral practice questions are ready for your Software Engineer role.",
        "coach",
        "/interview"
      );
    }, 48000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [mounted]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleReadStatus = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const handleNotificationClick = (n: NotificationItem) => {
    markAsRead(n.id);
    setNotificationsOpen(false);
    if (n.href) {
      router.push(n.href);
    }
  };

  const page = PAGE_META[pathname];
  const parent = page?.parent ? PAGE_META[page.parent] : null;
  const PageIcon = page?.icon ?? LayoutDashboard;

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-16 border-b"
        style={{
          background: "var(--bg-subtle)",
          borderColor: "var(--border-default)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Left: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={onMenuClick}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Dashboard parent link */}
            {parent && (
              <>
                <Link
                  href={page?.parent ?? "/dashboard"}
                  className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-all flex-shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
              </>
            )}

            {/* Current page */}
            {page ? (
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${page.color}15` }}
                >
                  <PageIcon className="w-3.5 h-3.5" style={{ color: page.color }} />
                </div>
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {page.label}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                VibeCareer AI
              </span>
            )}
          </div>
        </div>

        {/* Right: Search + Theme + Bell + User */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Ctrl+K search */}
          <button
            onClick={onCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)] transition-all text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search...</span>
            <div className="hidden md:flex items-center gap-0.5 ml-1">
              <kbd className="text-[9px] px-1 py-0.5 rounded font-mono" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>⌘</kbd>
              <kbd className="text-[9px] px-1 py-0.5 rounded font-mono" style={{ background: "var(--bg-muted)", border: "1px solid var(--border-default)" }}>K</kbd>
            </div>
          </button>

          {/* Mobile search icon only */}
          <button
            onClick={onCommandPalette}
            className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
          >
            <Search className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
              )}
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell
                key={notifications.filter((n) => n.unread).length}
                className={`w-4 h-4 transition-all ${
                  hasUnread ? "animate-bell-ring text-[var(--brand-primary)]" : ""
                }`}
                style={{ color: hasUnread ? "var(--brand-primary)" : "var(--text-secondary)" }}
              />
              {hasUnread && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 animate-pulse"
                  style={{ background: "var(--brand-primary)", borderColor: "var(--bg-subtle)" }}
                />
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotificationsOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl border shadow-[var(--shadow-lg)] py-2 z-40"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}
                >
                  {/* Header */}
                  <div className="px-4 py-2 border-b flex items-center justify-between" style={{ borderColor: "var(--border-default)" }}>
                    <span className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>
                      Notifications
                    </span>
                    {hasUnread && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-violet-500 hover:underline cursor-pointer font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* List */}
                  <div className="max-h-64 overflow-y-auto divide-y" style={{ borderColor: "var(--border-default)" }}>
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-50" />
                        All caught up!
                      </div>
                    ) : (
                      notifications.map((n) => {
                        const styles = getNotificationStyles(n.type);
                        const Icon = styles.icon;
                        return (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`w-full text-left px-4 py-3 hover:bg-[var(--bg-muted)] transition-all flex gap-3 items-start relative cursor-pointer group border-b border-[var(--border-default)] last:border-b-0 ${
                              n.unread ? "bg-[var(--brand-primary)]/5" : ""
                            }`}
                          >
                            {/* Left: Beautiful icon container */}
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: styles.bg }}
                            >
                              <Icon className="w-4 h-4" style={{ color: styles.color }} />
                            </div>

                            {/* Middle: Content */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="flex items-center justify-between gap-1">
                                <p className="text-xs font-bold leading-tight truncate pr-4" style={{ color: "var(--text-primary)" }}>
                                  {n.title}
                                </p>
                                <span className="text-[9px] flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                                  {n.time}
                                </span>
                              </div>
                              <p className="text-[10px] leading-snug break-words" style={{ color: "var(--text-secondary)" }}>
                                {n.description}
                              </p>
                            </div>

                            {/* Right: Unread status and action icons */}
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                              {n.unread ? (
                                <span className="w-2 h-2 rounded-full" style={{ background: "var(--brand-primary)" }} />
                              ) : (
                                <div className="w-2 h-2" />
                              )}
                              
                              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  title={n.unread ? "Mark as read" : "Mark as unread"}
                                  onClick={(e) => toggleReadStatus(n.id, e)}
                                  className="p-1 rounded hover:bg-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button
                                  title="Delete"
                                  onClick={(e) => deleteNotification(n.id, e)}
                                  className="p-1 rounded hover:bg-[var(--border-default)] text-[var(--text-muted)] hover:text-red-500 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  
                  {/* Footer clear */}
                  {notifications.length > 0 && (
                    <div className="px-4 pt-2 border-t text-center" style={{ borderColor: "var(--border-default)" }}>
                      <button
                        onClick={() => setNotifications([])}
                        className="text-[10px] text-[var(--text-muted)] hover:text-red-500 cursor-pointer font-semibold"
                      >
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
            >
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
              ) : (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
                >
                  {getInitials(user.name ?? "U")}
                </div>
              )}
              <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--text-primary)" }}>
                {user.name?.split(" ")[0] ?? "User"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 hidden sm:block" style={{ color: "var(--text-muted)" }} />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border shadow-[var(--shadow-lg)] py-1.5 z-40"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border-default)" }}>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {user.name}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--bg-muted)] transition-all"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>

                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--bg-muted)] transition-all"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Home className="w-4 h-4" />
                      Home Page
                    </Link>

                    <div className="my-1 border-t" style={{ borderColor: "var(--border-default)" }} />

                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                      style={{ color: "var(--danger)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Toast Notification Stack */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const styles = getNotificationStyles(t.type);
          const Icon = styles.icon;
          return (
            <div
              key={t.id}
              onClick={() => {
                router.push(t.href || "#");
                dismissToast(t.id);
              }}
              className="pointer-events-auto flex gap-3 p-4 rounded-xl border shadow-[var(--shadow-lg)] cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] animate-scale-in"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-strong)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: styles.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: styles.color }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                    {t.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissToast(t.id);
                    }}
                    className="p-0.5 rounded-md hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] mt-0.5 leading-normal" style={{ color: "var(--text-secondary)" }}>
                  {t.description}
                </p>
                <span className="text-[8px] mt-1.5 block text-violet-500 font-semibold hover:underline">
                  Click to view
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
