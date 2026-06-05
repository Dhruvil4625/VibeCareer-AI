"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Mail,
  Loader2,
  Copy,
  Download,
  Save,
  Sparkles,
  RefreshCw,
  Building2,
  Briefcase,
} from "lucide-react";

const schema = z.object({
  targetRole: z.string().min(1, "Enter the target role"),
  targetCompany: z.string().min(1, "Enter the company name"),
  skills: z.string().min(1, "Enter at least one skill"),
  experience: z.string().min(10, "Describe your experience briefly"),
  tone: z.enum(["professional", "enthusiastic", "creative"]),
});

type FormData = z.infer<typeof schema>;

const toneOptions = [
  { value: "professional", label: "Professional", emoji: "💼", description: "Formal & confident" },
  { value: "enthusiastic", label: "Enthusiastic", emoji: "⚡", description: "Energetic & passionate" },
  { value: "creative", label: "Creative", emoji: "🎨", description: "Unique & memorable" },
];

export default function CoverLetterPage() {
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tone: "professional" },
  });

  const selectedTone = watch("tone");

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: data.targetRole,
          targetCompany: data.targetCompany,
          skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
          experience: data.experience,
          tone: data.tone,
          save: false,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error ?? "Generation failed");
        return;
      }

      setGeneratedLetter(result.content);
      toast.success("Cover letter generated! ✨");
    } catch {
      toast.error("Failed to generate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success("Copied to clipboard!");
  };

  const handleSave = async () => {
    const data = watch();
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: data.targetRole,
          targetCompany: data.targetCompany,
          skills: data.skills.split(",").map((s) => s.trim()),
          experience: data.experience,
          tone: data.tone,
          save: true,
        }),
      });
      if (res.ok) toast.success("Cover letter saved!");
    } catch {
      toast.error("Failed to save.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)" }}>
            <Mail className="w-5 h-5" style={{ color: "#10b981" }} />
          </div>
          <div>
            <h1 className="text-2xl font-black" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              AI Cover Letter Generator
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Generate compelling, tailored cover letters with Gemini AI
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Letter Tone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {toneOptions.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setValue("tone", t.value as FormData["tone"])}
                    className="p-3 rounded-xl border text-center transition-all"
                    style={{
                      background: selectedTone === t.value ? "rgba(16,185,129,0.08)" : "var(--bg-subtle)",
                      border: `1px solid ${selectedTone === t.value ? "#10b981" : "var(--border-default)"}`,
                    }}
                  >
                    <div className="text-xl mb-1">{t.emoji}</div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{t.label}</div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />
                Target Role
              </label>
              <input
                placeholder="e.g. Senior Software Engineer"
                {...register("targetRole")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: `1px solid ${errors.targetRole ? "var(--danger)" : "var(--border-default)"}`, color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                onBlur={(e) => (e.target.style.borderColor = errors.targetRole ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.targetRole && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.targetRole.message}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                <Building2 className="w-3.5 h-3.5 inline mr-1.5" />
                Company Name
              </label>
              <input
                placeholder="e.g. Google, Stripe, Notion..."
                {...register("targetCompany")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: `1px solid ${errors.targetCompany ? "var(--danger)" : "var(--border-default)"}`, color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                onBlur={(e) => (e.target.style.borderColor = errors.targetCompany ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.targetCompany && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.targetCompany.message}</p>}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Key Skills <span style={{ color: "var(--text-muted)" }}>(comma separated)</span>
              </label>
              <input
                placeholder="e.g. React, TypeScript, Node.js, AWS"
                {...register("skills")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: `1px solid ${errors.skills ? "var(--danger)" : "var(--border-default)"}`, color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                onBlur={(e) => (e.target.style.borderColor = errors.skills ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.skills && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.skills.message}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Experience Summary
              </label>
              <textarea
                placeholder="Briefly describe your experience (e.g. 5 years building scalable web apps at startups, led a team of 4 engineers...)"
                rows={4}
                {...register("experience")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                style={{ background: "var(--bg-subtle)", border: `1px solid ${errors.experience ? "var(--danger)" : "var(--border-default)"}`, color: "var(--text-primary)" }}
                onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                onBlur={(e) => (e.target.style.borderColor = errors.experience ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.experience && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.experience.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="btn-primary w-full py-3.5"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card flex flex-col">
          {/* Preview Header */}
          <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Generated Letter
            </h2>
            {generatedLetter && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSubmit(onSubmit)()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-auto">
            {isGenerating ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="skeleton h-4 rounded"
                    style={{ width: `${70 + (i % 3) * 10}%` }}
                  />
                ))}
              </div>
            ) : generatedLetter ? (
              <div
                className="prose prose-sm max-w-none"
                style={{ color: "var(--text-primary)" }}
              >
                {generatedLetter.split("\n").map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(16,185,129,0.1)" }}
                >
                  <Mail className="w-8 h-8" style={{ color: "#10b981" }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  Your cover letter will appear here
                </h3>
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Fill in the form and click &quot;Generate&quot; to create a personalized cover letter with AI
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
