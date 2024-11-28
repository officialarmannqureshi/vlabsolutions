import React from 'react'
const QuizTitle = ({AnswersDetails}) => {
    
  return (
    <div className="quiz-title-main-container">
        <div className="quiz-title-container">
          


          <div className="assign-dashboard">
            <p className="assignment-title">Total Questions</p>
            <p className="assignment-total">{AnswersDetails.totalQuestions}</p>
          </div>
          <div className="assign-dashboard">
            <p className="assignment-title">Total Answered</p>
            <p className="assignment-total">{AnswersDetails.totalAnswered}</p>
      
          </div>
          <div className="assign-dashboard ">
            <p className="assignment-title">Total Unanswered</p>
            <p className="assignment-total">{AnswersDetails.totalUnanswered}</p>
  
          </div>
        </div>
    </div>
  )
}

export default QuizTitle