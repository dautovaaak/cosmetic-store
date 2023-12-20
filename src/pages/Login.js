import React, { useState } from 'react';
import MyAccount from './MyAccount';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ registeredUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = async () => {
    try {
      if (registeredUser && registeredUser.username && registeredUser.password) {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: registeredUser.username,
          password: registeredUser.password,
        });

        setLoggedInUser(response.data); 

      } else {
        console.error('Invalid registered user data');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      {loggedInUser ? (
        <MyAccount user={loggedInUser} />
      ) : (
        <form>
          <label>
            Username
            <input className="in-login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password
            <input className="in-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
