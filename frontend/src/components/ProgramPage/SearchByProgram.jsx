import React from "react";

function SearchByProgram(props) {
  return (
    <div className="search-top pt-3 pb-4">
      <div className="row g-2 align-items-center">
        <div className="col-md-auto">
          <label htmlFor="search-tag" className="search-label fw-bold fs-5">
            Search Program By Title:
          </label>
        </div>
        <div className="col">
          <input
            className="rounded w-100 mx-md-2 mx-lg-0"
            id="search-tag"
            type="text"
            placeholder="Enter to search..."
            onChange={(e) => props.handleSearchByProgram(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchByProgram;
