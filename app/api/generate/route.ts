// import { NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
// import natural from "natural";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// // Initialize and train the classifier with expanded data
// const classifier = new natural.BayesClassifier();

// const foodExamples = [
//   "chicken curry",
//   "apple pie",
//   "rock cake",
//   "cat-shaped cookies",
//   "pasta",
//   "banana smoothie",
//   "vegetable soup",
//   "beef stew",
//   "chocolate cake",
//   "pumpkin pie",
//   "grilled cheese sandwich",
//   "caesar salad",
//   "spaghetti bolognese",
//   "mushroom risotto",
//   "fish tacos",
//   "vegan burger",
//   "blueberry muffins",
//   "carrot cake",
//   "tomato soup",
//   "chocolate chip cookies",
//   "lemon tart",
//   "shrimp fried rice",
//   "quinoa salad",
//   "beef lasagna",
//   "garlic bread",
//   "french onion soup",
//   "pancakes",
//   "creme brulee",
//   "stuffed peppers",
//   "eggplant parmesan",
// ];

// const irrelevantExamples = [
//   "what happened today",
//   "what",
//   "how are you",
//   "news today",
//   "tell me something",
//   "who",
//   "when",
//   "why",
//   "where",
//   "hello",
//   "hi",
//   "weather",
//   "sports",
//   "stock market",
//   "politics",
//   "movie reviews",
//   "latest technology",
//   "music charts",
//   "game scores",
//   "random facts",
//   "time now",
//   "calendar events",
//   "travel tips",
//   "book recommendations",
//   "daily horoscope",
// ];

// foodExamples.forEach((text) => classifier.addDocument(text, "food"));
// irrelevantExamples.forEach((text) => classifier.addDocument(text, "irrelevant"));
// classifier.train();

// const ambiguousSuggestions: Record<string, string> = {
//   rock: "rock cake",
//   cat: "cat-shaped cookies",
//   dog: "dog biscuits",
//   apple: "apple pie",
//   cake: "chocolate cake",
//   pie: "pumpkin pie",
//   cookie: "chocolate chip cookies",
//   muffin: "blueberry muffins",
//   salad: "caesar salad",
//   soup: "tomato soup",
// };

// function getSuggestion(prompt: string) {
//   const lower = prompt.toLowerCase().trim();
//   return ambiguousSuggestions[lower] || null;
// }

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt || typeof prompt !== "string") {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }

//     const classification = classifier.classify(prompt);

//     if (classification === "irrelevant") {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food or ingredient to get a recipe.",
//       });
//     }

//     const suggestion = getSuggestion(prompt);
//     if (suggestion) {
//       return NextResponse.json({
//         resultType: "suggestion",
//         message: `Did you mean ${suggestion}?`,
//         suggestion,
//       });
//     }

//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in the following format:
// 1. List all ingredients with quantities.
// 2. Provide step-by-step procedure to prepare the dish.
// Use clear and concise language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     return NextResponse.json({
//       resultType: "recipe",
//       recipe: recipeText,
//     });
//   } catch (error) {
//     console.error("Error generating recipe:", error);
//     return NextResponse.json(
//       { error: "Failed to generate recipe" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
// import natural from "natural";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// // Initialize and train the classifier with expanded data
// const classifier = new natural.BayesClassifier();

// const foodExamples = [
//   "chicken curry",
//   "apple pie",
//   "rock cake",
//   "cat-shaped cookies",
//   "pasta",
//   "banana smoothie",
//   "vegetable soup",
//   "beef stew",
//   "chocolate cake",
//   "pumpkin pie",
//   "grilled cheese sandwich",
//   "caesar salad",
//   "spaghetti bolognese",
//   "mushroom risotto",
//   "fish tacos",
//   "vegan burger",
//   "blueberry muffins",
//   "carrot cake",
//   "tomato soup",
//   "chocolate chip cookies",
//   "lemon tart",
//   "shrimp fried rice",
//   "quinoa salad",
//   "beef lasagna",
//   "garlic bread",
//   "french onion soup",
//   "pancakes",
//   "creme brulee",
//   "stuffed peppers",
//   "eggplant parmesan",
// ];

