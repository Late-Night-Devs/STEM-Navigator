import React from "react";
import Select from "react-select";
import { postData } from "./dataUtils.js"; // should be used to post data to the backend
import { SelectContainer, StyledLabel, Container } from "./sharedStyles.js";

export const TagInfo = ({ tagData, onTagDataChange, categories }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    const initialTagData = {
      // nullish coalescing operator
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
      tag_id: tagData?.tag_id??-1, 
      tag_name: tagData?.tag_name??"", 
      category: tagData?.category?? ""
    };
    onTagDataChange({ ...initialTagData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // don't add a tag without a name
    if (!tagData || !tagData.tag_name || tagData.tag_name === "") {
      console.log("You must NAME your tag before submitting");
      return;
    }

    // don't add a tag without a category
    if (!tagData.category || tagData.category === "") {
      console.log("The tag must have a CATEGORY before submitting");
      return;
    }

    // TODO don't add a tag if the name already matches an existing tag name
    // if (tagMatchesExisting) {
    // console.log("You must pick a UNIQUE NAME for the tag.")
    // return; 
    // }

    // handle form submission here
    // gather the payload data
    // post to the backend
    function useResponse(response) {
      console.log("response from Backend: " + response);
    }

    function setError(e) {
      console.log("Backend returned error: " + e);
    }

    // at this point we have ensured the tag data is valid for submission
    const payload = tagData;
    postData("admin/admin-modify-db/tag-form-submit", payload, useResponse, setError)
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
