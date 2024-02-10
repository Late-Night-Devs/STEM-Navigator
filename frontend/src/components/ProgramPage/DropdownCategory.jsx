import React from "react";

// Define a functional component named DropdownCategory
function DropdownCategory(props) {
  return (
    <div
      className="search-top"
      onChange={(e) => props.handleDropdown(e.target.value)}
    ></div>
  );
}
export default DropdownCategory;
