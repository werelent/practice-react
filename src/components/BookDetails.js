import React, { useEffect } from "react";

function BookDetails({ book, onClose }) {
    const coverImage = book.coverImageUrl !== null && book.coverImageUrl !== ''
        ? book.coverImageUrl
        : 'https://placehold.co/720x1080?text=No+cover';

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".book-details-card")) {
                onClose();
            }
        };

        const handleKeyPress = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [onClose]);

    return (
        <div className="book-details-overlay">
            <div className="book-details-card">
                <div className="book-details-header">
                    <h2>{book.title}</h2>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>

                <div className="book-details-info">
                    <img src={coverImage} alt={book.title} />
                    <div>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>Price:</strong> {book.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;