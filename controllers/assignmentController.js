import path from "path";

import assignmentModel from "../models/assignmentModel.js";

export const addFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    const { assignment, id, uploadedby } = req.body;
    const { filename, mimetype, path } = req.file; // Destructure the file details

    const filedetails = await new assignmentModel({
      filename,
      mimetype,
      path,
      assignment,
      uploadedby,
      id,
    }).save();

    res.status(201).send({
      success: true,
      message: "File uploaded successfully",
      filedetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "File not uploaded to DB",
      error,
    });
  }
};

export const getassignmentController = async (req, res) => {
  try {
    const result = await assignmentModel.find();
    res.status(200).send({ successs: true, message: "File found", result });
  } catch (error) {
    res.status(500).send({ successs: false, message: "File not found" });
  }
};
