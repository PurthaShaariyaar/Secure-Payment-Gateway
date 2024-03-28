import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import { useState } from "react";

function App() {
  // Initialize cart state
  const [cart, setCart] = useState([]);
  const [quantitySelector, setQuantitySelector] = useState({});

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleQuantityChange = (itemId, action) => {
    const updatedQuantitySelector = { ...quantitySelector };
    if (!updatedQuantitySelector[itemId]) {
      updatedQuantitySelector[itemId] = 1;
    }
    updatedQuantitySelector[itemId] = action === "increase" ? updatedQuantitySelector[itemId] + 1 : updatedQuantitySelector[itemId] - 1;
    setQuantitySelector(updatedQuantitySelector);
  };

  // Function to calculate total price in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (quantitySelector[item.id] || 0), 0);
  };


  return (
    <Router>
      <div className="App">
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Pass cart state and setter function to Products component */}
          <Route path="/products" element={<Products cart={cart} setCart={setCart} handleQuantityChange={handleQuantityChange} removeFromCart={removeFromCart} quantitySelector={quantitySelector} setQuantitySelector={setQuantitySelector} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} handleQuantityChange={handleQuantityChange} quantitySelector={quantitySelector} />} />
          <Route path="/payment" element={<Payment totalPrice={calculateTotalPrice()} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
