import React,{useState} from 'react'
import {Link,Navigate} from "react-router-dom"
import { isQuizAttempted } from '../api/web3'
const Quiz=({quiz})=> {
    const {id, category,title} = quiz 
    const [canAttempt, setCanAttempt] = useState("")
    const isQuizAttemptedByUser = async ()=>{
      await isQuizAttempted(id).then(
        result=>{
          // returns true if the user has not attempted the quiz
          setCanAttempt(result)
          if(!result){
            return alert("you have attempted the quiz")
          }
          
        }
      )

    }

    
  return (
    <div className='mx-5 my-3 card  text-center' style={{width: "18rem" , "display":"inline-block"}}>
        <div className='card-header'>
        {category.name}
        </div>
        <div className='card-body'>
        
        {title}
        </div>
        <div className='card-footer'>

        <button className='btn btn-primary' onClick={isQuizAttemptedByUser}>Start Quiz</button>
        {canAttempt && <Navigate to={`/quiz/${id}`} />}

        </div>
    </div>
  )
}

export default Quiz
