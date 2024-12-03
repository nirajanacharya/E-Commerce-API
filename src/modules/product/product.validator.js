const Joi = require("joi");

const productAddDTO = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(100).required(),
    brand: Joi.string().empty(null, '').default(null),
    category: Joi.string().empty(null, '').optional().default(null),
});

module.exports = {
    productAddDTO
};
