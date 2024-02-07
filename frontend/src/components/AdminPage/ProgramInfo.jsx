import React from "react";
import Select from "react-select";
import styled from "styled-components";
import {postData} from "./dataUtils.js"
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
`

  const durationUnitOptions = [
  { value: 'Weeks', label: 'Weeks' },
  { value: 'Months', label: 'Months' },
  { value: 'Terms', label: 'Terms' },
  { value: 'Years', label: 'Years' }
  // ... add more options as needed here
];

export const ProgramInfo = ({
  programData,
  allProgramTags,
  onProgramDataChange,
  isUniqueName
}) => {
  const associatedTags = programData ? programData.AssociatedTags : null;



  const handleSubmit = (e) => {

    // handle non-unique name on new program 
    if (programData?.ProgramInfo?.program_id === "-1" && !isUniqueName(programData?.ProgramInfo?.title))
    {
      e.preventDefault();
      window.alert("Your chosen program name is already in use!");
      return;
    }

    // Check if essential fields are filled
    if (!programData?.ProgramInfo?.title ||
      !programData?.ProgramInfo?.lead_contact ||
      !programData?.ProgramInfo?.contact_email ||
      !programData?.ProgramInfo?.link_to_web || 
      !programData?.ProgramInfo?.long_description ||
      (programData?.ProgramInfo?.duration && !programData?.ProgramInfo?.duration_unit)) { 
      //( || programData?.ProgramInfo?.long_description?.length <= 50)) { // can add later if needed
      e.preventDefault();
      window.alert("Please ensure all program fields are properly filled out.");
      //console.log("Please ensure all program fields are properly filled out.");
      return;
    }

    function useResponse(response) {
      console.log("response from Backend: ",response);
    }

    function setError(e) {
      console.log("Backend returned error: ", e);
    }

    // at this point we have ensured the tag data is valid for submission
    const payload = programData;
    // post to the backend
    console.log("submitting form to backend");
    postData("admin/admin-modify-db/program-form-submit", payload, useResponse, setError)
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      onProgramDataChange(prevData => ({
        ...prevData,
        ProgramInfo: {
          ...prevData.ProgramInfo,
          duration: value
        }
      }));
    } else {
      onProgramDataChange(prevData => ({
        ...prevData,
        ProgramInfo: {...prevData.ProgramInfo, [name]: value}
      }))
    }
  };

  const handleSelectChange = (selectedOptions) => {
    onProgramDataChange(prevData => ({
      ...prevData,
      AssociatedTags: selectedOptions || []
    }));
  }

  const handleDurationUnitChange = (selectedOptions) => {
    onProgramDataChange(prevData => ({
      ...prevData,
      ProgramInfo: {
        ...prevData.ProgramInfo,
        duration_unit: selectedOptions.value
      }
    }))
  }


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
                style={{width: "75px"}}
              />
            </Col>
            <Col xs={6}>
            <label>
              Unit
              <Select
                options={durationUnitOptions}
                value={durationUnitOptions.find(option => option.value === programData?.ProgramInfo?.duration_unit)}
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
