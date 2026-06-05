"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Search,
  KanbanSquare,
  MessageSquare,
  Mic,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

const bottomNavItems = [
  { href: "/dashboard",         icon: LayoutDashboard, label: "Home",      color: "#7c3aed" },
  { href: "/resume",            icon: FileText,        label: "Resume",    color: "#7c3aed" },
  { href: "/jobs",              icon: Search,          label: "Jobs",      color: "#3b82f6" },
  { href: "/tracker",           icon: KanbanSquare,    label: "Tracker",   color: "#f59e0b" },
  { href: "/coach",             icon: MessageSquare,   label: "Coach",     color: "#ec4899" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-default)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <nav className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all relative min-w-[52px]"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `${item.color}12` }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className="w-5 h-5 relative z-10"
                style={{ color: isActive ? item.color : "var(--text-muted)" }}
              />
              <span
                className="text-[10px] font-medium relative z-10"
                style={{ color: isActive ? item.color : "var(--text-muted)" }}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: item.color }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
