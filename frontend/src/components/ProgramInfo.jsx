import React from "react";
import { Col } from "react-bootstrap";

export const ProgramInfo = () => {
  return (
    <Col md={10} lg={8} className="" style={{ minHeight: "200px" }}>
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
            <input type="submit" className="btn btn-success p-2 m-2" />
          </div>
        </form>
      </div>
    </Col>
  );
};

export default ProgramInfo;
