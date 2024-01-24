import React from "react";

function SearchByProgram(props) {
  return (
    <div className="search-top">
      <div className="search">
        <label for="search-tag" className="search-label p-3 fw-bold fs-5">
          Search Program By Title:
        </label>
        <input
          className="rounded w-50"
          id="search-tag"
          type="text"
          placeholder="Enter to search..."
          onChange={(e) => props.handleSearchByProgram(e.target.value)}
        />
      </div>
    </div>
  );
}
export default SearchByProgram;
