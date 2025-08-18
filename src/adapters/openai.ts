import OpenAI from "openai";
import { PEG_SYSTEM_PROMPT } from "../types/peg";

export async function runOpenAI(userMessage: string, model = "gpt-4") {
  const client = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  
  const res = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: PEG_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    temperature: 0.2
  });
  
  return res.choices[0]?.message?.content ?? "";
}