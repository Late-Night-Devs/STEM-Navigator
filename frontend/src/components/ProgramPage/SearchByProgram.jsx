import React from "react";
import "../../CSS/SearchByProgram.css"

function SearchByProgram(props) {
  return (
    <div className="search-top pt-3 pb-2">
      <div className="row g-2 align-items-center ">
        <div className="col-md-auto">
          <label htmlFor="search-program" className="search-label fw-bold fs-5"/>
        </div>
        <div className="col">
          <input
            className="rounded w-100 mx-md-2 mx-lg-0 search-for-a-program"
            id="search-program"
            type="text"
            placeholder="Search for a program, e.g. ACCESS"
            onChange={(e) => props.handleSearchByProgram(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchByProgram;
