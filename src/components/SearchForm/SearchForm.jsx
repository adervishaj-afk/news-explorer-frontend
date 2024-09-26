import React, { useState, useEffect } from "react";
import "./SearchForm.css";

const SearchForm = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a keyword");
    } else {
      setError("");
      handleSearch(query); 
    }
  };

  return (
    <form onSubmit={onSubmit} className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        placeholder="Enter topic"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
