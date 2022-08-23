// user 
export const userAPI = 'http://127.0.0.1:8000'

export const getAllQuizzes = async ()=>{
    return await fetch(`${userAPI}/quiz/`,{
        method:"GET"
    })
    .then(
        response=>{
            return response.json()
        }

    )
    .catch(err=>{
        console.log(err)
    })
}

export const getQuestionsForQuizById = async (id)=>{
    return await fetch(`${userAPI}/quiz/q/${id}/`,{
        method:"GET"
    })
    .then(
        response=>{
            return response.json()
        }
    )
    .catch(err=>{
        console.log(err)
    })
}

export const getQuizIds = async ()=>{
    return await fetch(`${userAPI}/quiz/qids/`,{
        method:"GET"

    })
    .then(response=>{
        return response.json()
    })
    .catch(
        err=>{
            console.log(err)
        }
    )
}
