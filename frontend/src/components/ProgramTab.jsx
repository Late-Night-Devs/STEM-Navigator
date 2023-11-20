import React from "react";
import "../CSS/Program.css";

function ProgramTab() {
  return (
    <div className="m-auto">
      <div className="">
        <header>
          {/* <h1 className="welcome text-primary text-center p-5">
            PSU STEM ACCESS
          </h1> */}
        </header>
        <main>
          <div className="hero-img"></div>
          <section>
            <p className="intro text-center fs-5 fw-bold">Welcome to...</p>
          </section>
          <div className="container">
            <div className="filter w-50 p-3 bg-info">
              <span>Filter By Tag</span>
            </div>
            <div className="program w-50 p-3 bg-secondary">
              <span>Programs</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProgramTab;
