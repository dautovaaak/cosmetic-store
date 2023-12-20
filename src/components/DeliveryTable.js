import React, { Component } from 'react';
import '../styles/DeliveryTable.css';

class DeliveryTable extends Component {
  render() {
    const cities = [
      { name: 'Almaty', deliveryTime: '2-4 days', price: '5' },
      { name: 'Astana', deliveryTime: '3-5 days', price: '8' },
      { name: 'Shymkent', deliveryTime: '4-6 days', price: '12' },
    ];

    return (
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Estimated delivery time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.name}>
              <td>{city.name}</td>
              <td>{city.deliveryTime}</td>
              <td>${city.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DeliveryTable;
