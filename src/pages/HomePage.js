import React from "react";
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';

function HomePage() {
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
        { id: 3, title: 'Book 3', author: 'Author 3' },
    ];

    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com'
    };

    const handleSearch = (query) => {
        // handle search functionality
        console.log('Search query:', query);
    }

    return (
        <div>
            <Navbar />
            <h1>Welcome to KhataKnyharnia</h1>
            <SearchBar onSearch={handleSearch}/>
            <BookList books={books}/>
            <UserProfile user={user}/>
        </div>
    );
}

export default HomePage;