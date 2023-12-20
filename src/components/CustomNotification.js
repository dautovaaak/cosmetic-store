import React, { Component } from 'react';
import '../styles/CustomNotification.css';

class CustomNotification extends Component {
  render() {
    const { message } = this.props;
    return <div className="notification">{message}</div>;
  }
}

export default CustomNotification;
