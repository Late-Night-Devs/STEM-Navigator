
import React from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components

function AdminPage() {
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
    { id: 11, name: "NSF REU"},
    { id: 9, name: "URMP" },
    { id: 11, name: "HONORS COLLEGE"},
    { id: 9, name: "MECOP / CECOP" },
    { id: 11, name: "MCNAIR"},
    { id: 11, name: "EAGLES"},
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
      <Row className="img-hero-welcome p-3">
        {/*<Col className="hero-img"></Col>*/}
        <Col>
          <section>
            <h1 className="intro text-center fw-bold">
              Admin Tools
            </h1>
            <p className = 'text-center'>Select a Program or Tag by clicking on it. You can only select one at a time!</p>
          </section>
        </Col>
      </Row>

      {/* Programs section */}
      <Row className="">
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          <div className="text-center border border-dark rounded p-5">
            <h2>Programs</h2>
              {dummyPrograms.map((program) => (
                  <button type="button" class="btn btn-primary p-3 m-1" key={program.id}>{program.name}</button>
              ))}
              <hr />
              <div>
                {/*<button type="button" class="btn btn-dark  p-3 m-2">Add</button>*/}
                <button type="button" class="btn btn-dark p-3 m-2">Remove</button>
                {/*<button type="button" class="btn btn-dark p-3 m-2">Modify</button>*/}
              </div>
          </div>
        </Col>

        {/* Tags Section */}
        <Col md={12} lg={6} className="" style={{ minHeight: "125px" }}>
          {/* You may replace this with your actual content */}
          <div className="text-center border border-dark rounded p-5">
            {dummyTags.map((tag) => (
              <button type="button" class="btn btn-primary p-3 m-1" key={tag.id}>{tag.name}</button>
            ))}
            <hr />
            <div>
              {/*<button type="button" class="btn btn-dark  p-3 m-2">Add</button>*/}
              <button type="button" class="btn btn-dark p-3 m-2">Remove</button>
              {/*<button type="button" class="btn btn-dark p-3 m-2">Modify</button>*/}
            </div>
          </div>
        </Col>
      </Row>

      
    {/* Program and Tag Info*/}
    <Row className="mt-4">
        {/* Program Info */}
        <Col md={12} lg={6} className="" style={{ minHeight: "200px" }}>
          <div className="text-center border border-dark rounded p-5">
            <h2>Program Info</h2>
            <form action="">
              <div>
                <label htmlFor="ProgramName" className ="p-2">Program Title</label>
                <br />
                <input type="text" size="42"/>
              </div>
              <div>
                <label htmlFor="ProgramLeadContact" className="p-2">Lead Contact</label>
                <br />
                <input type="text" size="42"/>
              </div>
              <div>
                <label htmlFor="ProgramEmail" className="p-2">Contact Email</label>
                <br />
                <input type="text" size="42"/>
              </div>
              <div>
                <label htmlFor="LinkToWeb" className="p-2">Link To Page</label>
                <br />
                <input type="text" size="42"/>
              </div>
              <div>
                <label htmlFor="LongDescription" className="p-2">Long Description</label>
                <br />
                <textarea cols="45" rows="15"></textarea>
              </div>
              <div className="mt-3">
                <input type="submit" class="btn btn-success p-3 m-2"/>
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
                <label htmlFor="TagName" className="p-2">Tag Name</label>
                <br />
                <input type="text" size="42" />
              </div>
              <div>
                <label htmlFor="TagCategory" className="p-2">Tag Category</label>
                <br />
                <input type="text" size="42"/>
              </div>
              <div className="mt-3">
                <input type="submit" class="btn btn-success p-3 m-2"/>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdminPage;
