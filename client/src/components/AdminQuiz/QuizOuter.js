import React from 'react'
import QuizTitle from './QuizTitle'
const QuizOuter = ({children,AnswersDetails}) => {
  return (
    <div className="MainOuter-Quiz">

      <QuizTitle AnswersDetails={AnswersDetails}></QuizTitle>
    <div className='Outer-Quiz'>
        
        {children}
    </div>
    </div>
  )
}

export default QuizOuter