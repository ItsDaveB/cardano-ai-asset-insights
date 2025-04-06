export interface LLMProvider {
  generateInsights(data: any, instruction?: string): Promise<LLMResult>;
}

export interface LLMResult {
  fullOutput: string;
  analysisExtract: Record<string, any>; // fully generic
  llmProvider: string;
}
