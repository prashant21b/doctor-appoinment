import React from 'react';
import './card.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { add } from '../redux/Slices/bookingSlice';
import toast from 'react-hot-toast';

export const Card = ({ item }) => {
  const { user } = useSelector((state) => state.user);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const dispatch = useDispatch();

  const handleBook = () => {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);

    if (!appointmentDate) {
      toast.error('Please select a date');
      return;
    }
    if (!appointmentTime) {
      toast.error('Please select a time');
      return;
    }

    if (selectedDateTime <= currentDate) {
      toast.error('Please select a date and time greater than the current date and time');
      return;
    }

    // const startingTime = new Date(`2000-01-01T${item.startingTime}`);
    // const endingTime = new Date(`2000-01-01T${item.endingTime}`);

    // if (selectedDateTime < startingTime || selectedDateTime > endingTime) {
    //   toast.error('Please select a time in which the doctor is available');
    //   return;
    // }

    // const bookingData = {
    //   doctor: `${item.firstName} ${item.lastName}`,
    //   date: appointmentDate,
    //   time: appointmentTime,
    //   address: item.address,
    // };

    // dispatch(add(bookingData));

    const bookingData2 = {
      patientId: user?.data._id,
      doctorId: item._id,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    };

    axios
      .post('http://localhost:4000/api/v1/createAppointment', bookingData2)
      .then((response) => {
        toast.success('Appointment Booked');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to book appointment');
      });
  };

  const handleCheckAvailability = () => {
    // Handle check availability logic here
  };
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
  async function rejectDoctor(){
    try{
      const id=item._id;
      const res=await  fetch(`http://localhost:4000/api/v1/rejectdoctor/${id}`)
      if (res.ok) {
        toast.success("Doctor Rejected Sucessfully")
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
    const rejectHandler=()=>{
rejectDoctor();
    }
  return (
    <div className="card w-2 my-4 item">
  <div className="card-body">
    <h3>
      Dr. {item.firstName} {item.lastName}
    </h3>
    <p className="card-text">
      <strong>Phone:</strong> {item.phone}
    </p>
    <p className="card-text">
      <strong>Website:</strong> <a href="https://google.com">{item.website}</a>
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
    {item.isVerified === true && user?.data.isAdmin === false ? (
      <>
        <div className="form-group">
          <label htmlFor="appointmentDate">
            Select Date for Appointment:<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            id="appointmentDate"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">
            Select Time for Appointment:<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="time"
            id="appointmentTime"
            className="form-control"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <button className="btn btn-primary mx-2" onClick={handleBook}>
            Book
          </button>
          <button className="btn btn-primary" onClick={handleCheckAvailability}>
            Check Availability
          </button>
        </div>
      </>
    ) : user?.data.isAdmin === true  && item.isVerified===false? (
      <>
      <button className="btn btn-primary mx-4" onClick={verifyHandler}>Verify</button>
      <button className="btn btn-danger" onClick={rejectHandler}>Reject</button>
      </>
    ) : null}
  </div>
</div>

  );
};
