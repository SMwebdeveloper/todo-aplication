import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {projectFireStore} from '../../firbase/Config'
import Loader from '../../loader/Loader'

function Home() {
  const [data, setData] = useState(false)
  const [isPanding, setIsPending] = useState(false)
  const [error, setError] = useState(false)
 

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFireStore
     .collection('todos')
     .onSnapshot((snapshot) => {
       console.log(snapshot);
       if (snapshot.empty) {
        setError('No recipe')
        setIsPending(false)
      } else{ 
        const results = []
        snapshot.docs.forEach((doc) =>{
          results.push({...doc.data(), id: doc.id})
        })
        setData(results)
        setIsPending(false)
       }
       return () => unsub()
     })
  }, [])

  const deleteTodo = (id) =>{
      console.log(id);
      projectFireStore.collection('todos').doc(id).delete()
  }
  return (
    <div className='container d-flex justify-content-around align-items-center flex-wrap my-5'>
     {isPanding && <Loader/>}
     {error && <p>{error}</p>}

     {data && data.map((todo)=> {
       return(
         
        <div className="card  p-3 my-3" key={todo.id} style={{width:"30%"}}>
          <h2 className="card-title display-6">
            {todo.title}
          </h2>
          <p className="card-text">
            {todo.text}
          </p>
          <p className="card-text">
            {todo.deadline}
          </p>
         <div className='d-flex'>
         <Link to={`/todo/${todo.id}`} className='btn btn-outline-primary  w-50 mx-1' >
            Read More
          </Link>
          <button className='btn btn-outline-danger d-inline-block mx-1' style={{width:'50%'}} 
          onClick={()=> {
            deleteTodo(todo.id)
          }}
          >Delete</button>
         </div>
        </div>
        
       )
     })}
   
    </div>
  )
}

export default Home