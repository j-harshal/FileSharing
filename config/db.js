require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {

    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);

        console.log("Connected to MONGODB");
        
    } catch(error){
        console.log(error);
        
    }
}


module.exports = connectDB;