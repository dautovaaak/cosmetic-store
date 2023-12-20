import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/actions/cartActions';
import Notification from '../components/CustomNotification';
import '../styles/Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  handleRemoveFromCart = (productId) => {
    this.props.removeFromCart(productId);
    this.handleNotification();
  };

  handleQuantityChange = (productId, newQuantity) => {
    this.props.updateCartItemQuantity(productId, newQuantity);
  };

  handleNotification = () => {
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 2000);
  };

  render() {
    const { cartItems } = this.props;
    const { showNotification } = this.state;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        this.handleQuantityChange(item.id, parseInt(e.target.value, 10))
                      }
                    />
                  </label>
                  <button onClick={() => this.handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div>
          <strong>Your total:</strong> ${total.toFixed(2)}
        </div>

        {showNotification && <Notification message="Item removed from the cart!" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
    updateCartItemQuantity: (productId, newQuantity) =>
      dispatch(updateCartItemQuantity(productId, newQuantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
