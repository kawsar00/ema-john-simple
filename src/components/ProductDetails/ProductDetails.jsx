import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
  const {productKey} = useParams()
  const [product, setProduct] = useState([])
  useEffect(() => {
    fetch('https://stormy-coast-31865.herokuapp.com/product/'+productKey)
    .then(res => res.json())
    .then(data => setProduct(data))
  }, [productKey])

  
  return (
    <div>
      <h1>Your Product Details</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;