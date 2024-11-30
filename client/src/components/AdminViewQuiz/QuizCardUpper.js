import React from "react";

const QuizCardUpper = ({ topic, totalQuestions, subjectId, className,classId,status }) => {
  if (!topic) {
    topic = "Science";
  }
  console.log(status);
  return (
    <div className={className}>
      <div className="top-quiz-card-upper">
      <h5>{topic}</h5>
      <div className="publish-btn-quiz-card-upper"><p>{status}</p></div>
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
