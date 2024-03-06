import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Viking from "../../image/viking.png";
import SearchByProgram from "./SearchByProgram";
import useFetchData from "../AdminPage/dataUtils";
import ProgramCard from "./ProgramCard";

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
  const fetchProgramsBySelectingTagsID = async () => {
    try {
      console.log("Display all the programs - no filter\n", cookieUID);
      const tagIdsArray = Array.from(selectedTagIds);
      // If no tags are selected, fetch all programs
      const allProgramsResponse = await axios.post(
        `${backend_url}/programs/filter`,
        {
          tagIds: tagIdsArray,
          userID: cookieUID, // Make sure to include the userID
        }
      );
      if (allProgramsResponse.data.length > 1) {
        const sortedPrograms = allProgramsResponse.data.sort((a, b) => {
          // Compare the isFavorite property of program a and program b
          if (a.isFavorite === b.isFavorite) {
            // If they have the same isFavorite value, compare by title alphabetically
            return a.title.localeCompare(b.title);
          } else {
            // If they have different isFavorite values, prioritize the one with isFavorite: true
            return a.isFavorite ? -1 : 1;
          }
        });
        setPrograms(sortedPrograms);
        setStorePrograms(sortedPrograms);
        console.log("Sorted Programs from Programs.jsx: ", sortedPrograms);
      } else {
        console.log(
          "allProgramsResponse.data from Programs.jsx: ",
          allProgramsResponse.data
        );
        setPrograms(allProgramsResponse.data);
        setStorePrograms(allProgramsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };
  // Fetch programs based on selected tags or all programs if no tags are selected
  useEffect(() => {
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
        <h2 className="text-center mt-5">Programs</h2>
        <SearchByProgram handleSearchByProgram={handleSearchByProgram} />
        {currentItems.map((program) => (
          <ProgramColumn
            key={program.title}
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
  const [mdValue, setMdValue] = useState(6);
  const [xxlValue, setXxlValue] = useState(4);

  const changeColumnWidth = () => {
    mdValue === 6 ? setMdValue(12) : setMdValue(6);
    xxlValue === 4 ? setXxlValue(12) : setXxlValue(4);
    // if (mdValue === 4) {
    //   setMdValue(12);
    // } else {
    //   setMdValue(4);
    // }
  };

  return (
    <Col key={program.id} xs={12} md={mdValue} xxl={xxlValue} className="mb-4">
      <ProgramCard
        program={program}
        programTags={programTags}
        tags={tags}
        changeColumnWidth={changeColumnWidth}
        cookieUID={cookieUID}
        handleFavoriteClicked={handleFavoriteClicked}
      />
    </Col>
  );
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
