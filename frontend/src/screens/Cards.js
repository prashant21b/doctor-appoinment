import React, { useState,useEffect } from 'react'
import { Card } from '../components/Card'
import { Spinner } from './Spinner';

export const Cards = () => {
const [data,setData]=useState([]);
const [loading,setLoading]=useState(false);
    async function fetchDoctorData(){
        const API_URL='http://localhost:4000/api/v1/getdoctor'
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
              const iteams = await res.json();
              console.log("product data", iteams.data);
              setData(iteams.data);
            } else {
              console.error("Error: " + res.status);
              setData([]);
            }
          } catch (error) {
            console.error("Error:", error);
            setData([]);
          }
          setLoading(false);
    }
    useEffect(()=>{
        fetchDoctorData()  
      },[]);
  return (
    <div className='container'>
      {
        
     data.map((item)=>{
       return <Card  key={item._id} item={item}/>
     })
        }
    </div>
  )
}
