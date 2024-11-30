import quizModel from "../models/quizModel.js";

export const createquizController = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty. Please provide valid quiz data.",
      });
    }

    const { questions, unique_id, formDetails } = req.body;

    // Validate individual fields
    if (!questions || !unique_id || !formDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the quiz data.",
      });
    }

    const existingQuiz = await quizModel.findOne({ unique_id });

    if (existingQuiz) {
      return res.status(409).json({
        success: false,
        message: "A quiz with the provided ID already exists.",
      });
    }

    const quizDetails = await new quizModel({
      questions,
      unique_id,
      formDetails,
    }).save();

    res.status(201).send({
      success: true,
      message: "All questions are complete. Quiz successfully posted!",
      quizDetails,
    });
  } catch (error) {
    console.error("Error in quizController:", error);

    // Catch unexpected server errors
    res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getquizdataController = async (req, res) => {
  try {
    const quizData = await quizModel.find();

    if (!quizData) {
      return res.status(404).json({
        success: false,
        message: "No quiz data found.",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Quiz data found.",
        quizData,
      });
    }
  } catch (error) {
    console.error("Error in quizController:", error);
  }
};
