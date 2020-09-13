import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
  const [cart, setCart] = useState([])
  const [placeOrder, setPlaceOrder] = useState(false)
  const history = useHistory()

//function for place order and showing thank you image
  const handleProceedCheckout = () => {
    history.push('/shipment')
    // setCart([])
    // setPlaceOrder(true)
    // processOrder()
  }

//for removing product from review order page
  const removeProduct = (productKey) => {
    console.log('clicked', productKey)
    const newCart = cart.filter(pd => pd.key !== productKey)
    setCart(newCart)
    removeFromDatabaseCart(productKey)
  }

// useEffect for getting data from local storage and set quantity
  useEffect(() => {
    const savedCart = getDatabaseCart()
    // console.log(savedCart)
    const productKeys = Object.keys(savedCart)

    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key)
      product.quantity = savedCart[key]
      return product;
    })
    setCart(cartProducts)
  }, [])

  //to showing place order image
  let thankYou;
  if (placeOrder) {
    thankYou = <img src={happyImage} alt="" />
  }

  return (

    <div className="twin-container">
      <div className="product-container">
        {
          cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
        }
        {
          thankYou // for showing image after clicking place order
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">Proceed checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;