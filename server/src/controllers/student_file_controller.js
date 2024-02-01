import csv from 'csvtojson';
import studentModel from '../models/studentModel.js';

export const student_file_controller = async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(req.file.path);
    
    const result = await studentModel.insertMany(jsonArray);
    
    res.send({
      success: true,
      message: "File uploaded to DB successfully!",
      result
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({
      success: false,
      message: "Unable to upload file to DB"
    });
  }
};


export const student_file_get_controller= async(req,res)=>{
   
        try {
            const studentsData=await studentModel.find();

            res.status(200).send({
                success:true,
                message:"Student's data fetched successfully",
                studentsData
            })
        } catch (error) {
            res.status(500).send({
                success:false,
                message:'Unable to fetch student data from DB'
            })
        }
    
}