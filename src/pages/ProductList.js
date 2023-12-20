import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/ProductList.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';

class ProductList extends Component {
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
      { id: 1, name: 'Glossier', price: 98, description: 'Glossier You XL Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2737690-main-zoom.jpg?imwidth=332' },
      { id: 2, name: 'LANEIGE', price: 24, description: 'Lip Sleeping Mask Intense Hydration with Vitamin C', imageUrl: 'https://www.sephora.com/productimages/sku/s1966258-main-zoom.jpg?imwidth=332' },
      { id: 3, name: 'Summer Fridays', price: 24, description: 'Lip Butter Balm for Hydration & Shine', imageUrl: 'https://www.sephora.com/productimages/sku/s2495497-main-zoom.jpg?imwidth=332' },
      { id: 4, name: 'Dior', price: 135, description: 'Miss Dior Blooming Bouquet', imageUrl: 'https://www.sephora.com/productimages/sku/s1725423-main-zoom.jpg?imwidth=332' },
      { id: 5, name: 'Rare Beauty', price: 23, description: 'Soft Pinch Liquid Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2640241-main-zoom.jpg?imwidth=332' },
      { id: 6, name: 'The Ordinary', price: 9, description: 'Hyaluronic Acid 2% + B5 Hydrating Serum', imageUrl: 'https://www.sephora.com/productimages/sku/s2031375-main-zoom.jpg?imwidth=332' },
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
        <div className="banner-container">
          <img src='https://cdn.shopify.com/s/files/1/0576/9579/7455/files/Nyx_Free_Gift_Main_Banner.png?v=1702644120' alt="Banner" />
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
        <div className='so'>
          <div className="sort-container">
            <div className="sort-label">Sort by Price:</div>
            <label>
              <select className="sort-button" onChange={(e) => this.handleSortChange(e.target.value)}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>
          </div>
        </div>

        <h2 className="bestsellers-label">BESTSELLERS</h2>
        <div className="product-container">
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

export default connect(null, mapDispatchToProps)(ProductList);
