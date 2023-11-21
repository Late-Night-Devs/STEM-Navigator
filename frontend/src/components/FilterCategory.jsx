import React from "react";
import Tag from "./Tag";
import "../CSS/Tags.css"

function FilterCategory(props) {
  const heading = props.heading;
  const options = props.options || [];
  const tags = options.map(opt => <Tag key={opt} label={opt}></Tag>);

  return (
    <div className="filter-category border border-black my-3">
      <h4 className="filter-name p-2 mb-1">{heading}</h4>
      <ul className="list-group">
        {tags}
      </ul>
    </div>
  );
}

export default FilterCategory;