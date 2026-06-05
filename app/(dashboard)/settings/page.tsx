"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  User, 
  Cpu, 
  Palette, 
  Save, 
  Loader2, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Moon, 
  Sun, 
  Laptop 
} from "lucide-react";

type ActiveTab = "profile" | "ai" | "appearance";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const { theme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: "",
    targetRole: "",
    experienceLevel: "MID_LEVEL",
    location: "",
    bio: "",
  });

  // AI settings state (saved locally)
  const [aiData, setAiData] = useState({
    model: "gemini-2.5-flash",
    tone: "professional",
    includeMetrics: "always",
  });
  
  // Fetch settings from API
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/user/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        
        if (data.user) {
          setProfileData({
            name: data.user.name ?? "",
            targetRole: data.user.targetRole ?? "",
            experienceLevel: data.user.experienceLevel ?? "MID_LEVEL",
            location: data.user.location ?? "",
            bio: data.user.bio ?? "",
          });
        }
        
        // Load AI settings from localStorage
        const cachedAiSettings = localStorage.getItem("vibecareer_ai_settings");
        if (cachedAiSettings) {
          try {
            setAiData(JSON.parse(cachedAiSettings));
          } catch (e) {
            console.error("Error parsing cached AI settings", e);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not load settings");
      } finally {
        setIsLoading(false);
      }
    }

    const sessionStatus = session ? "authenticated" : "loading";
    if (sessionStatus === "authenticated") {
      loadSettings();
    }
  }, [session]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAiChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAiData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      toast.error("Full Name is required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update profile");
      }

      const data = await res.json();

      // Trigger session update for client sync
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: profileData.name,
        },
      });

      toast.success(data.message || "Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Save AI configs to localStorage for workspace builders to read
    localStorage.setItem("vibecareer_ai_settings", JSON.stringify(aiData));
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("AI preferences saved successfully!");
    }, 400);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
        <p className="text-sm text-[var(--text-muted)] animate-pulse">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 md:px-0">
      {/* Header */}
      <div>
        <h1 
          className="text-3xl font-black mb-2" 
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
        >
          Account Settings
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Manage your personal details, AI model preferences, and app styling.
        </p>
      </div>

      {/* Grid: Navigation tabs + Card content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side: Tabs */}
        <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "ai", label: "AI Preferences", icon: Cpu },
            { id: "appearance", label: "Appearance", icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap md:w-full ${
                  isActive 
                    ? "bg-violet-500/10 text-violet-500" 
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                }`}
                style={{
                  border: isActive ? "1px solid rgba(124, 58, 237, 0.2)" : "1px solid transparent",
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Contents inside Glass card */}
        <div className="md:col-span-3 card p-6 md:p-8" style={{ background: "var(--bg-card)" }}>
          
          {/* Tab 1: Profile Settings */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  Personal Profile
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  This information forms the core context when tailoring resumes and cover letters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <MapPin className="w-3 h-3" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="New York, NY"
                  />
                </div>

                {/* Target Role */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Briefcase className="w-3 h-3" /> Target Job Title
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    value={profileData.targetRole}
                    onChange={handleProfileChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="Senior Frontend Engineer"
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={profileData.experienceLevel}
                    onChange={handleProfileChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  >
                    <option value="ENTRY_LEVEL">Entry Level (0-2 years)</option>
                    <option value="MID_LEVEL">Mid Level (2-5 years)</option>
                    <option value="SENIOR">Senior (5-8 years)</option>
                    <option value="EXECUTIVE">Executive / Managerial (8+ years)</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Short Professional Biography
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
                  placeholder="Summarize your professional background, core programming stacks, and career focus..."
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary px-6 py-2.5 text-sm gap-2 w-full sm:w-auto"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: AI Preferences */}
          {activeTab === "ai" && (
            <form onSubmit={handleAiSave} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <Sparkles className="w-4 h-4 text-emerald-500" /> AI Coach & Resume Tuning
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Customize the behavior and generation options for the AI engine.
                </p>
              </div>

              <div className="space-y-4">
                {/* Gemini Model */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Default AI Model
                  </label>
                  <select
                    name="model"
                    value={aiData.model}
                    onChange={handleAiChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Super Fast & Responsive)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro (Ultra Smart & Reasoning)</option>
                  </select>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    We recommend Gemini 2.5 Flash for chat dialogs and Gemini 2.5 Pro for critical ATS scans.
                  </p>
                </div>

                {/* AI Persona/Tone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    AI Career Coach Tone
                  </label>
                  <select
                    name="tone"
                    value={aiData.tone}
                    onChange={handleAiChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  >
                    <option value="professional">Professional & Encouraging</option>
                    <option value="direct">Direct & Blunt (ATS Focused)</option>
                    <option value="academic">Analytical & Academic</option>
                    <option value="inspirational">Motivational Career Guide</option>
                  </select>
                </div>

                {/* Bullet Optimization setting */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Resume Experience Optimization
                  </label>
                  <select
                    name="includeMetrics"
                    value={aiData.includeMetrics}
                    onChange={handleAiChange}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] focus:outline-none focus:border-[var(--brand-primary)]"
                  >
                    <option value="always">Always enforce percentage metric metrics (Recommended)</option>
                    <option value="if_possible">Only append metrics if contextually fit</option>
                    <option value="none">Simplify text output structure</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary px-6 py-2.5 text-sm gap-2 w-full sm:w-auto"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save AI Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  Theme & Visuals
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Toggle layout styles and visual settings for the application.
                </p>
              </div>

              <div className="space-y-6">
                {/* Theme toggle grid */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Color Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Laptop },
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isCurrent = theme === mode.id;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setTheme(mode.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${
                            isCurrent
                              ? "border-violet-500 bg-violet-500/5 text-violet-500 font-bold"
                              : "border-[var(--border-default)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                          }`}
                        >
                          <Icon className="w-5 h-5 mb-2" />
                          <span className="text-xs">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed notice for Visuals */}
                <div 
                  className="p-4 rounded-xl border text-xs leading-relaxed space-y-2"
                  style={{
                    background: "var(--bg-muted)",
                    borderColor: "var(--border-default)",
                    color: "var(--text-secondary)"
                  }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Visual Assets Tuned</span>
                  </div>
                  <p>
                    <strong>White Theme (Light Mode):</strong> Featuring ultra-soft gray grids, frosted-glass crystal panels with double border alignments, iridescent cursor follow spotlights (sweeping purple, pink, and cyan), and soft multi-colored aurora blobs.
                  </p>
                  <p>
                    <strong>Black Theme (Dark Mode):</strong> Cyberpunk space styling, vibrant neon purple grids, glowing pink/blue aurora gas clouds, and high-intensity neon conic borders.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
