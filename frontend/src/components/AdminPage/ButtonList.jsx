import { React } from "react";

export const ButtonList = ({
  name,
  items,
  isItemSelected,
  handleButtonClick,
}) => {
  // Function to determine button color based on category, if it has one
  const getButtonColor = (item) => {
    // Check if the category property exists and is not undefined
    const category = item.category;
    if (category) {
      const trimmedCategory = category.trim();
      switch (trimmedCategory) {
        case "Timing":
          return "btn-light";
        case "Identity":
          return "btn-dark";
        case "Student Services":
          return "btn-secondary";
        case "Eligibility":
          return "btn-warning";
        case "University Status":
          return "btn-success";
        case "Program Focus":
          return "btn-info";
        // Add more cases as needed
        default:
          return "btn-primary";
      }
    }
    return "btn-primary"; // Default color for items without a category or unrecognized categories
  };

  // Sort items by category, placing items without a category at the end
  const sortedItems = items.sort((a, b) => {
    if (!a.category) return 1;
    if (!b.category) return -1;
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="mb-5" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-1 m-3 ">
        {sortedItems.map((item) => (
          <button
            type="button"
            className={`btn p-2 m-1 ${getButtonColor(item)} ${
              isItemSelected(item.id) ? "bg-info" : ""
            }`}
            key={item.id}
            onClick={() => handleButtonClick(item)}
          >
            {item.name}
          </button>
        ))}
        <hr />
        <div>
          <button type="button" className="btn btn-secondary p-2 m-2">
            Add
          </button>
          <button type="button" className="btn btn-danger p-2 m-2">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonList;
