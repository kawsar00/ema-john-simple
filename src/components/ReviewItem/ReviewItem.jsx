import React from 'react';

const ReviewItem = (props) => {
  console.log(props.product)
  const { name, quantity, key, price } = props.product
  const reviewStyle = {
    borderBottom: '1px solid lightgray',
    marginBottom: '5px',
    paddingBottom: '5px',
    marginLeft: '200px',

  }
  return (
    <div style={reviewStyle}>
      <h4 className="product-name">{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>Product Price: ${price}</p>
      <br />
      <button onClick={() => props.removeProduct(key)} className="main-button">Remove Item</button>

    </div>
  );
};

export default ReviewItem;