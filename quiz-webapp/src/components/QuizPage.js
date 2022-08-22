
import React,{useEffect, useState} from 'react'
import { useParams , Link, useNavigate} from 'react-router-dom'
import { getQuestionsForQuizById } from '../api/UserHelper'
import { submitQuiz, viewScore } from '../api/web3'

export default function QuizPage() {
    const navigate = useNavigate()
    let {id} = useParams()
    const [question, setQuestion] = useState([])
    const [isQuiz, setIsQuiz] = useState(false)
    const [questionanswer, setQuestionAnswer] = useState({})
    const [answer, setAnswer] = useState([])
   const getQuestions = (id)=>{
    getQuestionsForQuizById(id)
   .then(
       data=>{
           setQuestion(data)
           setIsQuiz(true)
       }
   ).catch(
       err=>{
           console.log(err)
       }
   )}

    useEffect(() => {
        getQuestions(id)
    },[id])

    const onAnswerChange = (id,index)=>(event)=>{
        setQuestionAnswer({...questionanswer,[id]:event.target.value})
        var ans= answer
        ans[index] = event.target.value
        setAnswer(ans)  
        
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await submitQuiz(id,answer).then(
            result=>{
                viewScore(id).then(
                    score=>{
                        return (navigate('/score',{state:{name:`${question[0].quiz.category.name}`,quizId:`${id}`, quizScore: score[1], passed:score[0]}}))
                    }                   
                )
            }
        )
    }
  return (

    <div>
    <div className='p-4 text-center' style={{backgroundColor:"red", fontSize:20}}>
    <Link to={"/"} className='btn btn-dark' style={{float:"right"}}>Close</Link>
    <label className='btn btn-dark' style={{float:"left"}}>{isQuiz ? question[0].quiz.category.name:"No quiz here"}</label> 
    {isQuiz? question[0].quiz.category.name:"No title"}  
    </div>
        <div className='col-md-6 col-lg-6 offset-sm-3 text-left shadow p-3 mb-5 bg-white rounded my-4'>
        <form className='p-2 m-2'>
                <div className='form-group'>
                {isQuiz?
                    question.map((ques,index)=>{
                    return (<div key={ques.id}>
                                <label for={`${ques.id}`} name={`${ques.id}`}>{index+1}. {ques.title} 
                                <div className="form-check mx-3" id={`${ques.id}`} onChange={onAnswerChange(`${ques.id}`,`${index}`)}>
                                {ques.answer.map((option)=>{
                                    return (
                                        <div  key={option.id}  >
                                        <input className="form-check-input" type="radio" name={`${ques.id}`} id={`${ques.id}`}
                                            value={option.is_right}
                                            /> {option.answer_text}
                                        </div>
                                    )    
                                })}
                                </div>
                                </label>
                            </div>)  
                })
                :
                "No questions"
            }
                </div>
                <button type="submit" class=" my-4 btn btn-primary " onClick={handleSubmit}>Submit Quiz</button>
        </form>
        </div>
        
    </div>
    
  )
}
