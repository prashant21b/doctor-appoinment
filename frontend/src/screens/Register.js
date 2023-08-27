import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css'
import { useNavigate, useLocation } from "react-router-dom";
export const Register = () => {
    const [credentials, setCredentials] = useState({
        name:'',
        email: '',
        password: '',
        
      });
let navigate=useNavigate();
const changeHandler = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler= async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/v1/registor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
        
      }),
    });
    navigate('/login');
  };
  return (
    <div className='form-container'>
       
    <form onSubmit={submitHandler} className='form'>
    <h1 style={{textAlign:'center'}}>Registor Form</h1>
        <div className="mb-3">
      <label for="exampleInputName" className="form-label">Name</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputName" value={credentials.name} name='name'/>
    
    </div>
    
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input onChange={changeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} name='email'/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    
    <div className="mb-3">
      <label for="exampleInputPassword" className="form-label">Password</label>
      <input onChange={changeHandler} type="password" className="form-control" id="exampleInputPassword" value={credentials.password}name='password'/>
    </div>
    <button type="submit" className="btn btn-primary">Register</button>
    <div className="d-flex justify-content-between">
  
  <Link className="btn btn-link" to="/login">Already a User</Link>
</div>
  </form>
  </div>
  )
}