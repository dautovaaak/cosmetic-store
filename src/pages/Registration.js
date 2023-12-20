import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

const Registration = ({ onRegistrationSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/registration', {
        username,
        password,
      });

      const registeredUser = response.data;
      onRegistrationSuccess(registeredUser);

    } catch (error) {
      console.error('Registration failed:', error.response || error.message || error);
    }
  };

  return (
    <div className='reg-container'>
      <h2>Registration</h2>
      <form>
        <label>
          Username:
          <input className ="in-reg" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input className ="in-reg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className = "reg-button" type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
