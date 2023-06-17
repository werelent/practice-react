import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCatalog from "../components/BookCatalog";
import BookDetails from "../components/BookDetails";
import useBookData from "../hooks/useBookData";
import "../App.css";

function HomePage() {
  const { filteredBooks, genres, getBooks, filterBooks } = useBookData();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      <BookCatalog books={filteredBooks} onBookClick={handleBookClick} />
      {selectedBook && <BookDetails book={selectedBook} onClose={handleBookClose} />}
    </div>
  );
}

export default HomePage;
