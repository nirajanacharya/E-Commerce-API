
require('dotenv').config();
const { options } = require('joi');
const authService = require('./auth.service');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
class AuthController {

    register = async (req, res, next) => {

        try {

            let data = await authService.transformUserCreateData(req);

            //store user data in database

            const user = await authService.createUser(data);

            //email send 
            await authService.sendOtpViaEmail(user);

            res.status(201).json({
                data: { data },
                message: 'User registered successfully',
                status: 'success'
            });
        } catch (exception) {
            console.log("AuthController || user registration", exception);
            next(exception);
        }
    }
    activateUser = async (req, res, next) => {
        try {


            let { email, expiryTime, otp} = req.body;

            const user = await authService.findSingleUser({
                email:email
            });
            if (user.status === "active") { 
                throw ({ code: 400, message: "User is already active", status: "error" });
            }
            if (!user) {
                throw ({ code: 404, message: "User not found", status: "error" });
            }
    
            if (!user.expiryTime) {
                throw ({ code: 400, message: "OTP expiration time not set", status: "error" });
            }
            const nowTime = Date.now();
            const otpExpiry = user.expiryTime.getTime();
            if (nowTime > otpExpiry) {
                throw ({ code: 410, message: "OTP expired", status: "error" });
            }else if (user.otp !== otp) {
                throw ({ code: 400, message: "OTP is invalid", status: "error" });
            }
            else {
                await authService.updateById(user._id, {
                  otp: null,
                  expiryOtp: null,
                  status: "active"
                });
              
                res.json({
                  data: null,
                  message: "Your account has been activated successfully. Please login to Continue..",
                  status: "Activate",
                  options: null
                });
              }
              
        } catch (exception) {
            console.log("AuthController || activate user", exception);
            next(exception);
        }
    }

resendOtp = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await authSvc.findSingleUser({
        email: email
      });
  
      const nowTime = Date.now();
      const otpExpiry = user.expiryOtp.getTime();
  
      if (user.status === "active") {
        throw { code: 422, message: "User already activated.", statusCode: "USER_ALREADY_ACTIVATED" };
      } else if (nowTime < otpExpiry) {
        throw { code: 422, message: "OTP is not expired.", statusCode: "OTP_NOT_EXPIRED" };
      } else {
        let otpData = authSvc.generateOtp();
        const update = await authSvc.updateById(user._id, otpData);
        await authSvc.sendOtpViaEmail({
          name: user.name,
          email: user.email,
          otp: otpData.otp
        });
  
        res.json({
          data: otpData,
          message: "OTP has been resent",
          status: "RESEND_OTP_SUCCESS"
        });
      }
    } catch (exception) {
      console.log("ResendOTP: ", exception);
      next(exception);
    }
  };
  
 login = async (req, res, next) => {
  try{

    const {email,password}= req.body;
    const user = await authService.findSingleUser({email:email}); 
if (user.status ==='active'){
  if(bcrypt.compareSync(password, user.password)){

    let token = jwt.sign({
      sub:user._id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    let refresh = jwt.sign({
      sub:user._id
    }, process.env.JWT_SECRET, {expiresIn: '15d'});
    res.json({
      data: {
        accessToken: token,
        refreshToken: refresh
      },
      message: "Welcome to "+ user.role+"panel",
      status: "LOGIN_SUCCESS",
      options: null
    })

  }else {
    throw {code: 401, message: "Invalid password", status: "error"};
  }
}
else {
  throw {code: 401, message: "User is not activated", status: "error"};
}

  }catch(exception){
    console.log("AuthController || login", exception);
    next(exception);
  }

}

getLoggedIn= async(req,res,next)=>{
try{

  res.json({
    data:req.LoggedInUser,
    message:"Your profile",
    status:"SUCCESS_OK",
    options:null
  })
}catch(exception){
  console.log('GetLoggedInuser',exception)
  next(exception);
}

}

refreshToken = async (req, res, next) => {
   try {
    let token = jwt.sign({
      sub:req.LoggedInUser._id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    let refresh = jwt.sign({
      sub:req.LoggedInUser._id
    }, process.env.JWT_SECRET, {expiresIn: '15d'});
    res.json({
      data: {
        accessToken: token,
        refreshToken: refresh
      },
      message: "Welcome to "+ req.LoggedInUser.role+"panel",
      status: "LOGIN_SUCCESS",
      options: null
    })
   }catch(exception){
    console.log("AuthController || refresh token", exception);
    next(exception);

   }
}
}
const authCtrl = new AuthController();

module.exports = authCtrl;