"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  FileText, 
  Plus, 
  Sparkles, 
  Loader2, 
  Download, 
  Pencil, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  Save, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  AlertTriangle,
  Award,
  X,
  TrendingUp
} from "lucide-react";
import { ResumeContent, ResumeExperience, ResumeEducation, ResumeProject, ResumeCertification } from "@/types";

const TEMPLATES = [
  { id: "modern", label: "Modern", color: "#7c3aed", preview: "Clean & professional with violet accents" },
  { id: "minimal", label: "Minimal", color: "#111827", preview: "Sleek minimalist design" },
  { id: "creative", label: "Creative", color: "#ec4899", preview: "Bold and eye-catching layout" },
  { id: "classic", label: "Classic", color: "#2563eb", preview: "Traditional professional format" },
  { id: "executive", label: "Executive", color: "#059669", preview: "Senior leadership focused" },
];

interface ResumeCard {
  id: string;
  title: string;
  template: string;
  atsScore?: number;
  updatedAt: string;
}

const MOCK_RESUMES: ResumeCard[] = [
  { id: "1", title: "Software Engineer Resume", template: "modern", atsScore: 94, updatedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "2", title: "Product Manager Resume", template: "minimal", atsScore: 81, updatedAt: new Date(Date.now() - 3600000 * 2).toISOString() },
];

