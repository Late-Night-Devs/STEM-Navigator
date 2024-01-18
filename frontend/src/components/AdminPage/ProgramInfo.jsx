import React from "react";
import Select from "react-select";
import styled from "styled-components";

import {
  Container,
  StyledLabel,
  StyledInput,
  SubmitButton,
  SelectContainer,
} from "./sharedStyles.js";

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin: 0.25rem 0;
`;

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
}) => {
  const associatedTags = programData ? programData.AssociatedTags : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    /* we need to account for the case that programData might be null? */
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
        <SelectContainer>
          <StyledLabel>Select Tags</StyledLabel>
          <Select
            defaultValue={associatedTags || []}
            options={allProgramTags}
            isMulti
          />
        </SelectContainer>
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
        <SubmitButton type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default ProgramInfo;
