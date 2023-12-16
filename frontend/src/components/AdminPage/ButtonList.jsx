import React from "react";
import styled from "styled-components";

const selectedButtonClass = "bg-warning";
const CategoryColors = {
  Eligibility: "#E0FAF",
  Identity: "#ADE8F4",
  ProgramFocus: "#ADE8F4",
  StudentServices: "#48CAE4",
  Timing: "#0096C7",
  UniversityStatus: "#0077B6",
  NoCategory: "#fb8500",
};

// StyledButton component for dynamic styling
const StyledButton = styled.button`
  padding: 0.25em 1em;
  margin: 0.25em;
  border-radius: 10px;
  background-color: ${({ category }) => {
    switch (category) {
      case "Eligibility":
        return CategoryColors.Eligibility;
      case "Identity":
      case "Identity ":
        return CategoryColors.Identity;
      case "Program Focus":
        return CategoryColors.ProgramFocus;
      case "Student Services":
        return CategoryColors.StudentServices;
      case "Timing":
        return CategoryColors.Timing;
      case "University Status":
        return CategoryColors.UniversityStatus;
      default:
        return CategoryColors.NoCategory;
    }
  }};
`;

const AddButton = styled.button`
  background-color: #6c757d; // btn-secondary
  color: white;
  padding: 0.25em 1em;
  margin: 1em;
  border-radius: 10px;
`;

const RemoveButton = styled.button`
  background-color: #dc3545; // btn-danger
  color: white;
  padding: 0.25em 1em;
  margin: 0.25em;
  border-radius: 10px;
`;

export const ButtonList = ({
  name,
  items,
  isItemSelected,
  handleButtonClick,
}) => {
  // Sort items by category, placing items without a category at the end
  const sortedItems = items.sort((a, b) => {
    if (!a.category) return 1;
    if (!b.category) return -1;
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="mb-5" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-1 m-3">
        {sortedItems.map((item) => (
          <StyledButton
            type="button"
            category={item.category}
            className={isItemSelected(item.id) ? selectedButtonClass : ""}
            key={item.id}
            onClick={() => handleButtonClick(item)}
          >
            {item.name}
          </StyledButton>
        ))}
        <hr />
        <div>
          <AddButton type="button">Add</AddButton>
          <RemoveButton type="button">Remove</RemoveButton>
        </div>
      </div>
    </div>
  );
};

export default ButtonList;
