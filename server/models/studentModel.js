import mongoose, { mongo } from "mongoose";

const studentDetailSchema = new mongoose.Schema({
    'First Name' :{
        type:String,
        trim:false,
        required:true
    },
    'Last Name' :{
        type:String,
        trim:false,
        required:true
    },
    'Roll no' :{
        type:String,
        trim:false,
        required:true
    },
    'Course opted' :{
        type:String,
        trim:false,
        required:true
    },
    'Email ID':{
        type:String,
        trim:false,
        required:true
    },
    'Year of Graduation':{
        type:Number,
        trim:false,
        required:true
    },
    'Mentor Name':{
        type:String,
        trim:false,
        required:true
    },
    'Mentor Email ID':{
        type:String,
        trim:false,
        required:true
    },
    'Department':{
        type:String,
        trim:false,
        required:true
    },
    'Parent Mobile No' :{
        type:Number,
        trim:false,
        required:true
    },
    'Mobile No':{
        type:Number,
        trim:false,
        required:true
    },

});

export default mongoose.model('StudentDetails',studentDetailSchema);