// const irrelevantExamples = [
//   "what happened today",
//   "what",
//   "how are you",
//   "news today",
//   "tell me something",
//   "who",
//   "when",
//   "why",
//   "where",
//   "hello",
//   "hi",
//   "weather",
//   "sports",
//   "stock market",
//   "politics",
//   "movie reviews",
//   "latest technology",
//   "music charts",
//   "game scores",
//   "random facts",
//   "time now",
//   "calendar events",
//   "travel tips",
//   "book recommendations",
//   "daily horoscope",
// ];

// // Add training data to classifier
// foodExamples.forEach((text) => classifier.addDocument(text, "food"));
// irrelevantExamples.forEach((text) => classifier.addDocument(text, "irrelevant"));
// classifier.train();

// // Ambiguous suggestions map
// const ambiguousSuggestions: Record<string, string> = {
//   rock: "rock cake",
//   cat: "cat-shaped cookies",
//   dog: "dog biscuits",
//   apple: "apple pie",
//   cake: "chocolate cake",
//   pie: "pumpkin pie",
//   cookie: "chocolate chip cookies",
//   muffin: "blueberry muffins",
//   salad: "caesar salad",
//   soup: "tomato soup",
// };

// // Blacklist of sensitive or non-food terms to block
// const blacklist = [
//   "sex",
//   "drugs",
//   "violence",
//   "weapon",
//   "suicide",
//   "hate",
//   "porn",
//   "gambling",
//   "terrorism",
//   "racism",
//   "abuse",
//   // add more terms as needed
// ];

// function containsBlacklistedTerm(prompt: string) {
//   const lower = prompt.toLowerCase();
//   return blacklist.some((term) => lower.includes(term));
// }

// function getSuggestion(prompt: string) {
//   const lower = prompt.toLowerCase().trim();
//   return ambiguousSuggestions[lower] || null;
// }

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt || typeof prompt !== "string") {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }

//     // Block blacklisted prompts immediately
//     if (containsBlacklistedTerm(prompt)) {
//       return NextResponse.json({
//         resultType: "error",
//         message:
//           "Sorry, your prompt contains content that is not allowed. Please enter a food-related prompt.",
//       });
//     }

//     const classification = classifier.classify(prompt);

//     if (classification === "irrelevant") {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food or ingredient to get a recipe.",
//       });
//     }

//     const suggestion = getSuggestion(prompt);
//     if (suggestion) {
//       return NextResponse.json({
//         resultType: "suggestion",
//         message: `Did you mean ${suggestion}?`,
//         suggestion,
//       });
//     }

//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in the following format:
// 1. List all ingredients with quantities.
// 2. Provide step-by-step procedure to prepare the dish.
// Use clear and concise language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     return NextResponse.json({
//       resultType: "recipe",
//       recipe: recipeText,
//     });
//   } catch (error) {
//     console.error("Error generating recipe:", error);
//     return NextResponse.json(
//       { error: "Failed to generate recipe" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { getEmbedding } from "../../utils/embeddingUtils";
// import { foodExamples, irrelevantExamples, initializeExampleEmbeddings } from "../../data/exampleEmbeddigs";
// import { GoogleGenAI } from "@google/genai";
// import cosineSimilarity from "cosine-similarity";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// // Load example embeddings only once on server startup
// let initialized = false;
// async function ensureInitialized() {
//   if (!initialized) {
//     await initializeExampleEmbeddings();
//     initialized = true;
//   }
// }

// // Simple blacklist of restricted topics
// const blacklist = [
//   "sex",
//   "drugs",
//   "violence",
//   "porn",
//   "suicide",
//   "hate",
//   "racism",
//   "terrorism",
//   "abuse",
//   "gambling",
// ];

// function containsBlacklistedTerm(text: string) {
//   const lower = text.toLowerCase();
//   return blacklist.some((term) => lower.includes(term));
// }

// function maxCosineSim(embedding, examples) {
//   return Math.max(...examples.map((ex) => cosineSimilarity(embedding, ex.embedding)));
// }

// export async function POST(request: Request) {
//   await ensureInitialized();

//   try {
//     const { prompt } = await request.json();

//     if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }

//     if (containsBlacklistedTerm(prompt)) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Sorry, your prompt contains disallowed content. Please enter a food-related prompt.",
//       });
//     }

//     const promptEmbedding = await getEmbedding(prompt);

//     const foodSim = maxCosineSim(promptEmbedding, foodExamples);
//     const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);

