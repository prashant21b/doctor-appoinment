import axios from 'axios';
import React from 'react'
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setUser } from '../redux/Slices/userSlice';
import {showLoading,hideLoading} from '../redux/Slices/alertSlice'
export const ProtectedRoute = ({children}) => {
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user)
  console.log("user",user)
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4000/api/v1/getUserData",
        { token: localStorage.getItem("jwtToken") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

        if(localStorage.getItem("jwtToken")){
          return children
        }
        else{
            return <Navigate to="/login"/>
        }
    
}
