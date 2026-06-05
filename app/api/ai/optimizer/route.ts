import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { z } from "zod";
import { optimizeLinkedInSection, analyzeLinkedInProfile } from "@/lib/ai/orchestrator";
import { prisma } from "@/lib/db/prisma";

const optimizerSchema = z.object({
  // Section optimization (optional to support link parsing)
  section: z.enum(["headline", "summary", "experience", "skills"]).optional(),
  content: z.string().optional(),
  targetRole: z.string().optional(),

  // Profile URL analysis (optional)
  profileUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = optimizerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { section, content, targetRole, profileUrl } = parsed.data;

    // Handle Profile URL Link Analysis
    if (profileUrl) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Try to fetch candidate skills from their latest resume
      let skills: string[] = [];
      try {
        const latestResume = await prisma.resume.findFirst({
          where: { userId: session.user.id },
          orderBy: { updatedAt: "desc" },
        });

        if (latestResume && latestResume.content) {
          const contentObj = latestResume.content as any;
          if (contentObj.skills && Array.isArray(contentObj.skills)) {
            skills = contentObj.skills.map((s: any) => typeof s === "string" ? s : s.name ?? "");
          }
        }
      } catch (resumeError) {
        console.warn("Could not fetch skills from resume context:", resumeError);
      }

      const analysis = await analyzeLinkedInProfile(profileUrl, {
        name: user.name,
        bio: user.bio,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        skills: skills.length > 0 ? skills : undefined,
      });

      return NextResponse.json({ type: "link-analysis", ...analysis });
    }

    // Handle Standard Section Optimization
    if (!section || !content || !targetRole) {
      return NextResponse.json(
        { error: "Missing required fields for section optimization." },
        { status: 400 }
      );
    }

    const data = await optimizeLinkedInSection(section, content, targetRole);

    return NextResponse.json({ type: "optimization", ...data });
  } catch (error) {
    console.error("[LinkedIn Optimizer API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
