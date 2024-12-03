require("dotenv").config();    
const mongoose = require("mongoose");

const dbConnect = async () => {
    try {  
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DBNAME,
            autoCreate: true,
            autoIndex: true
        });
        console.log("Database connected successfully!");
    } catch (exception) {
        console.log("Error connecting to database:", exception.message); 
    }
};

dbConnect();
