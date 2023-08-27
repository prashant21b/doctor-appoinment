import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { remove } from '../redux/Slices/bookingSlice';
import { toast } from 'react-hot-toast';
export const BookingItem = ({item}) => {

    async function handleRemove(){
    const id = item._id;
    console.log("id",id)
    const API_URL = `http://localhost:4000/api/v1/deleteAppointment/${id}`;
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        toast.error("Appoinment removed")
      } 
      else {
        console.error("Error: " + res.status);
        
      }
    } 
    catch (error) {
      console.error("Error:", error);

    }
   
  }
       
    
  return (
    <div className="card w-1 my-4 mx-4 item" style={{width:"400px"}}>
  <div className="card-body">
    <table>
      <tbody>
        <tr>
          <td><strong>ID:</strong></td>
          <td>{item._id}</td>
        </tr>
        <tr>
          <td><strong>Doctor:</strong></td>
          <td>Dr. {item.doctor.firstName} {item.doctor.lastName}</td>
        </tr>
        <tr>
          <td><strong>Date:</strong></td>
          <td>{item.appointment_date}</td>
        </tr>
        <tr>
          <td><strong>Time:</strong></td>
          <td>{item.appointment_time}</td>
        </tr>
        <tr>
          <td><strong>Status:</strong></td>
          <td>{item.status}</td>
        </tr>
      </tbody>
    </table>
    <div className="my-3">
      <button className="btn btn-primary mx-2" onClick={handleRemove}>Remove Appointment</button>
    </div>
  </div>
</div>

  )
}
