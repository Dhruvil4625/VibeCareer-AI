"use client";

import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Star } from "lucide-react";
import { toast } from "sonner";

const jobs = [
  {
    id: 1,
    title: "Senior AI Engineer (NLP & LLMs)",
    department: "Engineering",
    location: "Remote (India/US)",
    type: "Full-Time",
    salary: "$120k - $150k",
  },
  {
    id: 2,
    title: "Frontend Engineer (Next.js / React)",
    department: "Engineering",
    location: "Gujarat, India",
    type: "Internship (6 Months)",
    salary: "₹30,000 - ₹45,000 /mo",
  },
  {
    id: 3,
    title: "Product Designer (UX/UI)",
    department: "Design",
    location: "Remote (India)",
    type: "Full-Time",
    salary: "$60k - $80k",
  },
  {
    id: 4,
    title: "Technical Content & Community Lead",
    department: "Marketing",
    location: "Remote",
    type: "Part-Time / Contractor",
    salary: "$30 - $50 /hr",
  },
];

export default function CareersPage() {
  const handleApply = (jobTitle: string) => {
    toast.success(`Application portal opened for: ${jobTitle}. Send your CV to ramoliadk@gmail.com!`);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
                <Star className="w-3.5 h-3.5" />
                Join Our Team
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                Build the Future of <span className="gradient-text">Recruiting</span>
              </h1>
              <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
                Help us create the AI tools that empower candidates to showcase their actual skill strengths.
              </p>

              {/* Hero Image */}
              <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-40" />
                <img
                  src="/images/careers_hero.png"
                  alt="Careers at VibeCareer"
                  className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>
            </motion.div>
          </div>

          {/* Job listings */}
          <div className="flex flex-col gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 md:p-8 hover:border-[var(--brand-strong)] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-[var(--border-default)]" style={{ background: "var(--bg-muted)", color: "var(--brand-primary)" }}>
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[var(--border-default)]" style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}>
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      {job.salary}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.title)}
                  className="btn-primary flex items-center gap-2 text-xs py-2.5 px-5 cursor-pointer shrink-0"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
