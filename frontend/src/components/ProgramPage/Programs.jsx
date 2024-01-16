import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Viking from "../../image/viking.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const Programs = ({ selectedTagIds }) => {
  const [programs, setPrograms] = useState([]);
  const [favorites, setFavorites] = useState({});
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

  const toggleFavorite = (programId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [programId]: !prevFavorites[programId],
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = programs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const noProgramsAfterFilter =
    selectedTagIds.size === 0 && programs.length === 0;

  return (
    <>
      <Row className="g-4">
        {currentItems.map((program) => (
          <Col key={program.id} md={4} className="mb-4">
            <Card className="w-100 position-relative">
              <FontAwesomeIcon
                icon={favorites[program.id] ? solidStar : regularStar}
                className="star-icon position-absolute top-0 end-0 m-2"
                onClick={() => toggleFavorite(program.id)}
                style={{
                  cursor: "pointer",
                  color: favorites[program.id] ? "gold" : "grey",
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
