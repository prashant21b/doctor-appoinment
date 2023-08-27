import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Layout } from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/Slices/userSlice';
import { showLoading,hideLoading } from '../redux/Slices/alertSlice';

import './home.css'
import { UserCard } from '../components/UserCard';
export const User = () => {
const [data,setData]=useState([]);
const [loading,setLoading]=useState(false);
    async function fetchDoctorData(){
        const API_URL='http://localhost:4000/api/v1/getuser'
        try {
            const res = await fetch(API_URL);
            console.log("re->>",res)
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
    <Layout >
      <div className='container'>
        
      {
        
     data.map((item)=>{
       return <UserCard  key={item._id} item={item}/>
     })
        }
    </div>
    </Layout>
  )
}
//http://localhost:4000/api/v1