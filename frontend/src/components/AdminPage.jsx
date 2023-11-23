import { React, useState } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components

function AdminPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleProgramClick = (program) => {
    setSelectedProgram(program.id === selectedProgram ? null : program.id);
    setSelectedTag(null);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag.id === selectedTag ? null : tag.id);
    setSelectedProgram(null);
  };

  const isProgramSelected = (programId) => programId === selectedProgram;
  const isTagSelected = (tagId) => tagId === selectedTag;
  // Dummy programs
  const dummyPrograms = [
    { id: 1, name: "LSAMP" },
    { id: 2, name: "EWX" },
    { id: 3, name: "ACCESS" },
    { id: 4, name: "NATIONS" },
    { id: 5, name: "GANAS" },
    { id: 6, name: "EMPOWER" },
    { id: 7, name: "TRIO" },
    { id: 8, name: "S^3" },
    { id: 9, name: "MESA C2C" },
    { id: 10, name: "NSF REU" },
    { id: 11, name: "URMP" },
    { id: 12, name: "HONORS COLLEGE" },
    { id: 13, name: "MECOP / CECOP" },
    { id: 14, name: "MCNAIR" },
    { id: 15, name: "EAGLES" },
    // Add more dummy programs as needed
  ];

  // Dummy tags
  const dummyTags = [
    { id: 1, name: "STEM" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Low Income" },
    { id: 4, name: "Ada Disability" },
    { id: 5, name: "Summer" },
    { id: 6, name: "Latino / Hispanic" },
    { id: 7, name: "Black / African American" },
    { id: 8, name: "First Generation" },
    { id: 9, name: "Native American" },
    { id: 10, name: "Pacific Islander" },
    // Add more dummy tags as needed
  ];

  return (
    <div className="m-auto">
      {/* Intro section */}
      <Row className="img-hero-welcome p-2">
        {/*<Col className="hero-img"></Col>*/}
        <Col>
          <section>
            <h1 className="intro text-center fw-bold">Admin Tools</h1>
            <p className="text-center">
              Select a Program or Tag by clicking on it. You can only select one
              at a time!
            </p>
          </section>
        </Col>
      </Row>

      {/* Programs section */}
      <Row className="p-3">
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          <div className="text-center border  border-dark rounded-5 p-2">
            <h2>Programs</h2>
            {dummyPrograms.map((program) => (
              <button
                type="button"
                className={`btn btn-primary p-2 m-1 ${
                  isProgramSelected(program.id) ? "bg-info" : "bg-primary"
                }`}
                key={program.id}
                onClick={() => handleProgramClick(program)}
              >
                {program.name}
              </button>
            ))}
            <hr />
            <div>
              {/*<button type="button" class="btn btn-dark  p-3 m-2">Add</button>*/}
              <button type="button" class="btn btn-danger p-2 m-2">
                Remove
              </button>
              {/*<button type="button" class="btn btn-dark p-3 m-2">Modify</button>*/}
            </div>
          </div>
        </Col>

        {/* Tags Section */}
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          <div className="text-center border border-dark rounded-5 p-2">
            <h2>Tags</h2>
            {dummyTags.map((tag) => (
              <button
                type="button"
                //class="btn btn-primary p-2 m-1"
                onClick={() => handleTagClick(tag)}
                className={`btn btn-primary p-2 m-1 ${
                  isTagSelected(tag.id) ? "bg-info" : "bg-primary"
                }`}
                key={tag.id}
              >
                {tag.name}
              </button>
            ))}
            <hr />
            <div>
              {/*<button type="button" class="btn btn-dark  p-3 m-2">Add</button>*/}
              <button type="button" class="btn btn-danger p-2 m-2">
                Remove
              </button>
              {/*<button type="button" class="btn btn-dark p-3 m-2">Modify</button>*/}
            </div>
          </div>
        </Col>
      </Row>

      <hr />

      {/* Program and Tag Info*/}
      <Row className="p-3">
        {/* Program Info */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded-5 p-5">
            <h2>Program Info</h2>
            <form action="">
              <div>
                <label htmlFor="ProgramName" className="p-2">
                  Program Title
                </label>
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="ProgramLeadContact" className="p-2">
                  Lead Contact
                </label>
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="ProgramEmail" className="p-2">
                  Contact Email
                </label>
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="LinkToWeb" className="p-2">
                  Link To Page
                </label>
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="LongDescription" className="p-2 align-top">
                  Long Description
                </label>
                <textarea cols="45" rows="9"></textarea>
              </div>
              <div className="mt-3">
                <input type="submit" class="btn btn-success p-2 m-2" />
              </div>
            </form>
          </div>
        </Col>

        {/* Tag Info */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded-5 p-5">
            <h2 className>Tag Info</h2>
            <form action="">
              <div>
                <label htmlFor="TagName" className="p-2">
                  Tag Name
                </label>
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="TagCategory" className="p-2">
                  Tag Category
                </label>
                <input type="text" size="42" />
              </div>
              <div className="mt-3">
                <input type="submit" class="btn btn-success p-2 m-2" />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminPage;
