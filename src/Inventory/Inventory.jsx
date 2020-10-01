import React from 'react';



const Inventory = () => {
  const handleAddProduct = () => {
    const product = {}
    fetch('https://stormy-coast-31865.herokuapp.com/addProduct', {
      method:'POST',
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify(product),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
  }
  return (
    <div>
      <form action="">
      <p><span>Name:</span><input type="text"/></p>
      <p><span>Price:</span><input type="text"/></p>
      <p><span>Quantity:</span><input type="text"/></p>
      <p><span>Product Image:</span><input type="file"/></p>
      <button onClick={handleAddProduct} type="submit">Add Product</button>
      </form>
      
    </div>
  );
};

export default Inventory;