import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

function BankProgram({ program, index, cookieUID, handleFavoriteClicked }) {
  return (
    <Draggable key={program.id} draggableId={program.id} index={index}>
      {(provided, snapshot, rubric) => (
        <Col md={4} className="w-25 text-start">
          {/* 
            For some reason, putting draggable & dragHandle on ProgramCard
            makes it unable to find drag handle. Putting innerRef on the
            div makes it think there is no ref.
          */}
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="my-2 bankProgram"
          >
            <ProgramCard
              program={program}
              innerRef={provided.innerRef}
              cookieUID={cookieUID}
              handleFavoriteClicked={handleFavoriteClicked}
            />
          </div>

          {snapshot.isDragging &&
            rubric.source.droppableId === "bankDroppable" && (
              <ProgramCard
                program={program}
                cookieUID={cookieUID}
                handleFavoriteClicked={handleFavoriteClicked}
              />
            )}
        </Col>
      )}
    </Draggable>
  );
}

function ProgramCard({ program, innerRef, cookieUID, handleFavoriteClicked }) {
  const toggleFavorite = async () => {
    try {
      const url = `${backend_url}/user/favorite/removeFavorite`;
      const requestData = {
        userID: cookieUID, // Include the user's ID
        programID: program.program_id, // Include the ID of the program to remove
      };

      // Update the isFavorite status in the database by making a POST request
      await axios.post(url, requestData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Card ref={innerRef}>
      <FontAwesomeIcon
        icon={solidStar}
        className="star-icon position-absolute top-0 end-0 m-2"
        onClick={() => {
          toggleFavorite();
          handleFavoriteClicked();
        }}
        style={{
          cursor: "pointer",
          color: "gold",
        }}
      />
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
