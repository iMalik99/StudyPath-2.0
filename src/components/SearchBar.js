import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type="text" 
        placeholder="Search topics (e.g., African History, Mental Wellness)..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Explore</button>
    </form>
  );
};

export default SearchBar;