
const express = require('express');
const productRouter = express.Router();
const {checkLoggedIn} = require('../../middleware/auth.middleware');
const prodCtrl = require('./product.controller');
const{uploader} = require('../../middleware/multipart.middleware');

//validation 

const {bodyValidator} = require('../../middleware/validator.middleware');
const {productAddDTO} = require('./product.validator')

productRouter.route('/')
    .get(prodCtrl.getAllProducts)
    .post(checkLoggedIn,uploader().single('image'),bodyValidator(productAddDTO), prodCtrl.addProduct);
    
productRouter.route('/:id')
    .get(prodCtrl.getProductDetails)
    .patch(checkLoggedIn, prodCtrl.updateProductById)
    .delete(checkLoggedIn,prodCtrl.deleteProductById);

module.exports= productRouter;