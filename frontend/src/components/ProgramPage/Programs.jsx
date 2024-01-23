import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Viking from "../../image/viking.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

const backend_url = process.env.REACT_APP_BACKEND_URL;


const Programs = ({ selectedTagIds }) => {
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const tagIdsArray = Array.from(selectedTagIds);
        const response = await axios.post(`${backend_url}/programs/filter`, {
          tagIds: tagIdsArray,
        });
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, [selectedTagIds]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const noProgramsAfterFilter = currentItems.length === 0;

  return (
    <>
      <Row className="g-4">
        {currentItems.map((program) => (
          <Col key={program.id} md={4} className="mb-4">
            <ProgramCard program={program} />
          </Col>
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

const ProgramCard = ({ program }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated } = useAuth0();
  // Fetch the user ID from the cookie
  const cookieUserID = Cookies.get("cookieUId");
  console.log("\ncookieUID:  ", cookieUserID);
  console.log("\nprogramID: ", program.program_id);
  useEffect(() => {
    const checkFavoriteDatabase = async () => {
      if (!isAuthenticated) {
        console.log("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `${backend_url}/user/favorite/checkFavorite/${cookieUserID}/${program.program_id}`,
          {
            withCredentials: true,
          }
        );
         
        const isFavoriteInDatabase = response.data.isFavorite;
        //  console.log("checking the return from fav : ", isFavoriteInDatabase);
        setIsFavorite(isFavoriteInDatabase);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 (Not Found) by returning false
          setIsFavorite(false);
        } else if (error.response && error.response.status === 500) {
          console.error("Internal Server Error:", error);
        }
      }
    };

    checkFavoriteDatabase();
  }, [isAuthenticated, cookieUserID, program.program_id]);


  const toggleFavorite = async () => {
    console.log("programID in toggle: ", program.program_id, cookieUserID);
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
        userID: cookieUserID,
        programID: program.program_id,
      };

      const response = await axios.post(url, requestData, {
        withCredentials: true,
      });

      console.log(response.data);

      // Toggle the local state after successful request
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-100 position-relative">
      <FontAwesomeIcon
        icon={isFavorite ? solidStar : regularStar}
        className="star-icon position-absolute top-0 end-0 m-2"
        onClick={toggleFavorite}
        style={{
          cursor: "pointer",
          color: isFavorite ? "gold" : "grey",
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
};

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
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
