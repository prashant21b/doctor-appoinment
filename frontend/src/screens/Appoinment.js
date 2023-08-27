import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { BookingItem } from '../components/BookingItem';

export const Appoinment = () => {
  const { user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchDoctorData() {
    const patientId = user?.data._id;
    const API_URL = `http://localhost:4000/api/v1/getAppointmentsByPatient/${patientId}`;
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const { data: items } = await res.json();
        console.log("appointment data", items);
        setData(Array.isArray(items) ? items : []);
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

  useEffect(() => {
    fetchDoctorData();
  }, [],[BookingItem]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <div className=''style={{ minHeight: "700px" }}>
        {data.length > 0 ? (
          <div className="d-flex justify-content-between">
            <div className="w-75">
              {data.map((item, index) => {
                return <BookingItem key={item._id} item={item} itemIndex={index} />;
              })}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-screen">
            <h1>Appointment List is Empty...</h1>
            <Link to={"/home"}>
              <button className="btn btn-primary mt-4">Book Now</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
