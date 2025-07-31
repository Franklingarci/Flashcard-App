import React from 'react'
const Card = ({Question, Answer,flip, dotsIcon, onToggleAdd, onflip }) => {
   
return(
    <div className='Card min-w-lg h-90 min-h-90 border-4 border-b-red-500 border-r-red-500' onClick={(e)=>{
        e.stopPropagation
        onflip()
    }}>
        <div className='Card-info'>
            <button className='Dbutton'>
            <img className = "dot" src={dotsIcon} alt = "Menu" onClick={onToggleAdd}/>
         </button>
         </div>
       
        <h1 className = ''> {flip?Answer:Question}</h1>
    </div>
)
}



export default Card