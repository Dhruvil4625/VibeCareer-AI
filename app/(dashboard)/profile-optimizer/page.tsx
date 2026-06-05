"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { 
  Linkedin, 
  Sparkles, 
  Loader2, 
  Copy, 
  ArrowLeftRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Globe 
} from "lucide-react";

type Section = "headline" | "summary" | "experience" | "skills";

const sectionConfig: Record<Section, { label: string; placeholder: string; rows: number }> = {
  headline: {
    label: "Headline",
    placeholder: "e.g. Software Engineer at Startup | Building the future of...",
    rows: 2,
  },
  summary: {
    label: "About/Summary",
    placeholder: "Paste your current LinkedIn summary here...",
    rows: 6,
  },
  experience: {
    label: "Experience Description",
    placeholder: "Paste one of your experience descriptions here...",
    rows: 6,
  },
  skills: {
    label: "Skills Section",
    placeholder: "List your current skills (one per line or comma separated)...",
    rows: 4,
  },
};

interface PredictedRole {
  role: string;
  fitPercentage: number;
  rationale: string;
}

interface LinkAnalysisResult {
  score: number;
  predictedRoles: PredictedRole[];
  headlineSuggestions: string[];
  strengths: string[];
  improvements: string[];
  resumeStats?: {
    hasResume: boolean;
    projectsCount: number;
    certificationsCount: number;
    skillsCount: number;
  };
}

