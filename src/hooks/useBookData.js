import { useState, useEffect } from "react";

function useBookData() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    const url = 'https://localhost:7157/api/books';

    fetch(url)
      .then(response => response.json())
      .then(booksFromServer => {
        setBooks(booksFromServer);
        setFilteredBooks(booksFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function filterBooks(query) {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  return {
    books,
    filteredBooks,
    getBooks,
    filterBooks
  };
}

export default useBookData;
