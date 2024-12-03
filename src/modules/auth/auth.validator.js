const joi = require('joi');

const userRegistrationDTO= joi.object({
    name: joi.string().min(2).max(30).required(),
    email: joi.string().email().required(),
    password:joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),//TODO: regex,

    //we can also use valid pani hai 
    // confirmPassword:joi.string().valid(joi.ref('password')).required()
    confirmPassword:joi.string().equal(joi.ref('password')).required(),
    role:joi.string().regex(/^(customer|seller)$/).default('customer'),
    gender:joi.string().regex(/^(male|female)$/).required(),
    address:joi.string().required(),
    phone:joi.string().regex(/^(?:\+977[- ]?)?(?:98\d{8}|97\d{8}|0(?:1\d{7}|[2-9]\d{8}))$/)
});
const activateUserDTO = joi.object({
    email:joi.string().email().required(),
    otp:joi.string().min(2).max(6).required()
})

const emailBodyDTO = joi.object({
    email:joi.string().email().required()
})

const loginCredentialsDTO = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})
module.exports = {
    userRegistrationDTO,
    activateUserDTO,
    emailBodyDTO,
    loginCredentialsDTO};