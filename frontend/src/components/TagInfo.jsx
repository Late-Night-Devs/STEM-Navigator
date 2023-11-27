import React from "react";
import { Col } from "react-bootstrap";

export const TagInfo = ({ tagData, onTagDataChange }) => { // Accept tagData and onTagDataChange as props

  const handleChange = (e) => {
    const { name, value } = e.target;
    onTagDataChange({ ...tagData, [name]: value });
  };

  return (
    <Col md={10} lg={8} className="" style={{ minHeight: "200px" }}>
      <div className="text-center border border-dark rounded-5 p-5">
        <h2>Tag Info</h2>
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
              value={tagData?.tag_name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="TagCategory" className="p-2">
              Tag Category
            </label>
            <input 
              type="text" 
              size="42" 
              id="TagCategory"
              name="category"
              value={tagData?.category || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <input type="submit" className="btn btn-success p-2 m-2" />
          </div>
        </form>
      </div>
    </Col>
  );
};

export default TagInfo;
