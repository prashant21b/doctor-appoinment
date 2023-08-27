import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/Layout';

export const Notification = () => {
  const { user } = useSelector(state => state.user);

  return (
    <Layout>
        <div>
      <h2>Notifications</h2>
      {user?.data.notifcation
.map((notification, index) => (
        <div key={index}>
          <p>{notification}</p>
        </div>
      ))}
    </div>
    </Layout>
    
  );
};
