import React from "react";
import { Col } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import ProgramCard from "../ProgramCard";

function BankProgram({program, index}) {
  return (
    <Draggable key={program.title} draggableId={program.title + index} index={index}>
      {(provided, snapshot, rubric) => (
        <Col md={4} className="w-25">
          {/* 
            For some reason, putting draggable & dragHandle on ProgramCard
            makes it unable to find drag handle. Putting innerRef on the
            div makes it think there is no ref.
          */}
          <div {...provided.draggableProps} {...provided.dragHandleProps} className="my-2">
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

export default BankProgram;