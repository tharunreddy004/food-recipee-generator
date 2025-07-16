import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY ?? "",
});

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await genAI.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  if (!response.embeddings?.[0]?.values) {
    throw new Error("Failed to get embedding");
  }
  return response.embeddings[0].values;
}
