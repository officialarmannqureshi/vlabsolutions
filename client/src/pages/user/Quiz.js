import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import Question from "../../components/AdminQuiz/Question";
import Option from "../../components/AdminQuiz/Option";
import toast from "react-hot-toast";
import Timer from "../../components/AdminQuiz/Timer";
import { submitQuiz } from "../../functions/SubmitQuiz";
import { useAuth } from "../../context/auth";

const Quiz = () => {
  const { uniqueId } = useParams();
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState({});
  const [auth] = useAuth();
  const [searchParams] = useSearchParams();
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const [startedTime, setStartedTime] = useState(null);
  const [endedTime, setEndedTime] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [statusData, setStatusData] = useState({});
  const [markedAnswers, setMarkedAnswers] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!auth || !auth.user || !auth.user.id) {
      toast.error("User authentication failed. Please log in again.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `/api/v1/auth/quiz/${uniqueId}`,
        { userId: auth.user.id },
        { params: { startTime, endTime } }
      );

      const fetchedData = res.data.data;

      if (!fetchedData || !fetchedData.questions) {
        throw new Error("Invalid quiz data received.");
      }
      const startedTimeInUTC = fetchedData.startedTime;

      setStartedTime(new Date(startedTimeInUTC));
      const endedTimeInUTC = fetchedData.endedTime;

      setEndedTime(new Date(endedTimeInUTC));
      setData(fetchedData);
      setQuestions(fetchedData.questions);
      console.log();
      const value = parseFloat(fetchedData.formDetails.TimeLimit) * 60;
      setTimeLimit(value || 0);

      const totalQuestions = Object.keys(fetchedData.questions || {}).length;
      setStatusData({
        totalAnswered: 0,
        totalUnanswered: totalQuestions,
        totalQuestions,
      });
    } catch (err) {
      console.error("Error fetching quiz data:", err);
      toast.error(err.response?.data?.message || "Failed to load quiz data.");
      navigate("/tests");
    }
  };

  useEffect(() => {
    fetchData();
  }, [uniqueId]);

  useEffect(() => {
    console.log(Object.keys(markedAnswers).length);
    setStatusData((prev)=>({
      ...prev,
      totalAnswered: Object.keys(markedAnswers).length,
      totalUnanswered:prev.totalQuestions-Object.keys(markedAnswers).length,
    }))
    
  }, [markedAnswers]);

  /*
  {
    1:'a',
    2:'b',
    3:'c',
    4:'d',
  }
  
  
  
  
  */

  const renderQuestions = () => {
    if (!questions || Object.keys(questions).length === 0) {
      return <p>No questions available. Please check back later.</p>;
    }

    return Object.entries(questions).map(([questionId, item]) => (
      <div key={item.QuestionTitle} className="question-container">
        <Question questions={item.QuestionTitle} />
        {Object.entries(item.QuestionOptions).map(([key, option]) => (
          <Option
            optionId={key}
            questionId={questionId}
            setStatusData={setStatusData}
            markedAnswers={markedAnswers}
            setMarkedAnswers={setMarkedAnswers}
          >
            {option}
          </Option>
        ))}
      </div>
    ));
  };

  return (
    <Layout>
      <div className="quiz-mainBox">
        <div className="assignment-container mt-3">
          <div className="assign-dashboard">
            <p className="assignment-title">Total Questions</p>
            <p className="assignment-total">{statusData.totalQuestions}</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total UnAnswered</p>
            <p className="assignment-total">{statusData.totalUnanswered}</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total Answered</p>
            <p className="assignment-total">{statusData.totalAnswered}</p>
          </div>
        </div>
        <div className="quiz-questions-main-container">{renderQuestions()}</div>
        <div className="timer-main-box">
          <Timer
            durationInMinutes={timeLimit}
            startedTime={startedTime}
            endedTime={endedTime}
            uniqueId={uniqueId}
            markedAnswers={markedAnswers}
          />
        </div>

        <div>
          <button
            onClick={() => {
              if (auth && auth.user && auth.user.id) {
                submitQuiz(uniqueId, auth, navigate, markedAnswers);
              } else {
                toast.error("Unable to submit quiz. Please log in again.");
              }
            }}
            className="submit-button feedback-submit-btn"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
