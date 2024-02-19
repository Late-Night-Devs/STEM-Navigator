import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Row, Col} from "react-bootstrap";
import axios from "axios";
import ProgramCard from "./ProgramCard";
import useFetchData from "../AdminPage/dataUtils";

const backend_url = process.env.REACT_APP_BACKEND_URL;

// MAIN Function to display favorite programs
function FavoriteProgramsDisplay({ cookieUID, handleFavoriteClicked }) {
  const { isAuthenticated } = useAuth0();
  const [favoritePrograms, setFavoritePrograms] = useState([]);
  const { data: programTags } = useFetchData("program-tags");
  const { data: tags } = useFetchData("tags");

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
      const sortedPrograms = response.data
        .map((program) => {
          // Add the isFavorite property to each program object
          return { ...program, isFavorite: true };
        })
        .sort((a, b) => {
          return a.title.localeCompare(b.title);
        });

      setFavoritePrograms(sortedPrograms);
    } else {
      // Handle only one favorite program.
      const programWithIsFavorite = { ...response.data[0], isFavorite: true };
      setFavoritePrograms([programWithIsFavorite]);
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
    <>
      <Row
        className="px-2"
        key="searchAndPrograms"
        style={{
          overflowX: "auto",
          height: "calc(2 * 100px)",
          paddingBottom: "500px",
        }}
      >
        {favoritePrograms.length > 0 ? (
          favoritePrograms.map((program) => (
            <ProgramColumn
              key={program.id}
              program={program}
              programTags={programTags}
              tags={tags}
              cookieUID={cookieUID}
              handleFavoriteClicked={handleFavoriteClicked}
            />
          ))
        ) : (
          <p>You don't have any favorite programs at the moment.</p>
        )}
      </Row>
      <div style={{ paddingBottom: "500px" }}>{/* Content goes here */}</div>
    </>
  );
}

function ProgramColumn({
  program,
  cookieUID,
  programTags,
  tags,
  handleFavoriteClicked,
}) {
  const [mdValue, setMdValue] = useState(getInitialMdValue());
  const [prevMdValue, setPrevMdValue] = useState(null);

  useEffect(() => {
    function handleResize() {
      setMdValue(getInitialMdValue());
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  function getInitialMdValue() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1400) {
      return 2; // Large screen: 6 cards per row
    } else if (screenWidth >= 992) {
      return 3; // Large screen: 4 cards per row
    } else if (screenWidth >= 768) {
      return 4; // Medium screen: 3 cards per row
    } else {
      return 12; // Small screen: 1 card per row
    }
  }

  const changeMdValue = () => {
    if (prevMdValue !== null) {
      // If prevMdValue is set, it means "Show Less" was clicked
      setMdValue(prevMdValue); // Revert to the previous mdValue
      setPrevMdValue(null); // Reset prevMdValue
    } else {
      // Store the current mdValue as prevMdValue before changing
      setPrevMdValue(mdValue);
      // Toggle mdValue based on the current value
      switch (mdValue) {
        case 2:
          setMdValue(6); // Change from 4 cards to expanded card
          break;
        case 3:
          setMdValue(4); // Change from 6 cards to 4 cards
          break;
        case 4:
          setMdValue(12); // Change from 4 cards to 1 card
          break;
        default:
          break;
      }
    }
  };

  return (
    <Col key={program.id} md={mdValue} className="mb-4">
      <ProgramCard
        program={program}
        programTags={programTags}
        tags={tags}
        changeColumnWidth={changeMdValue}
        cookieUID={cookieUID}
        handleFavoriteClicked={handleFavoriteClicked}
      />
    </Col>
  );
}


export default FavoriteProgramsDisplay;
