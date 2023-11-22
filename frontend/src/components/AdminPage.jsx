
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
      {/* Intro section */}
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

      {/* Programs section */}
      <Row className="">
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          <div className="text-center border border-dark rounded p-5">
            <h2>Programs</h2>
            {dummyPrograms.map((program) => (
              <button key={program.id}>{program.name}</button>
            ))}
          </div>
        </Col>

        {/* Tags Section */}
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          {/* You may replace this with your actual content */}
          <div className="text-center border border-dark rounded p-5">
            <h2>Tags</h2>
            {dummyTags.map((tag) => (
              <button key={tag.id}>{tag.name}</button>
            ))}
          </div>
        </Col>
      </Row>

      
    {/* Program and Tag Info*/}
    <Row className="mt-4">
        {/* Program Info */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded p-5">
            <h2>ProgramInfo</h2>
            <form action="">
              <div>
                <label htmlFor="ProgramName">Program Title</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="ProgramLeadContact">Lead Contact</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="ProgramEmail">Contact Email</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="LinkToWeb">Link To Page</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="LongDescription">Long Description</label>
                <input type="textarea" />
              </div>
            </form>
          </div>
        </Col>

        {/* Tag Info */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded p-5">
            <h2 className>Tag Info</h2>
            <form action="">
              <div>
                <label htmlFor="TagName">Tag Name</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="TagCategory">Tag Category</label>
                <input type="text" />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminPage;
