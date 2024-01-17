import React from "react";


// Define a functional component named Search
function SearchBar(props) {
  return (
    <div className="search-top">
      <div className="search">
        <label for="search-tag" className="search-label p-3 fw-bold fs-5">
          Search Program:
        </label>
        <input className="rounded w-25"
          id="search-tag"
          type="text"
          placeholder="Enter to search..."
          onChange={(e) => props.handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
export default SearchBar;
