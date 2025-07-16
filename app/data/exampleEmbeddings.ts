import { getEmbedding } from "../utils/embeddingUtils";

export type Example = {
  text: string;
  embedding: number[];
};

const foodExamplesTexts = [
  "chicken curry",
  "apple pie",
  "pasta",
  "banana smoothie",
  "vegetable soup",
  "rock cake",
  "cat-shaped cookies",
  "spaghetti carbonara",
  "grilled cheese sandwich",
  "chicken curry",
  "apple pie",
  "rock cake",
  "cat-shaped cookies",
  "pasta",
  "banana smoothie",
  "vegetable soup",
  "chocolate chip cookies",
  "beef stew",
  "shrimp tacos",
  "mushroom risotto",
  "caprese salad",
  "lasagna",
  "chocolate mousse",
  "quiche lorraine",
  "sushi rolls",
  "chicken parmesan",
  "falafel wrap",
  "greek salad",
  "pad thai",
];
const irrelevantExamplesTexts = [
  "what is the weather",
  "tell me a joke",
  "news update",
  "sports scores",
  "what happened today",
  "how are you",
  "weather",
  "sports scores",
  "news today",
  "tell me a joke",
  "who won the game",
  "hi",
  "hello",
  "goodbye",
  "what is your name",
  "how old are you",
  "what is the meaning of life",
  "tell me a story",
  "greetings",
  "what is your favorite color",
  "what is your favorite food",
  "what is your favorite movie",
  "cat",
  "rock",
  "random text",
  "car",
  "computer",
  "book",
  "music",
  "travel",
  "science",
  "history",
  "art",
  "philosophy",
  "technology",
  "sports",
];

export let foodExamples: Example[] = [];
export let irrelevantExamples: Example[] = [];

export async function initializeExampleEmbeddings() {
  foodExamples = await Promise.all(
    foodExamplesTexts.map(async (text) => ({
      text,
      embedding: await getEmbedding(text),
    }))
  );

  irrelevantExamples = await Promise.all(
    irrelevantExamplesTexts.map(async (text) => ({
      text,
      embedding: await getEmbedding(text),
    }))
  );
}
