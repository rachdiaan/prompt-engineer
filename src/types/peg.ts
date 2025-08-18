// peg.ts
export type PegSchema = {
  role: string;
  context: { user: string; audience: string; situation: string };
  objective: string;
  instructions: string[];
  output: { type: string; length: string; extras: string[] };
  style: { tone: string; voice: string };
  constraints: {
    no_repetition: boolean;
    latest_sources_only: boolean;
    citation_style: string | null;
    timeframe: string | null;
  };
  meta: {
    reasoning_depth: "brief" | "standard" | "deep";
    show_work: boolean;
    verify_calculations: boolean;
    ask_before_assuming: boolean;
  };
};

export const PEG_SYSTEM_PROMPT = `Anda adalah asisten AI yang membantu pengguna membuat prompt yang efektif dan terstruktur untuk berbagai keperluan AI.`;

// Bonus: Prompt Engine Generator (Natural Language siap embed)
export const PEG_COMPACT_SYSTEM = `You are PROMPT ENGINE GENERATOR (PEG). Interview user with ≤8 concise questions to fill: role, context(user/audience/situation), objective, instructions, output(type/length/extras), style(tone/voice), constraints, meta(reasoning depth/verification/assumptions). Then output:
(A) PROMPT_NL — polished natural-language prompt merging all fields.
(B) PROMPT_JSON — valid JSON strictly matching the shared schema. 
Always return both (A) and (B). If info is missing, make sensible defaults and state them in (A). No chain-of-thought; only final results.`;

export function buildNaturalLanguagePrompt(p: PegSchema): string {
  const lines = [
    `Bertindaklah sebagai ${p.role}.`,
    `Konteks: user=${p.context.user}; audiens=${p.context.audience}; situasi=${p.context.situation}.`,
    `Tujuan: ${p.objective}.`,
    `Instruksi:`,
    ...p.instructions.map((s, i) => `${i + 1}. ${s}`),
    `Format output: ${p.output.type}; panjang: ${p.output.length}; elemen tambahan: ${p.output.extras.join(", ") || "-"}.`,
    `Gaya bahasa: tone=${p.style.tone}; voice=${p.style.voice}.`,
    `Batasan: no_repetition=${p.constraints.no_repetition}; latest_sources_only=${p.constraints.latest_sources_only}; citation_style=${p.constraints.citation_style ?? "-"}; timeframe=${p.constraints.timeframe ?? "-"}.`,
    `Meta: reasoning_depth=${p.meta.reasoning_depth}; show_work=${p.meta.show_work}; verify_calculations=${p.meta.verify_calculations}; ask_before_assuming=${p.meta.ask_before_assuming}.`,
    `Tolong berikan jawaban yang runut, konsisten, dan mendalam.`
  ];
  return lines.join("\n");
}

export function validatePeg(obj: any): { ok: boolean; errors?: string[] } {
  const errs: string[] = [];
  const req = (cond: boolean, msg: string) => { if (!cond) errs.push(msg); };
  req(typeof obj.role === "string", "role missing/string");
  req(obj.context && typeof obj.context.user === "string", "context.user missing");
  req(obj.objective && typeof obj.objective === "string", "objective missing");
  req(Array.isArray(obj.instructions), "instructions must be array");
  req(obj.output && typeof obj.output.type === "string", "output.type missing");
  req(obj.style && typeof obj.style.tone === "string", "style.tone missing");
  return { ok: errs.length === 0, errors: errs.length ? errs : undefined };
}