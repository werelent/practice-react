import React, { useState } from "react";
import SearchIcon from '../search.svg'
import '../App.css';

function SearchBar({ onSearch, onSearchChange, searchQuery }) {
  const handleSearch = () => {
    onSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='search'>
      <input
        placeholder='Search by title or author'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <img
        src={SearchIcon}
        alt='search'
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
