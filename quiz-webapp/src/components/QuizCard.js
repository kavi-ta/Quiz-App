import React,{useState} from 'react'
import {Navigate} from "react-router-dom"
import { isQuizAttempted, quizExistsOnContract } from '../api/web3'
const Quiz=({quiz})=> {
    const {id, category,title} = quiz 
    const [canAttempt, setCanAttempt] = useState("")

    const isQuizAttemptedByUser = async ()=>{
      
      await quizExistsOnContract(id)
      .then(
        data=>{
          if(data){
            quizAttemptedOrNot()
          }
          else{
            alert("Quiz Does not exist! Try again later.")
          }
        } 
      )
    }
    
    
    const quizAttemptedOrNot = ()=>{
      isQuizAttempted(id).then(
        result=>{
          // returns true if the user has not attempted the quiz
          console.log("quiz attempt",result)
          setCanAttempt(result)
          if(!result){
            return alert("you have attempted the quiz")
          }   
        }
      )
    }
  return (
    <div className='mx-4 my-3 card text-center' style={{width: "17rem" , "display":"inline-block" }}>
      <div className='card-header' style={{fontWeight:500, fontSize:"20",backgroundColor:"#d3d3d3"}}>
        Category : {category.name}
        </div>
        <div className='card-body' style={{fontWeight:500 , backgroundColor:"#f3f3f3"}}>
        {title}
        <br></br>
        <button className='btn btn-dark mt-3 btn-sm' onClick={isQuizAttemptedByUser}>Start Quiz</button>
        {canAttempt && <Navigate to={`/quiz/${id}`} />}
        </div>
    </div>
  )
}

export default Quiz
