import { useState, useEffect, useRef, use } from 'react'
import Card from './Component/Card'
import './index.css'
import dotsIcon from './assets/dots.png';
import NextButton from './assets/right.png';
import PrevButton from './assets/left.png';
import slash from './assets/slash.svg';
const API_KEY = "o20vHz6ChWDsc3sJoDuGhgSJEhlnkQRnTROJyhvI";
function App() {
   const [flip, setFlip] = useState(false)
   const [newQuestion, setNewQuestion] = useState(null);
   const[newAnswer, setNewAnswer] = useState(null);
   const [Index, setIndex] = useState(0)
   const [add, setadd] = useState(false)
   const menuRef = useRef(null);
  const [Questions, setQuestion] = useState([]);
  const [Answers, setAnswers] = useState([])
  const fetchQuestions = async()=>{
  try{
    const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=20
      `);
    const data = await response.json();
console.log(data)
 const newQuestions = data.map(res=> res.question)
setQuestion(newQuestions)
const trueAnswers = data.map(q=>{
  const answers = q.correct_answers;
return Object.keys(answers).filter(key=> answers[key] === 'true')
})
const convertAnswer = trueAnswers.map(a => a.map(key => key.replace('_correct', "")))
 const answer = data.map((q,i) =>{
  return convertAnswer[i].map(answerKey => q.answers[answerKey])
 })
setAnswers(answer);
  }catch(error){
    console.log('Error Fetching Data', error)
  }
 
}
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

/* useEffect(()=>{
  console.log(Questions.length)
},[Questions.length])
*/
useEffect(()=>{
  fetchQuestions()
  
}, [])
  return (
    <>
    <div className='mCard'>
        <Card 
          key = {Index}
          Question={Questions[Index]}
          Answer={Answers[Index]}
          flip={flip}
          dotsIcon={dotsIcon}
          onToggleAdd={() => setadd(prev => !prev)}
          onflip = {() => setFlip(prev => !prev)}
          
        /> 

    <div className='Nav'>
        <button onClick={() => {Index>0?setIndex(Index-1):setIndex(Index)}}>
          <img  className = "size-5" src={PrevButton}/>
        </button>
         <p className='flex justify-center mt-8'>{Index+1}<img className='size-5' src={slash} /> {Questions.length}</p>
    
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
