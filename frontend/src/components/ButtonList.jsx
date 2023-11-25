import React from "react";
import { Col } from "react-bootstrap";

/**
 * Contains A list of programs represented by buttons with a state.
 */
export const ButtonList = ({
  name,
  items,
  isItemSelected,
  handleButtonClick,
}) => {
  return (
    <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-2">
        <h2>{name}</h2>
        {items.map((item) => (
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
          <button type="button" className="btn btn-danger p-2 m-2">
            Remove
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ButtonList;
