import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { postData } from "./dataUtils.js";
import { Row, Col } from "react-bootstrap";

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
  margin: 1rem 0;
`;

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0.25rem 0;
`;

const durationUnitOptions = [
  { value: null, label: "None" },
  { value: "Weeks", label: "Weeks" },
  { value: "Months", label: "Months" },
  { value: "Terms", label: "Terms" },
  { value: "Years", label: "Years" },
  // ... add more options as needed here
];

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
  isUniqueName,
}) => {
  const associatedTags = programData ? programData.AssociatedTags : null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!programData || !programData.ProgramInfo) {
      console.error("Program data is missing or invalid.");
      return;
    }

    if (
      programData.program_id === -1 &&
      !isUniqueName(programData.ProgramInfo.title)
    ) {
      window.alert("This program title is already in use!");
      return;
    }

    // Extract program info from programData
    const { ProgramInfo } = programData;

    // Construct payload
    const payload = {
      program_id: ProgramInfo.program_id,
      title: ProgramInfo.title,
      lead_contact: ProgramInfo.lead_contact,
      contact_email: ProgramInfo.contact_email,
      link_to_web: ProgramInfo.link_to_web,
      duration: ProgramInfo.duration,
      duration_unit: ProgramInfo.duration_unit,
      long_description: ProgramInfo.long_description,
    };

    postData(
      "admin/admin-modify-db/program-form-submit",
      payload,
      (response) => {
        console.log("Response from Backend: " + JSON.stringify(response));
      },
      (error) => {
        console.error("Backend returned error: " + error);
      }
    );

    console.log("Submitting form to backend with payload:", payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      onProgramDataChange((prevData) => ({
        ...prevData,
        ProgramInfo: {
          ...prevData.ProgramInfo,
          duration: value,
        },
      }));
    } else {
      onProgramDataChange((prevData) => ({
        ...prevData,
        ProgramInfo: { ...prevData.ProgramInfo, [name]: value },
      }));
    }
  };

  const handleSelectChange = (selectedOptions) => {
    onProgramDataChange((prevData) => ({
      ...prevData,
      AssociatedTags: selectedOptions || [],
    }));
  };

  const handleDurationUnitChange = (selectedOptions) => {
    onProgramDataChange((prevData) => ({
      ...prevData,
      ProgramInfo: {
        ...prevData.ProgramInfo,
        duration_unit: selectedOptions.value,
      },
    }));
  };

  return (
    <Container>
      <h2>Program Info</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledLabel htmlFor="ProgramName">Program Title</StyledLabel>
          <StyledInput
            type="text"
            id="ProgramName"
            name="title"
            value={programData?.ProgramInfo?.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <StyledLabel htmlFor="ProgramLeadContact">Lead Contact</StyledLabel>
          <StyledInput
            type="text"
            id="ProgramLeadContact"
            name="lead_contact"
            value={programData?.ProgramInfo?.lead_contact}
            onChange={handleChange}
          />
        </div>
        <div>
          <StyledLabel htmlFor="ContactEmail">Contact Email</StyledLabel>
          <StyledInput
            type="text"
            id="ContactEmail"
            name="contact_email"
            value={programData?.ProgramInfo?.contact_email}
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
            value={programData?.ProgramInfo?.link_to_web}
            onChange={handleChange}
          />
        </div>
        <span>Duration</span>
        <Container>
          <StyledRow>
            <Col xs={6}>
              <label htmlFor="DurationNumber">Number</label>
              <input
                type="number"
                id="DurationNumber"
                name="number"
                min="1" // duration can't be zero or negative
                value={programData?.ProgramInfo?.duration}
                onChange={handleChange}
                style={{ width: "75px" }}
              />
            </Col>
            <Col xs={6}>
              <label>
                Unit
                <Select
                  options={durationUnitOptions}
                  value={
                    durationUnitOptions.find(
                      (option) =>
                        option.value === programData?.ProgramInfo?.duration_unit
                    ) || "None"
                  }
                  onChange={handleDurationUnitChange}
                />
              </label>
            </Col>
          </StyledRow>
        </Container>
        <SelectContainer>
          <StyledLabel>
            Select Tags
            <Select
              value={associatedTags || []}
              options={allProgramTags}
              isMulti
              onChange={handleSelectChange}
            />
          </StyledLabel>
        </SelectContainer>

        <div>
          <StyledLabel htmlFor="LongDescription">Long Description</StyledLabel>
          <StyledTextArea
            cols="44"
            rows="12"
            id="LongDescription"
            name="long_description"
            value={programData?.ProgramInfo?.long_description}
            onChange={handleChange}
          />
        </div>
        <SubmitButton type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default ProgramInfo;
