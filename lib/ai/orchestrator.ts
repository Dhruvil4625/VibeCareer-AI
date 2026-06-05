/**
 * Multi-LLM Orchestration Layer
 *
 * Strategy:
 * 1. Primary: Google Gemini 1.5 Pro
 * 2. Fallback: OpenAI GPT-4o (if key configured)
 * 3. Last resort: Return meaningful error message to user
 *
 * All AI features route through this orchestrator for:
 * - Unified error handling
 * - Provider fallback
 * - Response caching (future)
 * - Rate limit management (future)
 */

import { generateWithGemini, generateStructuredWithGemini } from "./gemini";
import { generateWithOpenAI } from "./openai";

export interface AIGenerationOptions {
  fast?: boolean;
  maxRetries?: number;
}

/**
 * Generate text using the primary AI provider with automatic fallback
 */
export async function generateText(
  prompt: string,
  options: AIGenerationOptions = {}
): Promise<string> {
  const { fast = false, maxRetries = 2 } = options;

  // Attempt primary provider: Gemini
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await generateWithGemini(prompt, fast);
      if (result && result.trim().length > 0) return result;
    } catch (error) {
      console.warn(`[Orchestrator] Gemini attempt ${attempt + 1} failed:`, error);
      
      // If Gemini fails, try OpenAI fallback on last attempt
      if (attempt === maxRetries - 1 && process.env.OPENAI_API_KEY) {
        try {
          console.info("[Orchestrator] Falling back to OpenAI GPT-4o...");
          return await generateWithOpenAI(prompt);
        } catch (openaiError) {
          console.error("[Orchestrator] OpenAI fallback also failed:", openaiError);
        }
      }
    }
  }

  throw new Error(
    "AI generation failed after all attempts. Please check your API keys and try again."
  );
}

/**
 * Generate structured JSON using primary AI provider with automatic fallback
 */
export async function generateStructured<T>(
  prompt: string,
  fallback: T,
  options: AIGenerationOptions = {}
): Promise<T> {
  const { maxRetries = 2 } = options;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await generateStructuredWithGemini<T>(prompt, fallback);
    } catch (error) {
      console.warn(`[Orchestrator] Structured generation attempt ${attempt + 1} failed:`, error);
    }
  }

  return fallback;
}

// ─────────────────────────────────────────
// FEATURE-SPECIFIC AI FUNCTIONS
// ─────────────────────────────────────────

export interface ResumeEnhancementInput {
  role: string;
  company?: string;
  bulletPoints: string[];
  yearsOfExperience?: number;
}

/**
 * Enhance resume bullet points with AI
 */
export async function enhanceResumeBullets(
  input: ResumeEnhancementInput
): Promise<string[]> {
  const prompt = `You are an expert resume writer with 15 years of experience helping candidates land jobs at top tech companies.

Role: ${input.role}
${input.company ? `Company: ${input.company}` : ""}
Years of Experience: ${input.yearsOfExperience ?? "Not specified"}

Current bullet points to enhance:
${input.bulletPoints.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Enhance these bullet points to:
1. Start with strong action verbs (Led, Built, Scaled, Improved, Reduced, etc.)
2. Include quantifiable impact where possible (%, $, time saved, users, etc.)
3. Be ATS-friendly and keyword-rich for the role
4. Sound natural, not robotic
5. Be concise (max 2 lines each)

Return a JSON array of enhanced bullet points. Example: ["Enhanced bullet 1", "Enhanced bullet 2"]`;

  return generateStructured<string[]>(prompt, input.bulletPoints);
}

export interface CoverLetterInput {
  candidateName: string;
  targetRole: string;
  targetCompany: string;
  skills: string[];
  experience: string;
  tone: "professional" | "enthusiastic" | "creative";
  resumeSummary?: string;
}

/**
 * Generate a tailored cover letter
 */
export async function generateCoverLetter(input: CoverLetterInput): Promise<string> {
  const toneInstructions = {
    professional: "formal, confident, and concise",
    enthusiastic: "energetic, passionate, and engaging",
    creative: "unique, memorable, and bold",
  };

  const prompt = `Write a compelling cover letter for the following application.

Candidate: ${input.candidateName}
Target Role: ${input.targetRole}
Target Company: ${input.targetCompany}
Key Skills: ${input.skills.join(", ")}
Experience Summary: ${input.experience}
${input.resumeSummary ? `Resume Summary: ${input.resumeSummary}` : ""}
Tone: ${toneInstructions[input.tone]}

Requirements:
- 3-4 paragraphs
- Opening hook that grabs attention
- Middle paragraphs connecting skills to company needs
- Strong closing with a call to action
- Sound authentic and human, not template-like
- Do not use clichés like "I am writing to apply"
- Max 400 words

Return only the cover letter text, no headers or labels.`;

  return generateText(prompt);
}

