import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — VibeCareer AI",
  description: "Sign in to your VibeCareer AI account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
