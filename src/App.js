import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const isLoggedInStored = localStorage.getItem("isLoggedIn");
  const userRoleStored = localStorage.getItem("userRole");

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInStored === "true");
  const [userRole, setUserRole] = useState(userRoleStored || "user");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  const handleLogout = () => {
    // Clear the stored user session and reset state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("user");
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  function saveCartToLocalStorage(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  function addToCart(book) {
    const updatedItems = [...cartItems];
    const existingItemIndex = updatedItems.findIndex((item) => item.id === book.id);

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems.push({ ...book, quantity: 1 });
    }

    setCartItems(updatedItems);
    saveCartToLocalStorage(updatedItems);
  }

  function removeFromCart(book) {
    const existingItemIndex = cartItems.findIndex((item) => item.id === book.id);

    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];

      if (existingItem.quantity === 1) {
        const updatedItems = [...cartItems];
        updatedItems.splice(existingItemIndex, 1);
        setCartItems(updatedItems);
        saveCartToLocalStorage(updatedItems);
      } else {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity -= 1;
        setCartItems(updatedItems);
        saveCartToLocalStorage(updatedItems);
      }
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/cart" element={<ShoppingCart cartItems={cartItems} onRemoveFromCart={removeFromCart} />} />
          {isLoggedIn && userRole === "AdminRole" && <Route path="/admin" element={<AdminPanel />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
