import React from "react";
import Select from "react-select";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin: 0.25rem 0;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin: 0.25rem 0;
`;

const SelectContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 0.25rem;
`;

const SubmitButton = styled.input`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
}) => {
  const associatedTags = programData ? programData.AssociatedTags : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onProgramDataChange({
      ...programData,
      ProgramInfo: { ...programData.ProgramInfo, [name]: value },
    });
  };

  return (
    <Container>
      <h2>Program Info</h2>
      <form action="">
        <div>
          <StyledLabel htmlFor="ProgramName">Program Title</StyledLabel>
          <StyledInput
            type="text"
            id="ProgramName"
            name="title"
            value={programData?.ProgramInfo?.title || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="ProgramLeadContact">Lead Contact</StyledLabel>
          <StyledInput
            type="text"
            id="ProgramLeadContact"
            name="lead_contact"
            value={programData?.ProgramInfo?.lead_contact || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="ContactEmail">Contact Email</StyledLabel>
          <StyledInput
            type="text"
            id="ContactEmail"
            name="contact_email"
            value={programData?.ProgramInfo?.contact_email || ""}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div>
          <StyledLabel htmlFor="LinkToWeb">Link To Page</StyledLabel>
          <StyledInput
            type="text"
            id="LinkToWeb"
            name="link_to_web"
            value={programData?.ProgramInfo?.link_to_web || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="LongDescription">Long Description</StyledLabel>
          <StyledTextArea
            cols="44"
            rows="7"
            id="LongDescription"
            name="long_description"
            value={programData?.ProgramInfo?.long_description || ""}
            onChange={handleChange}
          />
        </div>
        <SelectContainer>
          <StyledLabel>Select Tags</StyledLabel>
          <Select
            defaultValue={associatedTags || []}
            options={allProgramTags}
            isMulti
          />
        </SelectContainer>
        <SubmitButton type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default ProgramInfo;
