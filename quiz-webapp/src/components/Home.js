import React, { useEffect,useState } from 'react'
import { getAllQuizzes } from '../api/UserHelper'
import { getOwner} from '../api/web3'
import Header from './Header'
import Quiz from './QuizCard'

const Home = ()=> {
  const [quizzes, setQuizzes] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getAllQuizzes().then(
      data=>{
        setQuizzes(data)
        setIsAdmin(getOwner())
      }
    )
  }, []) 
  return (
    <div>
    <Header title={"Quizzez"} showWallet={true} showAdmin={isAdmin}/>
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