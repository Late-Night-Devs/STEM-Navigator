import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import Viking from "../image/viking.png";
const backend_url = process.env.REACT_APP_BACKEND_URL;

const Programs = ({ selectedTagIds }) => {
  const [programs, setPrograms] = useState([]);

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

  const noProgramsAfterFilter =
    selectedTagIds.size === 0 && programs.length === 0;

  return (
    <Row className="g-4">
      {programs.map((program, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card className="w-100">
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
          {" "}
          <div className="mt-5">
            {" "}
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
  );
};

export default Programs;
