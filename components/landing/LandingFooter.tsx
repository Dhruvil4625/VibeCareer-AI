import Link from "next/link";
import { Zap, Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/sign-up", label: "Get Started" },
    { href: "#how-it-works", label: "How It Works" },
  ],
  Tools: [
    { href: "/resume", label: "Resume Builder" },
    { href: "/cover-letter", label: "Cover Letters" },
    { href: "/jobs", label: "Job Search" },
    { href: "/interview", label: "Mock Interview" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ],
};

const social = [
  { icon: Github, href: "https://github.com/Dhruvil4625", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dhruvil-ramolia-3b9026266", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ramoliadk@gmail.com", label: "Email" },
];

export function LandingFooter() {
  return (
    <footer
      className="border-t border-[var(--border-default)] pt-16 pb-8 px-6"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Vibe<span className="gradient-text">Career</span>
              </span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The all-in-one AI-powered career acceleration platform.
              Land your dream job faster with the power of Gemini AI.
            </p>
            <div className="flex items-center gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-[var(--border-default)] flex items-center justify-center transition-all hover:border-[var(--brand-primary)] hover:bg-[var(--bg-muted)]"
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="font-semibold text-sm mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-default)]"
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 VibeCareer AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
              style={{
                background: "var(--bg-muted)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-default)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
