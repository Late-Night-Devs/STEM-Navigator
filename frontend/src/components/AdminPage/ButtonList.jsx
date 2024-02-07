import React, {useState} from "react";
import styled from "styled-components";

const lightGreen = "#BFD49B";
const darkGreen = "#5EBD4B";
const selectedButtonClass = "bg-warning";

const CategoryColors = {
  Eligibility: lightGreen,
  Identity: darkGreen,
  ProgramFocus: lightGreen,
  StudentServices: darkGreen,
  Timing: lightGreen,
  UniversityStatus: darkGreen,
  NoCategory: lightGreen,
};

const StyledButton = styled.button`
  padding: 0.25em 1em;
  margin: 0.25em;
  border-radius: 10px;
  background-color: ${({ $category }) => {
    // Add $ prefix to make it transient
    switch ($category) {
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
  handleRemoveBtnClick,
  handleAddBtnClick,
}) => {
  /* allows user input to filter shown programs or tags */
  const [filter, setFilter] = useState('');
  const handleInputFilterChange = (event) => {
    setFilter(event.target.value)
  }

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

  const shouldShowItem = (item) => {
    if (filter === "") return true;
    return item.name.toLowerCase().includes(filter.toLowerCase());
  };

  return (
    <div className="mb-5" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-1 m-3">
        <h3>{name}</h3>
        <hr />
        <span>Filter:  </span>
        <input type="text" value={filter} onChange={handleInputFilterChange} />
        <hr />
        {sortedCategories.map((category) => (
          <div key={category}>
            <h5>{category !== "NoCategory" ? category : ""}</h5>
            {/* filtering by 'shouldShowItem' before displaying */}
            {groupedItems[category].filter(shouldShowItem).map((item) => (
              <StyledButton
                type="button"
                $category={item.category} // transient prop?
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
          <AddButton type="button" onClick={handleAddBtnClick}>
            Add
          </AddButton>
          <RemoveButton type="button" onClick={handleRemoveBtnClick}>
            Remove
          </RemoveButton>
        </div>
      </div>
    </div>
  );
};

export default ButtonList;
