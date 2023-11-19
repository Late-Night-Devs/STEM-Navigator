import React, { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByTag from "./components/FilterByTag";
import Programs from "./components/Programs";
import PSU_logo from "./image/PSU_logo.png";

function App() {
  const [selectedTagIds, setSelectedTagIds] = useState(new Set());

  return (
    <Container fluid>
      <Row>
        <Col
          className="bg-light"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <Navbar
            bg="light"
            expand="lg"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <Navbar.Brand href="#">
              <div className="d-flex align-items-center">
                <img
                  src={PSU_logo}
                  className="img-fluid mr-2"
                  alt="PSU Logo"
                  style={{ width: "210px", height: "auto" }}
                />
                <h3
                  className="mb-1"
                  style={{ marginLeft: "15px", fontWeight: "bold" }}
                >
                  PSU STEM Access
                </h3>
              </div>
            </Navbar.Brand>
          </Navbar>
        </Col>
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
          <div>
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

export default App;
