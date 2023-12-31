import React from 'react';
import BookCard from './BookCard';

const BookCatalog = ({ books, onBookClick, addToCart }) => {
  if (books.length > 0) {
    return (
      <div className='container'>
        {books.map((book) => (
          <BookCard book={book} key={book.id} onClick={onBookClick} addToCart={addToCart} />
        ))}
      </div>
    );
  } else {
    return (
      <div className='empty'>
        <h2>No books found</h2>
      </div>
    );
  }
};

export default BookCatalog;
