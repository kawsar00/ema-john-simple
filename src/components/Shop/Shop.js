import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
  const first10 = fakeData.slice(0,10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) =>{
    const newCart = [...cart, product];
    setCart(newCart)
    const sameProduct = newCart.map(pd => pd.key === product.key)
    const count = sameProduct.length
    addToDatabaseCart(product.key, count)
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        <ul>
          {
            products.map(pd => <Product showAddToCart={true} product={pd} key={pd.key} handleAddProduct={handleAddProduct}></Product>)
          }
        </ul>
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;