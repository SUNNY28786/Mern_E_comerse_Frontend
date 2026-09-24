import React from "react";
import Showproduct from "./components/product/Showproduct";
import ProductDetail from "./components/product/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import SearchProduct from "./components/product/SearchProduct";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import Cart from "./components/user/Cart"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Filter } from "lucide-react";
import Address from "./components/user/Address"
import Checkout from "./components/user/Checkout";
import Payment from "./components/user/Payment";

import OrderConformation from "./components/user/OrderConformation";




const App = () => {
  return (

    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Showproduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={< SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconformation" element={<OrderConformation />} />
        <Route path="/payment" element={Payment}>


        </Route>


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;