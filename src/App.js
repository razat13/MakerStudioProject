import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import Cart from './components/Cart'; 
import { AppProvider } from './store/store';

function App() {
  return (
    <AppProvider>  {/*Wrapping it in AppProvider so the functions will be globally available*/}
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} /> 
        </Routes>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;