// "use client";

// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<null | { resultType: "recipe" | "error"; recipe?: string; message?: string; cached?: boolean }>(null);

//   async function handleSubmit() {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch {
//       setResult({ resultType: "error", message: "Network error. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-6 text-yellow-900 text-center">Food Recipe Generator</h1>

//       <div className="max-w-3xl w-full space-y-5">
//         <input
//           aria-label="Recipe prompt input"
//           type="text"
//           placeholder="Enter a dish or ingredient..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           className="w-full rounded-md border border-yellow-400 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           aria-label="Generate recipe"
//           className="w-full rounded-md bg-yellow-500 py-3 font-semibold text-white disabled:opacity-50 hover:bg-yellow-600 transition"
//         >
//           {loading ? "Generating..." : "Get Recipe"}
//         </button>

//         <section
//           aria-live="polite"
//           className="bg-white rounded-lg shadow-lg p-8 max-w-full mx-auto my-8 overflow-y-auto max-h-[650px] prose prose-yellow prose-lg text-yellow-900 leading-relaxed scroll-smooth scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 hover:scrollbar-thumb-yellow-600"
//           style={{ wordBreak: "break-word", whiteSpace: "pre-line", overflowX: "hidden" }}
//         >
//           {result ? (
//             result.resultType === "recipe" ? (
//               <>
//                 {result.cached && <p className="mb-4 text-sm italic text-green-700">Loaded from cache</p>}
//                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.recipe || ""}</ReactMarkdown>
//               </>
//             ) : (
//               <p className="text-red-600 font-semibold">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RecipeActions from "./components/RecipeActions";
import SavedRecipes from "./components/SavedRecipes";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    resultType: "recipe" | "error";
    recipe?: string;
    message?: string;
    cached?: boolean;
  }>(null);

  // Load answered prompt from query if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("prompt");
    if (q) setPrompt(q);
  }, []);

  async function handleSubmit() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ resultType: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6 print:bg-white">
      <h1 className="text-4xl font-bold mb-6 text-yellow-900 text-center">Food Recipe Generator</h1>
      <div className="max-w-3xl w-full space-y-5">

        <input
          type="text"
          aria-label="Recipe prompt input"
          placeholder="Enter a dish or ingredient..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full rounded-md border border-yellow-400 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          aria-label="Generate recipe"
          className="w-full rounded-md bg-yellow-500 py-3 font-semibold text-white disabled:opacity-50 hover:bg-yellow-600 transition"
        >
          {loading ? "Generating..." : "Get Recipe"}
        </button>

        {/* Recipe */}
        {result && result.resultType === "recipe" && (
          <>
            <RecipeActions prompt={prompt} recipe={result.recipe || ""} />

            <section
              aria-live="polite"
              className="bg-white rounded-lg shadow-lg p-8 max-w-full mx-auto my-8 overflow-y-auto max-h-[650px] prose prose-yellow prose-lg text-yellow-900 leading-relaxed scroll-smooth scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 hover:scrollbar-thumb-yellow-600 print-recipe"
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                overflowX: "hidden",
              }}
            >

              {/* Show a green message if loaded from cache */}
                  {result.cached && (
                  <p className="mb-4 text-sm italic text-green-700">Loaded from cache</p>
                  )}



              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result.recipe || ""}
              </ReactMarkdown>
            </section>
          </>
        )}

        {/* Error or empty */}
        {result && result.resultType === "error" && (
          <p className="text-red-600 font-semibold">{result.message}</p>
        )}

        {/* Initial prompt */}
        {!result && (
          <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
        )}

        {/* Saved recipes */}
        <SavedRecipes />
      </div>
    </main>
  );
}
