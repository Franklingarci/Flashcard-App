import { useState, useEffect, useRef } from 'react'
import Card from './Component/Card'
import './index.css'
import dotsIcon from './assets/dots.png';

function App() {
   const [flip, setFlip] = useState(false)
   const [newQuestion, setNewQuestion] = useState(null);
   const[newAnswer, setNewAnswer] = useState(null);
   const [Index, setIndex] = useState(0)
   const [add, setadd] = useState(false)
   const menuRef = useRef(null)
  const [Questions, setQuestion] = useState([
    
    {question:'What is a prop in React', answer:'Data passed to components'}
  ])
const handleAdd = () => {
  if(newQuestion&& newAnswer){
 const newCard = {question: newQuestion, answer:newAnswer}
    setQuestion([...Questions, newCard])
    setNewAnswer('')
    setNewQuestion('')
  }
}
useEffect(()=>{
  const handleClickOutside = (event) =>{
    if(menuRef.current && !menuRef.current.contains(event.target)){
      setadd(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () =>{
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
console.log(Questions)
  return (
    <>
      <div className='mCard'>
        <Card 
          key = {Index}
          Question={Questions[Index].question}
          Answer={Questions[Index].answer}
          flip={flip}
          dotsIcon={dotsIcon}
          onToggleAdd={() => setadd(prev => !prev)}
        />    
    <div className='Nav'>
      <button  className = "bNav" onClick={() => setFlip(!flip)}> 
        
        <p> Flip</p>
        </button>
        <button onClick={() => {Index+1<Questions.length?setIndex(Index+1):setIndex(Index)}}> next</button>
        </div>
      {add && (
      <div 
      ref = {menuRef}
    > 
     <input type = "text" value  = {newQuestion} placeholder='Add new Quesiton' onChange={(e) => setNewQuestion(e.target.value)}/>
        <input type = "text" value = {newAnswer} placeholder='Add new Answer' onChange={(e) => setNewAnswer(e.target.value)}/>
        <button onClick={() => handleAdd()}> Add</button>

    </div>

      )}
    

    </div>

    </>
  )
}

export default App
