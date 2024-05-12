import React, { createContext, useState, useContext } from 'react'; 

const AppContext = createContext();  //creating the appcontext so all the other components can use them

export const useAppContext = () => useContext(AppContext);   

export const AppProvider = ({ children }) => {  
  const [searchQuery, setSearchQuery] = useState('');   //for searching items
  const [cartItems, setCartItems] = useState([]);  //for the cart items

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(item => item.id === productId);
    if (index !== -1) {
      updatedCart.splice(index, 1);   //not deleting all the instances of that product
      setCartItems(updatedCart);
    }
  };

  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery, cartItems, addToCart, removeFromCart }}>  
      {children}                                               
    </AppContext.Provider>
  );
};
//wrapping the children in the provider so that they can use all the functionalities
