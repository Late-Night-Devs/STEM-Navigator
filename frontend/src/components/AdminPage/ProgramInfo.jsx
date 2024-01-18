import React from "react";
import Select from "react-select";

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
}) => {
  // Accept onProgramDataChange as a prop

  const associatedTags = programData ? programData.AssociatedTags : null;

  //const programInfo = programData ? programData.ProgramInfo : null;
  /* INCORRECT STRUCTURE
  const handleChange = (e) => {
    const { name, value } = e.target;
    onProgramDataChange({ ...programData.ProgramInfo, [name]: value });
  };
  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    onProgramDataChange({
      ...programData,
      ProgramInfo: { ...programData.ProgramInfo, [name]: value },
    });
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
            value={programData?.ProgramInfo?.title || ""}
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
            name="lead_contact" // Add a name attribute
            value={programData?.ProgramInfo?.lead_contact || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="p-2">
            {/*<label //htmlFor="ProgramEmail" className="p-2">*/}
            Contact Email
            <input
              type="text"
              size="42"
              //id="ProgramEmail"
              name="contact_email" // Add a name attribute
              value={programData?.ProgramInfo?.contact_email || ""}
              onChange={handleChange}
              autoComplete="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="LinkToWeb" className="p-2">
            Link To Page
          </label>
          <input
            type="text"
            size="42"
            id="LinkToWeb"
            name="link_to_web" // Add a name attribute
            value={programData?.ProgramInfo?.link_to_web || ""}
            onChange={handleChange}
          />
        </div>
        <label className="p-2 align-top">
          {/*<label htmlFor="LongDescription" className="p-2 align-top">*/}
          Long Description
          <div>
            <textarea
              cols="54"
              rows="11"
              //id="LongDescription"
              name="long_description" // Add a name attribute
              value={programData?.ProgramInfo?.long_description || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </label>
        <div style={{ maxWidth: "500px", margin: "auto" }} className="p-2">
          {/*<label htmlFor="Select Tags" className="p-2">*/}
          <label className="p-2">
            Select Tags
            <div>
              <Select
                defaultValue={associatedTags || []} // if null, empty array
                options={allProgramTags}
                isMulti
              />
            </div>
          </label>
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
