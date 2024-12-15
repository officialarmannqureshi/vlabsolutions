import React from "react";

const Option = ({
  optionId,
  children,
  name,
  questionId,
  setMarkedAnswers,

}) => {

  const handleMarkOption = (e) => {
    const optionId = e.target.attributes.optionid.value;

    setMarkedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    const parent = e.target.parentNode;

    Array.from(parent.children).forEach((sibling) => {
      sibling.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  return (
    <div
      className="Option option-quiz-session"
      optionId={optionId}
      onClick={handleMarkOption}
      name={name}
    >
      {children}
    </div>
  );
};

export default Option;
