import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VibeCareer AI — Accelerate Your Career with AI",
    template: "%s | VibeCareer AI",
  },
  description:
    "The all-in-one AI-powered career platform. Build ATS-optimized resumes, generate compelling cover letters, track applications, practice mock interviews, and get personalized career coaching.",
  keywords: [
    "AI career coach",
    "resume builder",
    "cover letter generator",
    "job search",
    "mock interview",
    "career platform",
    "ATS resume",
    "LinkedIn optimizer",
    "job tracker",
  ],
  authors: [{ name: "VibeCareer AI" }],
  creator: "VibeCareer AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibecareer.ai",
    title: "VibeCareer AI — Accelerate Your Career with AI",
    description:
      "The all-in-one AI-powered career platform. Build resumes, generate cover letters, track applications, and get personalized career coaching.",
    siteName: "VibeCareer AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeCareer AI — Accelerate Your Career with AI",
    description: "All-in-one AI career acceleration platform",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0612" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
