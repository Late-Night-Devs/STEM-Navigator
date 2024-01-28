//import React from "react";
//import Select from "react-select";
import styled from "styled-components";

export const Container = styled.div`
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

export const StyledLabel = styled.label`
  width: 100%;
`;

export const StyledInput = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
`;

export const SelectContainer = styled.div`
  max-width: 500px;
  margin: 1rem 0;
  padding: 0.25rem;
`;

export const SubmitButton = styled.input`
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
