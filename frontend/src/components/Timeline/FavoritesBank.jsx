import React from "react";
import { Row, Col, } from "react-bootstrap";
import "../../CSS/Timeline.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ProgramCard from "../ProgramCard";

function FavoritesBank({favoritesList}) {
  return (
    <Row id="bank" className="my-3 mx-1 p-2">
      <h3 className="mt-1">Favorited Programs</h3>
      <Droppable droppableId="bankDroppable" direction="horizontal">
        {(provided) => (
          <Row {...provided.droppableProps} ref={provided.innerRef}>
            {favoritesList.map((program, index) => (
              <BankProgram program={program} index={index} key={program.title} />
            ))}
            {provided.placeholder}
          </Row>
        )}
      </Droppable>
    </Row>
  );
}

function BankProgram({program, index}) {
  return (
    <Draggable key={program.title} draggableId={program.title} index={index}>
      {(provided, snapshot) => (
        <Col md={4} className="w-25">
          {/* 
            For some reason, putting draggable & dragHandle on ProgramCard
            makes it unable to find drag handle. Putting innerRef on the
            div makes it think there is no ref.
          */}
          <div {...provided.draggableProps} {...provided.dragHandleProps} className="my-2">
            <ProgramCard program={program} innerRef={provided.innerRef} />
          </div>

          {snapshot.isDragging && (<ProgramCard program={program} />)}
        </Col>
      )}
    </Draggable>
  );
}

export default FavoritesBank;