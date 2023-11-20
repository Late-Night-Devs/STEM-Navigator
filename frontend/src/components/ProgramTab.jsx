import React from "react";
import "../CSS/Program.css";
import TagCategory from "./TagCategory";

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
            <div className="filter w-50 p-3 bg-info text-center">
              <h2>Filter By Tag</h2>
              <TagCategory />
            </div>
            
            <div className="program w-50 p-3 bg-secondary text-center">
              <h2>Programs</h2>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default ProgramTab;
