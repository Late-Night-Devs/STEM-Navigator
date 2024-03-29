import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getTagsThatHaveACertainCategory,
  getAllTagCategoryPairingsForAProgram,
} from "./customJavaScriptFunctions";

// const cookieUserID = Cookies.get("cookieUId");
const backend_url = process.env.REACT_APP_BACKEND_URL;


const ProgramCard = ({
  program,
  programTags,
  tags,
  changeColumnWidth,
  cookieUID,
  handleFavoriteClicked,
}) => {
  // State to track whether the program is marked as favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Destructuring isAuthenticated from the useAuth0 hook
  const { isAuthenticated } = useAuth0();

  const complexAssociatedTags = getAllTagCategoryPairingsForAProgram(
    program,
    programTags,
    tags
  );
  const eligibilityTags = getTagsThatHaveACertainCategory(
    complexAssociatedTags,
    "Eligibility"
  ).sort();
  const studentServicesTags = getTagsThatHaveACertainCategory(
    complexAssociatedTags,
    "Student Services"
  ).sort();

  // State for controlling the collapse/expand functionality
  const [isCollapsed, toggleIsCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the text between "Show More" and "Show Less"
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  // useEffect hook to check if the program is marked as favorite
  useEffect(() => {
    const checkFavoriteDatabase = async () => {
      // Check if the user is authenticated
      if (!isAuthenticated) {
        console.log("User is not authenticated. Please log in.");
        return;
      }

      // Check if the program has an ID and then set its favorite status
      if (program.program_id) {
        setIsFavorite(program.isFavorite);
      }
    };

    // Run the checkFavoriteDatabase function when dependencies change
    // Dependencies include isAuthenticated, cookieUID, program ID, and favorite status
    // This ensures the effect runs when any of these values change
    checkFavoriteDatabase();
  }, [isAuthenticated, cookieUID, program.program_id, program.isFavorite]);

  const toggleFavorite = async () => {
    console.log("toggleFavorite from programs - isFavorite: ", isFavorite);
    try {
      // Check if the user is authenticated
      if (!isAuthenticated) {
        alert(
          "Oops! It looks like you're not logged in. Please log in to unlock this feature!"
        );
        return;
      }
      const favoriteRequest = isFavorite ? "removeFavorite" : "addFavorite";
      const url = `${backend_url}/user/favorite/${favoriteRequest}`;

      const requestData = {
        userID: cookieUID,
        programID: program.program_id,
      };

      const response = await axios.post(url, requestData, {
        withCredentials: true,
      });

      console.log("Toggle Favorite Fetching data: ", response.data);

      // Toggle the local state after successful request
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    } catch (error) {
      setIsFavorite(false);
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-auto position-relative" style={{ height: "100%" }}>
      <FontAwesomeIcon
        icon={isFavorite ? solidStar : regularStar}
        className="star-icon position-absolute top-0 end-0 m-2"
        aria-hidden="false"
        onClick={() => {
          toggleFavorite();
          handleFavoriteClicked();
        }}
        style={{
          cursor: "pointer",
          color: isFavorite ? "gold" : "grey",
        }}
      />
      <Card.Body>
        <Card.Title as="h5" tabIndex="0">{program.title}</Card.Title>
        <Card.Text as="div">
          {isCollapsed === false ? "" : <br aria-hidden="true" />}
          <ProgramDetailsTitle isCollapsed={isCollapsed} />
          <div>Lead Contact: {program.lead_contact}</div>
          <div>Lead Contact Email:{" "} <a href={`mailto:${program.contact_email}`} tabIndex="-1"> {program.contact_email}</a></div>
          <ProgramWebsite isCollapsed={isCollapsed} program={program} tabIndex="-1" />
          <ProgramDuration program={program} />  <br aria-hidden="true" />
          <Collapse in={isCollapsed}>
            <div id="collapse-text">
              <div>{program.long_description}</div>

              {eligibilityTags.length === 0 && studentServicesTags.length === 0 ? "" : <br aria-hidden="true" />}
              <EligibilityCriteriaTitle eligibilityTags={eligibilityTags} />
              <EligibilityCriteriaTags eligibilityTags={eligibilityTags} />

              {eligibilityTags.length !== 0 && studentServicesTags.length !== 0 ? <br aria-hidden="true" /> : ""}
              <StudentServicesTitle studentServicesTags={studentServicesTags} />
              <StudentServicesTags studentServicesTags={studentServicesTags} />
            </div>
          </Collapse>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          tabIndex="-1"
          onClick={() => {
            changeColumnWidth();
            toggleIsCollapsed(!isCollapsed);
            toggleText();
          }}
          aria-controls="collapse-text"
          aria-expanded={isCollapsed}
        >
          <ShowMoreShowLess isExpanded={isExpanded} tabIndex="-1" />
        </Button>
      </Card.Footer>
    </Card>
  );
};

const ProgramDetailsTitle = ({ isCollapsed }) => {
  return <div> {
    isCollapsed === false ? "" : <b>PROGRAM DETAILS</b>
  } </div>
};

const ProgramWebsite = ({ isCollapsed, program }) => {
  return <div> {
    isCollapsed === false ? "" : <>Program Website: <a href={program.link_to_web} tabIndex="-1"> {program.link_to_web}</a></>
  } </div>
};

const ProgramDuration = ({ program }) => {
  return (
    <div>
      {" "}
      {program.duration
        ? "Program Duration: " + program.duration + " " + program.duration_unit
        : "Program Duration: Varies"}{" "}
    </div>
  );
};

const EligibilityCriteriaTitle = ({ eligibilityTags }) => {
  return (
    <div> {eligibilityTags.length === 0 ? "" : <b>ELIGIBILITY CRITERIA</b>} </div>
  );
};

const EligibilityCriteriaTags = ({ eligibilityTags }) => {
  return (
    <>
      {" "}
      {eligibilityTags.map((eligibilityTag) => (
        <IndividualTag individualTag={eligibilityTag} key={eligibilityTag} />
      ))}{" "}
    </>
  );
};

const StudentServicesTitle = ({ studentServicesTags }) => {
  return (
    <div>
      {" "}
      {studentServicesTags.length === 0 ? (
        ""
      ) : (
        <b>PROGRAM STUDENT SUPPORT SERVICES</b>
      )}{" "}
    </div>
  );
};

const StudentServicesTags = ({ studentServicesTags }) => {
  return (
    <>
      {" "}
      {studentServicesTags.map((studentServicesTag) => (
        <IndividualTag individualTag={studentServicesTag} key={studentServicesTag} />
      ))}{" "}
    </>
  );
};

const IndividualTag = ({ individualTag }) => {
  return <> {<div>{individualTag}</div>} </>;
};

const ShowMoreShowLess = ({ isExpanded }) => {
  return <>{isExpanded ? "Show Less" : "Show More"}</>;
};

export default ProgramCard;