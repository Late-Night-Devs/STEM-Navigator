import React from "react";
import "../../CSS/SearchByCategory.css"

// Define a functional component named SearchByCategory
function SearchByCategory(props) {
  return (
    <div className="search-top pt-2 pb-4 gap-2">
      <div className="row g-2 align-items-center">
        {/* <div className="col-md-auto"> */}
          <label htmlFor="search-tag" className="search-label fw-bold fs-5"/>
        {/* </div> */}
        <div className="col">
          <input
            className="rounded w-100 search-for-a-tag"
            id="search-tag"
            type="text"
            placeholder="Search for a tag, e.g. Application Required"
            onChange={(e) => props.handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchByCategory;
