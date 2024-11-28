import React from 'react'

const Option = ({onClick,children,name}) => {

 
  return (
    <div className='Option' onClick={onClick} name={name} >{children}</div>
  )
}

export default Option