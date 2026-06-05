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

    // Preprocess profileUrl to ensure it starts with a protocol to satisfy Zod .url() validation
    if (body.profileUrl && typeof body.profileUrl === "string") {
      let url = body.profileUrl.trim();
      if (url && !/^https?:\/\//i.test(url)) {
        body.profileUrl = `https://${url}`;
      }
    }

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

      // Try to fetch candidate skills, projects, and certifications from their latest resume
      let skills: string[] = [];
      let projects: Array<{ name: string; description: string; technologies?: string[] }> = [];
      let certifications: Array<{ name: string; issuer: string }> = [];
      let hasResume = false;

      try {
        const latestResume = await prisma.resume.findFirst({
          where: { userId: session.user.id },
          orderBy: { updatedAt: "desc" },
        });

        if (latestResume) {
          hasResume = true;
          if (latestResume.content) {
            const contentObj = latestResume.content as any;
            if (contentObj.skills && Array.isArray(contentObj.skills)) {
              skills = contentObj.skills.map((s: any) => typeof s === "string" ? s : s.name ?? "");
            }
            if (contentObj.projects && Array.isArray(contentObj.projects)) {
              projects = contentObj.projects.map((p: any) => ({
                name: p.name || "",
                description: p.description || "",
                technologies: p.technologies || []
              }));
            }
            if (contentObj.certifications && Array.isArray(contentObj.certifications)) {
              certifications = contentObj.certifications.map((c: any) => ({
                name: c.name || "",
                issuer: c.issuer || ""
              }));
            }
          }
        }
      } catch (resumeError) {
        console.warn("Could not fetch details from resume context:", resumeError);
      }

      const analysis = await analyzeLinkedInProfile(profileUrl, {
        name: user.name,
        bio: user.bio,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        skills: skills.length > 0 ? skills : undefined,
        projects: projects.length > 0 ? projects : undefined,
        certifications: certifications.length > 0 ? certifications : undefined,
      });

      return NextResponse.json({
        type: "link-analysis",
        ...analysis,
        resumeStats: {
          hasResume,
          projectsCount: projects.length,
          certificationsCount: certifications.length,
          skillsCount: skills.length,
        }
      });
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