const MOCK_RESUMES_CONTENT: Record<string, ResumeContent> = {
  "1": {
    personalInfo: {
      firstName: "Rohit",
      lastName: "Sharma",
      email: "rohit.sharma@example.com",
      phone: "+91 98765 43210",
      location: "Mumbai, India",
      website: "rohitsharma.dev",
      github: "github.com/rohitsharma",
      linkedin: "linkedin.com/in/rohitsharma",
      summary: "Passionate Full Stack Developer with 3+ years of experience engineering responsive web applications and scalable APIs. Proficient in Next.js, Node.js, and modern CSS architectures."
    },
    experience: [
      {
        id: "exp1",
        company: "Razorpay",
        title: "Software Engineer",
        location: "Bengaluru, India",
        startDate: "Jan 2024",
        endDate: "Present",
        current: true,
        bullets: [
          "Led development of core payment checkout widget using React 19, increasing click-to-pay conversions by 14%.",
          "Optimized bundle size by 35% through dynamic imports and code-splitting techniques.",
          "Implemented comprehensive end-to-end testing with Cypress, reducing production bugs by 22%."
        ]
      },
      {
        id: "exp2",
        company: "Zomato",
        title: "Associate Developer",
        location: "Gurugram, India",
        startDate: "Jun 2022",
        endDate: "Dec 2023",
        current: false,
        bullets: [
          "Maintained and optimized legacy backend APIs using Express.js and MongoDB.",
          "Collaborated in a cross-functional squad to ship real-time order tracking notifications."
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        institution: "IIT Bombay",
        degree: "B.Tech",
        field: "Computer Science and Engineering",
        startDate: "Jul 2018",
        endDate: "May 2022",
        gpa: "9.2/10",
        honors: "Dean's List"
      }
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Cypress", "REST APIs", "Git"],
    projects: [
      {
        id: "proj1",
        name: "ATS Resume Optimizer",
        description: "An AI-powered dashboard that evaluates resume keyword density against specific job roles using LLMs.",
        technologies: ["Next.js", "Gemini AI", "Tailwind CSS"],
        url: "https://vibecareer.ai",
        github: "https://github.com/rohit/ats-opt"
      }
    ],
    certifications: [
      { id: "cert1", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2023", url: "https://drive.google.com/file/d/aws-cert-mock" },
      { id: "cert2", name: "Advanced React Patterns", issuer: "Frontend Masters", date: "2024", url: "https://drive.google.com/file/d/react-cert-mock" }
    ]
  },
  "2": {
    personalInfo: {
      firstName: "Neha",
      lastName: "Gupta",
      email: "neha.gupta@example.com",
      phone: "+91 87654 32109",
      location: "Bengaluru, India",
      website: "nehagupta.pm",
      linkedin: "linkedin.com/in/nehagupta",
      summary: "Results-driven Associate Product Manager with experience leading growth initiatives, cross-functional engineering squads, and executing customer-centric feature roadmaps."
    },
    experience: [
      {
        id: "exp1",
        company: "Flipkart",
        title: "Associate Product Manager",
        location: "Bengaluru, India",
        startDate: "Mar 2024",
        endDate: "Present",
        current: true,
        bullets: [
          "Owned product roadmap for search discovery, increasing CTR of recommendations by 18%.",
          "Led agile ceremonies for a team of 8 software engineers, delivering features 15% ahead of schedule."
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        institution: "FMS Delhi",
        degree: "MBA",
        field: "Marketing & Strategy",
        startDate: "Jun 2021",
        endDate: "May 2023"
      }
    ],
    skills: ["Product Strategy", "Growth Loops", "A/B Testing", "Mixpanel", "Jira", "User Research", "Agile/Scrum"],
    projects: [],
    certifications: [
      { id: "cert1", name: "Certified Scrum Product Owner (CSPO)", issuer: "Scrum Alliance", date: "2024", url: "https://drive.google.com/file/d/cspo-cert-mock" }
    ]
  }
};

const BLANK_RESUME_CONTENT = (): ResumeContent => ({
  personalInfo: { firstName: "", lastName: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "", summary: "" },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
});

export default function ResumePage() {
  const [resumes, setResumes] = useState<ResumeCard[]>(MOCK_RESUMES);
  const [resumesContent, setResumesContent] = useState<Record<string, ResumeContent>>(MOCK_RESUMES_CONTENT);
  
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isCreating, setIsCreating] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  
  // Workspace states
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<ResumeContent>(BLANK_RESUME_CONTENT());
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "education" | "skills" | "projects" | "certifications">("personal");
  
  // AI States
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [atsJobTitle, setAtsJobTitle] = useState("");
  const [atsJobDesc, setAtsJobDesc] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<{
    score: number;
    strengths: string[];
    gaps: string[];
    recommendation: string;
  } | null>(null);

  // Sync content state when entering edit mode
  const handleEditStart = (id: string) => {
    setEditingResumeId(id);
    const content = resumesContent[id] || BLANK_RESUME_CONTENT();
    setActiveContent(content);
    const template = resumes.find(r => r.id === id)?.template || "modern";
    setSelectedTemplate(template);
  };

  const handleSave = () => {
    if (!editingResumeId) return;
    
    // Save content
    setResumesContent(prev => ({
      ...prev,
      [editingResumeId]: activeContent
    }));

    // Update metadata template & date
    setResumes(prev => prev.map(r => 
      r.id === editingResumeId 
        ? { ...r, template: selectedTemplate, updatedAt: new Date().toISOString() }
        : r
    ));

    toast.success("Resume saved successfully! ✨");
  };

  const handleCreate = async () => {
    setIsCreating(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    const newId = Date.now().toString();
    const newResume: ResumeCard = {
      id: newId,
      title: `New Resume ${resumes.length + 1}`,
      template: selectedTemplate,
      updatedAt: new Date().toISOString(),
    };
    
    setResumes((prev) => [newResume, ...prev]);
    setResumesContent(prev => ({
      ...prev,
      [newId]: BLANK_RESUME_CONTENT()
    }));
    
    setIsCreating(false);
    setShowBuilder(false);
    
    // Launch directly into edit mode
    handleEditStart(newId);
    toast.success("New resume initialized! Let's fill it out. 📄");
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    setResumesContent(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    toast.success("Resume deleted");
  };

  // AI Bullet optimization call
  const handleAIEnhanceBullets = async (expId: string) => {
    const exp = activeContent.experience.find(e => e.id === expId);
    if (!exp || exp.bullets.filter(b => b.trim()).length === 0) {
      toast.error("Please write at least one experience bullet point to optimize");
      return;
    }
    
    setIsEnhancing(expId);
    try {
      const response = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "optimize-bullets",
          role: exp.title,
          company: exp.company || "Company",
          bulletPoints: exp.bullets.filter(b => b.trim())
        })
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "AI Enhance failed");
      }
      const data = await response.json();
      
      setActiveContent(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === expId ? { ...e, bullets: data.enhanced } : e)
      }));
      toast.success("Experience bullet points optimized with Gemini AI! ✨");
    } catch (error: any) {
      toast.error(error.message || "AI Bullet optimization failed. Please try again.");
    } finally {
      setIsEnhancing(null);
    }
  };

  // Canvas Confetti explosion trigger
  const triggerConfetti = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#7c3aed", "#ec4899", "#10b981", "#3b82f6", "#f59e0b"];
    const pieces = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 3,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      pieces.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5;

        if (p.y <= canvas.height) {
          active = true;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (active) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        if (canvas.parentNode) document.body.removeChild(canvas);
      }
    };

    draw();

    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) document.body.removeChild(canvas);
    }, 5000);
  };

  // AI ATS Grading call
  const handleRunATSScan = async () => {
    if (!atsJobTitle.trim() || !atsJobDesc.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }
    
    setAtsLoading(true);
    try {
      const experienceText = activeContent.experience.map(e => 
        `${e.title} at ${e.company}: ${e.bullets.join("; ")}`
      ).join("\n\n");

      const response = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ats-score",
          candidateSkills: activeContent.skills,
          candidateExperience: `${activeContent.personalInfo.summary || ""}\n\n${experienceText}`,
          jobTitle: atsJobTitle,
          jobDescription: atsJobDesc
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "ATS Scan failed");
      }
      const data = await response.json();
      setAtsResult(data);
      
      // Update resume ATS score metadata
      if (editingResumeId) {
        setResumes(prev => prev.map(r => r.id === editingResumeId ? { ...r, atsScore: data.score } : r));
      }
      
      toast.success(`ATS Audit Complete! Score: ${data.score}%`);
      
      // Trigger confetti delight if user score is high
      if (data.score >= 90) {
        triggerConfetti();
      }
    } catch (error: any) {
      toast.error(error.message || "ATS Analysis failed.");
    } finally {
      setAtsLoading(false);
    }
  };

  // Print resume handler
  const handlePrint = () => {
    const previewEl = document.getElementById("resume-preview-doc");
    if (!previewEl) return;

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.bottom = "0";
    printFrame.style.right = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document;
    if (!doc) return;

    // Grab stylesheet rules
    const styleTags = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
      .map(tag => tag.outerHTML)
      .join("\n");

    doc.write(`
      <html>
        <head>
          <title>${resumes.find(r => r.id === editingResumeId)?.title || "Resume"}</title>
          ${styleTags}
          <style>
            body {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 1.5cm !important;
            }
            #resume-preview-doc {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              height: auto !important;
            }
          </style>
        </head>
        <body>
          <div id="resume-preview-doc">
            ${previewEl.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => {
                window.parent.document.body.removeChild(window.frameElement);
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const scoreColor = (score?: number) =>
    !score ? "#6b7280" : score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";

  // RENDER EDIT WORKSPACE MODE
  if (editingResumeId) {
    const resumeMeta = resumes.find(r => r.id === editingResumeId);
    
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Workspace Subheader */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setEditingResumeId(null); setAtsResult(null); }}
              className="w-9 h-9 rounded-lg border border-[var(--border-default)] flex items-center justify-center hover:bg-[var(--bg-muted)] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={resumeMeta?.title || ""} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setResumes(prev => prev.map(r => r.id === editingResumeId ? { ...r, title: val } : r));
                  }}
                  className="font-black text-xl bg-transparent border-b border-transparent hover:border-[var(--border-strong)] focus:border-[var(--brand-primary)] focus:outline-none"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                />
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${TEMPLATES.find(t => t.id === selectedTemplate)?.color}20`, color: TEMPLATES.find(t => t.id === selectedTemplate)?.color }}>
                  {TEMPLATES.find(t => t.id === selectedTemplate)?.label} Template
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Fill out the left form, AI bullet boosts and previews will populate live
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Template select dropdown */}
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[var(--border-default)] outline-none bg-[var(--bg-subtle)]"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.label} Layout</option>
              ))}
            </select>

            <button 
              onClick={() => setAtsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-violet-500/20 text-violet-500 hover:bg-violet-500/5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              ATS Audit {resumeMeta?.atsScore ? `(${resumeMeta.atsScore}%)` : ""}
            </button>

            <button onClick={handleSave} className="flex items-center gap-1.5 btn-primary text-xs px-4 py-2">
              <Save className="w-3.5 h-3.5" /> Save
            </button>

            <button onClick={handlePrint} className="w-9 h-9 border border-[var(--border-default)] rounded-xl flex items-center justify-center hover:bg-[var(--bg-muted)]" title="Print/Download PDF">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* WORKSPACE COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT FORM WRAPPER */}
          <div className="card p-5 space-y-6">
            {/* Form tabs selector */}
            <div className="flex flex-wrap border-b border-[var(--border-default)] gap-1">
              {(["personal", "experience", "education", "skills", "projects", "certifications"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2 px-3 text-xs font-bold capitalize border-b-2 transition-all flex items-center justify-center gap-1.5 min-w-[90px]"
                  style={{
                    color: activeTab === tab ? "var(--brand-primary)" : "var(--text-secondary)",
                    borderColor: activeTab === tab ? "var(--brand-primary)" : "transparent"
                  }}
                >
                  {tab === "personal" && <User className="w-3.5 h-3.5" />}
                  {tab === "experience" && <Briefcase className="w-3.5 h-3.5" />}
                  {tab === "education" && <GraduationCap className="w-3.5 h-3.5" />}
                  {tab === "skills" && <Code className="w-3.5 h-3.5" />}
                  {tab === "projects" && <FolderGit2 className="w-3.5 h-3.5" />}
                  {tab === "certifications" && <Award className="w-3.5 h-3.5" />}
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB PANELS CONTENT */}
            <div className="space-y-4">
              {/* Tab 1: Personal info */}
              {activeTab === "personal" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>First Name</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.firstName} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, firstName: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Last Name</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.lastName} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, lastName: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Email Address</label>
                      <input 
                        type="email" 
                        value={activeContent.personalInfo.email} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Phone Number</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.phone || ""} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Location</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.location || ""} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                        placeholder="e.g. Mumbai, India"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Website URL</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.website || ""} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, website: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                        placeholder="e.g. yourname.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>GitHub Profile</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.github || ""} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, github: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                        placeholder="e.g. github.com/username"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>LinkedIn URL</label>
                      <input 
                        type="text" 
                        value={activeContent.personalInfo.linkedin || ""} 
                        onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, linkedin: e.target.value } }))}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                        placeholder="e.g. linkedin.com/in/username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Professional Summary</label>
                    <textarea 
                      value={activeContent.personalInfo.summary || ""} 
                      onChange={(e) => setActiveContent(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, summary: e.target.value } }))}
                      rows={4}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none resize-none"
                      placeholder="Write a brief professional summary..."
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Work Experience */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  {activeContent.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 border rounded-xl space-y-3 relative" style={{ background: "rgba(124,58,237,0.02)" }}>
                      <button 
                        onClick={() => setActiveContent(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))}
                        className="absolute top-3 right-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="font-bold text-xs text-violet-500 uppercase">Experience Block #{idx + 1}</div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Company Name</label>
                          <input 
                            type="text" 
                            value={exp.company} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, company: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Role / Job Title</label>
                          <input 
                            type="text" 
                            value={exp.title} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, title: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Start Date</label>
                          <input 
                            type="text" 
                            value={exp.startDate} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, startDate: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. Jan 2024"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>End Date</label>
                          <input 
                            type="text" 
                            disabled={exp.current}
                            value={exp.current ? "Present" : exp.endDate || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, endDate: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. Present"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 py-1">
                        <input 
                          type="checkbox" 
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setActiveContent(prev => ({ ...prev, experience: prev.experience.map(item => item.id === exp.id ? { ...item, current: val, endDate: val ? "Present" : "" } : item) }));
                          }}
                          className="w-3.5 h-3.5 rounded border-[var(--border-default)] text-violet-600 focus:ring-violet-500"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold select-none" style={{ color: "var(--text-primary)" }}>
                          I currently work here
                        </label>
                      </div>

                      {/* Bullet points mapping */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Work Accomplishments</label>
                          <button 
                            onClick={() => handleAIEnhanceBullets(exp.id)}
                            disabled={isEnhancing === exp.id}
                            className="flex items-center gap-1 text-[10px] font-bold text-violet-500 hover:underline disabled:opacity-50"
                          >
                            {isEnhancing === exp.id ? <><Loader2 className="w-2.5 h-2.5 animate-spin" /> Enhancing...</> : <><Sparkles className="w-2.5 h-2.5" /> AI Boost Bullets</>}
                          </button>
                        </div>
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2">
                            <input 
                              type="text" 
                              value={bullet} 
                              onChange={(e) => {
                                const val = e.target.value;
                                const updatedBullets = [...exp.bullets];
                                updatedBullets[bIdx] = val;
                                setActiveContent(prev => ({
                                  ...prev,
                                  experience: prev.experience.map(item => item.id === exp.id ? { ...item, bullets: updatedBullets } : item)
                                }));
                              }}
                              className="flex-1 px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                              placeholder="Describe a key achievement or metrics..."
                            />
                            <button 
                              onClick={() => {
                                const updatedBullets = exp.bullets.filter((_, i) => i !== bIdx);
                                setActiveContent(prev => ({
                                  ...prev,
                                  experience: prev.experience.map(item => item.id === exp.id ? { ...item, bullets: updatedBullets } : item)
                                }));
                              }}
                              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-2 rounded-lg"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            setActiveContent(prev => ({
                              ...prev,
                              experience: prev.experience.map(item => item.id === exp.id ? { ...item, bullets: [...item.bullets, ""] } : item)
                            }));
                          }}
                          className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 hover:underline"
                        >
                          + Add Accomplishment Line
                        </button>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const newJob: ResumeExperience = {
                        id: Date.now().toString(),
                        company: "Company Name",
                        title: "Role / Job Title",
                        startDate: "",
                        current: false,
                        bullets: [""]
                      };
                      setActiveContent(prev => ({ ...prev, experience: [...prev.experience, newJob] }));
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Plus className="w-4 h-4" /> Add Experience Block
                  </button>
                </div>
              )}

              {/* Tab 3: Education */}
              {activeTab === "education" && (
                <div className="space-y-6">
                  {activeContent.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 border rounded-xl space-y-3 relative" style={{ background: "rgba(124,58,237,0.02)" }}>
                      <button 
                        onClick={() => setActiveContent(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}
                        className="absolute top-3 right-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="font-bold text-xs text-violet-500 uppercase">Education Block #{idx + 1}</div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Institution / School</label>
                          <input 
                            type="text" 
                            value={edu.institution} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, institution: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Degree & Major</label>
                          <input 
                            type="text" 
                            value={`${edu.degree} in ${edu.field}`} 
                            onChange={(e) => {
                              const val = e.target.value;
                              const parts = val.split(" in ");
                              setActiveContent(prev => ({ 
                                ...prev, 
                                education: prev.education.map(item => item.id === edu.id ? { ...item, degree: parts[0] || "", field: parts[1] || "" } : item) 
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. B.Tech in CS"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Start Date</label>
                          <input 
                            type="text" 
                            value={edu.startDate} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, startDate: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. 2019"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>End Date</label>
                          <input 
                            type="text" 
                            value={edu.endDate || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, endDate: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. 2023"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>GPA / Score</label>
                          <input 
                            type="text" 
                            value={edu.gpa || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, education: prev.education.map(item => item.id === edu.id ? { ...item, gpa: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. 9.2/10"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const newEdu: ResumeEducation = {
                        id: Date.now().toString(),
                        institution: "University Name",
                        degree: "Degree",
                        field: "Field of Study",
                        startDate: ""
                      };
                      setActiveContent(prev => ({ ...prev, education: [...prev.education, newEdu] }));
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Plus className="w-4 h-4" /> Add Education Block
                  </button>
                </div>
              )}

              {/* Tab 4: Skills tag list */}
              {activeTab === "skills" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase block mb-1.5" style={{ color: "var(--text-secondary)" }}>Skills List</label>
                    <input 
                      type="text"
                      placeholder="Type a skill and press comma (e.g. React, Python)"
                      onKeyDown={(e) => {
                        if (e.key === "," || e.key === "Enter") {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val && !activeContent.skills.includes(val)) {
                            setActiveContent(prev => ({ ...prev, skills: [...prev.skills, val] }));
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                    />
                    <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>Separate multiple skills with commas</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeContent.skills.map(skill => (
                      <span 
                        key={skill}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border border-[var(--border-default)]"
                        style={{ background: "var(--bg-muted)", color: "var(--text-secondary)" }}
                      >
                        {skill}
                        <button 
                          onClick={() => setActiveContent(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))}
                          className="hover:text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Projects */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  {activeContent.projects?.map((proj, idx) => (
                    <div key={proj.id} className="p-4 border rounded-xl space-y-3 relative" style={{ background: "rgba(124,58,237,0.02)" }}>
                      <button 
                        onClick={() => setActiveContent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== proj.id) }))}
                        className="absolute top-3 right-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="font-bold text-xs text-violet-500 uppercase">Project Block #{idx + 1}</div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Project Name</label>
                          <input 
                            type="text" 
                            value={proj.name} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, projects: prev.projects.map(item => item.id === proj.id ? { ...item, name: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Technologies (comma separated)</label>
                          <input 
                            type="text" 
                            value={proj.technologies.join(", ")} 
                            onChange={(e) => {
                              const val = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                              setActiveContent(prev => ({ ...prev, projects: prev.projects.map(item => item.id === proj.id ? { ...item, technologies: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="React, Next.js, Node.js"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>GitHub Repository URL</label>
                          <input 
                            type="text" 
                            value={proj.github || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, projects: prev.projects.map(item => item.id === proj.id ? { ...item, github: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Live Demo URL</label>
                          <input 
                            type="text" 
                            value={proj.url || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ ...prev, projects: prev.projects.map(item => item.id === proj.id ? { ...item, url: val } : item) }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="https://project.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Description</label>
                        <textarea 
                          value={proj.description} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setActiveContent(prev => ({ ...prev, projects: prev.projects.map(item => item.id === proj.id ? { ...item, description: val } : item) }));
                          }}
                          rows={3}
                          className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none resize-none"
                          placeholder="Describe your project, features, and key metrics..."
                        />
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const newProj: ResumeProject = {
                        id: Date.now().toString(),
                        name: "New Project",
                        description: "",
                        technologies: [],
                        github: "",
                        url: ""
                      };
                      setActiveContent(prev => ({ ...prev, projects: [...(prev.projects || []), newProj] }));
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Plus className="w-4 h-4" /> Add Project Block
                  </button>
                </div>
              )}

              {/* Tab 6: Certifications */}
              {activeTab === "certifications" && (
                <div className="space-y-6">
                  {activeContent.certifications?.map((cert, idx) => (
                    <div key={cert.id} className="p-4 border rounded-xl space-y-3 relative" style={{ background: "rgba(124,58,237,0.02)" }}>
                      <button 
                        onClick={() => setActiveContent(prev => ({ ...prev, certifications: prev.certifications?.filter(c => c.id !== cert.id) }))}
                        className="absolute top-3 right-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="font-bold text-xs text-violet-500 uppercase">Certification Block #{idx + 1}</div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Certificate Name</label>
                          <input 
                            type="text" 
                            value={cert.name} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ 
                                ...prev, 
                                certifications: prev.certifications?.map(item => item.id === cert.id ? { ...item, name: val } : item) 
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Issuing Authority</label>
                          <input 
                            type="text" 
                            value={cert.issuer} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ 
                                ...prev, 
                                certifications: prev.certifications?.map(item => item.id === cert.id ? { ...item, issuer: val } : item) 
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Date of Issue</label>
                          <input 
                            type="text" 
                            value={cert.date || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ 
                                ...prev, 
                                certifications: prev.certifications?.map(item => item.id === cert.id ? { ...item, date: val } : item) 
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="e.g. 2024"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Certificate Link (Google Drive / URL)</label>
                          <input 
                            type="text" 
                            value={cert.url || ""} 
                            onChange={(e) => {
                              const val = e.target.value;
                              setActiveContent(prev => ({ 
                                ...prev, 
                                certifications: prev.certifications?.map(item => item.id === cert.id ? { ...item, url: val } : item) 
                              }));
                            }}
                            className="w-full px-3 py-1.5 text-xs border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                            placeholder="https://drive.google.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => {
                      const newCert: ResumeCertification = {
                        id: Date.now().toString(),
                        name: "New Certificate",
                        issuer: "Authority",
                        date: "",
                        url: ""
                      };
                      setActiveContent(prev => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Plus className="w-4 h-4" /> Add Certification Block
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT LIVE WORKSPACE PREVIEW */}
          <div className="card p-6 min-h-[500px] border border-[var(--border-default)] bg-white dark:bg-zinc-950 text-black dark:text-white sticky top-6">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-default)]">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                Live HTML Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-muted)]" style={{ color: "var(--text-secondary)" }}>
                Refreshes on type
              </span>
            </div>

            {/* LIVE DOCUMENT ROOT */}
            <div 
              id="resume-preview-doc" 
              className="w-full bg-white text-black p-6 rounded-lg text-left"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                lineHeight: "1.4"
              }}
            >
              {/* RENDER DYNAMIC TEMPLATE CONTENT */}
              {/* Personal Header */}
              <div 
                className="pb-4 mb-4 border-b flex flex-col justify-start"
                style={{ 
                  borderColor: selectedTemplate === "modern" ? "#7c3aed30" : "#e5e7eb",
                  textAlign: selectedTemplate === "classic" ? "center" : "left",
                  alignItems: selectedTemplate === "classic" ? "center" : "stretch"
                }}
              >
                <h1 
                  className="text-2xl font-black mb-1"
                  style={{ 
                    fontFamily: "Outfit, sans-serif", 
                    color: selectedTemplate === "modern" 
                      ? "#7c3aed" 
                      : selectedTemplate === "creative" 
                      ? "#ec4899" 
                      : selectedTemplate === "classic"
                      ? "#2563eb"
                      : selectedTemplate === "executive"
                      ? "#059669"
                      : "#111827" 
                  }}
                >
                  {activeContent.personalInfo.firstName || "Your"} {activeContent.personalInfo.lastName || "Name"}
                </h1>
                
                {/* Contact grid */}
                <div className={`flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-1 ${selectedTemplate === "classic" ? "justify-center" : ""}`}>
                  {activeContent.personalInfo.email && <span>📧 {activeContent.personalInfo.email}</span>}
                  {activeContent.personalInfo.phone && <span>📞 {activeContent.personalInfo.phone}</span>}
                  {activeContent.personalInfo.location && <span>📍 {activeContent.personalInfo.location}</span>}
                  {activeContent.personalInfo.website && <span>🌐 {activeContent.personalInfo.website}</span>}
                  {activeContent.personalInfo.github && <span>💻 {activeContent.personalInfo.github}</span>}
                  {activeContent.personalInfo.linkedin && <span>🔗 {activeContent.personalInfo.linkedin}</span>}
                </div>
              </div>

              {/* Summary Section */}
              {activeContent.personalInfo.summary && (
                <div className="mb-4">
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-1"
                    style={{ 
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    {activeContent.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Work Experience Section */}
              {activeContent.experience.length > 0 && (
                <div className="mb-4">
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-2 border-b pb-0.5"
                    style={{ 
                      borderColor: "#e5e7eb",
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Experience
                  </h2>
                  <div className="space-y-3">
                    {activeContent.experience.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-gray-900 text-[11px]">{exp.title}</strong>
                            <span className="text-gray-500 text-[10px] ml-1">@ {exp.company}</span>
                          </div>
                          <span className="text-[10px] text-gray-500">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600 pl-1 text-[10px]">
                          {exp.bullets.filter(b => b.trim()).map((b, i) => (
                            <li key={i} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeContent.projects && activeContent.projects.length > 0 && (
                <div className="mb-4">
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-2 border-b pb-0.5"
                    style={{ 
                      borderColor: "#e5e7eb",
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Projects
                  </h2>
                  <div className="space-y-3">
                    {activeContent.projects.map(proj => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-gray-900 text-[11px]">{proj.name}</strong>
                            {proj.technologies.length > 0 && (
                              <span className="text-gray-500 text-[9px] ml-1">({proj.technologies.join(", ")})</span>
                            )}
                          </div>
                          <div className="flex gap-2 text-[9px]">
                            {proj.github && (
                              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                GitHub ↗
                              </a>
                            )}
                            {proj.url && (
                              <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Demo ↗
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-0.5 text-[10px] leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeContent.education.length > 0 && (
                <div className="mb-4">
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-2 border-b pb-0.5"
                    style={{ 
                      borderColor: "#e5e7eb",
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Education
                  </h2>
                  <div className="space-y-2">
                    {activeContent.education.map(edu => (
                      <div key={edu.id} className="flex justify-between items-start text-[10px]">
                        <div>
                          <strong className="text-gray-900">{edu.degree} in {edu.field}</strong>
                          <div className="text-gray-500">{edu.institution} {edu.gpa && `· GPA: ${edu.gpa}`}</div>
                        </div>
                        <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {activeContent.certifications && activeContent.certifications.length > 0 && (
                <div className="mb-4">
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-2 border-b pb-0.5"
                    style={{ 
                      borderColor: "#e5e7eb",
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {activeContent.certifications.map(cert => (
                      <div key={cert.id} className="flex justify-between items-start text-[10px]">
                        <div>
                          <strong className="text-gray-900">{cert.name}</strong>
                          <div className="text-gray-500">Issued by {cert.issuer}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          {cert.date && <span className="text-gray-500">{cert.date}</span>}
                          {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-0.5">
                              View Certificate ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeContent.skills.length > 0 && (
                <div>
                  <h2 
                    className="text-[10px] font-black uppercase tracking-wider mb-1"
                    style={{ 
                      color: selectedTemplate === "modern" 
                        ? "#7c3aed" 
                        : selectedTemplate === "creative" 
                        ? "#ec4899" 
                        : selectedTemplate === "classic"
                        ? "#2563eb"
                        : selectedTemplate === "executive"
                        ? "#059669"
                        : "#4b5563" 
                    }}
                  >
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-[10px] text-gray-700">
                    {activeContent.skills.join(" · ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ATS AUDIT MODAL */}
        <AnimatePresence>
          {atsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setAtsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl z-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-500">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                    AI ATS Scan & Audit
                  </h2>
                </div>

                {/* Scan inputs */}
                {!atsResult ? (
                  <div className="space-y-4">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Input your target job title and full description. Gemini AI will evaluate your skills/experiences against it and calculate an ATS score.
                    </p>
                    
                    <div>
                      <label className="text-[10px] font-bold uppercase block mb-1" style={{ color: "var(--text-secondary)" }}>
                        Target Job Title
                      </label>
                      <input 
                        type="text" 
                        value={atsJobTitle}
                        onChange={(e) => setAtsJobTitle(e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase block mb-1" style={{ color: "var(--text-secondary)" }}>
                        Job Description
                      </label>
                      <textarea
                        value={atsJobDesc}
                        onChange={(e) => setAtsJobDesc(e.target.value)}
                        placeholder="Paste the target job description details here..."
                        rows={8}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-[var(--bg-subtle)] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        onClick={() => setAtsModalOpen(false)}
                        className="px-4 py-2 text-xs rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleRunATSScan}
                        disabled={atsLoading}
                        className="btn-primary text-xs px-5 py-2 flex items-center gap-1"
                      >
                        {atsLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Scanning...</> : <><Sparkles className="w-3.5 h-3.5" /> Run Scan</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Scan results view
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-default)]" style={{ background: "rgba(124,58,237,0.04)" }}>
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            className="text-[var(--border-default)]"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r="24"
                            cx="32"
                            cy="32"
                          />
                          <motion.circle
                            stroke={scoreColor(atsResult.score)}
                            strokeWidth="4"
                            strokeDasharray={2 * Math.PI * 24}
                            initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 24 - (atsResult.score / 100) * (2 * Math.PI * 24) }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            strokeLinecap="round"
                            fill="transparent"
                            r="24"
                            cx="32"
                            cy="32"
                          />
                        </svg>
                        <span className="absolute font-black text-xs" style={{ color: scoreColor(atsResult.score) }}>
                          {atsResult.score}%
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black" style={{ color: "var(--text-primary)" }}>ATS Compatibility Score</h4>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Based on keywords and role descriptions match.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Match Strengths
                        </h5>
                        <ul className="list-disc list-inside text-[11px] pl-2 mt-1 space-y-1" style={{ color: "var(--text-secondary)" }}>
                          {atsResult.strengths.map((str, i) => <li key={i}>{str}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Identified Skill Gaps
                        </h5>
                        <ul className="list-disc list-inside text-[11px] pl-2 mt-1 space-y-1" style={{ color: "var(--text-secondary)" }}>
                          {atsResult.gaps.map((gap, i) => <li key={i}>{gap}</li>)}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)]">
                        <h5 className="text-xs font-bold flex items-center gap-1 mb-1" style={{ color: "var(--text-primary)" }}>
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> AI Recommendation
                        </h5>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {atsResult.recommendation}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        onClick={() => setAtsResult(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Scan Another Role
                      </button>
                      <button 
                        onClick={() => { setAtsModalOpen(false); setAtsResult(null); }}
                        className="btn-primary text-xs px-5 py-2"
                      >
                        Apply Recommendations
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // RENDER GRID LIST OF RESUMES MODE
  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 md:px-8 py-6">
      {/* 1. Hero-Level Subpage Header */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-500">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider">AI CV Builder</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            AI Resume Workspace
          </h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Draft ATS-optimized achievements, audit keyword matching, and customize template layouts.
          </p>
        </div>

        {/* Stats Columns */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-6 bg-[var(--bg-card)] border border-[var(--border-default)] px-4 py-2 rounded-xl shadow-[var(--shadow-sm)] text-[10px]">
            <div>
              <p className="font-bold text-[var(--text-primary)]">{resumes.length}</p>
              <p className="text-[var(--text-muted)]">Resumes</p>
            </div>
            <div className="border-l h-5 border-[var(--border-default)]" />
            <div>
              <p className="font-bold text-emerald-500">
                {Math.max(...resumes.map((r) => r.atsScore || 0), 0)}%
              </p>
              <p className="text-[var(--text-muted)]">Max ATS</p>
            </div>
          </div>

          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="btn-primary text-xs font-bold flex items-center gap-1.5 px-4 py-2.5 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[var(--shadow-sm)] cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Resume
          </button>
        </div>
      </div>

      {/* Template Picker (shown when creating) */}
      {showBuilder && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card p-6 overflow-hidden">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Choose a Template
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className="p-4 rounded-xl border text-left transition-all cursor-pointer"
                style={{
                  background: selectedTemplate === t.id ? `${t.color}10` : "var(--bg-subtle)",
                  border: `1px solid ${selectedTemplate === t.id ? t.color : "var(--border-default)"}`,
                }}
              >
                <div className="w-full h-16 rounded-lg mb-2 flex items-center justify-center" style={{ background: `${t.color}15` }}>
                  <div className="space-y-1 w-3/4">
                    <div className="h-1.5 rounded-full" style={{ background: t.color }} />
                    <div className="h-1 rounded-full" style={{ background: `${t.color}60` }} />
                    <div className="h-1 rounded-full w-3/4" style={{ background: `${t.color}40` }} />
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{t.label}</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t.preview}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="btn-primary text-sm px-6 cursor-pointer"
            >
              {isCreating ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Sparkles className="w-4 h-4" /> Create Resume</>}
            </button>
            <button
              onClick={() => setShowBuilder(false)}
              className="px-6 py-2.5 text-sm rounded-xl border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Resumes Grid */}
      {resumes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 text-center max-w-xl mx-auto space-y-4 border border-[var(--border-default)] shadow-[var(--shadow-elevated)]"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--bg-muted)] flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7 text-[#7c3aed]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              No resumes created yet
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Upload your first resume and discover hidden opportunities. Let Gemini optimize details for ATS compatibility.
            </p>
          </div>
          <button
            onClick={() => setShowBuilder(true)}
            className="btn-primary text-xs font-bold inline-flex items-center gap-1.5 px-6 py-2.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create First Resume
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume, i) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-5 group"
            >
              {/* Preview area */}
              <div
                className="w-full h-32 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${TEMPLATES.find(t => t.id === resume.template)?.color ?? "#7c3aed"}15 0%, ${TEMPLATES.find(t => t.id === resume.template)?.color ?? "#7c3aed"}05 100%)`,
                  border: `1px solid ${TEMPLATES.find(t => t.id === resume.template)?.color ?? "#7c3aed"}20`,
                }}
              >
                {/* Mock resume lines */}
                <div className="w-3/4 space-y-2">
                  <div className="h-3 rounded" style={{ background: TEMPLATES.find(t => t.id === resume.template)?.color ?? "#7c3aed", opacity: 0.8 }} />
                  <div className="h-1.5 rounded w-full opacity-30" style={{ background: "var(--text-primary)" }} />
                  <div className="h-1.5 rounded w-4/5 opacity-20" style={{ background: "var(--text-primary)" }} />
                  <div className="h-px my-2" style={{ background: "var(--border-default)" }} />
                  <div className="h-1.5 rounded w-2/3 opacity-25" style={{ background: "var(--text-primary)" }} />
                  <div className="h-1.5 rounded w-full opacity-20" style={{ background: "var(--text-primary)" }} />
                </div>

                {/* ATS score badge */}
                {resume.atsScore && (
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: `${scoreColor(resume.atsScore)}20`, color: scoreColor(resume.atsScore) }}
                  >
                    ATS {resume.atsScore}%
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                {resume.title}
              </h3>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                {TEMPLATES.find(t => t.id === resume.template)?.label ?? "Modern"} template · Updated recently
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditStart(resume.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] transition-all" 
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button 
                  onClick={() => handleEditStart(resume.id)}
                  className="flex-1 btn-primary py-2 text-xs justify-center"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button 
                  onClick={() => {
                    handleEditStart(resume.id);
                    // Trigger print immediately after frame mounts
                    setTimeout(handlePrint, 500);
                  }}
                  className="w-8 h-8 rounded-lg border border-[var(--border-default)] hover:bg-[var(--bg-muted)] flex items-center justify-center transition-all" 
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                </button>
                <button onClick={() => handleDelete(resume.id)} className="w-8 h-8 rounded-lg border border-[var(--border-default)] hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-all" title="Delete">
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-5"
        style={{ background: "rgba(124,58,237,0.05)", border: "1px solid var(--border-default)" }}
      >
        <p className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
          ✨ AI Resume Tips
        </p>
        <ul className="space-y-2">
          {[
            "Use strong action verbs: Led, Built, Scaled, Improved, Reduced",
            "Quantify achievements: '40% increase in conversions' beats 'improved conversions'",
            "Match keywords from job descriptions for better ATS scores",
            "Keep to 1 page for < 5 years experience, 2 pages for 5+ years",
          ].map((tip, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
              <span className="text-violet-500 font-bold">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
