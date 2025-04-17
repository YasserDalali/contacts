import { MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import process from "process";

const connectDb = async () => {
    try { 
        await mongoose.connect(MONGO_URI)
        console.log("\x1b[32m%s\x1b[0m", "🟢 Database connected!");

     } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDb;