//     const SIM_THRESHOLD = 0.4; // tune this threshold to your needs

//     if (foodSim < SIM_THRESHOLD && irrelevantSim < SIM_THRESHOLD) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a valid food or ingredient prompt.",
//       });
//     }

//     if (irrelevantSim > foodSim) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food-related prompt to get a recipe.",
//       });
//     }

//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in the following format:
// 1. List all ingredients with quantities.
// 2. Provide step-by-step procedure to prepare the dish.
// Use clear and concise language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     return NextResponse.json({
//       resultType: "recipe",
//       recipe: recipeText,
//     });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { getEmbedding } from "../../utils/embeddingUtils";
// import {
//   foodExamples,
//   irrelevantExamples,
//   initializeExampleEmbeddings,
// } from "../../data/exampleEmbeddigs";
// import { GoogleGenAI } from "@google/genai";
// import cosineSimilarity from "cosine-similarity";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY ?? "",
// });

// type Example = { text: string; embedding: number[] };

// // Load example embeddings only once on server startup
// let initialized = false;
// async function ensureInitialized(): Promise<void> {
//   if (!initialized) {
//     await initializeExampleEmbeddings();
//     initialized = true;
//   }
// }

// // Simple blacklist of restricted topics
// const blacklist = [
//   "sex",
//   "drugs",
//   "violence",
//   "porn",
//   "suicide",
//   "hate",
//   "racism",
//   "terrorism",
//   "abuse",
//   "gambling",
// ];

// function containsBlacklistedTerm(text: string): boolean {
//   const lower = text.toLowerCase();
//   return blacklist.some((term) => lower.includes(term));
// }

// // Add explicit types to function parameters
// function maxCosineSim(embedding: number[], examples: Example[]): number {
//   return Math.max(...examples.map((ex: Example) => cosineSimilarity(embedding, ex.embedding)));
// }

// export async function POST(request: Request) {
//   await ensureInitialized();

//   try {
//     const { prompt } = (await request.json()) as { prompt?: string };

//     if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }

//     if (containsBlacklistedTerm(prompt)) {
//       return NextResponse.json({
//         resultType: "error",
//         message:
//           "Sorry, your prompt contains disallowed content. Please enter a food-related prompt.",
//       });
//     }

//     const promptEmbedding: number[] = await getEmbedding(prompt);

//     const foodSim = maxCosineSim(promptEmbedding, foodExamples);
//     const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);

//     const SIM_THRESHOLD = 0.4; // tune this threshold to your needs

//     if (foodSim < SIM_THRESHOLD && irrelevantSim < SIM_THRESHOLD) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a valid food or ingredient prompt.",
//       });
//     }

//     if (irrelevantSim > foodSim) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food-related prompt to get a recipe.",
//       });
//     }

//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in the following format:
// 1. List all ingredients with quantities.
// 2. Provide step-by-step procedure to prepare the dish.
// Use clear and concise language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText: string = response.text ?? "";

//     return NextResponse.json({
//       resultType: "recipe",
//       recipe: recipeText,
//     });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import redis from "../../lib/redis";
// import { getEmbedding } from "../../utils/embeddingUtils";
// import { foodExamples, irrelevantExamples, initializeExampleEmbeddings } from "@/data/exampleEmbeddings";
// import { GoogleGenAI } from "@google/genai";
// import { cosineSimilarity } from "@/utils/math";

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

// const blacklist = ["sex", "drugs", "violence", "porn", "suicide", "hate", "racism", "terrorism", "abuse", "gambling"];

// function containsBlacklistedTerm(text: string): boolean {
//   const lower = text.toLowerCase();
//   return blacklist.some((term) => lower.includes(term));
// }

// function maxCosineSim(embedding: number[], examples: Example[]): number {
//   return Math.max(...examples.map((ex) => cosineSimilarity(embedding, ex.embedding)));
// }

// const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours cache duration

// export async function POST(request: Request) {
//   await ensureInitialized();

//   try {
//     const { prompt } = (await request.json()) as { prompt?: string };
//     if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
//       return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
//     }
//     const normalizedPrompt = prompt.trim().toLowerCase();

//     if (containsBlacklistedTerm(normalizedPrompt)) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Sorry, your prompt contains disallowed content. Please enter a food-related prompt.",
//       });
//     }

