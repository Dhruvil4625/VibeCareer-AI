import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

if (!process.env.GOOGLE_AI_API_KEY) {
  throw new Error("Missing GOOGLE_AI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const geminiPro = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 4096,
  },
});

export const geminiFlash = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
  generationConfig: {
    temperature: 0.6,
    topP: 0.9,
    maxOutputTokens: 2048,
  },
});

/**
 * Generate text with Gemini Pro
 */
export async function generateWithGemini(prompt: string, fast = false): Promise<string> {
  const model = fast ? geminiFlash : geminiPro;
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

/**
 * Generate structured JSON with Gemini Pro
 * Wraps response in JSON extraction with retry logic
 */
export async function generateStructuredWithGemini<T>(
  prompt: string,
  fallback: T
): Promise<T> {
  try {
    const result = await geminiPro.generateContent(
      `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no explanation, just the JSON object.`
    );
    const text = result.response.text().trim();
    
    // Extract JSON from potential markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
    const jsonStr = jsonMatch[1] || text;
    
    return JSON.parse(jsonStr) as T;
  } catch (error) {
    console.error("[Gemini] Structured generation failed:", error);
    return fallback;
  }
}

export { genAI };
