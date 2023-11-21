import React from "react";
import "../CSS/Tags.css"

function Tag({label}) {
  return (
    <li className="list-group-item tag mb-1 p-1">
      <input type="checkbox" value="" className="form-check-input me-2" />
      <label>{label}</label>
    </li>
  );
}

export default Tag;