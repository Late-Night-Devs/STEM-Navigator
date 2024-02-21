import React from "react";
import { Row } from "react-bootstrap";
import "../../CSS/Timeline.css";
import { Droppable } from "react-beautiful-dnd";
import BankProgram from "./BankProgram";
import FavoriteProgramsDisplay from "../ProgramPage/FavoriteSection";
function FavoritesBank({ favoritesList, cookieUID, handleFavoriteClicked }) {
  const noFavorites = favoritesList.length === 0;
  console.log("favorite bank: ", favoritesList);
  return (
    <Row id="bank" className="my-2 mx-1 p-2">
      <h3 className="mt-1">Favorited Programs</h3>
      <Droppable droppableId="bankDroppable" direction="horizontal">
        {(provided) => (
          <Row {...provided.droppableProps} ref={provided.innerRef}>
            {Array.isArray(favoritesList) &&
              favoritesList.map((program, index) => (
                <BankProgram
                  program={program}
                  cookieUID={cookieUID}
                  index={index}
                  key={program.title}
                  handleFavoriteClicked={handleFavoriteClicked}
                />
              ))}
            {noFavorites && (
              <p>
                Your favorited programs will be listed here. <br />
                You can search for and favorite programs in our "Program" tab!
              </p>
            )}
            {provided.placeholder}
          </Row>
        )}
      </Droppable>
    </Row>
  );
}

export default FavoritesBank;
