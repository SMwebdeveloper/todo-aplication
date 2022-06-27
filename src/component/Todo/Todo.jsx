import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {projectFireStore} from '../../firbase/Config'
import Loader from '../../loader/Loader'

const Todo = () => {
    const {id} = useParams()
    const [data, setData] = useState(false)
    const [isPanding, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    
    console.log(id);

    useEffect(()=>{
        setIsPending(true)
        
        projectFireStore
        .collection('todos')
        .doc(id)
        .get()
        .then((doc) =>{
            console.log(doc.data());
            if (doc.exists) {
                setIsPending(false)
                setData(doc.data())
            } else {
                setIsPending(false)
                setError('Could not find that recipe')
            }
        })
        
    },[id])
  return (
    <div className='container d-flex justify-content-around align-items-center h-100 my-5'>
      {isPanding && <Loader/>}
      {error && <h4>{error}</h4>}

      {data && (
          <div className='card w-100 bg-info p-2 text-dark bg-opacity-75 text-center'>
          <h2 className='display-5'>{data.title}</h2> 
          <h6 className='display-6'>{data.deadline}</h6>
          <p className='card-text'>{data.text}</p>
       </div>
      )}
    </div>
  )
}

export default Todo