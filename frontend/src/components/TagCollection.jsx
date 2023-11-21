import React from "react";
import FilterCategory from "./FilterCategory";
import "../CSS/Tags.css"

function TagCollection() {
  return (
    <div>
      <FilterCategory
        heading="Year/Grade Level"
        options={["High School", "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year or higher", "Graduate Student"]}
      />
      <FilterCategory
        heading="Field"
        options={["Computer Science", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "Physics", "Chemistry", "Biology", "Biochemistry"]}
      />
      <FilterCategory
        heading="Program/Service Type"
        options={["Scholarship/Grant", "Competition", "Club/Interest Group", "Internship", "Research", "Internship/Career Fair"]}
      />
    </div>
  );
}

export default TagCollection;