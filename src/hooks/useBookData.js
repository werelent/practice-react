import { useState, useEffect } from "react";

function useBookData() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  // Add filters state
  const [filters, setFilters] = useState({ genre: "", minPrice: "", maxPrice: "" });

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    const url = "https://localhost:7157/api/books";

    fetch(url)
      .then((response) => response.json())
      .then((booksFromServer) => {
        setBooks(booksFromServer);
        setFilteredBooks(booksFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function filterBooks(query, filters) {
    const { genre, minPrice, maxPrice } = filters;

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );

    const genreFiltered = genre ? filtered.filter((book) => book.genre === genre) : filtered;

    const priceFiltered = genreFiltered.filter((book) => {
      if (minPrice && maxPrice) {
        return book.price >= minPrice && book.price <= maxPrice;
      } else if (minPrice) {
        return book.price >= minPrice;
      } else if (maxPrice) {
        return book.price <= maxPrice;
      } else {
        return true;
      }
    });

    setFilteredBooks(priceFiltered);
  }

  return {
    books,
    filteredBooks,
    genres: [...new Set(books.map((book) => book.genre))], // Extract unique genres from books
    getBooks,
    filterBooks,
  };
}

export default useBookData;
