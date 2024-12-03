const cloudinarySvc = require("../../services/cloudinary.service");
const { generateRandomString, generateMinutes } = require("../../Utilities/helper");
const bcrypt = require("bcryptjs");
const UserModel = require('../User/user.model');
const mailSvc = require('../../services/mail.service')

class AuthService {
    generateOtp = () => {
        return {
            otp: generateRandomString(6).toUpperCase(),
            expiryTime: generateMinutes(5)
        }
    }

    transformUserCreateData = async (req) => {
        try {
            let data = req.body;

            if (req.file) {
                data.image = await cloudinarySvc.uploadImage(req.file.path, '/users');
            }

            // manipulation
            data.password = bcrypt.hashSync(data.password, 10);
            data = {
                ...data,
                ...this.generateOtp()
            };

            data.status = "inactive";

            let { confirmPassword, ...userData } = data;
            return userData;
        } catch (exception) {
            throw exception;
        }
    }

    createUser = async (data) => {
        try {
            const userObj = new UserModel(data);
            const user = await userObj.save();
            return user;
        } catch (exception) {
            throw exception;
        }

    }
    findSingleUser = async (filter) => {
        try {
            let user = await UserModel.findOne(filter);
            if (!user) {
                throw ({ code: 400, message: "User not found", status: "error" });
            }
            else {
                return user;
            }
        }
        catch (exception) {
            throw exception;
        }

    }
    sendOtpViaEmail = async (user) => {
        try {
            let message = `Dear ${user.name}, <br />
            <p>Your account has been created successfully. Please use the following OTP code to verify your account.</p>
            <p>Your OTP code is valid for 5 mins. If it is invalid, please request for resend OTP via web.</p><br />
            <strong style="color: #ff0000">${user.otp}</strong> <br />
            <p>Regards,</p>
            <p>${process.env.SMTP_FROM_ADDRESS}</p><br/>
            <small>
                <em>Do not reply to this email directly. For any feedback, get back to our website.</em>
            </small>
            `;

            const response = await mailSvc.sendEmail({
                to: user.email,
                subject: "Activate your account!",
                html: message,
            });
            console.log("Mail", response);
            return response;
        } catch (exception) {
            throw exception;
        }
    };
    updateById = async (id, data) => {
        try {
            const update = await UserModel.findByIdAndUpdate(id,{$set:data},{new:true});    
            return update;

        } catch (exception) {
            throw exception;
        }

    }
}

const authService = new AuthService();
module.exports = authService;   