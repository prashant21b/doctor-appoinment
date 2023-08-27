import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Profile= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
const {user}=useSelector(state=>state.user)
  const [isEditable, setIsEditable] = useState(false);
  console.log("userId",user?.data._id)
  const getUserData = async () => {
        try {
          
          const res = await axios.post("http://localhost:4000/api/v1/profile", {
      id: user?.data._id,
    });
          console.log("profile",res);
          
          setName(res.data.name);
          setEmail(res.data.email);
          
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
    getUserData();
      },[])

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or API request here
    // You can use the 'name', 'email', and 'password' values to save the user profile
    setIsEditable(false);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditable}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditable}
            required
          />
        </Form.Group>
        {!isEditable && (
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}

        {isEditable && (
          <Button variant="primary" type="submit">
            Save
          </Button>
        )}
      </Form>
    </Layout>
  );
};

export default Profile;
