import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';
// import Viking from '../image/viking.png'; 


const Programs = ({ selectedTagIds }) => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Convert Set to Array for the request
        const tagIdsArray = Array.from(selectedTagIds);

        const response = await axios.post("/programs/filter", { tagIds: tagIdsArray });

        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    if (selectedTagIds.size > 0) {
      fetchPrograms();
    }
  }, [selectedTagIds]);

  return (
    <Row xs={1} md={2} lg={3} xl={3} className="g-4">
      {programs.map((program, index) => (
        <Col key={index} className="mb-4 d-flex align-items-stretch">
          <Card className="w-100">
            <Card.Body>
              <Card.Title>{program.title}</Card.Title>
              <Card.Text>
                Lead Contact: {program.lead_contact}<br />
                Contact Email: <a href={`mailto:${program.contact_email}`}>{program.contact_email}</a>
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
    </Row>
  );
};

export default Programs;
