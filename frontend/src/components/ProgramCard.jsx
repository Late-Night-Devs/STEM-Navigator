import React from "react";
import { Card, Button } from "react-bootstrap";

function ProgramCard(props) {
  const program = props.program;

  return (
    <Card ref={props.innerRef}>
      <Card.Body>
        <Card.Title>{program.title}</Card.Title>
        <Card.Text>
          Lead Contact: {program.lead_contact} <br />
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
}

export default ProgramCard;