import React from "react";
import Select from "react-select";
import { postData } from "./dataUtils.js"; // should be used to post data to the backend
import { SelectContainer, StyledLabel, Container } from "./sharedStyles.js";

export const TagInfo = ({ tagData, onTagDataChange, categories }) => {
  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    onTagDataChange({ ...tagData, [name]: value }); // append or edit value
  };
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Before updating: `, tagData);
    onTagDataChange({ ...tagData, [name]: value });
    //console.log(`After updating: `, { ...tagData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handle form submission here
    // gather the payload data
    // post to the backend
    function useResponse(response) {
      console.log("response from Backend: " + response);
    }

    function setError(e) {
      console.log("Backend returned error: " + e);
    }

    postData("admin/admin-modify-db/tag-form-submit", {payload: "/// SAMPLE PAYLOAD ///"}, useResponse, setError)
    console.log("Submitting form to backend");
  };

  const handleCategoryChange = (selectedOption) => {
    onTagDataChange({ ...tagData, category: selectedOption.value });
    // handle the category change
    console.log("Changing selected tag category to " + selectedOption.value);
  };

  return (
    <Container>
      <h2>Tag Info</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="TagName" className="p-2">
            Tag Name
          </label>
          <input
            type="text"
            size="42"
            id="TagName"
            name="tag_name"
            value={tagData?.tag_name}
            onChange={handleChange}
          />
        </div>
        <SelectContainer>
          <StyledLabel>
            Select Category
            <div>
              <Select
                options={categories}
                onChange={handleCategoryChange}
                value={
                  tagData
                    ? categories.find((c) => c.value === tagData.category)
                    : null
                }
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
    </Container>
  );
};

export default TagInfo;
