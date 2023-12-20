import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Skincare.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';

class Skincare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      filter: 'all',
      sortOrder: 'asc',
      isFilterListOpen: false,
      searchQuery: '',
      showNotification: false,
    };

    this.products = [
      { id: 1, name: 'Summer Fridays', price: 24, description: 'Lip Butter Balm for Hydration & Shine', imageUrl: 'https://www.sephora.com/productimages/sku/s2715035-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 2, name: 'The Ordinary', price: 9, description: 'Hyaluronic Acid 2% + B5 Hydrating Serum', imageUrl: 'https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?pb=2020-03-allure-best-2019&imwidth=350' },
      { id: 3, name: 'Glow Recipe', price: 16, description: 'Watermelon Glow PHA + BHA Pore-Tight Toner', imageUrl: 'https://www.sephora.com/productimages/sku/s2421519-main-zoom.jpg?pb=clean-planet-positive-badge-2021&imwidth=350' },
      { id: 4, name: 'Sephora', price: 6, description: 'Hydrating Face Masks', imageUrl: 'https://www.sephora.com/productimages/sku/s2614394-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 5, name: 'Drunk Elephant', price: 23, description: 'Protini™ Polypeptide Firming Refillable Moisturizer', imageUrl: 'https://www.sephora.com/productimages/sku/s2025633-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
      { id: 6, name: 'Tatcha', price: 25, description: 'The Dewy Skin Cream Plumping & Hydrating Moisturizer', imageUrl: 'https://www.sephora.com/productimages/sku/s2181006-main-zoom.jpg?pb=2020-03-sephora-clean-2019&imwidth=350' },
    ];
  }

  handleSortChange = (newSortOrder) => {
    this.setState({ sortOrder: newSortOrder });
  };

  handleAddToCart = (product) => {
    this.props.addToCart(product);
    this.setState({ showNotification: true });

    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 2000);
  };

  handleClearSearch = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { sortOrder, searchQuery, showNotification } = this.state;

    const filteredProducts = this.products
      .filter((product) => this.state.filter === 'all' || product.category === this.state.filter)
      .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return (
      <div className="container">
        <div className='banner-skin'>
          <img src='https://www.sephora.com/contentimages/2023-11-25-slotting-moisturizers-by-skin-type-site-rwd-home-page-hero-banner-US-CA-handoff_01.jpg?imwidth=1090'/>
          <img src='https://www.sephora.com/contentimages/2023-holiday-launch-site-home-page-rwd-hero-banner-newness-2843-release-us-image-only.jpg?imwidth=1090'/>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
          {searchQuery && (
            <span className="clear-icon" onClick={this.handleClearSearch}>
              &#10006;
            </span>
          )}
        </div>

        <h2 className="skincare-label">SKINCARE</h2>

        <div className="so">
          <div className="sort-container">
            <div className="sort-label">Sort by Price:</div>
            <label>
              <select
                className="sort-button"
                onChange={(e) => this.handleSortChange(e.target.value)}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>
          </div>
        </div>

        <div className="product-list">
          {sortedProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              onAddToCart={() => this.handleAddToCart(product)}
            />
          ))}
        </div>
        {showNotification && <CustomNotification message="Item added to the cart!" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(null, mapDispatchToProps)(Skincare);
