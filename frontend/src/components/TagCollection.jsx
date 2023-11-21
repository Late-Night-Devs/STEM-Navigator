import React from "react";
import TagCategory from "./TagCategory";

function TagCollection() {
  return (
    <div>
      <TagCategory heading="Year/Grade Level" options={["hi", "oop"]} />
      <TagCategory heading="Field" />
    </div>
  );
}

export default TagCollection;