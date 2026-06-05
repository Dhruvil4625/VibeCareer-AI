import OpenAI from "openai";

// OpenAI client — optional (used as fallback if OPENAI_API_KEY is set)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateWithOpenAI(
  prompt: string,
  model: string = "gpt-4o"
): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4096,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content ?? "";
}

export { openai };
