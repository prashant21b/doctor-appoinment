import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import './register.css'
import axios from 'axios'
import { setUser } from '../redux/Slices/userSlice';
import { Dispatch, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
export const Login = () => {
  const dispatch=useDispatch();
    const [credentials, setCredentials] = useState({
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
    const response = await fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter valid Credentials');
    }
    if(json.success){
      localStorage.setItem("jwtToken",json.jwtToken);
     console.log(localStorage.getItem("authToken"));
     navigate('/home')
     toast.success("Login Sucessfully")
    }
  };
  return (
    <div className='form-container'>
    <form onSubmit={submitHandler} className='form'>
    <h1 style={{textAlign:'center'}}>Login Form</h1>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input onChange={changeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} name='email'/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label">Password</label>
      <input onChange={changeHandler} type="password" className="form-control" id="exampleInputPassword1" value={credentials.password}name='password'/>
    </div>
    
    <button type="submit" className="btn btn-primary">Login</button>
    <div className="d-flex justify-content-between">
  <Link className="btn btn-link" to="/forgot-password">Forgot Password</Link>
  <Link className="btn btn-link" to="/register">New User</Link>
</div>

    
  </form>
  </div>
  )
}