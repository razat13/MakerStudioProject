import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(item => item.id === productId);
    if (index !== -1) {
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
    }
  };

  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery, cartItems, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
};
