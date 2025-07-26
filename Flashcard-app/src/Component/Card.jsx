import React from 'react'
const Card = ({Question, Answer,flip }) => {
   
return(
    <div className='Card'>
        <h1> {flip?Answer:Question}</h1>
    </div>
)
}



export default Card