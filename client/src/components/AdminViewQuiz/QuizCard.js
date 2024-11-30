import React from "react";
import QuizCardBottom from "./QuizCardBottom";
import QuizCardMiddle from "./QuizCardMiddle";
import QuizCardUpper from "./QuizCardUpper";

const QuizCard = ({
  topic,
  totalQuestions,
  timeLimit,
  className,
  scorePerQuestion,
  subjectId,
  endTime,
  startTime,
  createdAt,
  uniqueId,
  status,
}) => {
  return (
    <div>
      <div className="quiz-card">
        <QuizCardUpper
          topic={topic}
          totalQuestions={totalQuestions}
          subjectId={subjectId}
          className={'QuizCardUpper'}
          classId={className}
          status={status}
        />
        <QuizCardMiddle
          scorePerQuestion={scorePerQuestion}
          timeLimit={timeLimit}
          totalQuestions={totalQuestions}
          className={'QuizCardMiddle'}
        />
        <QuizCardBottom createdAt={createdAt} uniqueId={uniqueId} startTime={startTime}
          endTime={endTime} className={'QuizCardBottom'} />
      </div>
    </div>
  );
};

export default QuizCard;
