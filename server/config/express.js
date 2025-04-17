import express from 'express';
import cors from 'cors';
import arcjetMiddleware from '../middlewares/arcjet.middleware.js';

const configureExpress = (app) => {
    // Enable CORS
    app.use(cors());
    
    
    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Apply Arcjet protection to all routes
    app.use(arcjetMiddleware);
    
    // Static files
    app.use(express.static('public'));
};

export default configureExpress;