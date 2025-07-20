// import { NextResponse } from "next/server";
// import redis from "../../lib/redis";
// import { getEmbedding } from "../../utils/embeddingUtils";
// import { foodExamples, irrelevantExamples, initializeExampleEmbeddings } from "../../data/exampleEmbeddings";
// import { cosineSimilarity } from "../../utils/math";
// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// type Example = { text: string; embedding: number[] };

// let initialized = false;
// async function ensureInitialized() {
//   if (!initialized) {
//     await initializeExampleEmbeddings();
//     initialized = true;
//   }
// }

// const blacklist = [
//   "sex", "drugs", "violence", "porn", "suicide",
//   "hate", "racism", "terrorism", "abuse", "gambling",
// ];

// function containsBlacklistedTerm(text: string): boolean {
//   const lower = text.toLowerCase();
//   return blacklist.some(term => lower.includes(term));
// }

// function maxCosineSim(embedding: number[], examples: Example[]): number {
//   return Math.max(...examples.map(ex => cosineSimilarity(embedding, ex.embedding)));
// }

// const CACHE_TTL_SEC = 60 * 60 * 24; // 24 hours

// export async function POST(request: Request) {
//   await ensureInitialized();

//   try {
//     const { prompt } = (await request.json()) as { prompt?: string };

//     if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }

//     const normPrompt = prompt.trim().toLowerCase();

//     if (containsBlacklistedTerm(normPrompt)) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Disallowed content detected.",
//       });
//     }

//     // Check cached recipe
//     const cachedRecipe = await redis.get(`recipe:${normPrompt}`);
//     if (cachedRecipe) {
//       return NextResponse.json({
//         resultType: "recipe",
//         recipe: cachedRecipe,
//         cached: true,
//       });
//     }

//     // Get or generate embedding
//     let embeddingStr = await redis.get(`embedding:${normPrompt}`);
//     let promptEmbedding: number[];
//     if (typeof embeddingStr === "string") {
//       promptEmbedding = JSON.parse(embeddingStr);
//     } else {
//       promptEmbedding = await getEmbedding(normPrompt);
//       await redis.setex(`embedding:${normPrompt}`, CACHE_TTL_SEC, JSON.stringify(promptEmbedding));
//     }

//     // Classification
//     const foodSim = maxCosineSim(promptEmbedding, foodExamples);
//     const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);

//     if ((foodSim < 0.4 && irrelevantSim < 0.4) || irrelevantSim > foodSim) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a valid food-related prompt.",
//       });
//     }

//     // Generate recipe
//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in this format:
//     1. List ingredients with quantities.
//     2. Provide clear step-by-step instructions.
//     Use clear language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     // Cache recipe
//     await redis.setex(`recipe:${normPrompt}`, CACHE_TTL_SEC, recipeText);

//     return NextResponse.json({
//       resultType: "recipe",
//       recipe: recipeText,
//       cached: false,
//     });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import redis from "../../lib/redis";
import { getEmbedding } from "../../utils/embeddingUtils";
import { foodExamples, irrelevantExamples, initializeExampleEmbeddings } from "../../data/exampleEmbeddings";
import { cosineSimilarity } from "../../utils/math";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY ?? "",
});

type Example = { text: string; embedding: number[] };

// FOOD LIST used for random choice
const FOOD_LIST = [
  "chicken curry", "apple pie", "pasta", "banana smoothie", "vegetable soup",
  "pizza", "fried rice", "pancakes", "tacos", "spaghetti", "omelette",
  "grilled salmon", "lasagna", "sushi", "quiche", "granola", "smoothie bowl"
];

// PHRASES that should trigger a random recipe
const RANDOM_TRIGGERS = [
  "random",
  "random recipe",
  "give me a random recipe",
  "surprise me",
  "something random",
  "any recipe",
  "pick something for me",
  "chef's surprise",
  "feed me randomly",
  "randomness",
  "random dish",
  "random food",
  "random meal",
  "random cuisine",
  "random cooking",
  "randomly pick a recipe",
  "randomly choose a recipe",
  "random recipe idea",
  "random recipe suggestion",
  "random recipe please",
  "random recipe generator",
  "random recipe request",
  "random recipe prompt",
  "random recipe selection",
  "random recipe choice",
  "random recipe inspiration",
  "random recipe creation",
  "hit random",
  "give me something random",
];

function promptRequestsRandomRecipe(prompt: string) {
  const normalized = prompt.trim().toLowerCase();
  return RANDOM_TRIGGERS.some(
    phrase =>
      normalized === phrase ||
      normalized.includes(phrase)
  );
}

let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await initializeExampleEmbeddings();
    initialized = true;
  }
}

const blacklist = [
  "sex", "drugs", "violence", "porn", "suicide",
  "hate", "racism", "terrorism", "abuse", "gambling",
];

function containsBlacklistedTerm(text: string): boolean {
  const lower = text.toLowerCase();
  return blacklist.some(term => lower.includes(term));
}

function maxCosineSim(embedding: number[], examples: Example[]): number {
  return Math.max(...examples.map(ex => cosineSimilarity(embedding, ex.embedding)));
}

const CACHE_TTL_SEC = 60 * 60 * 24; // 24 hours

export async function POST(request: Request) {
  await ensureInitialized();

  try {
    let { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    // Enhanced: Handle random recipe triggers
    let normPrompt = prompt.trim().toLowerCase();
    if (promptRequestsRandomRecipe(normPrompt)) {
      const randomFood = FOOD_LIST[Math.floor(Math.random() * FOOD_LIST.length)];
      normPrompt = randomFood.toLowerCase();
      prompt = randomFood;
    }

    if (containsBlacklistedTerm(normPrompt)) {
      return NextResponse.json({
        resultType: "error",
        message: "Disallowed content detected.",
      });
    }

    // Check cached recipe
    const cachedRecipe = await redis.get(`recipe:${normPrompt}`);
    if (cachedRecipe) {
      return NextResponse.json({
        resultType: "recipe",
        recipe: cachedRecipe,
        cached: true,
        prompt, // Shows the food query used if random
      });
    }

    // Get or generate embedding
    let embeddingStr = await redis.get(`embedding:${normPrompt}`);
    let promptEmbedding: number[];
    if (typeof embeddingStr === "string") {
      promptEmbedding = JSON.parse(embeddingStr);
    } else {
      promptEmbedding = await getEmbedding(normPrompt);
      await redis.setex(`embedding:${normPrompt}`, CACHE_TTL_SEC, JSON.stringify(promptEmbedding));
    }

    // Classification
    const foodSim = maxCosineSim(promptEmbedding, foodExamples);
    const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);

    if ((foodSim < 0.4 && irrelevantSim < 0.4) || irrelevantSim > foodSim) {
      return NextResponse.json({
        resultType: "error",
        message: "Please enter a valid food-related prompt.",
      });
    }

    // Generate recipe
    const geminiPrompt = `Provide a detailed recipe for "${prompt}" in this format:
1. List ingredients with quantities.
2. Provide clear step-by-step instructions.
Use clear language.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: geminiPrompt }],
    });

    const recipeText = response.text ?? "";

    // Cache recipe
    await redis.setex(`recipe:${normPrompt}`, CACHE_TTL_SEC, recipeText);

    return NextResponse.json({
      resultType: "recipe",
      prompt, // Shows the actual dish if random prompt
      recipe: recipeText,
      cached: false,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}


