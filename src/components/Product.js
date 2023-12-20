import React, { Component } from 'react';

class Product extends Component {
  render() {
    const { id, name, price, description, imageUrl, onAddToCart } = this.props;

    return (
      <div className="product-card">
        <img src={imageUrl} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price}</p>
        <button onClick={onAddToCart} className="btn btn-dark">Add to Cart</button>
      </div>
    );
  }
}

export default Product;
