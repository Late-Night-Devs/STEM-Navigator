import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByTag from "./FilterByTag";
import Programs from "./Programs";
import "../../CSS/ProgramTab.css";
import Cookies from "js-cookie";

function ProgramTab() {
  
  const [selectedTagIds, setSelectedTagIds] = useState(new Set());
    console.log(
      "\n >>>>> userID stored in COOKIE or not at the program tab: ",
      Cookies.get("cookieUId")
    );
  return (
    <Container fluid>
      <Row class="img-hero-welcome">
        <div className="hero-img"></div>
        <section>
          <p className="intro text-center fs-3 fw-bold p-5">
            Welcome to PSU STEM
          </p>
        </section>
      </Row>
      <Row className="mt-5">
        <Col md={12} lg={6} className="border-end">
          <FilterByTag setSelectedTagIds={setSelectedTagIds} />
        </Col>
        <Col
          md={12}
          lg={6}
          className="border-end  rounded shadow "
          style={{ minHeight: "200px" }}
        >
          <div className="testing">
            {selectedTagIds.size > 0 ? (
              <Programs selectedTagIds={selectedTagIds} />
            ) : (
              <Programs selectedTagIds={new Set()} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProgramTab;
