// const mongoose=require('mongoose');
// const dotenv=require('dotenv');
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
        
        console.log("Server connected to DB successfully ${conn.connection.host}");
    } catch (error) {
        console.log('Error in connecting DB or error :${error}');
        
    }
}


export default connectDB;