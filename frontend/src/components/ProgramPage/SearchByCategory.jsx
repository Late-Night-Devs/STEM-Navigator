import React from "react";


// Define a functional component named SearchByCategory
function SearchByCategory(props) {
  return (
    <div className="search-top pt-3 pb-4 gap-2">
      <div className="row g-2 align-items-center">
        <div className="col-md-auto">
          <label htmlFor="search-tag" className="search-label fw-bold fs-5">
            Search Program By Category:
          </label>
        </div>
        <div className="col">
          <input
            className="rounded w-100"
            id="search-tag"
            type="text"
            placeholder="Enter to search..."
            onChange={(e) => props.handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchByCategory;
