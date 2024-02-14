import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import Viking from "../../image/viking.png";
import SearchByProgram from "./SearchByProgram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import useFetchData from "../AdminPage/dataUtils";
import {
  getTagsThatHaveACertainCategory,
  getAllTagCategoryPairingsForAProgram,
} from "./customJavaScriptFunctions";

// Fetch the user ID from the cookie
// const cookieUserID = Cookies.get("cookieUId");
const backend_url = process.env.REACT_APP_BACKEND_URL;

const Programs = ({ selectedTagIds, cookieUID, handleFavoriteClicked }) => {
  const [programs, setPrograms] = useState([]);
  const { data: programTags } = useFetchData("program-tags");
  const { data: tags } = useFetchData("tags");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [storePrograms, setStorePrograms] = useState([]);

  // Fetch programs based on selected tags or all programs if no tags are selected
  useEffect(() => {
    const fetchProgramsBySelectingTagsID = async () => {
      try {
        console.log("Fetching programs with selected tags\n", cookieUID);
        const tagIdsArray = Array.from(selectedTagIds);
        // If no tags are selected, fetch all programs
        const response = await axios.post(`${backend_url}/programs/filter`, {
          tagIds: tagIdsArray,
          userID: cookieUID,
        });
        if (response.data.length > 1) {
          const sortedPrograms = response.data.sort((a, b) => {
            // Compare the isFavorite property of program a and program b
            if (a.isFavorite === b.isFavorite) {
              // If they have the same isFavorite value, compare by title alphabetically
              return a.title.localeCompare(b.title);
            } else {
              // If they have different isFavorite values, prioritize the one with isFavorite: true
              return a.isFavorite ? -1 : 1;
            }
          });
          setPrograms(sortedPrograms); // Update the programs displayed with sorted ones
          setStorePrograms(sortedPrograms); // Also update storePrograms with sorted list for future reference
          console.log("Sorted Programs from Programs.jsx: ", sortedPrograms);
        } else {
          // If no programs are returned, update states to reflect that
          setPrograms([]);
          setStorePrograms([]);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        // Ensure states are updated to reflect error or empty state
        setPrograms([]);
        setStorePrograms([]);
      }
    };

    fetchProgramsBySelectingTagsID();
  }, [selectedTagIds, cookieUID]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const noProgramsAfterFilter = currentItems.length === 0;

  // Handle search program by title
  const handleSearchByProgram = (key) => {
    let myResult = filterProgramsByTitle(storePrograms, key);
    setPrograms(myResult);
  };

  function filterProgramsByTitle(data, key) {
    let filteredPrograms;
    filteredPrograms = data.filter((program) => {
      const lowercaseTitle = program.title.toLowerCase();
      return lowercaseTitle.includes(key.toLowerCase());
    });

    return filteredPrograms;
  }
  return (
    <>
      <Row className="g-4" key="searchAndPrograms">
        <SearchByProgram handleSearchByProgram={handleSearchByProgram} />
        {currentItems.map((program) => (
          <ProgramColumn
            key={program.id}
            program={program}
            programTags={programTags}
            tags={tags}
            cookieUID={cookieUID}
            handleFavoriteClicked={handleFavoriteClicked}
          />
        ))}
        {noProgramsAfterFilter && (
          <Col xs={12} className="text-center mt-3">
            <div className="mt-5">
              <h4 className="text-center" style={{ color: "green" }}>
                No Programs Found, Please Deselect Some Tags!
              </h4>
              <img
                src={Viking}
                alt="Viking"
                style={{
                  width: "250px",
                  height: "auto",
                  display: "block",
                  margin: "1rem auto",
                }}
              />
            </div>
          </Col>
        )}
      </Row>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={programs.length}
        paginate={paginate}
      />
    </>
  );
};

// ===================== END of the main function ===============================

const ProgramColumn = ({
  program,
  programTags,
  tags,
  cookieUID,
  handleFavoriteClicked,
}) => {
  const [mdValue, setMdValue] = useState(4);

  const changeMdValue = () => {
    if (mdValue === 4) {
      setMdValue(12);
    } else {
      setMdValue(4);
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
};

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
        <Card.Title>{program.title}</Card.Title>
        <Card.Text as="div">
              {isCollapsed === false ? "" : <br aria-hidden="true"/>}
              <ProgramDetailsTitle isCollapsed={isCollapsed}/>  <br aria-hidden="true"/>
              Lead Contact: {program.lead_contact}  <br aria-hidden="true"/>
              Lead Contact Email:{" "} <a href={`mailto:${program.contact_email}`}> {program.contact_email}</a>  <br aria-hidden="true"/>
              <WebLink isCollapsed={isCollapsed} program={program}/>  {isCollapsed === false ? "" : <br aria-hidden="true"/>}
              <ProgramDuration program={program} />  <br aria-hidden="true"/>
          <Collapse in={isCollapsed}>
            <div id="collapse-text">
              <br aria-hidden="true"/>
              {program.long_description} <br aria-hidden="true"/>
              
              {eligibilityTags.length === 0 && studentServicesTags.length === 0 ? "" : <br aria-hidden="true"/>}
              <EligibilityCriteriaTitle eligibilityTags={eligibilityTags} />
              <EligibilityCriteriaTags  eligibilityTags={eligibilityTags} />

              {eligibilityTags.length !== 0 && studentServicesTags.length !== 0 ? <br aria-hidden="true"/> : ""}
              <StudentServicesTitle studentServicesTags={studentServicesTags} />
              <StudentServicesTags studentServicesTags={studentServicesTags} />
            </div>
          </Collapse>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          onClick={() => {
            changeColumnWidth();
            toggleIsCollapsed(!isCollapsed);
            toggleText();
          }}
          aria-controls="collapse-text"
          aria-expanded={isCollapsed}
        >
          <ShowMoreShowLess isExpanded={isExpanded} />
        </Button>
      </Card.Footer>
    </Card>
  );
};

const ProgramDetailsTitle = ({ isCollapsed }) => {
  return <> {
    isCollapsed === false ? "" : <b>PROGRAM DETAILS</b>
  } </>
};

const WebLink = ({ isCollapsed, program }) => {
  return <> {
    isCollapsed === false ? "" : <>Program Homepage:  <a href={program.link_to_web}> {program.link_to_web}</a></>
  } </>
};

const ProgramDuration = ({ program }) => {
  return (
    <>
      {" "}
      {program.duration
        ? "Program Duration: " + program.duration + " " + program.duration_unit
        : "Program Duration: Varies"}{" "}
    </>
  );
};

const EligibilityCriteriaTitle = ({ eligibilityTags }) => {
  return (
    <> {eligibilityTags.length === 0 ? "" : <b>ELIGIBILITY CRITERIA</b>} </>
  );
};

const EligibilityCriteriaTags = ({ eligibilityTags }) => {
  return (
    <>
      {" "}
      {eligibilityTags.map((eligibilityTag) => (
        <IndividualTag individualTag={eligibilityTag} key={eligibilityTag}/>
      ))}{" "}
    </>
  );
};

const StudentServicesTitle = ({ studentServicesTags }) => {
  return (
    <>
      {" "}
      {studentServicesTags.length === 0 ? (
        ""
      ) : (
        <b>PROGRAM STUDENT SUPPORT SERVICES</b>
      )}{" "}
    </>
  );
};

const StudentServicesTags = ({ studentServicesTags }) => {
  return (
    <>
      {" "}
      {studentServicesTags.map((studentServicesTag) => (
        <IndividualTag individualTag={studentServicesTag} key={studentServicesTag}/>
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

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="CHANGE FILTERED PROGRAMS PAGE">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Programs;
