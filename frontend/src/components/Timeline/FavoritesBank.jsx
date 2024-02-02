import React from "react";
import { Row } from "react-bootstrap";
import "../../CSS/Timeline.css";
import { Droppable } from "react-beautiful-dnd";
import BankProgram from "./BankProgram";

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

export default FavoritesBank;