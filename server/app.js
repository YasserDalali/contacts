import express from 'express';
import AuthRouter from './routes/auth.routes.js';
import dataBaseConnect from './config/mongodb.js';
import { PORT } from './config/config.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', AuthRouter);

app.listen(PORT || 5500, () => {
    console.log("\x1b[33m%s\x1b[0m", "---------------------------------------");
    console.log("\x1b[33m%s\x1b[0m", "🟡 Server is starting...");
    dataBaseConnect();
    console.log("\x1b[32m%s\x1b[0m", `🟢 Server is running on https://localhost:${PORT || 5500}`);
}
);