import React from "react";
import Tag from "./Tag";

function TagCategory({heading}) {
  return (
    <div className="TagCategory">
      <h4>{heading}</h4>
      <ul className="list-group">
	      <Tag label="hi" />
      </ul>
    </div>
  );
}

export default TagCategory;