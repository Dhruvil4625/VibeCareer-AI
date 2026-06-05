import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { generateInterviewQuestions, evaluateInterviewAnswer } from "@/lib/ai/orchestrator";
import { z } from "zod";

const generateSchema = z.object({
  action: z.literal("generate"),
  role: z.string().min(1),
  type: z.enum(["behavioral", "technical", "hr", "mixed"]),
  count: z.number().min(1).max(10).optional().default(5),
});

const evaluateSchema = z.object({
  action: z.literal("evaluate"),
  question: z.string().min(1),
  answer: z.string().min(1),
  role: z.string().min(1),
});

const requestSchema = z.discriminatedUnion("action", [generateSchema, evaluateSchema]);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (parsed.data.action === "generate") {
      const { role, type, count } = parsed.data;
      const questions = await generateInterviewQuestions(role, type, count);
      return NextResponse.json({ questions });
    }

    if (parsed.data.action === "evaluate") {
      const { question, answer, role } = parsed.data;
      const evaluation = await evaluateInterviewAnswer(question, answer, role);
      return NextResponse.json({ evaluation });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("[Interview API] Error:", error);
    return NextResponse.json(
      { error: "Interview service temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
