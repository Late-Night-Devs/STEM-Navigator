import React from "react";
import Select from "react-select";
//import { usePostData } from "./useData"; // should be used to post data to the backend

export const TagInfo = ({ tagData, onTagDataChange, categories }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onTagDataChange({ ...tagData, [name]: value }); // append or edit value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    // gather the payload data
    // post to the backend
    console.log("Submitting form to backend");
  };

  const handleCategoryChange = (selectedOption) => {
    onTagDataChange({ ...tagData, category: selectedOption.value });
    // handle the category change
    console.log("Changing selected tag category to " + selectedOption.value);
  };

  return (
    <div className="text-center border border-dark rounded-5 p-2 m-3 flex-fill">
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
            value={tagData?.tag_name || ""}
            onChange={handleChange}
          />
        </div>
        <div style={{ maxWidth: "500px", margin: "auto" }} className="p-2">
          <label className="p-2">
            Select Category
            <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
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

export default TagInfo;
