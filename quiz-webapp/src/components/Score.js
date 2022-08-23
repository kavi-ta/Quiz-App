import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
export default function Score() {
    const location = useLocation()
  return (
    <div>
    <Header title={"Score"} showHome={true}></Header>
    <div className='col d-flex justify-content-center'>
    <div className='card text-center m-4 p-4' style={{width:"500px"}}>
        <div className='card-header' style={{fontSize:20}}>Score for {location.state.name} quiz</div>
        <div className='card-body' style={{fontSize:18}}>
            Score : {location.state.quizScore}
            <br></br>
            {location.state.passed? "You have earned a gold badge!! ":"You did not pass the quiz."}
          
            
        </div>
    </div>
    </div>
    </div>
    
    
  )
}
