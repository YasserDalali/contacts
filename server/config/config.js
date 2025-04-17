import { config } from "dotenv";
import process from "process";

config({ path: '.env' });

export const { PORT, MONGO_URI, JWT_EXPIRE, JWT_SECRET, ARCJET_KEY } = process.env;