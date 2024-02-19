import React from "react";
import Select from "react-select";
import { postData } from "./dataUtils.js"; // should be used to post data to the backend
import { SelectContainer, StyledLabel, Container } from "./sharedStyles.js";

export const TagInfo = ({
  tagData,
  onTagDataChange,
  categories,
  isUniqueName,
  handleReloadAfterSubmission,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const initialTagData = {
      // nullish coalescing operator
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
      tag_id: tagData?.tag_id ?? -1,
      tag_name: tagData?.tag_name ?? "",
      category: tagData?.category ?? "",
    };
    onTagDataChange({ ...initialTagData, [name]: value });
  };

  const handleSubmit = (e) => {
    // Ensure unique name
    if (tagData?.tag_id === -1 && !isUniqueName(tagData.tag_name)) {
      window.alert("Your chosen tag name is already in use!");
      e.preventDefault();
      return;
    }

    // Handle form submission here
    const payload = {
      tag_id: tagData.tag_id, // Ensure this is set correctly; -1 indicates a new tag
      tag_name: tagData.tag_name,
      category: tagData.category,
    };

    // Use the postData function for submitting the form data to the backend
    postData(
      "admin/admin-modify-db/tag-form-submit",
      payload,
      (response) => {
        console.log("Response from Backend: " + JSON.stringify(response));
        handleReloadAfterSubmission();
      },
      (error) => {
        console.error("Backend returned error: " + error);
      }
    );

    console.log("Submitting form to backend with payload:", payload);
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
            id="TagName"
            size="30"
            name="tag_name"
            value={tagData?.tag_name}
            onChange={handleChange}
            required
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
                  tagData && tagData.category
                    ? categories.find((c) => c.value === tagData?.category)
                    : null
                }
                required
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
