import React from "react";
import Option from "./Option";

const Options = ({ options, QuestionId, setAnswers }) => {
  function handleClick(e) {
    const allOptions = document.querySelectorAll(`[name="${QuestionId}"]`);

    allOptions.forEach((option) => {
      option.classList.remove("active");
    });

    e.target.classList.add("active");

    const answerText = e.target.innerHTML;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [QuestionId]: answerText, // Update the specific question's answer
    }));
  }

  return (
    <div className="quizOptionsBox">
      {options.map((option, index) => (
        <Option key={index} onClick={handleClick} name={QuestionId}>
          {option}
        </Option>
      ))}
    </div>
  );
};

export default Options;
