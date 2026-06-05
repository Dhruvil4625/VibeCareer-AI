import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { generateText } from "@/lib/ai/orchestrator";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import type { ChatMessage } from "@/types";
import { generateId } from "@/lib/utils";

const coachSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
  sessionId: z.string().optional(),
});

const SYSTEM_PROMPT = `You are VibeCareer AI — an expert career coach with 20 years of experience helping candidates land roles at top companies including Google, Amazon, Apple, Meta, Microsoft, and top startups.

Your expertise covers:
- Resume strategy and ATS optimization
- Job search strategies and networking
- Interview preparation (behavioral, technical, HR)
- Salary negotiation
- Career transitions and roadmaps
- Skill gap analysis
- LinkedIn optimization
- Personal branding

Tone: Encouraging, direct, practical, and data-driven. Be specific with advice — avoid generic platitudes.
Format: Use bullet points for lists, bold for key points. Keep responses concise but comprehensive.

When you give advice, always:
1. Be specific to the user's situation
2. Provide actionable next steps
3. Reference industry best practices
4. Give examples where helpful`;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = coachSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { messages, sessionId } = parsed.data;

    // Build the prompt with conversation history
    const conversationHistory = messages
      .map((m) => `${m.role === "user" ? "User" : "Career Coach"}: ${m.content}`)
      .join("\n\n");

    const prompt = `${SYSTEM_PROMPT}\n\n${conversationHistory}\n\nCareer Coach:`;

    const response = await generateText(prompt, { fast: false });

    // Create or update coach session in DB
    const newMessage: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
    };

    if (sessionId) {
      const existing = await prisma.coachSession.findFirst({
        where: { id: sessionId, userId: session.user.id },
      });
      if (existing) {
        const existingMessages = (existing.messages as unknown as ChatMessage[]) ?? [];
        await prisma.coachSession.update({
          where: { id: sessionId },
          data: {
            messages: [
              ...existingMessages,
              ...messages.slice(existingMessages.length),
              newMessage,
            ] as object[],
          },
        });
      }
    }

    return NextResponse.json({ message: newMessage });
  } catch (error) {
    console.error("[Coach API] Error:", error);
    return NextResponse.json(
      { error: "Failed to get career advice. Please try again." },
      { status: 500 }
    );
  }
}
