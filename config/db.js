// const mongoose=require('mongoose');
// const dotenv=require('dotenv');
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB =
    async () => {
  try {
    const conn =
        await mongoose.connect(process.env.MONGO_DB, {useNewUrlParser : true});

    console.log("Server connected to DB successfully ${conn.connection.host}");
  } catch (error) {
    console.log('Error in connecting DB or error :${error}');
  }
}

export default connectDB;