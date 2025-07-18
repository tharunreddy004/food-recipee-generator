"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SavedRecipes() {
  const [saved, setSaved] = useState<{ [k: string]: string }>({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("savedRecipes");
    setSaved(v ? JSON.parse(v) : {});
  }, [show]);

  if (!Object.keys(saved).length && !show)
    return (
      <button onClick={() => setShow(true)} className="underline text-yellow-800 mt-4">
        Show Saved Recipes
      </button>
    );

  if (!show) return (
    <button onClick={() => setShow(true)} className="underline text-yellow-800 mt-4">
      Show Saved Recipes
    </button>
  );

  return (
    <div className="my-10">
      <h2 className="text-2xl mb-4 font-bold text-yellow-800">Saved Recipes</h2>
      <button onClick={() => setShow(false)} className="text-sm mb-4 underline text-blue-500">
        Hide
      </button>
      {Object.keys(saved).length === 0 && <p className="italic">No saved recipes yet.</p>}
      <ul className="space-y-8">
        {Object.entries(saved).map(([prompt, recipe]) => (
          <li key={prompt} className="border border-yellow-300 rounded-lg p-4 bg-yellow-50">
            <h3 className="font-semibold mb-2">{prompt}</h3>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipe}</ReactMarkdown>
            <button onClick={() => {
              const updated = { ...saved }; delete updated[prompt];
              setSaved(updated);
              localStorage.setItem("savedRecipes", JSON.stringify(updated));
            }} className="mt-3 bg-red-200 px-2 py-1 rounded text-red-800">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
