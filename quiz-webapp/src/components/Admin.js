import React ,{useState,useEffect} from 'react'
import Header from './Header'
import { getQuizIds } from '../api/UserHelper'
import { addNewQuiz, getQuizzesOnContract } from '../api/web3'

const Admin=()=> {
    const adminUrl = "http://localhost:8000/admin"
    const [quizIds, setQuizIds] = useState([])
    const [quizIdsOnContract, setQuizIdsOnContract]= useState([])
    const getQuizIdsForAdmin = ()=>{
        getQuizIds()
        .then(
            data=>{
                var ids = []
                for(var i=0;i<data.length;i++){
                    ids.push(data[i].id)
                }
                setQuizIds(ids)
            }
        )
    }
    const quizesOnContract = ()=>{
        getQuizzesOnContract().then(
            result=>{
                setQuizIdsOnContract(result)
            }
        )
    }

    const isNewQuiz = ()=>{
        if(quizIds!==quizIdsOnContract){
            if(Math.abs(quizIds.length-quizIdsOnContract.length)){
                alert(`${Math.abs(quizIds.length-quizIdsOnContract.length)} new ${Math.abs(quizIds.length-quizIdsOnContract.length)===1?"quiz":"quizzes"} to be added`)
            }
            else{
                alert("No new quiz to be added!")
            }
        }
    }
    const addQuizzesToContract = ()=>{
        addNewQuiz(quizIds)
        setQuizIds([])
        setQuizIdsOnContract([])
    }
    useEffect(() => {
      getQuizIdsForAdmin()
      quizesOnContract()
    }, [])
    
    
    
    return (
    <div>
    <Header title={"Admin Page"} showHome={true} showWallet={true}/>
    <div className='m-2 my-4'>
    
    <div className='col d-flex justify-content-center'>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}} onClick={addQuizzesToContract}>Add quizzes to contract</button>
    </div>

    
    <div className='col d-flex justify-content-center'>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}} onClick={isNewQuiz}>Check New Quiz</button>
    </div>

    <div className='col d-flex justify-content-center'>
    
    <a href={`${adminUrl}/quiz/quizzes/`} style={{textDecoration:"None"}}>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}}>
    Manage Quizzes
    </button>
    </a>
    </div>

    <div className='col d-flex justify-content-center'>
    <a href={`${adminUrl}/quiz/category/`} style={{textDecoration:"None"}}>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}}>
    Manage Categories
    </button>
    </a>
    </div>

    <div className='col d-flex justify-content-center'>
    <a href={`${adminUrl}/quiz/question/`} style={{textDecoration:"None" }}>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}}>
    Manage Questions
    </button>
    </a>
    </div>

    <div className='col d-flex justify-content-center'>
    <a href={`${adminUrl}/quiz/answer/`} style={{textDecoration:"None"}}>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3", border:"2px solid gray"}}>
    Manage Answers
    </button>
    </a>
    </div>
    </div>
    </div>
  )
}

export default Admin
