const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            await schema.validateAsync(data, { abortEarly: false });
            next();
        } catch (exception) {
            let detail = {};
            exception.details.map((errorField) => {
                detail[errorField.context.label] = errorField.message;
            });

            next({
                code: 400,
                message: "Validation failed",
                statusCode: "VALIDATION_FAILED",
                detail: detail
            });
        }
    };
};

module.exports = {
    bodyValidator
};
