import OpenAI from "openai";
import { PEG_SYSTEM_PROMPT } from "../types/peg";

export async function runOpenAI(userMessage: string, model = "gpt-4", maxTokens = 1000, temperature = 0.7, apiKey?: string) {
  const client = new OpenAI({ 
    apiKey: apiKey || import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  
  const res = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: PEG_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    temperature,
    max_tokens: maxTokens
  });
  
  return res.choices[0]?.message?.content ?? "";
}