import React from "react";
import Select from "react-select";
import styled from "styled-components";

const StyledLabel = styled.label`
  padding: 0.5rem; // This is equivalent to 'p-2' in Bootstrap
  width: 100%;
`;

const SelectContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 0.5rem; // This is equivalent to 'p-2' in Bootstrap
`;

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
}) => {
  // tags that this program has in the ProgramTags table
  const associatedTags = programData ? programData.AssociatedTags : null;

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
          <StyledLabel htmlFor="ProgramName">Program Title</StyledLabel>
          <input
            type="text"
            size="42"
            id="ProgramName"
            name="title"
            value={programData?.ProgramInfo?.title || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="ProgramLeadContact">Lead Contact</StyledLabel>
          <input
            type="text"
            size="42"
            id="ProgramLeadContact"
            name="lead_contact"
            value={programData?.ProgramInfo?.lead_contact || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel>
            Contact Email
            <div>
              <input
                type="text"
                size="42"
                name="contact_email"
                value={programData?.ProgramInfo?.contact_email || ""}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </StyledLabel>
        </div>
        <div>
          <StyledLabel htmlFor="LinkToWeb">Link To Page</StyledLabel>
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
        <SelectContainer>
          {/*<label htmlFor="Select Tags" className="p-2">*/}
          <StyledLabel>
            Select Tags
            <div>
              <Select
                defaultValue={associatedTags || []} // if null, empty array
                options={allProgramTags}
                isMulti
              />
            </div>
          </StyledLabel>
        </SelectContainer>
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
