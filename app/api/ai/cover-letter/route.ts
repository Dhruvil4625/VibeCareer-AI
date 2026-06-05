import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { z } from "zod";
import { generateCoverLetter } from "@/lib/ai/orchestrator";
import { prisma } from "@/lib/db/prisma";

const coverLetterSchema = z.object({
  targetRole: z.string().min(1),
  targetCompany: z.string().min(1),
  skills: z.array(z.string()),
  experience: z.string().min(1),
  tone: z.enum(["professional", "enthusiastic", "creative"]),
  save: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = coverLetterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message },
        { status: 400 }
      );
    }

    const { targetRole, targetCompany, skills, experience, tone, save } = parsed.data;

    const content = await generateCoverLetter({
      candidateName: session.user.name ?? "Candidate",
      targetRole,
      targetCompany,
      skills,
      experience,
      tone,
    });

    // Optionally save to DB
    let savedId: string | undefined;
    if (save) {
      const saved = await prisma.coverLetter.create({
        data: {
          userId: session.user.id,
          title: `${targetRole} at ${targetCompany}`,
          company: targetCompany,
          role: targetRole,
          content,
          tone,
        },
      });
      savedId = saved.id;
    }

    return NextResponse.json({ content, savedId });
  } catch (error) {
    console.error("[Cover Letter API] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const coverLetters = await prisma.coverLetter.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        company: true,
        role: true,
        tone: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ coverLetters });
  } catch (error) {
    console.error("[Cover Letters GET] Error:", error);
    return NextResponse.json({ error: "Failed to fetch cover letters" }, { status: 500 });
  }
}
