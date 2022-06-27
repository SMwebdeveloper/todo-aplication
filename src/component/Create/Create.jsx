import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {projectFireStore} from '../../firbase/Config'

function Create() {
  const [title, setTitle] = useState('')
  const [deadline, setDate] = useState('')
  const [text, setText] = useState('')

  const [data, setData] = useState(null)
  const [ isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const doc = {title, deadline, text}
    console.log(doc);
    try {
      setIsPending(true)
      await projectFireStore.collection('todos').add(doc)
      navigate('/')
    } catch (error) {
      console.log(error);
      setError("Not found")
    }
  }
  if (isPending) {
    return <p className='loading'>Biroz kuting qoshilmoqda....</p>
  }
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{padding:'0 200px'}}>
          <label htmlFor="title" className='form-label display-6'>Title</label>
          <input type="text" className='form-control' id='title'  value={title} onChange={(e)=>{
            setTitle(e.target.value)
          }}/>
        </div>
        <div className="mb-3" style={{padding:'0 200px'}}>
          <label htmlFor="date" className='form-label display-6'>Date</label>
          <input type="date" className='form-control' id='date' 
          value={deadline} onChange={(e)=>{
            setDate(e.target.value)
          }}/>
        </div>
        <div className="mb-3" style={{padding:'0 200px'}}>
          <label htmlFor="exampleFormControlTextarea1" className='form-label display-6'>Text</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" value={text} onChange={(e)=>{
            setText(e.target.value)
          }}></textarea>
        </div>

        <div className="mb-3 w-100 my-4" style={{padding:'0 200px'}}>
        <button className='btn btn-outline-primary' style={{width:'100%'}}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Create