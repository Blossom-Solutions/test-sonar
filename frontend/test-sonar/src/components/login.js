import React, { useState } from 'react';
import './login.css';
import PropTypes from 'prop-types';
import Register from './register';



export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  async function loginUser(credentials) {
    return fetch('http://localhost:8000/test/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response =>{
        if(!response.ok){
          throw new Error("invalid credentials")
        } else {
          return response.json()
        }
      }).catch((e)=>{
        console.error(e)
        alert(e)
      })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    e.target.reset();
    const token = await loginUser({
      username,
      password
    });
    if(!token){
      setToken(null)
    }else{
      setToken(JSON.stringify(token))
    }
    window.location.replace("http://localhost:3000/")
  }

  if(!register){
    return(
      <div className="row h-100 text-white justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="col-6">
          <h2 className='mb-3'>Welcome! Please login</h2>
          <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input className='form-control' type="text" onChange={e => setUserName(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <button className='btn btn-primary' type="submit">Submit</button>
            <a className='mx-2 btn btn-primary' onClick={()=>setRegister(true)}>Register</a>
          </div>
        </form>
      </div>
    )
  } else{
    return <Register/>
  }
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}