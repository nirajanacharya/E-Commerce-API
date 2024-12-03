const express = require('express');
const application = express.Router();
const productRouter = require('../modules/product/product.router')
const authRouter= require('../../src/modules/auth/auth.Router')



// Routes
application.get('/health', (request, response) => {
    response.status(200).json({
        data: null,
        message: 'health route',
        code: "success",
        options: null
    });
});

application.use('/product',productRouter);

//for auth routes 
application.use('/auth',authRouter);
// Error handling middleware
application.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        code: err.code || "error",
        message: err.message || "Something went wrong",
    });
});

module.exports = application;
