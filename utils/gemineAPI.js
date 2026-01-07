import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

function cleanJson(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function main(inputPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Return ONLY valid JSON.
No explanation.
No markdown.

${inputPrompt}
`,
  });

  const rawText = response.candidates[0].content.parts[0].text;
  const cleanedText = cleanJson(rawText);
  console.log(rawText)

  try {
    const json = JSON.parse(cleanedText); // ✅ Correct
    return json; // ✅ RETURNING JSON OBJECT
  } catch (error) {
    console.error("Invalid JSON from Gemini:", cleanedText);
    throw new Error("AI did not return valid JSON");
  }
}

export default main;
