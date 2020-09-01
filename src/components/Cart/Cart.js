import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
  const cart = props.cart
  console.log(cart)

  // const total = cart.reduce((total, prd) => total + prd.price, 0)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity
  }

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 14.99;
  }

  let tax = total / 10; //tax

  const grandTotal = (total + shipping + tax) //all price calculate
  const numberFormat = num => {
    const precision = num.toFixed(2);
    return Number(precision)
  } // function for converting into Number and toFixed into 2 digit

  return (
    <div className="cart">
      <h2>Order Summary</h2>
      <p>Item ordered: ${cart.length}</p>
      <p><small>Product Price: ${numberFormat(total)}</small></p>
      <p><small>Shipping Cost: ${shipping}</small></p>
      <p><small>Tax + VAT: ${numberFormat(tax)}</small></p>
      <p><small>Total Price: ${numberFormat(grandTotal)}</small></p>
      
      {/* <Link to="/review">
        <button className="main-button">Review your order</button>
      </Link> */}
      
      {
        props.children
      }
    </div>
  );
};

export default Cart;