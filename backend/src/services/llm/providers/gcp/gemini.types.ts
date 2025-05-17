export interface GeminiApiResponse {
  candidates?: GeminiApiCandidate[];
}

export interface GeminiApiCandidate {
  avgLogprobs?: number;
  content?: {
    parts?: {
      text: string;
    }[];
  };
}
