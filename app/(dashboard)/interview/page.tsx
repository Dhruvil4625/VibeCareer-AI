"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Mic,
  Play,
  ChevronRight,
  Loader2,
  Star,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Trophy,
  Sparkles,
  Award,
  Cpu,
} from "lucide-react";

type InterviewType = "behavioral" | "technical" | "hr" | "mixed";

interface Question {
  id?: string;
  question: string;
  category: string;
  tip: string;
  answer?: string;
  score?: number;
  feedback?: string;
}

const typeOptions: { value: InterviewType; label: string; emoji: string; desc: string; color: string }[] = [
  { value: "behavioral", label: "Behavioral", emoji: "🧠", desc: "STAR method scenarios", color: "#8b5cf6" },
  { value: "technical", label: "Technical", emoji: "💻", desc: "Role-specific capabilities", color: "#3b82f6" },
  { value: "hr", label: "HR Round", emoji: "👔", desc: "Culture-fit Q&A", color: "#ec4899" },
  { value: "mixed", label: "Mixed Session", emoji: "🎯", desc: "All core aspects combined", color: "#10b981" },
];

export default function InterviewPage() {
  const [step, setStep] = useState<"setup" | "practice" | "results">("setup");
  const [role, setRole] = useState("");
  const [type, setType] = useState<InterviewType>("behavioral");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const generateQuestions = async () => {
    if (!role.trim()) {
      toast.error("Please enter the role you're interviewing for");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", role, type, count: 5 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setQuestions(data.questions);
      setCurrentIndex(0);
      setStep("practice");
      toast.success("5 custom questions compiled. Let's begin!");
    } catch {
      toast.error("Could not compile questions. Try resetting.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      toast.error("Type in an answer to submit.");
      return;
    }
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/ai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "evaluate",
          question: questions[currentIndex].question,
          answer: currentAnswer,
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = {
        ...updatedQuestions[currentIndex],
        answer: currentAnswer,
        score: data.evaluation.score,
        feedback: data.evaluation.feedback,
      };
      setQuestions(updatedQuestions);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentAnswer("");
        toast.success(`Evaluated! Answer Score: ${data.evaluation.score}/100`);
      } else {
        setStep("results");
        toast.success("Session completed! Generating total score metrics...");
      }
    } catch {
      toast.error("Evaluation response failed. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const avgScore = questions.length > 0
    ? Math.round(
        questions.filter((q) => q.score != null).reduce((acc, q) => acc + (q.score ?? 0), 0) /
          questions.filter((q) => q.score != null).length
      )
    : 0;

  const scoreColor = avgScore >= 80 ? "#10b981" : avgScore >= 60 ? "#f59e0b" : "#ef4444";
  const scoreLabel = avgScore >= 80 ? "Highly Competent" : avgScore >= 60 ? "Proficient" : "Needs Review";

  // SVG circular calculations
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(avgScore, 100) / 100) * circumference;

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-2 py-6">
      {/* 1. Hero-Level Subpage Header */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-500">
            <Mic className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-wider">AI Interactive Prep</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            AI Mock Interviewer
          </h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Evaluate your verbal answers, receive high-impact STAR rating scores, and analyze skill recommendations.
          </p>
        </div>

        {/* Stats */}
        {step !== "setup" && (
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-default)] px-3 py-1.5 rounded-xl shadow-[var(--shadow-sm)]">
            <Award className="w-4 h-4 text-violet-500" />
            <div className="text-[9px]">
              <p className="font-bold text-[var(--text-primary)]">{role}</p>
              <p className="text-[var(--text-muted)]">Active Practice</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Setup Step */}
      {step === "setup" && (
        <AnimatePresence mode="wait">
          {isLoading ? (
            /* Premium Shimmer Skeleton Loader */
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-8 space-y-6 border border-[var(--border-default)] shadow-[var(--shadow-elevated)]"
            >
              <div className="space-y-2 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-500 mb-2" />
                <h3 className="text-sm font-bold animate-pulse" style={{ color: "var(--text-primary)" }}>
                  Assembling Custom Questions...
                </h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Gemini is tailoring STAR-method interview scenarios for a {role} role.
                </p>
              </div>

              {/* Shimmer items */}
              <div className="space-y-3 pt-4">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="h-16 rounded-xl border border-[var(--border-default)] skeleton p-4 flex flex-col justify-between"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="setup-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8 border border-[var(--border-default)] shadow-[var(--shadow-elevated)]"
            >
              <h2
                className="text-base font-bold mb-6"
                style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
              >
                Configure Interview Session
              </h2>

              {/* Target Job Title Input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                  Target Professional Role
                </label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Software Engineer, Product Manager, Data Scientist..."
                  className="w-full px-4 py-3 rounded-xl border text-xs outline-none transition-all"
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
                />
              </div>

              {/* Type Category selection Grid */}
              <div className="mb-8">
                <label className="block text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
                  Practice Round Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {typeOptions.map((t) => {
                    const isSelected = type === t.value;
                    return (
                      <motion.button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group shadow-[var(--shadow-sm)]"
                        style={{
                          background: isSelected ? `${t.color}08` : "var(--bg-subtle)",
                          borderColor: isSelected ? t.color : "var(--border-default)",
                        }}
                      >
                        <div className="text-xl mb-1">{t.emoji}</div>
                        <h4 className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>
                          {t.label}
                        </h4>
                        <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                          {t.desc}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={generateQuestions}
                disabled={isLoading || !role.trim()}
                className="btn-primary w-full py-3.5 text-xs font-bold shadow-[var(--shadow-md)] cursor-pointer"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
              >
                <Play className="w-4 h-4" /> Start Practice Interview (5 Questions)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* 3. Practice Steps */}
      {step === "practice" && questions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Practice tracker card */}
          <div className="card p-4 border border-[var(--border-default)] shadow-[var(--shadow-sm)]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6" }}>
                {questions[currentIndex].category}
              </span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "var(--bg-muted)" }}>
              <motion.div
                className="h-2 rounded-full"
                style={{
                  background: "linear-gradient(to right, #8b5cf6, #6d28d9)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Core Question Card */}
          <div className="card p-6 border border-[var(--border-default)] shadow-[var(--shadow-elevated)] space-y-4">
            <h2 className="text-base font-bold leading-relaxed" style={{ color: "var(--text-primary)" }}>
              {questions[currentIndex].question}
            </h2>

            {/* AI Advisor Tips block */}
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <Sparkles className="w-4.5 h-4.5 text-violet-500 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <strong>Gemini Tip:</strong> {questions[currentIndex].tip}
              </div>
            </div>

            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your response... Keep STAR format in mind (Situation, Task, Action, Result) with metrics if possible."
              rows={7}
              className="w-full px-4 py-3 rounded-xl border text-xs outline-none transition-all resize-none"
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-default)")}
            />

            <button
              onClick={submitAnswer}
              disabled={isEvaluating || !currentAnswer.trim()}
              className="btn-primary w-full py-3.5 text-xs font-bold cursor-pointer"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> AI Analyzing Response...
                </>
              ) : (
                <>
                  Next Question <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* 4. Results Trophy View */}
      {step === "results" && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* SVG circular Trophy gauge card */}
          <div
            className="card p-8 flex flex-col items-center justify-center border border-[var(--border-default)] shadow-[var(--shadow-elevated)] text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
            }}
          >
            {/* SVG Trophy Meter */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-[var(--border-default)]"
                  strokeWidth={stroke}
                  stroke="currentColor"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <motion.circle
                  stroke={scoreColor}
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <Trophy className="w-6 h-6 mb-1" style={{ color: scoreColor }} />
                <span className="text-2xl font-black" style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}>
                  {avgScore}
                </span>
                <span className="text-[8px] uppercase tracking-wider text-[var(--text-muted)]">
                  Avg Rating
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {scoreLabel}
            </h3>
            <p className="text-xs max-w-sm" style={{ color: "var(--text-secondary)" }}>
              Overall grading performance review for your {role} mock practice.
            </p>
          </div>

          {/* Interactive Question breakdowns */}
          <div className="space-y-4">
            <h3
              className="text-xs font-black uppercase tracking-wider pl-1"
              style={{ fontFamily: "Outfit", color: "var(--text-primary)" }}
            >
              Question Performance Breakdown
            </h3>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="card p-5 border border-[var(--border-default)] shadow-[var(--shadow-sm)] space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-bold leading-relaxed" style={{ color: "var(--text-primary)" }}>
                      Q{i + 1}: {q.question}
                    </p>
                    {q.score != null && (
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black flex-shrink-0"
                        style={{
                          background:
                            q.score >= 80
                              ? "rgba(16,185,129,0.1)"
                              : q.score >= 60
                              ? "rgba(245,158,11,0.1)"
                              : "rgba(239,68,68,0.1)",
                          color: q.score >= 80 ? "#10b981" : q.score >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {q.score}/100
                      </div>
                    )}
                  </div>

                  {q.feedback && (
                    <div
                      className="flex items-start gap-2.5 p-3 rounded-xl text-xs leading-relaxed"
                      style={{ background: "var(--bg-muted)", color: "var(--text-secondary)" }}
                    >
                      {q.score && q.score >= 70 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong>Feedback:</strong> {q.feedback}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Restart controls */}
          <button
            onClick={() => {
              setStep("setup");
              setQuestions([]);
              setCurrentAnswer("");
              setCurrentIndex(0);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border-default)] font-semibold text-xs hover:bg-[var(--bg-muted)] transition-all shadow-[var(--shadow-sm)] active:scale-[0.99] cursor-pointer"
            style={{ color: "var(--text-primary)", background: "var(--bg-card)" }}
          >
            <RotateCcw className="w-4 h-4" /> Practice Another Role
          </button>
        </motion.div>
      )}
    </div>
  );
}
