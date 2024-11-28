import React, { useState } from "react";

const Question = ({ setQuestions, QuestionId }) => {

  // Handle question input change
  function handleQuestionInput(e) {
    const { value } = e.target; // Destructure correctly
    e.preventDefault();
    
    // Update the state with the QuestionId and QuestionTitle
    setQuestions((prev) => ({
      ...prev,
      [QuestionId]: {
        ...prev[QuestionId],  // Ensure that other fields like options and correct answer are not lost
        QuestionTitle: value,
      }
    }));
  }

  return (
    <div className="quizQuestionBox">
      <input
        type="text"
        className="Input-inner"
        onChange={handleQuestionInput}
        required
        placeholder="Enter the Question here"
      />
    </div>
  );
};

export default Question;
