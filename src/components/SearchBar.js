import React, { useState } from "react";
import SearchIcon from "../search.svg";
import FilterIcon from "../filter.png";
import "../App.css";

function SearchBar({ onSearch, onSearchChange, onApplyFilters, searchQuery, genres }) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const filters = {
      genre: selectedGenre,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    onSearch(filters);
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleApply = () => {
    const filters = {
      genre: selectedGenre,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    onApplyFilters(filters);
    setShowFilters(false);
  };

  return (
    <div className="search">
      <img
        src={FilterIcon}
        alt="filter"
        className="filter-icon"
        onClick={() => setShowFilters(!showFilters)}
      />

      <div className="filter-options" style={{ display: showFilters ? "block" : "none" }}>
        <div className="genre-filter">
          <label>Genre:</label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="price-filter">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>

      </div>

      <input
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <img src={SearchIcon} alt="search" onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
