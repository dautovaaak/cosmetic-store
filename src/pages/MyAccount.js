import React, { useState } from 'react';
import '../styles/MyAccount.css';

const MyAccount = ({ user }) => {
  const [userData, setUserData] = useState(user);

  return (
    <div>
      <h2>My Account</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default MyAccount;
