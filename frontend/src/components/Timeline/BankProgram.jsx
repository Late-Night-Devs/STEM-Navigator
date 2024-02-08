import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

function BankProgram({program, index}) {
  return (
    <Draggable key={program.title} draggableId={program.id} index={index}>
      {(provided, snapshot, rubric) => (
        <Col md={4} className="w-25 text-start">
          {/* 
            For some reason, putting draggable & dragHandle on ProgramCard
            makes it unable to find drag handle. Putting innerRef on the
            div makes it think there is no ref.
          */}
          <div {...provided.draggableProps} {...provided.dragHandleProps} className="my-2 bankProgram">
            <ProgramCard program={program} innerRef={provided.innerRef} />
          </div>

          {
            snapshot.isDragging &&
            rubric.source.droppableId === 'bankDroppable' &&
            (<ProgramCard program={program} />)
          }
        </Col>
      )}
    </Draggable>
  );
}

function ProgramCard({program, innerRef}) {
  return (
    <Card ref={innerRef}>
      <Card.Body>
        <Card.Title>{program.title}</Card.Title>
        <Card.Text>
          Lead Contact: {program.lead_contact} <br />
          Contact Email:{" "}
          <a href={`mailto:${program.contact_email}`}>
            {program.contact_email}
          </a>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          variant="primary"
          href={program.link_to_web}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default BankProgram;