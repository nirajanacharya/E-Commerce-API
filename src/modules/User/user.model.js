const { ref } = require('joi');
const mongoose = require('mongoose');   

const UserSchema = new mongoose.Schema({   
    name:{
        type: String,
        required:true,
        min:2,
        max:40
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        enum:["admin","customer","seller"],
        default:"customer"  
    },
    gender:{
        type: String,
        enum:["male","female","other"]
    },
    address: String,
    phone: String,
    image: String,
    otp: String,
    expiryTime: Date,
    status:{
        type: String,
        enum:["active","inactive"],
        default:"inactive"
    },
    createdBy:
    {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;