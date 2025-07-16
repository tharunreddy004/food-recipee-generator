// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{
//     resultType: "recipe" | "suggestion" | "error";
//     message?: string;
//     recipe?: string;
//     suggestion?: string;
//   } | null>(null);

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
//       setResult({
//         resultType: "error",
//         message: "Network error. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-6 text-yellow-900">
//         Food Recipe Generator
//       </h1>

//       <div className="w-full max-w-xl">
//         <input
//           type="text"
//           placeholder="Enter a dish or ingredient..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="w-full p-3 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSubmit();
//           }}
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md disabled:opacity-50"
//         >
//           {loading ? "Generating..." : "Get Recipe"}
//         </button>

//         <div className="mt-6 bg-white rounded-md p-4 shadow-md min-h-[150px] whitespace-pre-wrap text-yellow-900">
//           {result ? (
//             result.resultType === "recipe" ? (
//               <pre>{result.recipe}</pre>
//             ) : result.resultType === "suggestion" ? (
//               <p className="text-yellow-700 font-semibold">{result.message}</p>
//             ) : (
//               <p className="text-red-600 font-semibold">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }




// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<{
//     resultType: "recipe" | "suggestion" | "error";
//     message?: string;
//     recipe?: string;
//     suggestion?: string;
//   } | null>(null);

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
//       setResult({
//         resultType: "error",
//         message: "Network error. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-4xl font-extrabold text-yellow-900 mb-8 text-center">
//         Food Recipe Generator
//       </h1>

//       <div className="w-full max-w-3xl">
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter a dish or ingredient..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSubmit();
//             }}
//             className="flex-grow rounded-md border border-yellow-400 p-3 text-yellow-900 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
//             aria-label="Recipe prompt input"
//           />
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold rounded-md px-6 py-3 transition"
//             aria-label="Generate recipe button"
//           >
//             {loading ? "Generating..." : "Get Recipe"}
//           </button>
//         </div>

//         <section
//           aria-live="polite"
//           className="bg-white rounded-lg shadow-md p-6 min-h-[200px] max-h-[500px] overflow-y-auto text-yellow-900 whitespace-pre-wrap text-base sm:text-lg leading-relaxed"
//         >
//           {result ? (
//             result.resultType === "recipe" ? (
//               <pre className="whitespace-pre-wrap">{result.recipe}</pre>
//             ) : result.resultType === "suggestion" ? (
//               <p className="text-yellow-700 font-semibold">{result.message}</p>
//             ) : (
//               <p className="text-red-600 font-semibold">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-800 italic">
//               Enter a prompt to get started.
//             </p>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }



// "use client";

// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";


// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<null | {
//     resultType: "recipe" | "error";
//     recipe?: string;
//     message?: string;
//   }>(null);

//   async function handleSubmit() {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     setResult(null);

//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await response.json();
//       setResult(data);
//     } catch {
//       setResult({ resultType: "error", message: "Network error. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 py-10">
//       <h1 className="text-4xl font-bold mb-8 text-yellow-900 text-center">Food Recipe Generator</h1>

//       <div className="max-w-xl w-full space-y-5">
//         <input
//           type="text"
//           className="w-full border border-yellow-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           placeholder="Enter a dish or ingredient..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           aria-label="Recipe prompt input"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md disabled:opacity-50"
//           aria-label="Generate recipe"
//         >
//           {loading ? "Generating..." : "Get Recipe"}
//         </button>

//         {/* <section
//           aria-live="polite"
//           className="bg-white p-6 rounded-md shadow-md min-h-[200px] max-h-[400px] overflow-y-auto whitespace-pre-wrap text-yellow-900 font-medium"
//         >
//           {result ? (
//             result.resultType === "recipe" ? (
//               <pre>{result.recipe}</pre>
//             ) : (
//               <p className="text-red-600">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
//           )}
//         </section> */}


        


//         {/* <section
//           aria-live="polite"
//           className="bg-white p-6 rounded-md shadow-md min-h-[300px] max-h-[700px] overflow-auto whitespace-pre-wrap text-yellow-900 font-medium text-base leading-relaxed"
//         >
//           {result ? (
//             result.resultType === "recipe" ? (
//               <pre>{result.recipe}</pre>
//             ) : (
//               <p className="text-red-600">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
//           )}
//         </section> */}



//             <section
//           aria-live="polite"
//           className="
//             bg-yellow-50
//             rounded-lg
//             shadow-lg
//             p-8
//             max-w-3xl
//             w-full
//             mx-auto
//             my-8
//             prose
//             prose-yellow
//             prose-lg
//             text-yellow-900
//             leading-relaxed
//             overflow-y-auto
//             max-h-[650px]
//             overscroll-contain
//             !overflow-x-hidden
//             "
//           style={{
//             wordBreak: "break-word",   // Ensures no long word breaks layout
//             whiteSpace: "pre-line",    // Preserves line breaks without wrapping pre blocks
//             overflowX: "hidden",       // Only vertical scrolling
//           }}
//         >
//           {result ? (
//             result.resultType === "recipe" ? (
//               <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                 {result.recipe}
//               </ReactMarkdown>
//             ) : (
//               <p className="text-red-700 font-semibold">{result.message}</p>
//             )
//           ) : (
//             <p className="text-yellow-700 italic">Enter a prompt to get started.</p>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { resultType: "recipe" | "error"; recipe?: string; message?: string; cached?: boolean }>(null);

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
    <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-900 text-center">Food Recipe Generator</h1>

      <div className="max-w-3xl w-full space-y-5">
        <input
          aria-label="Recipe prompt input"
          type="text"
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

        <section
          aria-live="polite"
          className="bg-white rounded-lg shadow-lg p-8 max-w-full mx-auto my-8 overflow-y-auto max-h-[650px] prose prose-yellow prose-lg text-yellow-900 leading-relaxed scroll-smooth scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 hover:scrollbar-thumb-yellow-600"
          style={{ wordBreak: "break-word", whiteSpace: "pre-line", overflowX: "hidden" }}
        >
          {result ? (
            result.resultType === "recipe" ? (
              <>
                {result.cached && <p className="mb-4 text-sm italic text-green-700">Loaded from cache</p>}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.recipe || ""}</ReactMarkdown>
              </>
            ) : (
              <p className="text-red-600 font-semibold">{result.message}</p>
            )
          ) : (
            <p className="text-yellow-800 italic">Enter a prompt to get started.</p>
          )}
        </section>
      </div>
    </main>
  );
}
