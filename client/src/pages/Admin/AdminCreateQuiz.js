import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Question from "../../components/AdminCreateQuiz/Question";
import Options from "../../components/AdminCreateQuiz/Options";
import QuizOuter from "../../components/AdminCreateQuiz/QuizOuter";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";
const AdminCreateQuiz = ({ formDetails }) => {
  const navigate = useNavigate();
  const unique_id = uuid();

  const { TotalQuestions, ClassName } = formDetails;

  // State for Questions
  const [Questions, setQuestions] = useState({});

  // Redirect if invalid form details
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
          <Question setQuestions={setQuestions} QuestionId={i} />
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
      formDetails,
    };

    console.log("Final Quiz Data:", finalQuizData);

    const sanitizedQuizData = JSON.parse(JSON.stringify(finalQuizData));
    console.log("Sanitized Quiz Data:", sanitizedQuizData);
    
    try {
      const res = await axios.post(`/api/v1/auth/quizData/`, finalQuizData);
      if (res.data.success) {
        toast.success(res.data.message);  
        navigate(`/admin/create-quiz/`)
      } else {
        toast.error(res.data.message);  
      }
    } catch (error) {
      console.error("Error during quiz submission:", error);
      
      
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="create-quiz-main-container">
        {renderQuestions()}
        <button type="submit" className="create-quiz-btn">
          Create
        </button>
      </form>
    </Layout>
  );
};

export default AdminCreateQuiz;
