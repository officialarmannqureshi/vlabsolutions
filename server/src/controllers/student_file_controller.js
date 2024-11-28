import csv from 'csvtojson';
import studentModel from '../models/studentModel.js';
import axios from 'axios';

export const student_file_controller = async (req, res) => {
  try {
    // Ensure 'path' is present in the request body
    const { path } = req.body;

    if (!path) {
      return res.status(400).send({
        success: false,
        message: "Path is required in the request body",
      });
    }

    // Clean the path by removing any quotes
    const cleanedPath = path.replace(/"/g, ''); 

   

    // Fetch the CSV file from the URL provided in the 'path'
    const response = await axios.get(cleanedPath);
    const jsonArray = await csv().fromString(response.data);

    // Insert the data into the studentModel
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
      message: "Unable to upload file to DB",
    });
  }
};

export const student_file_get_controller = async (req, res) => {
  try {
    const studentsData = await studentModel.find();

    res.status(200).send({
      success: true,
      message: "Student's data fetched successfully",
      studentsData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Unable to fetch student data from DB',
    });
  }
};
