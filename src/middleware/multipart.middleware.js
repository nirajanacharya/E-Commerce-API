const multer = require('multer');

// Define the storage engine
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");  // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Keep the original file name
    }
});

// Function to create the uploader based on file type
const uploader = (fileType = 'image') => {
    let allowedExts = [];

    // Set allowed extensions based on file type
    if (fileType === 'doc') {
        allowedExts = ['doc', 'pdf', 'ppt', 'csv', 'xlsx', 'txt', 'json'];
    } else {
        allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];  // Default image types
    }

    return multer({
        storage: myStorage,
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split('.').pop();  // Extract the file extension
            if (allowedExts.includes(ext.toLowerCase())) {
                // Allowed file format
                cb(null, true);
            } else {
                // File format not supported
                cb({
                    code: 400,
                    message: "File format not supported",
                    statusCode: "VALIDATION_ERROR"
                });
            }
        }
    });
};

// Export the uploader function
module.exports = {
    uploader
};
