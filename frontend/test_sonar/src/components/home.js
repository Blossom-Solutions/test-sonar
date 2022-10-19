import React, { useState, useEffect } from 'react';
import TinyPost from './tinyPost';

export default function Home() {
  const [results, setResults] = useState([])
  const getToken = () => {
    const tokenData = JSON.parse(sessionStorage.getItem('token'));
    return tokenData?.access
  };
  const token = getToken()

  const getData = async ()=>{
    const response = await fetch('http://localhost:8000/test/api/posts/',{
        headers: new Headers({
        'Authorization': 'Bearer '+ token
      })
    })
    const data = await response.json()
    setResults(data)
  }

  useEffect(()=>{
    if(!results.length){getData()}
    
  },[])

  return(
      <div className='container  justify-content-center align-items-center mb-3'>
        {
        results.map(post=>
          <TinyPost key={post.id} post={post}/>
        )
      }
      </div>
  )
}