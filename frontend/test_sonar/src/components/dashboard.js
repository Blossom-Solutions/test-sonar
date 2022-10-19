import React, {useState, useEffect} from 'react';

export default function Dashboard() {
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
    setResults(data.slice(0,5))
  }

  useEffect(()=>{
    if(!results.length){getData()}
    
  },[])

  return(
    <div className='container h-100'>
      <h2 className='text-center text-white my-3'>Top 5 Posts of All Time</h2>
      {
        results.map((post)=>{
          return(
            <div className='row justify-content-center align-items-center mb-3'>
              <div className='card bg-dark col-12 px-0'>
                <div className="card-body">
                  <h5 className="text-white card-title">{post.title}</h5>
                  <p className="text-white card-text">{post.description}</p>
                  <b className="px-3  text-white">{post.likes} Likes</b>
                  <b className="px-3  text-white">{post.views} Views</b>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}