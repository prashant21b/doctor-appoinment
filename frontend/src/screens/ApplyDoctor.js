import React from 'react'
import { useState } from 'react';

import './applydoctor.css';
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from '../components/Layout';
import { useSelector } from 'react-redux';
export const ApplyDoctor= () => {
  const { user } = useSelector((state) => state.user);
  console.log("doc",user)
    const [credentials, setCredentials] = useState({
        fname:'',
        lname: '',
        phone: '',
        email:'',
        website:'',
        address:'',
        specialization:'',
        experience:'',
        fee:'',
        startingTime:'',
        endingTime:'',
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
    const response = await fetch('http://localhost:4000/api/v1/apply-doctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId:user?.data._id,
        firstName:credentials.fname,
        lastName:credentials.lname,
        phone:credentials.phone,
        email: credentials.email,
        website: credentials.website,
        address:credentials.address,
        specialization:credentials.specialization,
        experience:credentials.experience,
        fee:credentials.fee,
        startingTime:credentials.startingTime,
        endingTime:credentials.endingTime
        
      }),
    });
    navigate('/');
  };
  return (
    <Layout>
    <div className='form-container'>
       
    <form onSubmit={submitHandler} >
    <h1 style={{textAlign:'center'}}>Apply Doctor Form</h1>
        <div className="mb-2 row">
      <label for="exampleInputFName" className="form-label ">First-Name<span className='required'>*</span></label>
      <input onChange={changeHandler} type="text" className="form-control " id="exampleInputFName" value={credentials.fname} name='fname' required/>
    
    </div>
    <div className="mb-2 row">
      <label for="exampleInputLName" className="form-label mb-0">Last-Name<span className='required'>*</span></label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputLName" value={credentials.lname} name='lname' required/>
    
    </div>
    <div className="mb-2 row">
      <label for="exampleInputPhone" className="form-label">Phone<span className='required'>*</span></label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputPhone"  value={credentials.phone} name='phone' required/>
      
    </div>
    <div className="mb-2 row">
      <label for="exampleInputEmail1" className="form-label">Email address<span className='required'>*</span></label>
      <input onChange={changeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} name='email' required/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    
    <div className="mb-2 row">
      <label for="exampleInputWebsite" className="form-label">Website-LInk</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputWebsit" value={credentials.website}name='website'/>
    </div>
    <div className="mb-2 row">
      <label for="exampleInputAddress" className="form-label">Address</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputAddress" value={credentials.address}name='address'/>
    </div>
    <div className="mb-2 row">
      <label for="exampleInputSpecialization" className="form-label">Specialization</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputSpecialization" value={credentials.specialization} name='specialization'/>
    </div>
    <div className="mb-2 row">
      <label for="exampleInputExperience" className="form-label">Experience</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputExperience" value={credentials.experience} name='experience'/>
    </div>
    <div className="mb-2 row">
      <label for="exampleInputFee" className="form-label">Fee</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputFee" value={credentials.fee} name='fee'/>
    </div>
    {/* <div className="mb-2 row">
      <label for="exampleInputTiming" className="form-label">Timing</label>
      <input onChange={changeHandler} type="text" className="form-control" id="exampleInputTiming" value={credentials.timings} name='timings'/>
    </div> */}
    <div className="mb-2 row">
  <label htmlFor="exampleInputStartingTime" className="col-sm-2 col-form-label">Starting Time</label>
  <div className="col-sm-10">
    <input onChange={changeHandler} type="time" className="form-control" id="exampleInputStartingTime" value={credentials.startingTime} name="startingTime" />
  </div>
</div>
<div className="mb-2 row">
  <label htmlFor="exampleInputEndingTime" className="col-sm-2 col-form-label">Ending Time</label>
  <div className="col-sm-10">
    <input onChange={changeHandler} type="time" className="form-control" id="exampleInputEndingTime" value={credentials.endingTime} name="endingTime" />
  </div>
</div>

    <button type="submit" className="btn btn-primary">Apply</button>
  </form>
  </div>
  </Layout>
  )
}