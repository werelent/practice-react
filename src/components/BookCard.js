import React from "react";

function BookCard({ book, onClick, addToCart }) {
  const coverImage =
    book.coverImageUrl !== null && book.coverImageUrl !== ""
      ? book.coverImageUrl
      : "https://placehold.co/720x1080?text=No+cover";

  const handleCardClick = (event) => {
    if (!event.target.classList.contains("add-to-cart-button")) {
      onClick(book);
    }
  };

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="book" onClick={handleCardClick}>
      <div>
        <p>{book.price}₴</p>
      </div>
      <div>
        <img src={coverImage} alt={book.title} />
      </div>
      <div>
        <span>{book.author}</span>
        <h3>{book.title}</h3>
        {book.quantity > 0 ? (
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            +
          </button>
        ) : (
          <p className="out-of-stock">Out of stock</p>
        )}
      </div>
    </div>
  );
}

export default BookCard;
