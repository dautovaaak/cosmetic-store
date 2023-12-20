import React, { Component } from 'react';
import DeliveryTable from '../components/DeliveryTable';
import '../styles/Delivery.css';

class Delivery extends Component {
  render() {
    return (
      <div>
        <h2>Delivery</h2>
        <p>Select your city and find out delivery information:</p>
        <DeliveryTable />
      </div>
    );
  }
}

export default Delivery;
