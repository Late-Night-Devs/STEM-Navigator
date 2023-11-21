import React from "react";

function Tag({label}) {
  return (
    <li className="list-group-item Tag">
      <input type="checkbox" value="" className="form-check-input me-2" />
      <label>{label}</label>
    </li>
  );
}

export default Tag;