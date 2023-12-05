import { React, useState } from "react";
/**
 * Contains A list of programs or tags represented by buttons with a state.
 */
export const ButtonList = ({
  name,
  items,
  isItemSelected,
  handleButtonClick,
}) => {
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);
  const toggleButtonVisibility = () => {
    setAreButtonsVisible(!areButtonsVisible);
  };

  return (
    <div className="mb-5" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-1 m-3 ">
        <div>
          <button
            onClick={toggleButtonVisibility}
            className="btn btn-dark p-2 m-2"
          >
            {areButtonsVisible ? "Hide" : "Show"} {name}
          </button>
        </div>

        {areButtonsVisible &&
          items.map((item) => (
            <button
              type="button"
              className={`btn btn-primary p-2 m-1 ${
                isItemSelected(item.id) ? "bg-info" : "bg-primary"
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
