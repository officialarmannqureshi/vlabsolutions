import assignmentModel from "../models/assignmentModel.js";
import path from "path";

export const getAssignController = async (req,res)=>{
    try {
        const filedetails = await assignmentModel.find();
        res.status(200).send({
            success:true,
            message:'File found',
            
        });
    } catch (error) {
        res.send({
            success:false,
            message:'File not found',
            
        });
        console.log(error);
    }
}

export const addFileController = async (req,res)=>{
    try {
        const file=req.file;
        var getFilename = function (str) {
            return str.substring(str.lastIndexOf('/')+1);
        }
        const filename=getFilename(file);
        const assignment=req.body;
        const user=window.localStorage.getItem('user');
        const uploadedby=user.name;
        const id=user.id;

        const filedetails= await new assignmentModel({filename,file,assignment,uploadedby,id}).save();

        res.status(201).send({
            success:true,
            message:"File uploaded successfully",
            filedetails,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"File not uploaded",
            error
        });
    }
}


// export default downloadFile = async(req,res)=>{
//     const {id}=req.params;
//     const item=await assignmentModel.findById(id);
//     if(!item){
//         res.send({
//             success:false,
//             message:"No file found"
//         });
//     }
//     const file=item.file;
//     const filePath=path.join(__dirname,'../${file}');
//     res.download(filePath);
// }