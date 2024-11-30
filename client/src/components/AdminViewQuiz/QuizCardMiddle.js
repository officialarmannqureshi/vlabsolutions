import React from "react";
import { FaHourglassStart } from "react-icons/fa";
import { SiMusescore } from "react-icons/si";
const QuizCardMiddle = ({
  scorePerQuestion,
  timeLimit,
  className,
  totalQuestions
}) => {
  return (
    <div className={className}>
      <ul className="ul-quiz-card-middle">
        <div>
          <p>Score Per Question: {scorePerQuestion}</p>
        </div>
        <div>
          <FaHourglassStart />
          <p>Duration: {timeLimit*60} Minutes</p>
        </div>
        <div>
        <SiMusescore />
          <p>Total Score: {scorePerQuestion*totalQuestions}</p>
        </div>
        
      </ul>
    </div>
  );
};

export default QuizCardMiddle;
