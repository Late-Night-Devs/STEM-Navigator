import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const backend_url = process.env.REACT_APP_BACKEND_URL;

// MAIN Function to display favorite programs
function FavoriteProgramsDisplay({ cookieUID, handleFavoriteClicked }) {
  const { isAuthenticated } = useAuth0();
  const [favoritePrograms, setFavoritePrograms] = useState([]);

  // fetching favorite data through API
  const checkFavoriteDatabase = async () => {
    if (!isAuthenticated && !cookieUID) {
      console.log("User is not authenticated. Please log in.");
      return;
    }
    try {
      // fetching favorite programs based on userID from cookies
      const response = await axios.get(
        `${backend_url}/user/favorite/getFavoritePrograms/${cookieUID}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.length > 1) {
        //   avoid the case if there's only one program to be sorted out
        const sortedPrograms = response.data.sort((a, b) => {
          // storing Alphabetically favorited programs
          return a.title.localeCompare(b.title);
        });
        //   after sorting successfully, storing them to programs
        setFavoritePrograms(sortedPrograms);
      } else {
        //  Handle only one favorite program.
        setFavoritePrograms(response.data);
      }
    } catch (error) {
      console.log(
        "-----!!!!---- fetching fav programs from favorite display ERROR ----------"
      );
      console.error("Error fetching programs:", error);
    }
  };

    useEffect(() => {
    //   fetching favorite data once
    checkFavoriteDatabase();
  });

  return (
    <div>
      {/* if the total favorite programs will display data unless display an alert message*/}
      {favoritePrograms.length > 0 ? (
        <ProgramColumn
          favoritePrograms={favoritePrograms}
          cookieUID={cookieUID}
          handleFavoriteClicked={handleFavoriteClicked}
        />
      ) : (
        <p>You don't have any favorite programs at the moment.</p>
      )}
    </div>
  );
}

// Function to display favorite programs in columns
function ProgramColumn({ favoritePrograms, cookieUID, handleFavoriteClicked }) {
  const [mdValue, setMdValue] = useState(4);

  const changeMdValue = () => {
    if (mdValue === 4) {
      setMdValue(12);
    } else {
      setMdValue(4);
    }
  };

  return (
    <div className="row mb-4">
      {favoritePrograms.map((program) => (
        <div key={program.id} className={`col-md-${mdValue} d-inline-block`}>
          <ProgramCard
            program={program}
            cookieUID={cookieUID}
            changeColumnWidth={changeMdValue}
            handleFavoriteClicked={handleFavoriteClicked}
          />
        </div>
      ))}
    </div>
  );
}

// Function to display individual program cards
function ProgramCard({
  program,
  cookieUID,
  changeColumnWidth,
  handleFavoriteClicked,
}) {
  const { isAuthenticated } = useAuth0();
  const [isCollapsed, toggleIsCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  //   since this section is all about favorited programs, clicking on the favorite btn again will
  //  send a Delete request to remove that favorite program.
  const toggleFavorite = async () => {
    try {
      if (!isAuthenticated) {
        alert(
          "Oops! It looks like you're not logged in. Please log in to unlock this feature!"
        );
        return;
      }
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
    <div>
      <Card key={program.program_id} className="w-100 position-relative mb-3">
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
            Lead Contact: {program.lead_contact}
            <br />
            Contact Email:{" "}
            <a href={`mailto:${program.contact_email}`}>
              {program.contact_email}
            </a>
            <Collapse in={isCollapsed}>
              <div id="collapse-text">
                Web Link:{" "}
                <a href={program.link_to_web}>{program.link_to_web}</a>
                <br />
                <ProgramDuration program={program} />
                <br />
                <br />
                {program.long_description}
              </div>
            </Collapse>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            onClick={() => {
              toggleIsCollapsed(!isCollapsed);
              toggleText();
              changeColumnWidth();
            }}
            aria-controls="collapse-text"
            aria-expanded={isCollapsed}
          >
            <ShowMoreShowLess isExpanded={isExpanded} />
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

const ProgramDuration = ({ program }) => {
  return (
    <>
      {program.duration
        ? "Program Duration: " + program.duration + " " + program.duration_unit
        : "Program Duration: Varies"}
    </>
  );
};

const ShowMoreShowLess = ({ isExpanded }) => {
  return <>{isExpanded ? "Show Less" : "Show More"}</>;
};

export default FavoriteProgramsDisplay;
