import React, { useState, useEffect } from "react";
import SearchBar from '../components/SearchBar';
import BookCatalog from "../components/BookCatalog";
import BookDetails from "../components/BookDetails";
import '../App.css';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        getBooks();
    }, []);

    function getBooks() {
        const url = 'https://localhost:7157/api/books';

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(booksFromServer => {
                console.log(booksFromServer);
                setBooks(booksFromServer);
                setFilteredBooks(booksFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function searchBooks(searchQuery) {
        const filtered = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredBooks(filtered);
    }

    function handleBookClick(book) {
        setSelectedBook(book);
    }

    function handleBookClose() {
        setSelectedBook(null);
    }

    return (
        <div className='app'>
            <h1>KhataKnyharnia</h1>
            <SearchBar onSearch={searchBooks} />
            <BookCatalog books={filteredBooks} onBookClick={handleBookClick} />
            {selectedBook && (
                <BookDetails book={selectedBook} onClose={handleBookClose} />
            )}
        </div>
    );
}

export default HomePage;