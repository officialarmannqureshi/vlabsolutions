import React from "react";
import { useAuth } from "../../context/auth";
const QuizCardUpper = ({
  topic,
  totalQuestions,
  subjectId,
  className,
  classId,
  status,
  uniqueId,
  handleStartQuiz,
  endTime,
  startTime,
  completed
}) => {
  if (!topic) {
    topic = "Science";
  }

  const [auth, setAuth] = useAuth();


   return (
    <div className={className}>
      <div className="top-quiz-card-upper">
        <h5>{topic}</h5>
        {auth?.user?.role === 1 ? (
          <div className="publish-btn-quiz-card-upper">
            <p>{status}</p>
          </div>
        ) : (
          <div className={`start-test-button ${completed? 'completed':'start'}`} onClick={()=>handleStartQuiz(uniqueId,startTime,endTime)}><p>{completed? 'Submitted':'Start'}</p></div>
        )}

      </div>

      <ul className="ul-quiz-card-upper">
        <div>
          <p>{totalQuestions} Questions</p>
        </div>
        <li>
          <p>Subject: {subjectId}</p>
        </li>
        <li>
          <p>Class: {classId}</p>
        </li>
      </ul>
    </div>
  );
};

export default QuizCardUpper;
