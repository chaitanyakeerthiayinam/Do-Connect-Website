import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default UserProfile;