"use client";
import { useEffect, useState } from "react";

type Props = {
  prompt: string;
  recipe: string;
};

export default function RecipeActions({ prompt, recipe }: Props) {
  const key = prompt.trim().toLowerCase();
  const [isSaved, setIsSaved] = useState(false);

  // Build a shareable recipe link using the right domain/root
  const recipeLink = `${window.location.origin}/?prompt=${encodeURIComponent(prompt)}`;

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipes");
    if (saved) setIsSaved(!!JSON.parse(saved)[key]);
  }, [key]);

  function saveRecipe() {
    const saved = JSON.parse(localStorage.getItem("savedRecipes") || "{}");
    saved[key] = recipe;
    localStorage.setItem("savedRecipes", JSON.stringify(saved));
    setIsSaved(true);
  }
  function removeRecipe() {
    const saved = JSON.parse(localStorage.getItem("savedRecipes") || "{}");
    delete saved[key];
    localStorage.setItem("savedRecipes", JSON.stringify(saved));
    setIsSaved(false);
  }
  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-3 my-4">
      {/* Save/Unsave */}
      {isSaved ? (
        <button onClick={removeRecipe} aria-label="Unsave Recipe" className="px-3 py-1 rounded bg-yellow-600 text-white">
          ★ Saved
        </button>
      ) : (
        <button onClick={saveRecipe} aria-label="Save Recipe" className="px-3 py-1 rounded border border-yellow-400">
          ☆ Save
        </button>
      )}
      {/* Copy link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(recipeLink);
          alert("Link copied!");
        }}
        aria-label="Copy Recipe Link"
        className="px-3 py-1 rounded bg-yellow-200 hover:bg-yellow-300"
      >
        📋 Copy Link
      </button>
      {/* WhatsApp share */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          `Check out this recipe for "${prompt}":\n${recipeLink}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 rounded bg-green-200 hover:bg-green-300"
        aria-label="Share via WhatsApp"
      >
        WhatsApp
      </a>
      {/* Email share */}
      {/* <a
        href={`mailto:?subject=Recipe for ${prompt}&body=${encodeURIComponent(
          `Check out this recipe for "${prompt}":\n${recipe}\n\n${window.location.href}?prompt=${encodeURIComponent(prompt)}`
        )}`}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-300"
        aria-label="Share via Email"
      >
        Email
      </a> */}
      {/* Print */}
      {/* <button onClick={handlePrint} aria-label="Print Recipe" className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
        🖨️ Print
      </button> */}


       <a
        href={`mailto:?subject=Recipe for ${encodeURIComponent(prompt)}&body=${encodeURIComponent(
        `Get the full recipe here: ${recipeLink}`
        )}`}
        className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-300"
        aria-label="Share via Email"
        >
        Email
        </a>
        {/* Print */}
        <button
            onClick={() => window.print()}
            aria-label="Print Recipe"
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
        🖨️ Print
        </button>
    </div>
  );
}
