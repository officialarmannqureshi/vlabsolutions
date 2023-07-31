import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    }

},{
    timestamps:true
});

export default mongoose.model('Users',userSchema);