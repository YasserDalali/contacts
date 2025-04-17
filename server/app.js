import express from 'express';
import AuthRouter from './routes/auth.routes.js';
import { PORT } from './config/config.js';
import configureExpress from './config/express.js';
import startServer from './config/server.js';
import contactRouter from './routes/contact.routes.js';

const app = express();

// Configure Express middleware and routes
configureExpress(app);

// Configure API routes
app.use('/api/auth', AuthRouter);
app.use('/api/contacts', contactRouter);
app.use('/api', () => console.log("202"));

// Start the server
startServer(app, PORT);