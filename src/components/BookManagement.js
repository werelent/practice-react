import React, { useState, useEffect } from 'react';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(null);

  useEffect(() => {
    // Fetch the books data from the API or any other data source
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://localhost:7157/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEdit = (bookId) => {
    const bookToEdit = books.find((book) => book.id === bookId);
    setEditMode(true);
    setEditedBook(bookToEdit);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedBook(null);
  };

  const handleUpdate = async (updatedBook) => {
    try {
      const response = await fetch(
        `https://localhost:7157/api/books/${updatedBook.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBook),
        }
      );
      console.log('Response status:', response.status);
      if (response.ok || response.status === 204) {
        setBooks(
          books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
      } else {
        console.log('Error updating book:', response.status);
      }
    } catch (error) {
      console.log('Error updating book:', error);
    }
  };

  const handleAdd = async (newBook) => {
    try {
      const response = await fetch('https://localhost:7157/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        const data = await response.json();
        setBooks([...books, data]);
      } else {
        console.log('Error adding book:', response.status);
      }
    } catch (error) {
      console.log('Error adding book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7157/api/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
      } else {
        console.log('Error deleting book:', response.status);
      }
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  };

  const handleQuantityChange = (bookId, quantity) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, quantity } : book
      )
    );
  };

  return (
    <div className="book-management">
      <h2>Book Management</h2>
      {editMode ? (
        <EditBookForm
          book={editedBook}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      ) : (
        <AddBookForm handleAdd={handleAdd} />
      )}
      <BookList
        books={books}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  );
}

function BookList({ books, handleEdit, handleDelete, handleQuantityChange }) {
  return (
    <table className="order-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>₴{book.price}</td>
            <td>{book.quantity}</td>
            <td>
              <button onClick={() => handleEdit(book.id)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AddBookForm({ handleAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      genre,
      description,
      coverImageUrl,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    handleAdd(newBook);
    setTitle('');
    setAuthor('');
    setGenre('');
    setDescription('');
    setCoverImageUrl('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form className="edit-order" onSubmit={handleSubmit}>
      <h3>Add Book</h3>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Cover Image URL:
        <input
          type="text"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

function EditBookForm({ book, handleCancel, handleUpdate }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [description, setDescription] = useState(book.description);
  const [coverImageUrl, setCoverImageUrl] = useState(book.coverImageUrl);
  const [price, setPrice] = useState(book.price);
  const [quantity, setQuantity] = useState(book.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...book,
      title,
      author,
      genre,
      description,
      coverImageUrl,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    handleUpdate(updatedBook);
  };

  return (
    <form className="edit-order" onSubmit={handleSubmit}>
      <h3>Edit Book</h3>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Cover Image URL:
        <input
          type="text"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>
      <button type="submit">Update</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default BookManagement;
