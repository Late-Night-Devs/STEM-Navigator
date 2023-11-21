import React from "react";
import "../CSS/Program.css";
import TagCollection from "./TagCollection";

function ProgramTab() {
  return (
    <div className="m-auto">
      <div className="">
		
        <header>
          <h1 className="welcome text-primary text-center p-5">
            PSU STEM ACCESS
          </h1>
        </header>
        <main>
          <div className="hero-img"></div>

          <section>
            <p className="intro text-center fs-5 fw-bold">Welcome to...</p>
          </section>
		  
          <div className="search-container">
            <div className="w-50 p-3 text-center" id="filter">
              <h3>Filter By Tag</h3>
              <TagCollection />
            </div>
            
            <div className="w-50 p-3 text-center" id="program">
              <h3>Programs</h3>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default ProgramTab;
