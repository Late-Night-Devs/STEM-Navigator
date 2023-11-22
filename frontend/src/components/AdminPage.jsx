
import React from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components

function AdminPage() {
  // Dummy programs
  const dummyPrograms = [
    { id: 1, name: "LSAMP" },
    { id: 2, name: "EWX" },
    { id: 3, name: "ACCESS" },
    // Add more dummy programs as needed
  ];

  // Dummy tags
  const dummyTags = [
    { id: 1, name: "STEM" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Low Income" },
    // Add more dummy tags as needed
  ];

  return (
    <div className="m-auto">
      {/* Programs section */}
      <Row className="img-hero-welcome">
        {/*<Col className="hero-img"></Col>*/}
        <Col>
          <section>
            <h1 className="intro text-center fw-bold">
              Admin Tools
            </h1>
            <p className = 'text-center'>Follow the instructions below to use the tool correctly..</p>
          </section>
        </Col>
      </Row>

      {/* Tags section */}
      <Row className="p-4">
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded p-4">
            <h2>Programs</h2>
            {dummyPrograms.map((program) => (
              <button key={program.id}>{program.name}</button>
            ))}
          </div>
        </Col>

        {/* Programs Section */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          {/* You may replace this with your actual content */}
          <div className="text-center border border-dark rounded p-4">
            <h2>Tags</h2>
            {dummyTags.map((tag) => (
              <button key={tag.id}>{tag.name}</button>
            ))}
          </div>
        </Col>
      </Row>

    </div>
  );
}

export default AdminPage;
