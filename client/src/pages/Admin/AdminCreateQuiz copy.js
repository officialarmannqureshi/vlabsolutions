import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Question from "../../components/AdminQuiz/Question";
import Options from "../../components/AdminQuiz/Options";
import QuizOuter from "../../components/AdminQuiz/QuizOuter";
import QuizData from "../Data/quizData";
import { useNavigate } from "react-router";

const AdminCreateQuiz = ({ formDetails }) => {
  const navigate = useNavigate();

  // Extract form details with fallback values
  const { TotalQuestions = 0, ClassName = "" } = formDetails || {};

  const [Answers, setAnswers] = useState({});
  const [AnswersDetails, setAnswersDetails] = useState({
    totalQuestions: TotalQuestions,
    totalAnswered: 0,
    totalUnanswered: TotalQuestions,
  });
  console.log(Answers)
  // Redirect if invalid form details
  useEffect(() => {
    if (!TotalQuestions || !ClassName) {
      alert("Please fill in all quiz details before proceeding.");
      navigate("../");
    }
  }, [TotalQuestions, ClassName, navigate]);


  useEffect(() => {
    setAnswersDetails({
      totalQuestions: TotalQuestions,
      totalAnswered: Object.keys(Answers).length,
      totalUnanswered: TotalQuestions - Object.keys(Answers).length,
    });
  }, [Answers, TotalQuestions]);

  return (
    <Layout>
      <QuizOuter AnswersDetails={AnswersDetails}>
        {Object.keys(QuizData).map((key) => {
          const data = QuizData[key];
          return (
            <div key={key} className="QuizKeys">
              <Question questions={data.question} />
              <Options
                options={data.options}
                QuestionId={key}
                setAnswers={setAnswers}
              />
            </div>
          );
        })}
      </QuizOuter>
    </Layout>
  );
};

export default AdminCreateQuiz;
