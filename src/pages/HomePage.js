import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookCatalog from "../components/BookCatalog";
import BookDetails from "../components/BookDetails";
import ShoppingCart from "../components/ShoppingCart"; // Import the ShoppingCart component
import useBookData from "../hooks/useBookData";
import "../App.css";

function HomePage() {
  const { filteredBooks, genres, getBooks, filterBooks } = useBookData();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  function handleBookClick(book) {
    setSelectedBook(book);
  }

  function handleBookClose() {
    setSelectedBook(null);
  }

  function handleSearch() {
    const filters = {
      genre: "",
      minPrice: "",
      maxPrice: "",
    };
    filterBooks(searchQuery, filters);
  }

  function handleApplyFilters(filters) {
    filterBooks(searchQuery, filters);
  }

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
    <div className="app">
      <h1>KhataKnyharnia</h1>
      <SearchBar
        onSearch={handleSearch}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onApplyFilters={handleApplyFilters}
        genres={genres}
      />
      <BookCatalog books={filteredBooks} onBookClick={handleBookClick} addToCart={addToCart} removeFromCart={removeFromCart} />
      {selectedBook && <BookDetails book={selectedBook} onClose={handleBookClose} />}
      <ShoppingCart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
    </div>
  );
}

export default HomePage;
