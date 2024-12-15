import React from "react";
import Option from "./Option";

const Options = ({ setQuestions, QuestionId, Questions }) => {
  const options = [1, 2, 3, 4];
  const questionOptions = Questions[QuestionId]?.QuestionOptions || {};
  return (
    <div className="quizOptionsBox">
      {options.map((i) => (
        <Option
          optionIndex={i}
          QuestionId={QuestionId}
          setQuestions={setQuestions}
          Questions={Questions}
        />
      ))}
    </div>
  );
};

export default Options;
