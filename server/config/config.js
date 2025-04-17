import { config } from "dotenv";
import process from "process";

config({ path: '.env' });

export const { PORT, MONGO_URI } = process.env;