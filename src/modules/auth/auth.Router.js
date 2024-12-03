
const authRouter = require('express').Router();
const {uploader}=require('../../middleware/multipart.middleware');

//check loggedin
const {checkLoggedIn, refreshTokenCheck, roleCheck} = require('../../middleware/auth.middleware');

//controller
const authCtrl = require ('../auth/auth.controller')

//validation 
const {userRegistrationDTO, activateUserDTO,emailBodyDTO,loginCredentialsDTO} = require('../auth/auth.validator');
const {bodyValidator} = require('../../middleware/validator.middleware');


authRouter.post('/register',uploader().single('image'),bodyValidator(userRegistrationDTO), authCtrl.register);
authRouter.put('/activate',bodyValidator(activateUserDTO), authCtrl.activateUser);
authRouter.post('/resend-otp',bodyValidator(emailBodyDTO), authCtrl.resendOtp);

//log_in
authRouter.post('/login', bodyValidator(loginCredentialsDTO),authCtrl.login);
authRouter.get('/me', checkLoggedIn,authCtrl.getLoggedIn);

authRouter.get('/refresh-token',refreshTokenCheck, authCtrl.refreshToken);

//admin
authRouter.get('/admin',checkLoggedIn,roleCheck(["admin"]),authCtrl.refreshToken);
module.exports = authRouter;    