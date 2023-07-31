import mongoose from 'mongoose';

const assignmentsSchema= new mongoose.Schema({
        filename:{
            type:String,
            // required:[true,"Please provide assignment name!"],
            trim:false,
        },
        id:{
            type:String,
            
            trim:false,
        },
        uploadedby:{
            type:String,
            
            trim:false,
        },
        file:{
            type:String,
 
        },
        assignment:{
            type:String,
            trim:false,
        }

},{
    timestamps:true
});

export default mongoose.model('Assignments',assignmentsSchema);