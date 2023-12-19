import React from "react";
import Select from "react-select";

export const TagInfo = ({ tagData, onTagDataChange, categories }) => {
  // Accept tagData and onTagDataChange as props

  const handleChange = (e) => {
    const { name, value } = e.target;
    onTagDataChange({ ...tagData, [name]: value });
  };

  return (
    <div className="text-center border border-dark rounded-5 p-2 m-3 flex-fill">
      ;<h2>Tag Info</h2>
      <form action="">
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
          <label htmlFor="Select Category" className="p-2">
            Select Category
          </label>
        </div>
        {/* TODO this should change to show the current selected tag's category on clicking a tag */}
        <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <Select options={categories} />
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
