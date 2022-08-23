import React ,{useState} from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { getQuizIds } from '../api/UserHelper'
import { addNewQuiz } from '../api/web3'

const Admin=()=> {
    // 
    const adminUrl = "http://localhost:8000/admin"
    const [quizIds, setQuizIds] = useState("")

    const getQuizIdsForAdmin = ()=>{
        getQuizIds()
        .then(
            data=>{
                var ids = []
                for(var i=0;i<data.length;i++){
                    ids.push(data[i].id)
                }
                setQuizIds(ids)
                addNewQuiz(ids)
                
            }
            
            
        )
    }
    return (
    <div>
    
    <Header title={"Admin Page"} showHome={true} showWallet={true}/>
    <div className='m-2 my-4'>
    <div className='col d-flex justify-content-center'>
    <button className='m-2 btn btn-light' style={{width:400,backgroundColor:"#f3f3f3",border:"2px solid gray"}}>Add quizzes to contract</button>
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
