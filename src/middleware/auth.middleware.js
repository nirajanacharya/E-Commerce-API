const jwt = require('jsonwebtoken');
const authService = require('../../src/modules/auth/auth.service');
const { removeListener } = require('../modules/User/user.model');

// Middleware to check if user is logged in
const checkLoggedIn = async (req, res, next) => {
    try {
        let token = req.headers['authorization'] || null;
        
        // Check if token exists
        if (!token) {
            return next({ code: 401, message: 'Token not found', statusCode: "Token_Not_Found" });
        }

        // Remove "Bearer" prefix if present
        token = token.startsWith('Bearer ') ? token.split(" ")[1] : token;

        // Verify the token 
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data);
        const userDetails = await authService.findSingleUser({ _id: data.sub });
        req.LoggedInUser = {
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role,
            address: userDetails.address,
            gender: userDetails.gender,
            phone: userDetails.phone,
            image: userDetails.image,
            status: userDetails.status
        }

        
        // Proceed to the next middleware
        next();
    } catch (exception) {
       if (exception instanceof jwt.TokenExpiredError) {
            return next({ code: 410, message: 'Token expired', statusCode: "Token_Expired" });
        }else if (exception instanceof jwt.JsonWebTokenError) {
            return next({ code: 401, message: 'JWT_error', statusCode: "JWT_errror" });
        }else {
            return next({ code: 401, message: 'Invalid token', statusCode: "Invalid_Token" });
        }
        // Pass exception to Express error handle
}
}

const refreshTokenCheck = async (req, res, next) => {  
    try {
        const token = req.headers['refresh'] || null; 
        if (!token) {
            return next({ code: 401, message: 'refresh Token not found', statusCode: "Refresh_Token_Not_Found" });
        }
        // Verify the token 
        const data = jwt.verify(token, process.env.JWT_SECRET); 
        
        // Fetch user details
        const userDetails = await authService.findSingleUser({ _id: data.sub });

        // Attach the user details to the request object
        req.LoggedInUser = {
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role,
        };
        next();
    } catch (exception) {
        if (exception instanceof jwt.TokenExpiredError) {
            return next({ code: 410, message: 'Token expired', statusCode: "Token_Expired" });
        } else if (exception instanceof jwt.JsonWebTokenError) {
            return next({ code: 401, message: 'JWT_error', statusCode: "JWT_errror" });
        } else {
            return next({ code: 401, message: 'Invalid token', statusCode: "Invalid_Token" });
        }
    }
};
const roleCheck = (allowedBy) =>{
    return (req ,res ,next) =>{
        try {
            const loggedInUser = req.LoggedInUser;
            if(
                (typeof allowedBy === 'string'  && allowedBy ===loggedInUser.role) ||
                (Array.isArray(allowedBy) && allowedBy.includes(loggedInUser.role) )
            
            ){
                next();
            }else if (Array.isArray(allowedBy) && allowedBy.includes(loggedInUser.role)){
                next();
            }
            else{
                return next({code:403, message: "Access Denied", statusCode: "Forbidden"});
            }
        }catch(exception){
            next(exception);
    }
}
}

module.exports = { checkLoggedIn, refreshTokenCheck, roleCheck };
