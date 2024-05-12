import React from 'react';
import { useAppContext } from '../store/store';

const Cart = () => {
  const { cartItems, removeFromCart } = useAppContext(); //used for cart items

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-3 mb-4">Shopping Cart</h2>
      {/*Logic for showing if the cart is empty or not*/}
      {cartItems.length === 0 ? (  
        <p>Your cart is empty.</p>  
      ) : (
        <div>
          {cartItems.map((product) => (
            <div className="col-6 col-md-6 col-lg-4 mb-3" key={product.id}>
            <div className="card h-100">
                <img src={product.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={product.title} />
                <div className="m-3 mb-0">
                    <small className="card-title">{product.title.substring(0, 50)}...</small>
                </div>
                <div style={{ marginTop: "auto" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="m-3"><b>${product.price}</b></div>
                    </div>
                </div>
            </div>
            {/*Handling the functionality for removing from cart*/}
            <div className="cart mt-4 align-items-center"> <button onClick={() => handleRemoveFromCart(product.id)} className="btn btn-outline-danger">Remove</button> </div>
        </div>
          ))}
          {/*Keeping the total*/}
          <p className="text-xl font-semibold mt-4">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
          <p className="text-xl font-semibold mt-4">Total Items: {cartItems.length} </p>
        </div>
      )}
    </div>
  );
};

export default Cart;