import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
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
    const productKeys = Object.keys(savedCart)

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