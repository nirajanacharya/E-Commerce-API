 
 //read the env file content
require('dotenv').config();
const cloudinary = require('cloudinary').v2;    
const { dir } = require('console');
const fs = require ('fs'); 
 
 
 //TODO: cloudinary
 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


class CloudinaryService{

     uploadImage = async(filepath, dir='/')=>{
        try {

            const uploadContent = await cloudinary.uploader.upload(filepath,  // The local file path to be uploaded
                {
                    folder: '/mern-33/'+dir, // Specifies the folder where the file will be stored in Cloudinary
                    unique_filename: true,      // Ensures that the uploaded file has a unique name
                    resource_type: "auto"       // Automatically detects the type of the file (image, video, raw, etc.)
                }
            ); 
            fs.unlinkSync(filepath); // Deletes the file from the local storage 
            return uploadContent.secure_url;
        } catch (exception) {
            throw exception;

        }
    }
}

const cloudinarySvc = new CloudinaryService();  

module.exports = cloudinarySvc;

