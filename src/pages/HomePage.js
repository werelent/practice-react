import React, { useState } from "react";
import SearchBar from '../components/SearchBar';
import BookCatalog from "../components/BookCatalog";
import BookDetails from "../components/BookDetails";
import useBookData from "../hooks/useBookData";
import '../App.css';

function HomePage() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { books, filteredBooks, getBooks, filterBooks } = useBookData();

  function handleBookClick(book) {
    setSelectedBook(book);
  }

  function handleBookClose() {
    setSelectedBook(null);
  }

  function handleSearch() {
    filterBooks(searchQuery);
  }

  return (
    <div className='app'>
      <h1>KhataKnyharnia</h1>
      <SearchBar
        onSearch={handleSearch}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <BookCatalog books={filteredBooks} onBookClick={handleBookClick} />
      {selectedBook && (
        <BookDetails book={selectedBook} onClose={handleBookClose} />
      )}
    </div>
  );
}

export default HomePage;
