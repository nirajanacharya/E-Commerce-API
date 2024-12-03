const cloudinarySvc = require('../../services/cloudinary.service'); 

class ProductController {


    getProductDetails = (request, response, next) => {
        response.status(200).json({
            data: null,
            message: '1 Product details',
            code: "success"
        })
    };

    getAllProducts = (request, response, next) => {
        response.status(200).json({
            data: null,
            message: 'All Products',
            code: "success"
        })
    };



    addProduct = async (request, response, next) => {
        const data = request.body || null;
        const file = request.file || null;

        if(file){
            data.image = await cloudinarySvc.uploadImage(file.path,'/products');
        }
        response.status(200).json({
            data: {data},
            message: 'Product added',
            code: "success"
        })


    }

    updateProductById = (request, response, next) => {
        response.status(200).json({
            data: null,
            message: 'Product updated',
            code: "success"
        })
    };

    deleteProductById = (request, response, next) => {
        response.status(200).json({
            data: null,
            message: 'Product deleted',
            code: "success"
        })
    };
}

const prodCtrl = new ProductController();
module.exports = prodCtrl;
