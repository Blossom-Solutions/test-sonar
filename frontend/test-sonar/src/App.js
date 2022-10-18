import React, { useState } from 'react';
import Post from './components/post'
import Dashboard from './components/dashboard'
import Home from './components/home'
import Login from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './components/useToken';


function App() {
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="container">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/post" element={<Post />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
