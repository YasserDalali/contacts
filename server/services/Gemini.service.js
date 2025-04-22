import { GEMINI_API_KEY } from "../config/config.js";
import { GoogleGenAI } from "@google/genai";

 async function execPrompt(prompt, data, reSchema) {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
                  const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `{prompt: ${prompt}, data: ${data}}`,
          });
          return response.text;
    }



export default execPrompt;