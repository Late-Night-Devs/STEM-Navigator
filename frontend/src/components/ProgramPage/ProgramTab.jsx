import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByTag from "./FilterByTag";
import Programs from "./Programs";
import "../../CSS/ProgramTab.css";
import Cookies from "js-cookie";

function ProgramTab() {
  
  const [selectedTagIds, setSelectedTagIds] = useState(new Set());
    const cookieUID = Cookies.get("cookieUId");
    console.log(
      "\n >>>>> userID stored in COOKIE or not at the program tab: ",
      cookieUID
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
          <FilterByTag
            setSelectedTagIds={setSelectedTagIds}
            cookieUID={cookieUID}
          />
        </Col>
        <Col
          md={12}
          lg={6}
          className="border-end  rounded shadow "
          style={{ minHeight: "200px" }}
        >
          <div className="testing">
            {selectedTagIds.size > 0 ? (
              <Programs selectedTagIds={selectedTagIds} cookieUID={cookieUID} />
            ) : (
              <Programs selectedTagIds={new Set()} cookieUID={cookieUID} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProgramTab;
