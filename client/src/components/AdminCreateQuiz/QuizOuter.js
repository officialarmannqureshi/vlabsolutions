import React from 'react'
const QuizOuter = ({children,name,setAnswers}) => {
  return (
    <div className="MainOuter-Quiz" name={name}>

    
    <div className='Outer-Quiz'>
        
        {children}
    </div>
    </div>
  )
}

export default QuizOuter