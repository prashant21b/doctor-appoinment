import { trusted } from 'mongoose'
import React from 'react'
import { toast } from 'react-hot-toast';
export const DoctorCard = ({item}) => {
async function verifyDoctor(){
  try{
    const id=item._id;
    const res=await  fetch(`http://localhost:4000/api/v1/verifydoctor/${id}`)
    if (res.ok) {
      toast.success("Doctor Verified Sucessfully")
    } 
    else {
      console.error("Error: " + res.status);
      
    }
  }
  catch(error){
  console.log(error);
  }
}
  const verifyHandler=()=>{
verifyDoctor();
  }
  return (
    <>
      {item && item.isVerified === true ? (
        <div className="card w-2 my-4 item">
          <div className="card-body">
            <h3>
              Dr. {item.firstName} {item.lastName}
            </h3>
            <p className="card-text">
              <strong>Phone:</strong> {item.phone}
            </p>
            <p className="card-text">
              <strong>Website:</strong>{" "}
              <a href="https://google.com">{item.website}</a>
            </p>
            <p className="card-text">
              <strong>Address:</strong> {item.address}
            </p>
            <p className="card-text">
              <strong>Specialization:</strong> {item.specialization}
            </p>
            <p className="card-text">
              <strong>Experience:</strong> {item.experience} Year
            </p>
            <p className="card-text">
              <strong>Fee:</strong> ₹{item.fee}
            </p>
            <p className="card-text">
              <strong>Timings:</strong> {item.startingTime} - {item.endingTime}
            </p>
          </div>
        </div>
      ) : null}
    </>
    
  )
}
