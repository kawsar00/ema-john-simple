import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    const previousCart = productKeys.map(existingKey => {
      const product = fakeData.find(pd => pd.key === existingKey)
      product.quantity = savedCart[existingKey]
      return product

    })
    setCart(previousCart)

  }, [])

  const handleAddProduct = (product) => {
    // const newCart = [...cart, product];
    // setCart(newCart)
    // const sameProduct = newCart.map(pd => pd.key === product.key)
    // const count = sameProduct.length
    // addToDatabaseCart(product.key, count)

    const toBeAddedKey = product.key
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey)
      newCart = [...others, sameProduct]
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    setCart(newCart)
    addToDatabaseCart(toBeAddedKey, count)
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        <ul>
          {
            products.map(pd => <Product showAddToCart={true} product={pd} key={pd.key} handleAddProduct={handleAddProduct}></Product>)
          }
        </ul>
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review your order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;