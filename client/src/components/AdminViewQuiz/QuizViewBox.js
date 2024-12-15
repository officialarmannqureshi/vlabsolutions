import React from "react";
import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
const QuizViewBox = ({ quizData,handleStartQuiz }) => {
  let [quizDataCount, setQuizDataCount] = useState(0);
  let [processedquizData, setProcessedQuizData] = useState([]);
  useEffect(() => {
    const updatedquizData = quizData.map((item) => ({
      ...item,
      status: "General",
    }));
    setQuizDataCount(quizData.length);
    setProcessedQuizData(updatedquizData);
  }, [quizData]);
  console.log(processedquizData);
  return (
    <div className="QuizViewBox-css-1">
      <div className="QuizViewBox-css-2">
        {processedquizData.map((item) => {
          const {
            TotalQuestions,
            ClassName,
            ScorePerQuestion,
            SubjectId,
            TimeLimit,
            endTime,
            startTime,
            topic,
          } = item.formDetails;

          const { createdAt, unique_id, status, completed } = item;
          
          return (
            <QuizCard
              key={unique_id}
              topic={topic}
              totalQuestions={TotalQuestions}
              timeLimit={TimeLimit}
              className={ClassName}
              scorePerQuestion={ScorePerQuestion}
              subjectId={SubjectId}
              endTime={endTime}
              startTime={startTime}
              createdAt={createdAt}
              uniqueId={unique_id}
              status={status}
              handleStartQuiz={handleStartQuiz}
              completed={completed}
             
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizViewBox;
