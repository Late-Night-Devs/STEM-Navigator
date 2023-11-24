import React from "react";
import { Col } from "react-bootstrap";

/**
 * Contains A list of programs represented by buttons with a state.
 */
const ProgramList = ({ Programs, isProgramSelected, handleProgramClick }) => {
  return (
    <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
      <div className="text-center border border-dark rounded-5 p-2">
        <h2>Programs</h2>
        {Programs.map((program) => (
          <button
            type="button"
            className={`btn btn-primary p-2 m-1 ${
              isProgramSelected(program.id) ? "bg-info" : "bg-primary"
            }`}
            key={program.id}
            onClick={() => handleProgramClick(program)}
          >
            {program.name}
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

export default ProgramList;
