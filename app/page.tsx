import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";

export const metadata: Metadata = {
  title: "VibeCareer AI — Accelerate Your Career with AI",
  description:
    "The all-in-one AI-powered career platform. Build ATS-optimized resumes, generate compelling cover letters, track applications, and get personalized career coaching powered by Gemini AI.",
};

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden spotlight-grid dot-matrix">
      <MouseSpotlightTracker />
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <LandingFooter />
    </main>
  );
}
