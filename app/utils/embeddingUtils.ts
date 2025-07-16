// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// /**
//  * Generate text embeddings using Gemini embedding model
//  * @param text input text
//  * @returns embedding vector (array of numbers)
//  */
// export async function getEmbedding(text: string): Promise<number[]> {
//   const response = await genAI.models.embedContent({
//     model: "gemini-embedding-001",
//     contents: text,
//   });

//   if (!response.embeddings || response.embeddings.length === 0) {
//     throw new Error("Embeddings not returned");
//   }

//   return response.embeddings[0].values;
// }



// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// /**
//  * Generate text embedding using Gemini embedding model
//  */
// export async function getEmbedding(text: string): Promise<number[]> {
//   const response = await genAI.models.embedContent({
//     model: "gemini-embedding-001",
//     contents: text,
//   });

//   // Ensure we actually have an embedding and its values
//   if (
//     !response.embeddings ||
//     response.embeddings.length === 0 ||
//     !response.embeddings[0].values
//   ) {
//     throw new Error("No embeddings returned from the API");
//   }

//   return response.embeddings[0].values;
// }



// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// export async function getEmbedding(text: string): Promise<number[]> {
//   const response = await genAI.models.embedContent({
//     model: "gemini-embedding-001",
//     contents: text,
//   });

//   if (!response.embeddings?.[0]?.values) {
//     throw new Error("Failed to get embedding");
//   }
//   return response.embeddings[0].values;
// }


// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// export async function getEmbedding(text: string): Promise<number[]> {
//   const response = await genAI.models.embedContent({
//     model: "gemini-embedding-001",
//     contents: text,
//   });

//   if (!response.embeddings?.[0]?.values) {
//     throw new Error("Failed to get embedding");
//   }
//   return response.embeddings[0].values;
// }








// utils/embeddingUtils.ts
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