export default function ProfileOptimizerPage() {
  // Mode Selector: "sections" (existing feature) | "url" (new feature)
  const [optMode, setOptMode] = useState<"sections" | "url">("sections");
  
  // Section Optimizer States
  const [section, setSection] = useState<Section>("headline");
  const [targetRole, setTargetRole] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<{ optimized: string; improvements: string[] } | null>(null);
  
  // URL Analyzer States
  const [profileUrl, setProfileUrl] = useState("");
  const [linkAnalysisResult, setLinkAnalysisResult] = useState<LinkAnalysisResult | null>(null);
  
  // Global loading
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!content.trim()) { toast.error("Please paste your content first"); return; }
    if (!targetRole.trim()) { toast.error("Please enter your target role"); return; }

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/optimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          content,
          targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Optimization failed");
      }

      const data = await response.json();
      setResult(data);
      toast.success("LinkedIn section optimized! ✨");
    } catch (error: any) {
      toast.error(error.message || "Optimization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeLink = async () => {
    if (!profileUrl.trim()) {
      toast.error("Please enter your LinkedIn profile link first");
      return;
    }
    
    if (!profileUrl.includes("linkedin.com/")) {
      toast.error("Please enter a valid LinkedIn URL (e.g. linkedin.com/in/username)");
      return;
    }

    setIsLoading(true);
    setLinkAnalysisResult(null);
    
    let urlToSend = profileUrl.trim();
    if (urlToSend && !/^https?:\/\//i.test(urlToSend)) {
      urlToSend = `https://${urlToSend}`;
    }

    try {
      const response = await fetch("/api/ai/optimizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileUrl: urlToSend,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Profile analysis failed");
      }

      const data = await response.json();
      setLinkAnalysisResult(data);
      toast.success("Profile URL audited and analyzed successfully! ✨");
    } catch (error: any) {
      toast.error(error.message || "Could not analyze link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.12)" }}>
          <Linkedin className="w-5 h-5" style={{ color: "#0ea5e9" }} />
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
            LinkedIn Profile Optimizer
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Enhance individual page text fields or audit your public URL to predict job roles.
          </p>
        </div>
      </motion.div>

      {/* Mode Selector Tabs */}
      <div className="flex border-b border-[var(--border-default)]">
        <button
          onClick={() => { setOptMode("sections"); setResult(null); setLinkAnalysisResult(null); }}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            optMode === "sections" 
              ? "border-[#0ea5e9] text-[#0ea5e9]" 
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Optimize Profile Sections
        </button>
        <button
          onClick={() => { setOptMode("url"); setResult(null); setLinkAnalysisResult(null); }}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            optMode === "url" 
              ? "border-[#0ea5e9] text-[#0ea5e9]" 
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          LinkedIn URL Analyzer & Role Predictor
        </button>
      </div>

      {/* RENDER MODE: SECTIONS OPTIMIZER */}
      {optMode === "sections" && (
        <div className="space-y-6">
          {/* Section Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-2 flex gap-1">
            {(Object.keys(sectionConfig) as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => { setSection(s); setContent(""); setResult(null); }}
                className="flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: section === s ? "rgba(14,165,233,0.1)" : "transparent",
                  color: section === s ? "#0ea5e9" : "var(--text-secondary)",
                  border: section === s ? "1px solid rgba(14,165,233,0.2)" : "1px solid transparent",
                }}
              >
                {sectionConfig[s].label}
              </button>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
              <div className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Original {sectionConfig[section].label}
                  </h2>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}>
                    Before
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={sectionConfig[section].placeholder}
                  rows={sectionConfig[section].rows}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                  style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
                />
              </div>

              <div className="card p-5">
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                  Target Role / Industry
                </label>
                <input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Product Manager, ML Engineer..."
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
                />
              </div>

              <button
                onClick={handleOptimize}
                disabled={isLoading}
                className="btn-primary w-full py-3"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Optimizing with AI...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Optimize with AI</>
                )}
              </button>
            </motion.div>

            {/* Output */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
              <div className="card p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    AI-Optimized Version
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9" }}>
                      After
                    </span>
                    {result && (
                      <button
                        onClick={() => handleCopy(result.optimized)}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-[var(--bg-muted)] transition-all"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    )}
                  </div>
                </div>

                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="skeleton h-4 rounded" style={{ width: `${60 + (i % 3) * 15}%` }} />
                    ))}
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                      style={{ background: "var(--bg-subtle)", border: "1px solid rgba(14,165,233,0.2)", color: "var(--text-primary)" }}
                    >
                      {result.optimized}
                    </div>

                    {result.improvements.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                          ✨ Improvements Made:
                        </p>
                        <ul className="space-y-1.5">
                          {result.improvements.map((imp, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                              <ArrowLeftRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0ea5e9" }} />
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center">
                    <Linkedin className="w-10 h-10 mb-3 opacity-20" style={{ color: "var(--text-muted)" }} />
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Your optimized content will appear here
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* RENDER MODE: LINK INPORT & ROLE PREDICTION */}
      {optMode === "url" && (
        <div className="space-y-6">
          
          {/* Input field card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
            <h2 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Import Profile URL & Predict Opportunities
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Paste your public LinkedIn profile link. VibeCareer AI will audit your layout, parse keyword details, and match your metrics against predicted high-demand roles.
            </p>

            {/* Scraping Notice */}
            <div 
              className="p-3.5 rounded-xl border text-xs mb-4 leading-relaxed flex items-start gap-2.5"
              style={{
                background: "rgba(14, 165, 233, 0.05)",
                borderColor: "rgba(14, 165, 233, 0.15)",
                color: "var(--text-secondary)"
              }}
            >
              <span className="text-base leading-none">💡</span>
              <div className="space-y-1">
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>Scraping Integration Note</p>
                <p>
                  LinkedIn's security policies block direct external bots from scraping profile data (such as projects and certifications) without an active log-in session. 
                  To ensure an accurate evaluation, VibeCareer AI securely utilizes the <strong>skills, projects, and certifications</strong> you have already defined in your local <Link href="/resume" className="text-[#0ea5e9] hover:underline font-semibold">Resume Workspace</Link>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Linkedin className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all"
                  style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                  onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
                />
              </div>
              <button
                onClick={handleAnalyzeLink}
                disabled={isLoading}
                className="btn-primary py-3 px-6 text-sm whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Auditing Profile...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Audit & Predict</>
                )}
              </button>
            </div>
          </motion.div>

          {/* Result view */}
          {isLoading ? (
            <div className="card p-12 flex flex-col items-center justify-center text-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#0ea5e9]" />
              <p className="text-sm text-[var(--text-muted)] animate-pulse">
                Auditing layout tags, aligning skills index, and calculating job roles...
              </p>
            </div>
          ) : linkAnalysisResult ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              
              {/* Profile Optimization Score Card */}
              <div className="card p-6 flex flex-col items-center justify-center text-center h-fit">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text-muted)" }}>
                  Profile Audit Score
                </h3>
                <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-[10px] border-[var(--border-default)] mb-4">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="61"
                      className="fill-none stroke-[#0ea5e9] stroke-[10px]"
                      style={{
                        strokeDasharray: "383",
                        strokeDashoffset: 383 - (383 * linkAnalysisResult.score) / 100,
                        transition: "stroke-dashoffset 1s ease-out"
                      }}
                    />
                  </svg>
                  <span className="text-3xl font-black text-[#0ea5e9]" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {linkAnalysisResult.score}%
                  </span>
                </div>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                  Auditing complete!
                </p>
                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                  Your profile has good basic keyword index density.
                </p>
              </div>

              {/* Main Column */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Resume Workspace Integration Status Card */}
                {(!linkAnalysisResult.resumeStats || 
                  !linkAnalysisResult.resumeStats.hasResume || 
                  linkAnalysisResult.resumeStats.projectsCount === 0 || 
                  linkAnalysisResult.resumeStats.certificationsCount === 0) && (
                  <div 
                    className="card p-4 border flex items-start gap-3"
                    style={{
                      background: "rgba(245, 158, 11, 0.05)",
                      borderColor: "rgba(245, 158, 11, 0.15)",
                      color: "var(--text-secondary)"
                    }}
                  >
                    <span className="text-base leading-none mt-0.5">⚠️</span>
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-amber-500" style={{ fontFamily: "Outfit, sans-serif" }}>
                        Resume Integration Notice
                      </p>
                      <p className="leading-relaxed">
                        {!linkAnalysisResult.resumeStats || !linkAnalysisResult.resumeStats.hasResume ? (
                          <>
                            We could not find a resume in your profile. Because LinkedIn blocks direct external scrapers, VibeCareer AI evaluates projects and certifications from your resume. Please go to the <Link href="/resume" className="text-[#0ea5e9] hover:underline font-semibold">Resume Workspace</Link> to create or upload one.
                          </>
                        ) : (
                          <>
                            We detected your resume but found <strong>{linkAnalysisResult.resumeStats.projectsCount} projects</strong> and <strong>{linkAnalysisResult.resumeStats.certificationsCount} certifications</strong>. 
                            If you have projects or certifications on your LinkedIn profile, please add them to your <Link href="/resume" className="text-[#0ea5e9] hover:underline font-semibold">Resume Workspace</Link> first so they can be parsed and matched in this audit!
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* predicted role fitment */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Predicted Job Role Availability
                  </h3>
                  <div className="space-y-4">
                    {linkAnalysisResult.predictedRoles.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span style={{ color: "var(--text-primary)" }}>{item.role}</span>
                          <span className="text-emerald-500 font-bold">{item.fitPercentage}% Match</span>
                        </div>
                        <div className="h-2 rounded-full w-full bg-[var(--bg-muted)] overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-[#0ea5e9] rounded-full" 
                            style={{ width: `${item.fitPercentage}%` }}
                          />
                        </div>
                        <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit checklist splits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="card p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                    </h4>
                    <ul className="space-y-2">
                      {linkAnalysisResult.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          • {str}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="card p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Improvements
                    </h4>
                    <ul className="space-y-2">
                      {linkAnalysisResult.improvements.map((imp, idx) => (
                        <li key={idx} className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          • {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Headline Rewrites */}
                <div className="card p-6 space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                    <Globe className="w-4 h-4 text-[#0ea5e9]" />
                    Recommended Recruiter Headlines
                  </h3>
                  <div className="space-y-2.5">
                    {linkAnalysisResult.headlineSuggestions.map((headline, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs"
                        style={{ background: "var(--bg-subtle)", borderColor: "var(--border-default)" }}
                      >
                        <span className="font-semibold leading-relaxed flex-1" style={{ color: "var(--text-primary)" }}>
                          {headline}
                        </span>
                        <button
                          onClick={() => handleCopy(headline)}
                          className="flex items-center gap-1 hover:text-[#0ea5e9] transition-colors font-bold text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            <div className="card p-12 flex flex-col items-center justify-center text-center">
              <Linkedin className="w-16 h-16 opacity-15 mb-3" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Paste your profile link and tap "Audit & Predict" to generate role opportunities.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
