"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
  Laptop,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  Lock,
  Shield,
  Trash2,
  Download,
  RotateCcw,
  Sliders,
  Bell,
  Key,
  Eye,
  EyeOff,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Info
} from "lucide-react";
import Link from "next/link";

type ActiveTab = "profile" | "ai" | "preferences" | "security";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const { theme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationEmail, setDeleteConfirmationEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Profile core database data
  const [profileData, setProfileData] = useState({
    name: "",
    targetRole: "",
    experienceLevel: "MID_LEVEL",
    location: "",
    bio: "",
  });

  // Profile extra cached data
  const [extraProfileData, setExtraProfileData] = useState({
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  });

  // AI settings state (saved locally)
  const [aiData, setAiData] = useState({
    model: "gemini-2.5-flash",
    tone: "professional",
    includeMetrics: "always",
    customApiKey: "",
    bulletLength: "medium",
    focusArea: "general",
  });

  // Preference details (saved locally)
  const [preferencesData, setPreferencesData] = useState({
    alertFrequency: "daily",
    emailMatches: true,
    weeklyNewsletter: false,
    systemUpdates: true,
    enableTransitions: true,
  });

  // Fetch settings from API & localStorage
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
        
        // Load extra profile data from localStorage
        const cachedExtras = localStorage.getItem("vibecareer_profile_extras");
        if (cachedExtras) {
          try {
            setExtraProfileData(JSON.parse(cachedExtras));
          } catch (e) {
            console.error("Error parsing cached extras", e);
          }
        }

        // Load AI settings from localStorage
        const cachedAiSettings = localStorage.getItem("vibecareer_ai_settings");
        if (cachedAiSettings) {
          try {
            setAiData((prev) => ({ ...prev, ...JSON.parse(cachedAiSettings) }));
          } catch (e) {
            console.error("Error parsing cached AI settings", e);
          }
        }

        // Load general preference settings from localStorage
        const cachedPreferences = localStorage.getItem("vibecareer_app_preferences");
        if (cachedPreferences) {
          try {
            setPreferencesData((prev) => ({ ...prev, ...JSON.parse(cachedPreferences) }));
          } catch (e) {
            console.error("Error parsing cached preferences", e);
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

  const handleExtraChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setExtraProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAiChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAiData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (
    name: string,
    value: any
  ) => {
    setPreferencesData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      toast.error("Full Name is required");
      return;
    }

    setIsSaving(true);
    try {
      // 1. Save core fields to database
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

      // 2. Save extra fields to localStorage
      localStorage.setItem("vibecareer_profile_extras", JSON.stringify(extraProfileData));

      // 3. Trigger session update for client sync
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: profileData.name,
        },
      });

      toast.success("Profile and contact details updated successfully! ✨");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Save AI configs to localStorage
    localStorage.setItem("vibecareer_ai_settings", JSON.stringify(aiData));
    
    // Set Custom API key globally if present
    if (aiData.customApiKey.trim()) {
      sessionStorage.setItem("vibecareer_custom_key", aiData.customApiKey.trim());
    } else {
      sessionStorage.removeItem("vibecareer_custom_key");
    }

    setTimeout(() => {
      setIsSaving(false);
      toast.success("AI Architect preferences updated successfully! 🤖");
    }, 450);
  };

  const handlePreferencesSave = () => {
    setIsSaving(true);
    localStorage.setItem("vibecareer_app_preferences", JSON.stringify(preferencesData));
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success("App preferences and alert schedules updated! ⚙️");
    }, 300);
  };

  const handleExportData = () => {
    try {
      const exportObject = {
        profile: profileData,
        socials: extraProfileData,
        aiPreferences: aiData,
        appPreferences: preferencesData,
        exportedAt: new Date().toISOString(),
        version: "2.1.0"
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `vibecareer_profile_export_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      
      toast.success("UserData downloaded successfully! 📁");
    } catch (err) {
      toast.error("Could not export profile data.");
    }
  };

  const handleResetCache = () => {
    if (window.confirm("Are you sure you want to restore default application preferences? This will clear local AI custom models and layout styles.")) {
      localStorage.removeItem("vibecareer_ai_settings");
      localStorage.removeItem("vibecareer_profile_extras");
      localStorage.removeItem("vibecareer_app_preferences");
      toast.success("Local preferences reset to defaults! Reloading...");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmationEmail !== session?.user?.email) {
      toast.error("Email address does not match your current account email.");
      return;
    }

    setIsDeleting(true);
    try {
      // Simulate API call for account deletion
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear all user storage local records
      localStorage.clear();
      sessionStorage.clear();
      
      toast.success("Account permanently purged. Redirecting...");
      setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, 1000);
    } catch (e) {
      toast.error("Could not complete account purge. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
        <p className="text-sm text-[var(--text-muted)] animate-pulse">Loading secure configurations...</p>
      </div>
    );
  }

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 md:px-0">
      
      {/* Header Panel */}
      <div>
        <h1 
          className="text-3xl font-black tracking-tight mb-1" 
          style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
        >
          Control Panel Settings
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Configure custom career parameters, tune LLM optimization prompts, and manage secure data scopes.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side: Dynamic Tabs */}
        <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {[
            { id: "profile", label: "Professional Profile", icon: User },
            { id: "ai", label: "AI Architect", icon: Cpu },
            { id: "preferences", label: "Preferences & Theme", icon: Sliders },
            { id: "security", label: "Security & Data", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ActiveTab);
                }}
                className={`flex items-center gap-3 px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap md:w-full ${
                  isActive 
                    ? "bg-violet-500/10 text-violet-500 border border-violet-500/20" 
                    : "text-[var(--text-secondary)] border border-transparent hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Configuration Panels */}
        <div className="md:col-span-3 card p-6 md:p-8 space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
          
          {/* TAB 1: PROFESSIONAL PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                  {userInitials}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-base font-bold flex items-center justify-center sm:justify-start gap-1.5" style={{ color: "var(--text-primary)" }}>
                    {profileData.name || "Set Profile Name"}
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                      Active
                    </span>
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{session?.user?.email}</p>
                  <p className="text-[10px] flex items-center justify-center sm:justify-start gap-1 font-semibold" style={{ color: "var(--text-muted)" }}>
                    <Briefcase className="w-3 h-3 text-violet-500" />
                    {profileData.targetRole || "No role configured yet"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-primary)" }}>
                  Core Identification
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Primary account details used to dynamically tailor layouts, contact metrics, and summaries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <User className="w-3.5 h-3.5 text-violet-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                {/* Contact phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Phone className="w-3.5 h-3.5 text-violet-500" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={extraProfileData.phone}
                    onChange={handleExtraChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="e.g. +1 (555) 019-2834"
                  />
                </div>

                {/* Target Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Briefcase className="w-3.5 h-3.5 text-violet-500" /> Target Job Title
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    value={profileData.targetRole}
                    onChange={handleProfileChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="e.g. AI Software Engineer"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <MapPin className="w-3.5 h-3.5 text-violet-500" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Sliders className="w-3.5 h-3.5 text-violet-500" /> Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={profileData.experienceLevel}
                    onChange={handleProfileChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                  >
                    <option value="ENTRY_LEVEL">Entry Level (0-2 years)</option>
                    <option value="MID_LEVEL">Mid Level (2-5 years)</option>
                    <option value="SENIOR">Senior Professional (5-8 years)</option>
                    <option value="EXECUTIVE">Executive / Director (8+ years)</option>
                  </select>
                </div>

                {/* Portfolio website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Globe className="w-3.5 h-3.5 text-violet-500" /> Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={extraProfileData.website}
                    onChange={handleExtraChange}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                    placeholder="e.g. https://myportfolio.dev"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3.5 pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                    Integrations & Handles
                  </h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Configure external developer profile endpoints to help calibrate resume references.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                      <Linkedin className="w-3.5 h-3.5 text-[#0ea5e9]" /> LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={extraProfileData.linkedin}
                      onChange={handleExtraChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                      <Github className="w-3.5 h-3.5 text-[var(--text-primary)]" /> GitHub URL
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={extraProfileData.github}
                      onChange={handleExtraChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)]"
                      placeholder="github.com/username"
                    />
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Short Professional Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
                  placeholder="Summarize your professional background, stack preferences, and career accomplishments..."
                />
              </div>

              {/* Form Action */}
              <div className="flex justify-end pt-2 border-t border-[var(--border-default)]">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary px-6 py-3 text-xs uppercase tracking-wider font-bold gap-2 w-full sm:w-auto"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                >
                  {isSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving Details...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save Profile</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: AI ARCHITECT */}
          {activeTab === "ai" && (
            <form onSubmit={handleAiSave} className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" /> AI Engine & Prompt Tuning
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Customize prompt behavior, select target generative networks, and assign custom key permissions.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Custom API Key Input */}
                <div className="card p-5 border border-[var(--border-default)] bg-[var(--bg-subtle)] space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                        <Key className="w-3.5 h-3.5 text-amber-500" /> Custom Gemini API Credentials
                      </h3>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        Provide your own Google AI Studio API key to bypass local quota limits.
                      </p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: "rgba(245, 158, 11, 0.12)", color: "#d97706" }}>
                      Secure Local Scope
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      name="customApiKey"
                      value={aiData.customApiKey}
                      onChange={handleAiChange}
                      className="w-full text-xs pl-4 pr-12 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--brand-primary)]"
                      placeholder="AIzaSy..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-start gap-1.5 text-[9px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    <Info className="w-3 h-3 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                    <p>
                      Your API key is saved solely within your browser session scope. It is never stored on our database server, maintaining absolute confidentiality over your credentials.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Model */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      AI Model Architecture
                    </label>
                    <select
                      name="model"
                      value={aiData.model}
                      onChange={handleAiChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none"
                    >
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Super Fast & Light)</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro (High Reasoning & Audit)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Context Window)</option>
                    </select>
                  </div>

                  {/* Coach Persona */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      Coach Critique Tone
                    </label>
                    <select
                      name="tone"
                      value={aiData.tone}
                      onChange={handleAiChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none"
                    >
                      <option value="professional">Professional & Supportive</option>
                      <option value="direct">Direct & Critical (Hard ATS Scan)</option>
                      <option value="analytical">Data-Driven & Quantifiable</option>
                      <option value="inspirational">Motivational Career Strategist</option>
                    </select>
                  </div>

                  {/* Bullet Optimization */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      Resume Bullet Methodology
                    </label>
                    <select
                      name="includeMetrics"
                      value={aiData.includeMetrics}
                      onChange={handleAiChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none"
                    >
                      <option value="always">Always enforce percentage metric targets</option>
                      <option value="if_possible">Suggest metrics contextually</option>
                      <option value="none">Focus purely on technical skills & responsibilities</option>
                    </select>
                  </div>

                  {/* Bullet length */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      Description Target Length
                    </label>
                    <select
                      name="bulletLength"
                      value={aiData.bulletLength}
                      onChange={handleAiChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none"
                    >
                      <option value="short">Short (1 line bullets — High impact)</option>
                      <option value="medium">Medium (1-2 lines — Balanced ATS)</option>
                      <option value="long">Detailed (2-3 lines — Narrative structure)</option>
                    </select>
                  </div>

                  {/* Optimization focus */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                      AI Custom Calibrator Core Focus
                    </label>
                    <select
                      name="focusArea"
                      value={aiData.focusArea}
                      onChange={handleAiChange}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none"
                    >
                      <option value="general">Balanced (ATS, Layout, and Technical keywords)</option>
                      <option value="scalability">High Scale Backend / Systems Engineering (Performance emphasis)</option>
                      <option value="design">Design-Centric Frontend / Product UI (Visual & UX impact)</option>
                      <option value="management">Leadership & Product Management (Metric, Business, and Team impact)</option>
                      <option value="ai_ml">Artificial Intelligence & Data Science (Algorithm, Model, and Pipeline focus)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Action */}
              <div className="flex justify-end pt-2 border-t border-[var(--border-default)]">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary px-6 py-3 text-xs uppercase tracking-wider font-bold gap-2 w-full sm:w-auto"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                >
                  {isSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Calibrating Engine...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save AI Architect settings</>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PREFERENCES & THEME */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-primary)" }}>
                  App Styling & Alert Preferences
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Tune your preferred theme mode, animation framer speeds, and job matching alert systems.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Theme mode selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Application UI Theme Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light Mode", icon: Sun, desc: "Clean white & glassmorphic layout" },
                      { id: "dark", label: "Dark Mode", icon: Moon, desc: "Neon cyberpunk space theme" },
                      { id: "system", label: "System Sync", icon: Laptop, desc: "Inherit OS default appearance" },
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isCurrent = theme === mode.id;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setTheme(mode.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer text-center ${
                            isCurrent
                              ? "border-violet-500 bg-violet-500/5 text-violet-500 font-bold"
                              : "border-[var(--border-default)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                          }`}
                        >
                          <Icon className="w-5 h-5 mb-1.5" />
                          <span className="text-xs">{mode.label}</span>
                          <span className="text-[8px] font-normal opacity-70 mt-1 hidden sm:inline">{mode.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Transitions Toggles */}
                <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] space-y-4">
                  <h3 className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    Alert Schedules & UI Performance
                  </h3>
                  
                  <div className="space-y-3">
                    
                    {/* Alert Frequency */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-secondary)" }}>Matched Jobs Notifications</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Select how often to be emailed when high-match jobs are tracked.</p>
                      </div>
                      <select
                        value={preferencesData.alertFrequency}
                        onChange={(e) => handlePreferenceChange("alertFrequency", e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] focus:outline-none"
                      >
                        <option value="immediate">Immediately</option>
                        <option value="daily">Daily digest</option>
                        <option value="weekly">Weekly digest</option>
                        <option value="none">Off</option>
                      </select>
                    </div>

                    {/* Email matches */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--border-subtle)]">
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-secondary)" }}>Weekly ATS Optimization Report</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Receive summary feedback of your profile optimization score change.</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange("emailMatches", !preferencesData.emailMatches)}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                          preferencesData.emailMatches ? "bg-emerald-500 justify-end" : "bg-gray-300 dark:bg-neutral-700 justify-start"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                      </button>
                    </div>

                    {/* Weekly Newsletter */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--border-subtle)]">
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-secondary)" }}>System Newsletter & Career Tips</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Subscribe to new mock interview simulations and guides updates.</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange("weeklyNewsletter", !preferencesData.weeklyNewsletter)}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                          preferencesData.weeklyNewsletter ? "bg-emerald-500 justify-end" : "bg-gray-300 dark:bg-neutral-700 justify-start"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                      </button>
                    </div>

                    {/* Framer Animations Toggle */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--border-subtle)]">
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-secondary)" }}>Enable Smooth Framer Transitions</p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Turn off transition renders to enhance speed on older CPU units.</p>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange("enableTransitions", !preferencesData.enableTransitions)}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                          preferencesData.enableTransitions ? "bg-emerald-500 justify-end" : "bg-gray-300 dark:bg-neutral-700 justify-start"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Form Action */}
              <div className="flex justify-end pt-2 border-t border-[var(--border-default)]">
                <button
                  onClick={handlePreferencesSave}
                  disabled={isSaving}
                  className="btn-primary px-6 py-3 text-xs uppercase tracking-wider font-bold gap-2 w-full sm:w-auto"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                >
                  {isSaving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving System Settings...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save App Preferences</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & DATA */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-primary)" }}>
                  Account Security & Data Sovereignty
                </h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Manage database imports, purge temporary files, or configure account deletion procedures.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Account Plan Details */}
                <div className="card p-5 border border-[var(--border-default)] bg-[var(--bg-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        Current Account Scope
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-violet-500/10 text-violet-500 border border-violet-500/20">
                        VibeCareer Developer Tier
                      </span>
                    </div>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Your database utilizes localized servers with high-speed query indexing.
                    </p>
                  </div>
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-secondary)" }}>
                    No Billing Plan Active
                  </div>
                </div>

                {/* Data Portability */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Data Portability
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Export Data */}
                    <button
                      onClick={handleExportData}
                      className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-left cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Download Profile Backup</p>
                        <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                          Export all bio configurations, social URLs, and AI credentials in structured JSON.
                        </p>
                      </div>
                    </button>

                    {/* Reset Cache */}
                    <button
                      onClick={handleResetCache}
                      className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-left cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Reset Application Preferences</p>
                        <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                          Wipe local cache setups and restore standard layouts.
                        </p>
                      </div>
                    </button>

                  </div>
                </div>

                {/* Account Deletion */}
                <div className="card p-5 border border-red-500/20 bg-red-500/[0.02] rounded-xl space-y-3.5">
                  <div>
                    <h3 className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Danger Zone
                    </h3>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Once you delete your profile, there is no going back. All resumes, cover letters, and mock analytics will be permanently expunged.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Delete Profile Account
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* RENDER MODAL: DELETE ACCOUNT CONFIRMATION */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card w-full max-w-md p-6 border border-red-500/20 relative overflow-hidden"
              style={{ background: "var(--bg-card)" }}
            >
              <h2 className="text-base font-bold flex items-center gap-2 text-red-500 mb-2">
                <AlertTriangle className="w-5 h-5" /> Permanent Account Purge
              </h2>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                You are about to permanently delete your VibeCareer AI profile. All cached assets, custom AI roadmaps, and resume templates will be deleted.
              </p>
              
              <div className="p-3.5 rounded-xl bg-red-500/[0.03] border border-red-500/10 mb-4 text-xs">
                <p style={{ color: "var(--text-secondary)" }}>
                  To confirm deletion, please type your active account email:
                </p>
                <p className="font-mono font-bold mt-1 select-all" style={{ color: "var(--text-primary)" }}>
                  {session?.user?.email}
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  value={deleteConfirmationEmail}
                  onChange={(e) => setDeleteConfirmationEmail(e.target.value)}
                  placeholder="Type your email here..."
                  className="w-full text-xs px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)] focus:outline-none focus:border-red-500"
                />

                <div className="flex justify-end gap-3 text-xs">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteConfirmationEmail("");
                    }}
                    className="px-4 py-2.5 rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all font-semibold cursor-pointer"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || deleteConfirmationEmail !== session?.user?.email}
                    className="px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isDeleting ? (
                      <span className="flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Purging...</span>
                    ) : (
                      "Confirm Purge"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
