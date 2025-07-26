import { useState } from 'react'
import Card from './Component/Card'
import './index.css'

function App() {
   const [flip, setFlip] = useState(false)
   const [newQuestion, setNewQuestion] = useState('');
   const[newAnswer, setNewAnswer] = useState('');
   const [Index, setIndex] = useState(0)
  const [Questions, setQuestion] = useState([
    
    {question:'What is a prop in React', answer:'Data passed to components'}
  ])
const handleAdd = () => {
  const newCard = {question: newQuestion, answer:newAnswer}
    setQuestion([...Questions, newCard])
    setNewAnswer('')
    setNewQuestion('')
}
  return (
    <>
       {Questions.map( (card, index) =>(
        
        <Card 
          key = {Index}
          Question={card.question}
          Answer={card.answer}
          flip={flip}
        />    
      ))} 
      <button onClick={() => setFlip(!flip)}> 
        
        <p> Flip</p>
        
        </button>
        <input type = "text" value  = {newQuestion} placeholder='Add new Quesiton' onChange={(e) => setNewQuestion(e.target.value)}/>
        <input type = "text" value = {newAnswer} placeholder='Add new Answer' onChange={(e) => setNewAnswer(e.target.value)}/>
        <button onClick={() => handleAdd()}> Add</button>
        <button onClick={() => {setIndex(Index+1)}}> next</button>
    </>
  )
}

export default App
