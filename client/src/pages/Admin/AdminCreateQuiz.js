import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Question from "../../components/AdminCreateQuiz/Question";
import Options from "../../components/AdminCreateQuiz/Options";
import QuizOuter from "../../components/AdminCreateQuiz/QuizOuter";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);

const AdminCreateQuiz = ({ formDetails }) => {
  console.log('API Key:', process.env.REACT_APP_GEMINI_API);
  const [IsAiBoxVisible, setIsAiBoxVisible] = useState(false);
  const navigate = useNavigate();
  const unique_id = uuid();
  const [inputValue, setInputValue] = useState("");
  const [promptResponse, setPromptResponse] = useState("");
  const { TotalQuestions, ClassName,
    topic,SubjectId  } = formDetails;

  const [Questions, setQuestions] = useState({});
  /* GEMINI CONFIGURATION */
  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(
        `
        I am a quiz maker bot, and I will generate quizzes in strict JSON format only.
        Generate only ${TotalQuestions} questions.
        Output format:
        {
          "questions": {
            "1": {
              "QuestionTitle": "Question title here",
              "QuestionOptions": {
                "1": "Option 1",
                "2": "Option 2",
                "3": "Option 3",
                "4": "Option 4"
              },
              "CorrectAnswer": "Option number (e.g., 1, 2, 3, 4)"
            }
          },
          "subject": "${SubjectId}",
          "topic": "${topic}"
        }

        User input: ${inputValue}
        Generate a JSON response based on the above format.
        `
      );

      // Handle response
      const response = await result.response;
      const text = await response.text();

  

      try {
        const parsedResponse = JSON.parse(text);
        setPromptResponse(parsedResponse);
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        toast.error("Invalid AI response. Please try again.");
        setPromptResponse({});
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("Failed to generate quiz. Please try again.");
    }
  };

  /* Update Questions State from AI Response */
  useEffect(() => {
    if (promptResponse?.questions) {
      setQuestions(promptResponse.questions);
    }
  }, [promptResponse]);

 

  useEffect(() => {
    if (!TotalQuestions || !ClassName) {
      alert("Please fill in all quiz details before proceeding.");
      navigate("../");
    }
  }, [TotalQuestions, ClassName, navigate]);

  // Render Questions dynamically
  const renderQuestions = () => {
    const quizComponents = [];
    for (let i = 1; i <= TotalQuestions; i++) {
      quizComponents.push(
        <QuizOuter key={i} name={i}>
          <Question setQuestions={setQuestions} QuestionId={i} Questions={Questions}/>
          <Options
            setQuestions={setQuestions}
            QuestionId={i}
            Questions={Questions}
          />
        </QuizOuter>
      );
    }
    return quizComponents;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all questions are complete
    const allQuestionsComplete = Object.keys(Questions || {}).every(
      (questionId) => {
        const questionData = Questions[questionId];
        return (
          questionData?.CorrectAnswer &&
          questionData?.QuestionTitle &&
          Object.keys(questionData?.QuestionOptions || {}).length === 4
        );
      }
    );

    if (!allQuestionsComplete) {
      alert(
        "Please complete all fields, including Correct Answer, Question Title, and Options for all questions."
      );
      return;
    }

    // Add `createdOn` field to the final quiz object
    const finalQuizData = {
      questions: Questions,
      unique_id: unique_id,
      completed: 0,
      submissionDate: null,
      formDetails,
    };

    console.log("Final Quiz Data:", finalQuizData);

    try {
      const res = await axios.post(`api/v1/auth/quizData/`, finalQuizData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/admin/create-quiz/`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during quiz submission:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleClick = () => {

    setIsAiBoxVisible(!IsAiBoxVisible);
  };

  return (
    <Layout>
      <div className="ai-outer-container">
       <div className="ai-main-container">
       
        <div className="ai-icon">
          <img src="/gemini.png" alt="AI Icon" onClick={handleClick} />
        </div>
        <div className="ai-box" id="aibox">
            
            
            <div className="text-box-ai">
              <input
                type="text"
                name="geminiQuery"
                placeholder="Type the quiz details here."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={getResponseForGivenPrompt}
                className="send-gemini"
              >
                Generate
              </button>
            </div>
          </div>
      </div>
      <form onSubmit={handleSubmit} className="create-quiz-main-container">
        {renderQuestions()}
        <button type="submit" className="create-quiz-btn">
          Create
        </button>
      </form>
      </div>
     
    </Layout>
  );
};

export default AdminCreateQuiz;
