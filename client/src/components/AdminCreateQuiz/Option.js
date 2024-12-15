import React, { useEffect, useState } from "react";

const Option = ({ QuestionId, optionIndex, setQuestions, Questions }) => {

  const OptionValue = Questions[QuestionId]?.QuestionOptions[optionIndex] || "";
  const CorrectAnswer = Questions[QuestionId]?.CorrectAnswer || "";
  
  
  function handleOptionInput(e) {
    e.preventDefault();
    const value = e.target.value; // Correctly access the value of the input field

    // Update the options in the state for the specific QuestionId
    setQuestions((prev) => ({
      ...prev,
      [QuestionId]: {
        ...prev[QuestionId],
        QuestionOptions: {
          ...prev[QuestionId]?.QuestionOptions,
          [optionIndex]: value,
        },
      },
    }));
  }



  function handleClick(e) {
    console.log(optionIndex);
    const activeQuestionId = e.target.getAttribute("QuestionId");
    const activeOptionIndex = e.target.getAttribute("optionIndex");

    const allButtons = document.querySelectorAll(
      `.correct-answer[QuestionId="${activeQuestionId}"]`
    );

    // Remove the active class from all options of the current question
    allButtons.forEach((option) => {
      option.classList.remove("active");
    });

    // Add the active class to the clicked option
    e.target.classList.add("active");

    // Update the correct answer in the state
    setQuestions((prev) => ({
      ...prev,
      [QuestionId]: {
        ...prev[QuestionId],
        CorrectAnswer: activeOptionIndex,
      },
    }));
  }

  return (
    <div className="Option-Admin">
      <input
        type="text"
        className="Input-inner"
        onChange={handleOptionInput}
        optionId={optionIndex}
        required
        placeholder="Enter the option here"
        value={OptionValue}
      ></input>
      <div
        className={`correct-answer ${CorrectAnswer === String(optionIndex) ? "active" : ""}`}
        QuestionId={QuestionId}
        onClick={handleClick}
        optionIndex={optionIndex}
      >
        Correct
      </div>
    </div>
  );
};

export default Option;
