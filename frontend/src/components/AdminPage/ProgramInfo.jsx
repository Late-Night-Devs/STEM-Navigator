import React from "react";
import Select from "react-select";
import MultiSelectExample from "./MultiSelectExample";

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
}) => {
  // Accept onProgramDataChange as a prop

  const handleChange = (e) => {
    const { name, value } = e.target;
    onProgramDataChange({ ...programData, [name]: value });
  };

  return (
    <div className="text-center border border-dark rounded-5 p-2 m-3 flex-fill">
      <h2>Program Info</h2>
      <form action="">
        <div>
          <label htmlFor="ProgramName" className="p-2">
            Program Title
          </label>
          <input
            type="text"
            size="42"
            id="ProgramName"
            name="title" // Add a name attribute
            value={programData?.title || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ProgramLeadContact" className="p-2">
            Lead Contact
          </label>
          <input
            type="text"
            size="42"
            id="ProgramLeadContact"
            name="leadContact" // Add a name attribute
            value={programData?.lead_contact || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ProgramEmail" className="p-2">
            Contact Email
          </label>
          <input
            type="text"
            size="42"
            id="ProgramEmail"
            name="email" // Add a name attribute
            value={programData?.contact_email || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="LinkToWeb" className="p-2">
            Link To Page
          </label>
          <input
            type="text"
            size="42"
            id="LinkToWeb"
            name="link" // Add a name attribute
            value={programData?.link_to_web || ""}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="LongDescription" className="p-2 align-top">
          Long Description
        </label>
        <div>
          <textarea
            cols="54"
            rows="11"
            id="LongDescription"
            name="description" // Add a name attribute
            value={programData?.long_description || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div style={{ maxWidth: "500px", margin: "auto" }} className="p-2">
          <label htmlFor="Select Tags" className="p-2">
            Select Tags
          </label>
          {/*<MultiSelectExample allProgramTags={allProgramTags} />*/}
          <div>
            <Select options={allProgramTags} isMulti />
          </div>
        </div>
        <div className="mt-3">
          <input
            type="submit"
            className="btn btn-success p-2 m-2"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ProgramInfo;
