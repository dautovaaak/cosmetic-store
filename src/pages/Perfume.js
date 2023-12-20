import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product';
import '../styles/Perfume.css';
import { addToCart } from '../redux/actions/cartActions';
import CustomNotification from '../components/CustomNotification';

class Perfume extends Component {
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
      { id: 1, name: 'Valentino', price: 35, description: 'Donna Born In Roma Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2249688-main-zoom.jpg?imwidth=350' },
      { id: 2, name: 'Carolina Herrera', price: 19, description: 'Mini Good Girl Blush Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2691095-main-zoom.jpg?imwidth=350' },
      { id: 3, name: 'Gucci', price: 35, description: 'Mini Gorgeous Gardenia and Gorgeous Magnolia Perfume Set', imageUrl: 'https://www.sephora.com/productimages/sku/s2692580-main-zoom.jpg?imwidth=350' },
      { id: 4, name: 'Dior', price: 135, description: 'Miss Dior Blooming Bouquet', imageUrl: 'https://www.sephora.com/productimages/sku/s1725423-main-zoom.jpg?imwidth=332' },
      { id: 5, name: 'CHANEL', price: 120, description: 'COCO MADEMOISELLE Eau de Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg?imwidth=350' },
      { id: 6, name: 'Yves Saint Laurent', price: 85, description: 'Libre Eau De Parfum', imageUrl: 'https://www.sephora.com/productimages/sku/s2371888-main-zoom.jpg?imwidth=350' },
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
        <div className="banner-perfume">
          <img
            src="https://www.sephora.com/contentimages/meganav/large/2023-holiday-site-desktop-global-navigation-button-minis-us-can-3066-release.jpg?imwidth=588"
            alt="Holiday Banner"
          />
          <img src='https://www.sephora.com/contentimages/meganav/large/2020-9-14-site-desktop-global-navigation-button-banner-sol-de-janeiro.jpg?imwidth=588'/>
          <img src='https://www.sephora.com/contentimages/2023-sc-best-skin-ever-powder-foundation-site-desktop-global-navigation-button-590x590-us-can-kohls.jpg?imwidth=588'/>
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

        <h2 className="skincare-label">PERFUME</h2>

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

export default connect(null, mapDispatchToProps)(Perfume);
