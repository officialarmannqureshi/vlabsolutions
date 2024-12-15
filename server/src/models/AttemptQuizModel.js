import mongoose from "mongoose";
// Schema for Question Options
const questionSchema = new mongoose.Schema(
  {
    CorrectAnswer: { type: String },
    QuestionOptions: {
      1: { type: String },
      2: { type: String },
      3: { type: String },
      4: { type: String },
    },
    QuestionTitle: { type: String },
  },
  { _id: false }
);

// Schema for Form Details
const formDetailsSchema = new mongoose.Schema({
  ClassName: { type: String, required: true },
  ScorePerQuestion: { type: String, required: true },
  SubjectId: { type: String, required: true },
  TimeLimit: { type: String, required: true },
  TotalQuestions: { type: String, required: true },
  endTime: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});
const AttemptSchema = new mongoose.Schema(
  {
    unique_id: {
      type: String,
      required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    startedTime:{
        type: Date,
        default: null
    },
    endedTime:{
        type: Date,
        default: null
    },
    submissionTime:{
        type: Date,
        default: null
    },
    Totalscored:{
        type: Number,
        default: 0
    },
    formDetails: {
      type: formDetailsSchema,
      required: true,
    },
    questions: {
      type: Map, // Use Map to store dynamic keys like 1, 2, 3, ...
      of: questionSchema,
      required: true,
    },
    markedAnswers:{
      type: Object,
      default:null,
    },
    completed:{
      type:Number,
      default:0,
    }
  },
  { timestamps: true }
);

const AttemptQuizModel = mongoose.model("AttemptedQuizDetails", AttemptSchema);

export default AttemptQuizModel;
