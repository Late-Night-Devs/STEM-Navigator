// this one is not being used at this moment.
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Viking from '../image/viking.png'

const Programs = ({ programs }) => {
  if (!programs || programs.length === 0) {
    return <div className='mb-3 text-center' style={{ fontSize: '2rem', color: 'green' }}>
      <strong> Can't find any programs - Please select again! </strong>
      <img
        className="img-fluid mx-auto" // Use mx-auto to center horizontally
        src={Viking}
        alt="viking thinking ..."
        style={{ width: '250px', height: 'auto' }}
      />
    </div>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {programs.map((program, index) => (
        <Col key={index} className="d-flex align-items-stretch">
          {/* display info of the prgram like a card */}
          <Card className="flex-fill">
            {program.imageUrl && <Card.Img variant="top" src={program.imageUrl} />}
            <Card.Body>
              <Card.Title>{program.name}</Card.Title>
              <Card.Text>{program.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" href={program.link}>Learn More</Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Programs;
