import React from "react";

function BookCard({ book, onClick }) {
    const coverImage = book.coverImageUrl !== null && book.coverImageUrl !== ''
        ? book.coverImageUrl
        : 'https://placehold.co/720x1080?text=No+cover';

    const handleCardClick = () => {
        onClick(book);
    };

    return (
        <div className='book' onClick={handleCardClick}>
            <div><p>{book.price}₴</p></div>
            <div>
                <img src={coverImage} alt={book.title} />
            </div>
            <div>
                <span>{book.author}</span>
                <h3>{book.title}</h3>
            </div>
        </div>
    );
}

export default BookCard;
