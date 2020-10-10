import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://stormy-coast-31865.herokuapp.com/products?search='+search)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [search])

  useEffect(() => {
    const savedCart = getDatabaseCart()
    const productKeys = Object.keys(savedCart)
    console.log(products, productKeys);
    fetch('https://stormy-coast-31865.herokuapp.com/productByKeys', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(productKeys),
    })
      .then(res => res.json())
      .then(data => {
        setCart(data)
      })
  }, [])

  //function for search a item
  const handleSearch = event => {
    setSearch(event.target.value)
  }

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
        <input type="text" onBlur={handleSearch} placeholder="Search"/>
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