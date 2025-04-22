import { GEMINI_API_KEY } from "../config/config.js";
import { GoogleGenAI } from "@google/genai";

async function execPrompt(prompt, data, reSchema = null) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  if (!prompt || !data) {
    throw new Error("Prompt and data are required");
  }
  const content = `${prompt}${data}`;
  if (reSchema) {
    content += `\n\n${reSchema}`;
  }
  // Initialize the GoogleGenAI client with the API key
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  return response.text;
}

export default execPrompt;
