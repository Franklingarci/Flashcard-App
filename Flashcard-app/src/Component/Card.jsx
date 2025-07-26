import React from 'react'
const Card = ({Question, Answer,flip, dotsIcon, onToggleAdd }) => {
   
return(
    <div className='Card'>
        <div className='Card-info'>
            <button className='Dbutton'>
            <img className = "dot" src={dotsIcon} alt = "Menu" onClick={onToggleAdd}/>
         </button>
         </div>
       
        <h1> {flip?Answer:Question}</h1>
    </div>
)
}



export default Card