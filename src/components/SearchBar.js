import React, { useState } from "react";
import SearchIcon from '../search.svg'
import '../App.css';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
};

  return (
    <div className='search'>
      <input
        placeholder='Search for books...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <img
        src={SearchIcon}
        alt='search'
        onClick={handleSearch}
      />
    </div>
  )
}

export default SearchBar;