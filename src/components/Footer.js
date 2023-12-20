import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/delivery">Delivery</Link>
            </li>
            <li>
              <Link to="/support">Customer Service</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}

export default Footer;
