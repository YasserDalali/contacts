import dataBaseConnect from './mongodb.js';

const startServer = (app, PORT) => {
    app.listen(PORT || 5500, () => {
        console.log("\x1b[33m%s\x1b[0m", "---------------------------------------");
        console.log("\x1b[33m%s\x1b[0m", "🟡 Server is starting...");
        dataBaseConnect();
        console.log("\x1b[32m%s\x1b[0m", `🟢 Server is running on https://localhost:${PORT || 5500}`);
    });
};

export default startServer;