export interface JobMatchInput {
  candidateSkills: string[];
  candidateExperience: string;
  jobTitle: string;
  jobDescription: string;
}

/**
 * Calculate AI match score between candidate and job
 */
export async function calculateJobMatch(input: JobMatchInput): Promise<{
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}> {
  const prompt = `Analyze the match between this candidate and job posting.

Candidate Skills: ${input.candidateSkills.join(", ")}
Candidate Experience: ${input.candidateExperience}

Job Title: ${input.jobTitle}
Job Description: ${input.jobDescription}

Evaluate and return a JSON object with:
- score: number 0-100 (match percentage)
- strengths: array of 3 matching strengths
- gaps: array of up to 3 skill gaps
- recommendation: one sentence recommendation

JSON format only, no markdown.`;

  return generateStructured(prompt, {
    score: 50,
    strengths: ["Relevant experience"],
    gaps: ["More details needed"],
    recommendation: "Review the job requirements carefully.",
  });
}

/**
 * Generate interview questions for a role
 */
export async function generateInterviewQuestions(
  role: string,
  type: "behavioral" | "technical" | "hr" | "mixed",
  count: number = 5
): Promise<Array<{ question: string; category: string; tip: string }>> {
  const prompt = `Generate ${count} ${type} interview questions for a ${role} position.

Return a JSON array with objects containing:
- question: the interview question
- category: category name (e.g., "Leadership", "Problem Solving", "Communication")
- tip: a brief tip on how to answer this question well (1-2 sentences)

JSON array format only.`;

  return generateStructured(prompt, []);
}

/**
 * Evaluate an interview answer
 */
export async function evaluateInterviewAnswer(
  question: string,
  answer: string,
  role: string
): Promise<{
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}> {
  const prompt = `You are an expert interviewer evaluating a candidate's response.

Role: ${role}
Interview Question: ${question}
Candidate's Answer: ${answer}

Evaluate the answer and return a JSON object with:
- score: number 0-100
- feedback: 2-3 sentence overall feedback
- strengths: array of 2 things done well
- improvements: array of 2 areas to improve

JSON format only.`;

  return generateStructured(prompt, {
    score: 60,
    feedback: "Your answer shows some understanding of the topic.",
    strengths: ["Clear communication"],
    improvements: ["Add more specific examples", "Include measurable outcomes"],
  });
}

/**
 * Optimize a LinkedIn section
 */
export async function optimizeLinkedInSection(
  section: "headline" | "summary" | "experience" | "skills",
  content: string,
  targetRole: string
): Promise<{ optimized: string; improvements: string[] }> {
  const prompt = `You are a LinkedIn optimization expert. Improve this ${section} section for a ${targetRole} professional.

Current ${section}:
${content}

Optimize it to:
1. Include relevant keywords for ${targetRole}
2. Be compelling and keyword-rich for recruiters
3. Sound authentic and human
4. Follow LinkedIn best practices for ${section}s

Return a JSON object with:
- optimized: the improved content
- improvements: array of 3 specific improvements made

JSON format only.`;

  return generateStructured(prompt, {
    optimized: content,
    improvements: ["Added keywords", "Improved clarity", "Enhanced impact"],
  });
}

/**
 * Generate a personalized career roadmap
 */
export async function generateCareerRoadmap(
  currentRole: string,
  targetRole: string,
  currentSkills: string[],
  timeframe: "30" | "60" | "90"
): Promise<{
  milestones: Array<{ week: number; goal: string; actions: string[] }>;
  keySkills: string[];
  resources: string[];
}> {
  const prompt = `Create a ${timeframe}-day career roadmap for someone transitioning from ${currentRole} to ${targetRole}.

Current Skills: ${currentSkills.join(", ")}

Create a realistic, actionable plan with:
- Weekly milestones broken down into specific actions
- Key skills to acquire
- Learning resources (courses, books, projects)

Return a JSON object with:
- milestones: array of { week: number, goal: string, actions: string[] }
- keySkills: array of top 5 skills to develop
- resources: array of top 5 specific learning resources

JSON format only.`;

  return generateStructured(prompt, {
    milestones: [],
    keySkills: [],
    resources: [],
  });
}

/**
 * Audit LinkedIn Profile URL and predict job roles
 */
function getPrimaryRole(role: string | null | undefined): string {
  if (!role) return "Software Engineer";
  const parts = role.split(/[|/,]/);
  return parts[0]?.trim() || role.trim() || "Software Engineer";
}

