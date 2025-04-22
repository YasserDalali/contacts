import { config } from "dotenv";
import process from "process";

config({ path: '.env' });

export const { PORT, GEMINI_API_KEY, MONGO_URI, JWT_EXPIRE, JWT_SECRET, ARCJET_KEY, ARCJET_ENV } = process.env;