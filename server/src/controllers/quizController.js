import AttemptQuizModel from "../models/AttemptQuizModel.js";
import quizModel from "../models/quizModel.js";
import moment from "moment-timezone";
import JWT from "jsonwebtoken";
import { CountSubmittedQuiz } from "../functions/Submission.js";

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
    const { userId } = req.query;
    const quizData = await quizModel.find();
    
    const AttemptedQuizData = await AttemptQuizModel.find({userId});
   
   
    const updatedQuizData = quizData.map((quiz) => {
      const attempt = AttemptedQuizData.find(
        (attempt) => attempt.unique_id === quiz.unique_id
      );

      return {
        ...quiz._doc, // Spread the quiz object (use ._doc or .toObject())
        completed: attempt ? !!attempt.completed : false,
      };
    });
    
    
    if (!updatedQuizData) {
      return res.status(404).json({
        success: false,
        message: "No quiz data found.",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Quiz data found.",
        updatedQuizData,
      });
    }
  } catch (error) {
    console.error("Error in quizController:", error);
  }
};

export const getSpecificQuizController = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    const startTime = moment.utc(req.query.startTime);
    const endTime = moment.utc(req.query.endTime);

    if (!startTime.isValid() || !endTime.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Invalid startTime or endTime format.",
      });
    }

    const startTimeIST = moment
      .utc(startTime)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    const endTimeIST = moment
      .utc(endTime)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    const currentDate = new Date();

    console.log(`Unique ID: ${uniqueId}`);
    console.log(`Start Time: ${startTimeIST}`);
    console.log(`End Time: ${endTimeIST}`);

    const currentISTDateTime = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    console.log("Current Date in IST:", currentISTDateTime);
    // Validate that the unique ID is provided

    if (!uniqueId) {
      return res.status(400).json({
        success: false,
        message: "uniqueId is required.",
      });
    } else if (!startTimeIST) {
      return res.status(400).json({
        success: false,
        message: "startTime is required.",
      });
    } else if (!endTimeIST) {
      return res.status(400).json({
        success: false,
        message: "endTime is required.",
      });
    }

    if (currentISTDateTime > endTimeIST || currentISTDateTime < startTimeIST) {
      return res.status(400).json({
        success: false,
        message: "Test is expired",
      });
    }

    // Use `.lean()` to return a plain JavaScript object
    const quiz = await quizModel.findOne({ unique_id: uniqueId }).lean();
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "No quiz data found.",
      });
    }

    // Sanitize the quiz questions by removing the correct answers
    const sanitizedQuestions = {};
    for (const [key, question] of Object.entries(quiz.questions)) {
      const { CorrectAnswer, ...filteredQuestion } = question; // Exclude 'CorrectAnswer'
      sanitizedQuestions[key] = filteredQuestion;
    }

    // Prepare the sanitized quiz response
    const sanitizedQuiz = {
      unique_id: quiz.unique_id,
      formDetails: quiz.formDetails,
      questions: sanitizedQuestions,
    };

    res.status(200).json({
      success: true,
      message: "Quiz data found.",
      testData: sanitizedQuiz,
    });
  } catch (error) {
    console.error("Error in getSpecificQuizController:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while fetching the quiz.",
      error: error.message,
    });
  }
};

