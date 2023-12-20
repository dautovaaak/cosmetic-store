import React, { Component } from 'react';
import '../styles/FAQ.css';

class FAQ extends Component {
  render() {
    const faqs = [
      {
        question: 'How to make an order?',
        answer: 'To place an order, select the products you want, add them to your cart and follow the ordering instructions.',
      },
      {
        question: 'How can I find out the status of my order?',
        answer: 'You can track the status of your order in the "My Orders" section after logging into your account.',
      },
    ];

    return (
      <div>
        <h2>FAQ</h2>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index}>
              <strong>{faq.question}</strong>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FAQ;
