import React from "react";
import styled from "styled-components";

const selectedButtonClass = "bg-warning";
const CategoryColors = {
  Eligibility: "#6C8B2D",
  Identity: "#87AE38",
  ProgramFocus: "#9EC64F",
  StudentServices: "#B2D172",
  Timing: "#6EBF4E",
  UniversityStatus: "#8AA55C",
  NoCategory: "#AA8644",
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

// this can help to avoid repeated code
const BaseButton = styled.button`
  color: white;
  padding: 0.5em 4em 0.5em 4em;
  margin: 0 1em 1em 1em;
  border-radius: 10px;
`;

const AddButton = styled(BaseButton)`
  background-color: #6c757d; // unique background
`;

const RemoveButton = styled(BaseButton)`
  background-color: #dc3545;
`;

export const ButtonList = ({
  name,
  items,
  isItemSelected,
  handleButtonClick,
}) => {
  // Function to group items by category
  const groupByCategory = (items) => {
    return items.reduce((groups, item) => {
      const category = item.category || "NoCategory";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  // Grouped items by category
  const groupedItems = groupByCategory(items);

  // Get category names and sort them alphabetically
  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="mb-5" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-1 m-3">
        <h3>{name}</h3>
        <hr />
        {sortedCategories.map((category) => (
          <div key={category}>
            <h5>{category !== "NoCategory" ? category : ""}</h5>
            {groupedItems[category].map((item) => (
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
          </div>
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
