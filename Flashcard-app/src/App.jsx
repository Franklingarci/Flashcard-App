import { useState, useEffect, useRef, use } from 'react'
import Card from './Component/Card'
import './index.css'
import dotsIcon from './assets/dots.png';
import NextButton from './assets/right.png';
import PrevButton from './assets/left.png';

function App() {
   const [flip, setFlip] = useState(false)
   const [newQuestion, setNewQuestion] = useState(null);
   const[newAnswer, setNewAnswer] = useState(null);
   const [Index, setIndex] = useState(0)
   const [add, setadd] = useState(false)
   const menuRef = useRef(null);
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
const removeAtIndex = (indexToRemove) =>{
  setQuestion(prevQuestions =>
  prevQuestions.filter((question, index) => index !== indexToRemove)
 
)
 setIndex(Index-1)


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

useEffect(()=>{
  console.log(Questions.length)
},[Questions.length])


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
          onflip = {() => setFlip(prev => !prev)}
          
        /> 
 
    <div className='Nav'>
        <button onClick={() => {Index>0?setIndex(Index-1):setIndex(Index)}}>
          <img  className = "size-5" src={PrevButton}/>
        </button>
        <button onClick={() => {Index+1<Questions.length?setIndex(Index+1):setIndex(Index)}}>
           <img src={NextButton} className='size-5 '/>
           </button>
        </div>
      {add && (
      <div 
      ref = {menuRef}
    > 
    <div className='flex gap-4'>
     <input className= "bg-red-40" type = "text" value  = {newQuestion} placeholder='Add new Quesiton' onChange={(e) => setNewQuestion(e.target.value)}/>
        <input type = "text" value = {newAnswer} placeholder='Add new Answer' onChange={(e) => setNewAnswer(e.target.value)}/>
        <button className = " w-full px-7 py-3 rounded-full bg-red-600 hover:bg-darkred " onClick={() => handleAdd()}> Add</button>
        <button className = " w-full px-7 py-3 rounded-full bg-red-600 hover:bg-darkred " onClick={() => { if(Questions.length>1){
          
          return removeAtIndex(Index), console.log(Questions)}}}> Delete</button>
        
    </div>
    </div>

      )}
    

    </div>

    </>
  )
}

export default App
