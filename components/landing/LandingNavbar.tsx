"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Zap, Sun, Moon, Menu, X, LayoutDashboard, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#features",    label: "Features" },
  { href: "#how-it-works",label: "How It Works" },
  { href: "#pricing",     label: "Pricing" },
  { href: "#testimonials",label: "Reviews" },
];

export function LandingNavbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme }         = useTheme();
  const [mounted, setMounted]       = useState(false);
  const { data: session }           = useSession();

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(to right, #7c3aed, #ec4899, #10b981)",
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-[var(--border-default)] shadow-[var(--shadow-md)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
            >
              Vibe<span className="gradient-text">Career</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 block text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all border border-[var(--border-default)] hover:border-[var(--brand-primary)] hover:bg-[var(--bg-muted)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                ) : (
                  <Moon className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                )}
              </button>
            )}

            {/* Authenticated: show Dashboard button */}
            {session ? (
              <Link
                href="/dashboard"
                className="hidden md:inline-flex btn-primary text-sm gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:inline-flex px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-default)] transition-all hover:bg-[var(--bg-muted)] hover:border-[var(--border-strong)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn-primary text-sm hidden md:inline-flex">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border-default)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
              ) : (
                <Menu className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-[var(--border-default)] p-5 md:hidden"
          >
            <ul className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-[var(--bg-muted)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 mt-1 border-t border-[var(--border-default)] flex flex-col gap-2">
                {session ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-sm justify-center"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-medium rounded-xl border border-[var(--border-default)] text-center"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary text-sm justify-center"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