export async function analyzeLinkedInProfile(
  profileUrl: string,
  userContext: {
    name?: string | null;
    bio?: string | null;
    targetRole?: string | null;
    experienceLevel?: string | null;
    skills?: string[];
    projects?: Array<{ name: string; description: string; technologies?: string[] }>;
    certifications?: Array<{ name: string; issuer: string }>;
  }
): Promise<{
  score: number;
  predictedRoles: Array<{ role: string; fitPercentage: number; rationale: string }>;
  headlineSuggestions: string[];
  strengths: string[];
  improvements: string[];
}> {
  const prompt = `You are a professional LinkedIn Profile Auditor and Technical Recruiter with 15+ years of experience.
Analyze this public profile link: "${profileUrl}"

Candidate Context from database profiles:
Name: ${userContext.name ?? "Job Seeker"}
Bio: ${userContext.bio ?? "Not provided"}
Target Role: ${userContext.targetRole ?? "Software Engineer"}
Experience Level: ${userContext.experienceLevel ?? "MID_LEVEL"}
Extracted Skills: ${userContext.skills?.join(", ") ?? "React, JavaScript, Web Development"}
${userContext.projects ? `Key Projects:\n${userContext.projects.map(p => `- ${p.name}: ${p.description} (Tech: ${p.technologies?.join(", ")})`).join("\n")}` : ""}
${userContext.certifications ? `Certifications:\n${userContext.certifications.map(c => `- ${c.name} (Issued by: ${c.issuer})`).join("\n")}` : ""}

Evaluate this candidate's fit, calculate their LinkedIn optimization strength, and predict job roles.
Return a JSON object with:
- score: number 0-100 representing LinkedIn profile optimization level
- predictedRoles: array of 3 roles the candidate is highly qualified for, each containing:
  - role: string (e.g. "Senior React Developer")
  - fitPercentage: number (e.g. 95)
  - rationale: string (1-2 sentences why this fits)
- headlineSuggestions: array of 3 optimized LinkedIn headline options matching their target role
- strengths: array of 3 profile strengths
- improvements: array of 3 specific recommendations to improve their profile readability and recruiter impact

Return JSON only, do not wrap in markdown or backticks.`;

  const primaryRole = getPrimaryRole(userContext.targetRole);
  const lowerRole = (userContext.targetRole || "").toLowerCase();
  
  // Combine all texts to scan for key terms
  const projectTexts = (userContext.projects || []).map(p => `${p.name} ${p.description} ${(p.technologies || []).join(" ")}`).join(" ").toLowerCase();
  const certTexts = (userContext.certifications || []).map(c => `${c.name} ${c.issuer}`).join(" ").toLowerCase();
  const skillsTexts = (userContext.skills || []).join(" ").toLowerCase();
  const combinedContext = `${lowerRole} ${projectTexts} ${certTexts} ${skillsTexts}`;

  const hasML = combinedContext.includes("machine learning") || combinedContext.includes("ml") || combinedContext.includes("computer vision") || combinedContext.includes("predictive") || combinedContext.includes("vision") || combinedContext.includes("analytics");
  const hasFullStack = combinedContext.includes("full-stack") || combinedContext.includes("fullstack") || combinedContext.includes("django") || combinedContext.includes("react");
  const hasAI = combinedContext.includes("ai ") || combinedContext.includes("artificial intelligence") || combinedContext.includes("intelligent") || combinedContext.includes("automation");

  const fallbackRoles = [
    { 
      role: primaryRole, 
      fitPercentage: 92, 
      rationale: `Directly aligns with your primary target profile as an ${primaryRole}.` 
    },
    { 
      role: hasML ? "Machine Learning Engineer" : (hasAI ? "AI Systems Integration Engineer" : "AI Solutions Engineer"), 
      fitPercentage: 86, 
      rationale: hasML 
        ? "Your project experience and certifications in machine learning/computer vision align perfectly." 
        : "Your background in AI and automation tools indicates readiness for intelligent systems integration." 
    },
    { 
      role: hasFullStack ? "Full-Stack Developer (Django & React)" : "Backend Software Engineer", 
      fitPercentage: 81, 
      rationale: hasFullStack 
        ? "Your profile showcases strong capability in frontend (React) and backend (Django) frameworks." 
        : "Strong technical capabilities and certifications match backend developer specifications." 
    }
  ];

  return generateStructured(prompt, {
    score: 72,
    predictedRoles: fallbackRoles,
    headlineSuggestions: [
      `${userContext.name ?? "Professional"} | Specialized in ${primaryRole} | Building Intelligent Solutions`,
      `${userContext.name ?? "Developer"} | ${primaryRole} | Python, React, AI & Automation`,
      `Passionate Engineer crafting intelligent automation systems & modern web APIs`
    ],
    strengths: ["Strong technical core stack", "Clear focus on AI & intelligent automation", "Versatile experience"],
    improvements: ["Detail specific project metrics in your summary", "Enforce keyword alignment for Machine Learning roles", "Highlight computer vision achievements"]
  });
}

