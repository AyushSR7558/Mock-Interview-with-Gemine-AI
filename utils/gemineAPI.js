import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

async function main(inputPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Return ONLY valid JSON.
No explanation, no markdown.

${inputPrompt}
`,
  });

  const text = response.candidates[0].content.parts[0].text.trim();

  try {
    const json = JSON.parse(text); // ✅ THIS WAS MISSING
    return json; // real JS object / array
  } catch (error) {
    console.error("Invalid JSON from Gemini:", text);
    throw new Error("AI did not return valid JSON");
  }
}

export default main;
