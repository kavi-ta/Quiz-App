import React, { useEffect,useState } from 'react'
import { getAllQuizzes } from '../api/UserHelper'
import Header from './Header'
import Quiz from './QuizCard'

const Home = ()=> {
  const [quizzes, setQuizzes] = useState([])

  

  useEffect(() => {
    getAllQuizzes().then(
      data=>{
        setQuizzes(data)
      }
    )
  }, [])
  
  return (
    <div>
    <Header title={"Quizzez"} showWallet={true}/>
    <div className='m-4 p-3'>
    {quizzes.map((quiz)=>{
      return <Quiz key = {quiz.id}
       quiz={quiz}/>
    })}
    </div>
    </div>
  )
}


export default Home