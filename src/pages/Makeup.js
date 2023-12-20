import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Makeup.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';

class Makeup extends Component {
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
      { id: 1, name: 'ILIA', price: 48, description: 'Super Serum Skin Tint SPF 40 Skincare Foundation', imageUrl: 'https://www.sephora.com/productimages/sku/s2333607-main-zoom.jpg?pb=allure-best-2020&imwidth=350' },
      { id: 2, name: 'Sephora', price: 14, description: 'Sephora Colorful® Shadow and Liner Pencil', imageUrl: 'https://www.sephora.com/productimages/sku/s1311067-main-zoom.jpg?pb=2023-03-sephora-value-2023&imwidth=350' },
      { id: 3, name: 'Charlotte Tilbury', price: 19, description: 'Hollywood Flawless Filter', imageUrl: 'https://www.sephora.com/productimages/sku/s2419786-main-zoom.jpg?imwidth=350' },
      { id: 4, name: 'NARS', price: 15, description: 'Radiant Creamy Concealer', imageUrl: 'https://www.sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=350' },
      { id: 5, name: 'Rare Beauty', price: 23, description: 'Soft Pinch Liquid Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2640241-main-zoom.jpg?imwidth=332' },
      { id: 6, name: 'Dior', price: 40, description: 'Lip Glow Oil', imageUrl: 'https://www.sephora.com/productimages/sku/s2316248-main-zoom.jpg?imwidth=350' },
      { id: 7, name: 'Dior', price: 40, description: 'Rosy Glow Blush', imageUrl: 'https://www.sephora.com/productimages/sku/s2666030-main-zoom.jpg?imwidth=500' },
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

        <h2 className="skincare-label">MAKEUP</h2>

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
          <div className='banner-makeup'>
            <img src='https://www.sephora.com/contentimages/2023-12-19-rare-new-exclusive-body-collection-site-desktop-mobile-top-cat-nth-level-including-brand-pages-content-grid-tile-en-us-can.jpg?imwidth=500'/>
          </div>
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
          <div className='banner-makeup'>
            <img src='https://www.sephora.com/contentimages/categorybanners/2023-feb-contour-site-desktop-mobile-category-content-tile-us-can-release.png?imwidth=500'/>
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

export default connect(null, mapDispatchToProps)(Makeup);
