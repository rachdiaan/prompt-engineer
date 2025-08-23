import { GoogleGenerativeAI } from "@google/generative-ai";
import { PEG_SYSTEM_PROMPT } from "../types/peg";

export async function runGemini(userMessage: string, model = "gemini-1.5-pro", maxTokens = 1000, temperature = 0.7, apiKey?: string) {
  const genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GEMINI_API_KEY!);
  
  const gem = genAI.getGenerativeModel({
    model,
    systemInstruction: { 
      role: "system", 
      parts: [{ text: PEG_SYSTEM_PROMPT }] 
    }
  });
  
  const res = await gem.generateContent({
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    generationConfig: { 
      temperature,
      maxOutputTokens: maxTokens
    }
  });
  
  return res.response.text();
}