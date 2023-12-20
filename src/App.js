

// App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Delivery from './pages/Delivery.js';
import Support from './pages/Support.js';
import FAQ from './pages/FAQ.js';
import './styles/App.css';
import Login from './pages/Login.js';
import Registration from './pages/Registration.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccount from './pages/MyAccount.js';
import Skincare from './pages/Skincare.js';
import Makeup from './pages/Makeup.js';
import Perfume from './pages/Perfume.js';
import Cart from './pages/Cart.js';
import ErrorBoundary from './components/ErrorBoundary.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      registeredUser: null,
    };
  }

  handleRegistrationSuccess = (user) => {
    this.setState({ registeredUser: user });
  };

  addToCart = (product) => {
     // Check if the product is already in the cart
     const { cartItems } = this.state;
     const existingItem = cartItems.find((item) => item.id === product.id);
 
     if (existingItem) {
       // If the product is already in the cart, increase the quantity
       this.setState((prevState) => ({
         cartItems: prevState.cartItems.map((item) =>
           item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
         ),
       }));
     } else {
       // If the product is not in the cart, add a new item
       this.setState((prevState) => ({
         cartItems: [...prevState.cartItems, { ...product, quantity: 1 }],
       }));
     }
   };

  render() {
    const { registeredUser } = this.state;
    return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-container">
            <ErrorBoundary>
              <Routes>
              <Route path="/registration" element={<Registration onRegistrationSuccess={this.handleRegistrationSuccess} />} />
            <Route path="/login" element={<Login registeredUser={registeredUser} />} />
            <Route path="/myaccount" element={<MyAccount user={registeredUser} />} />
          
<Route path="/" element={<ProductList addToCart={this.addToCart} />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/skincare" element={<Skincare />} />
              <Route path="/makeup" element={<Makeup />} />
              <Route path="/perfume" element={<Perfume />} />
              <Route path="/cart" element={<Cart />} />
             </Routes>              
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
