import React from "react";
import { Row, Col, } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


function Timeline() {
  return (
    <Row id="timeline" className="my-2 mx-1 overflow-x-scroll">
      {months.map((name) => (
        <MonthCol title={name} key={name} />
      ))}
    </Row>
  );
}

function MonthCol({title}) {
  return (
    <Droppable droppableId="monthDroppable" key={title}>
      {(provided) => (
        <Col
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="monthCol"
        >
          <h4>{title}</h4>
          <p>Drag a program here...</p>
          {provided.placeholder}
        </Col>
      )}
    </Droppable>
  );
}

export default Timeline;