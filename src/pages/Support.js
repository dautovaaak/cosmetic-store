import React, { Component } from 'react';
import Chat from '../components/Chat';

class Support extends Component {
  render() {
    return (
      <div>
        <h2>Customer Service</h2>
        <p>Chat with us:</p>
        <Chat />
      </div>
    );
  }
}

export default Support;
