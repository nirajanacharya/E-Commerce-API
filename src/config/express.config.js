const express = require('express');
const router = require('../router/router'); // Loading the router

//database connection
require('./db.config')

// Create an instance of the Express application
const application = express();

// // Middleware for parsing JSON
application.use(express.json());
// application.use(urlencoded({ 
//     extended: false
//  }));
 
// Use the router
application.use(router);

// Middleware for handling undefined routes
application.use((request, response, next) => {
    next({
        status: 404,
        message: 'Route not found',
        code: 'not_found',
        details: null,
    });
});

// Global error handler
application.use((error, request, response, next) => {
    let status = error.status || 500;
    let message = error.message || 'Internal Server Error';
    let code = error.code || 'error';
    let data = error.details || null;

    response.status(status).json({
        data,
        message,
        code,
        options: null,
    });
});

// Export the application instance
module.exports = application;