//     // Check recipe cache first
//     const cachedRecipe = await redis.get(`recipe:${normalizedPrompt}`);
//     if (cachedRecipe) {
//       return NextResponse.json({
//         resultType: "recipe",
//         recipe: cachedRecipe,
//         cached: true,
//       });
//     }

//     // Check embedding cache for prompt embedding
//     let promptEmbeddingStr = await redis.get(`embedding:${normalizedPrompt}`);
//     let promptEmbedding: number[];
//     if (promptEmbeddingStr) {
//       promptEmbedding = JSON.parse(promptEmbeddingStr);
//     } else {
//       promptEmbedding = await getEmbedding(normalizedPrompt);
//       await redis.set(`embedding:${normalizedPrompt}`, JSON.stringify(promptEmbedding), "EX", CACHE_TTL_SECONDS);
//     }

//     // Classify prompt
//     const foodSim = maxCosineSim(promptEmbedding, foodExamples);
//     const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);
//     const SIM_THRESHOLD = 0.4;

//     if (foodSim < SIM_THRESHOLD && irrelevantSim < SIM_THRESHOLD) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a valid food or ingredient prompt.",
//       });
//     }
//     if (irrelevantSim > foodSim) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food-related prompt to get a recipe.",
//       });
//     }

//     // Generate recipe with Gemini
//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in the following format:
// 1. List all ingredients with quantities.
// 2. Provide step-by-step procedure to prepare the dish.
// Use clear and concise language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     // Cache generated recipe
//     await redis.set(`recipe:${normalizedPrompt}`, recipeText, "EX", CACHE_TTL_SECONDS);

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

// const CACHE_TTL_SEC = 60 * 60 * 24; // 24h cache

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
//         message: "Disallowed content detected. Please enter a food-related prompt.",
//       });
//     }

//     // Check recipe cache
//     const cachedRecipe = await redis.get(`recipe:${normPrompt}`);
//     if (cachedRecipe) {
//       return NextResponse.json({ resultType: "recipe", recipe: cachedRecipe, cached: true });
//     }

//     // Check embedding cache for prompt
//     let embeddingStr = await redis.get(`embedding:${normPrompt}`);
//     let promptEmbedding: number[];
//     if (embeddingStr) {
//       promptEmbedding = JSON.parse(embeddingStr);
//     } else {
//       promptEmbedding = await getEmbedding(normPrompt);
//       await redis.set(`embedding:${normPrompt}`, JSON.stringify(promptEmbedding), "EX", CACHE_TTL_SEC);
//     }

//     const foodSim = maxCosineSim(promptEmbedding, foodExamples);
//     const irrelevantSim = maxCosineSim(promptEmbedding, irrelevantExamples);

//     if (foodSim < 0.4 && irrelevantSim < 0.4) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a valid food or ingredient prompt.",
//       });
//     }
//     if (irrelevantSim > foodSim) {
//       return NextResponse.json({
//         resultType: "error",
//         message: "Please enter a food-related prompt.",
//       });
//     }

//     // Generate recipe prompt for Gemini
//     const geminiPrompt = `Provide a detailed recipe for "${prompt}" in this format:
// 1. List ingredients with quantities.
// 2. Provide clear steps.
// Use clear language.`;

//     const response = await genAI.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: [{ text: geminiPrompt }],
//     });

//     const recipeText = response.text ?? "";

//     // Cache generated recipe
//     await redis.set(`recipe:${normPrompt}`, recipeText, "EX", CACHE_TTL_SEC);

//     return NextResponse.json({ resultType: "recipe", recipe: recipeText, cached: false });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
//   }
// }





// app/api/generate/route.ts
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
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const normPrompt = prompt.trim().toLowerCase();

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

    // const SIM_THRESHOLD = 0.5;
    // const SIM_MARGIN = 0.1;

    // if (foodSim < SIM_THRESHOLD) {
    //   return NextResponse.json({
    //     resultType: "error",
    //     message: "Please enter a valid food or ingredient prompt.",
    //   });
    // }

    // if (foodSim < irrelevantSim + SIM_MARGIN) {
    //   return NextResponse.json({
    //     resultType: "error",
    //     message: "Please enter a food-related prompt.",
    //   });
    // }

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
      recipe: recipeText,
      cached: false,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}



