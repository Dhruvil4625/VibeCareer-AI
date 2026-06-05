import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { z } from "zod";
import { enhanceResumeBullets, calculateJobMatch } from "@/lib/ai/orchestrator";

// Schema for bullet optimization
const optimizeSchema = z.object({
  action: z.literal("optimize-bullets"),
  role: z.string().min(1),
  company: z.string().optional(),
  bulletPoints: z.array(z.string().min(1)),
});

// Schema for ATS scoring
const atsSchema = z.object({
  action: z.literal("ats-score"),
  candidateSkills: z.array(z.string()),
  candidateExperience: z.string(),
  jobTitle: z.string().min(1),
  jobDescription: z.string().min(1),
});

const requestSchema = z.discriminatedUnion("action", [optimizeSchema, atsSchema]);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid request body" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.action === "optimize-bullets") {
      const { role, company, bulletPoints } = data;
      const enhanced = await enhanceResumeBullets({
        role,
        company,
        bulletPoints,
      });
      return NextResponse.json({ enhanced });
    } else {
      const { candidateSkills, candidateExperience, jobTitle, jobDescription } = data;
      const match = await calculateJobMatch({
        candidateSkills,
        candidateExperience,
        jobTitle,
        jobDescription,
      });
      return NextResponse.json(match);
    }
  } catch (error) {
    console.error("[Resume AI API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request. Please try again." },
      { status: 500 }
    );
  }
}