export const AttemptQuizController = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { userId } = req.body;

    if (!uniqueId || !userId) {
      return res.status(400).json({
        success: false,
        message: "uniqueId and userId are required.",
      });
    }

    const quiz = await quizModel.findOne({ unique_id: uniqueId }).lean(); // Use `.lean()` for plain JS objects

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    const currentTime = moment();
    const quizStartTime = moment.utc(quiz.formDetails.startTime);
    const quizEndTime = moment.utc(quiz.formDetails.endTime);

    if (
      currentTime.isBefore(quizStartTime) ||
      currentTime.isAfter(quizEndTime)
    ) {
      return res.status(400).json({
        success: false,
        message: "Quiz is expired or hasn't started yet.",
      });
    }

    const alreadyAttempted = await AttemptQuizModel.findOne({
      unique_id: uniqueId,
      userId,
    });

    if (alreadyAttempted) {
      if (!alreadyAttempted.completed) {
        return res.status(200).json({
          success: true,
          message: "Quiz re-started successfully.",
          data: alreadyAttempted,
        });
      }

      return res.status(400).json({
        success: false,
        message: "You have already attempted this quiz.",
      });
    }

    // Sanitize quiz questions by removing the correct answers
    const sanitizedQuestions = {};
    for (const [key, question] of Object.entries(quiz.questions)) {
      const { CorrectAnswer, ...filteredQuestion } = question;
      sanitizedQuestions[key] = filteredQuestion;
    }

    const startedTime = new Date();
    const durationInMinutes = parseFloat(quiz.formDetails.TimeLimit)*60 || 0;
    const endedTime = new Date(
      startedTime.getTime() + durationInMinutes * 60 * 1000
    );

    const sanitizedQuiz = {
      unique_id: uniqueId,
      formDetails: quiz.formDetails,
      questions: sanitizedQuestions, 
      startedTime,
      endedTime,
      userId,
    };


    // Save the sanitized quiz attempt
    const newAttempt = new AttemptQuizModel(sanitizedQuiz);
    await newAttempt.save();

    return res.status(200).json({
      success: true,
      message: "Quiz started successfully.",
      data: sanitizedQuiz,
    });
  } catch (error) {
    console.error("Error in AttemptQuizController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while starting the quiz.",
      error: error.message,
    });
  }
};


export const SubmitQuizController = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { userId, submissionTime, markedAnswers } = req.body;

    if (!uniqueId || !userId || !submissionTime || !markedAnswers) {
      return res.status(400).json({
        success: false,
        message:
          "uniqueId, userId, submissionTime, and markedAnswers are required.",
      });
    }
    // Find the attempt document
    const attempt = await AttemptQuizModel.findOne({
      unique_id: uniqueId,
      userId,
    }).lean();

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz attempt not found.",
      });
    }

    if (attempt.completed) {
      return res.status(400).json({
        success: false,
        message: "Quiz already submitted.",
        
      });
    }

    

    const sanitizedData = {
      submissionTime: new Date(submissionTime),
      markedAnswers,
      completed: 1,
    };

    const updatedAttempt = await AttemptQuizModel.findOneAndUpdate(
      { unique_id: uniqueId, userId },
      { $set: sanitizedData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully.",
      data: updatedAttempt,
    });
  } catch (error) {
    console.error("Error in SubmitQuizController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while submitting the quiz.",
      error: error.message,
    });
  }
};

export const statusQuizController = async (req, res) => {
  try {
    const { uniqueId, userId } = req.params;

    if (!uniqueId || !userId) {
      return res.status(400).json({
        success: false,
        message: "uniqueId and userId are required.",
      });
    }

    // Fetch quiz details
    const quizDetails = await quizModel.findOne({ unique_id: uniqueId });

    if (!quizDetails) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    const quizStartTime = moment.utc(quizDetails.formDetails.startTime);
    const quizEndTime = moment.utc(quizDetails.formDetails.endTime);
    const currentTime = moment();

    if (currentTime.isBefore(quizStartTime)) {
      return res.status(400).json({
        success: false,
        message: "Quiz hasn't started yet.",
      });
    }

    if (currentTime.isAfter(quizEndTime)) {
      return res.status(400).json({
        success: false,
        message: "Quiz time has expired.",
      });
    }

    const attempt = await AttemptQuizModel.findOne({
      unique_id: uniqueId,
      userId,
    });

    if (!attempt) {
      return res.status(200).json({
        success: true,
        message: "Attempt not found.",
        completed: 0,
      });
    }
    // Return the status
    return res.status(200).json({
      success: true,
      message: "Attempt found.",
      completed: attempt.completed,
    });
  } catch (error) {
    console.error("Error in statusQuizController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while fetching quiz status.",
      error: error.message,
    });
  }
};
