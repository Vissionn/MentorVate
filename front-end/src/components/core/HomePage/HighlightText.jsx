import React from 'react'

 const HighlightText = ({text}) => {
  return (
    <span className=' highlighttextGradient font-bold bg-clip-text text-transparent '>
    {" "}
        {text}
    </span>
  )
}

export default HighlightText;