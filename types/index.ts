// Shared TypeScript types for VibeCareer AI

import type { User, Resume, Application, ApplicationStatus } from "@prisma/client";

// ─────────────────────────────────────────
// RE-EXPORTS
// ─────────────────────────────────────────
export type { User, Resume, Application, ApplicationStatus };

// ─────────────────────────────────────────
// RESUME TYPES
// ─────────────────────────────────────────

export interface ResumePersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  bullets: string[];
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  honors?: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface ResumeContent {
  personalInfo: ResumePersonalInfo;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  projects: ResumeProject[];
  certifications?: ResumeCertification[];
}

// ─────────────────────────────────────────
// JOB TYPES
// ─────────────────────────────────────────

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  tags: string[];
  url: string;
  remote: boolean;
  postedAt: string;
  matchScore?: number;
}

// ─────────────────────────────────────────
// AI COACH TYPES
// ─────────────────────────────────────────

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

// ─────────────────────────────────────────
// INTERVIEW TYPES
// ─────────────────────────────────────────

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  tip: string;
  answer?: string;
  score?: number;
  feedback?: string;
}

// ─────────────────────────────────────────
// DASHBOARD TYPES
// ─────────────────────────────────────────

export interface DashboardStats {
  totalApplications: number;
  interviews: number;
  offers: number;
  careerScore: number;
  resumesCreated: number;
  coverLettersCreated: number;
}

// ─────────────────────────────────────────
// NEXT-AUTH SESSION EXTENSION
// ─────────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
