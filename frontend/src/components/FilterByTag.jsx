import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "../CSS/FilterByTag.css";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const FilterByTag = ({ setSelectedTagIds }) => {
  const [categories, setCategories] = useState({});
  const [tagIdMapping, setTagIdMapping] = useState({});       // Map tag names to IDs
 
  useEffect(() => {
    axios
      .get(`${backend_url}/tags`)
      .then((response) => {
        const fetchedCategories = {};                         //create an empty object < key, value >
        const tagIdMap = {};

        response.data.forEach((tag) => {
          const category = tag.category.trim();               // handle bad input like "programs " and "programs"
          const tag_name = tag.tag_name.trim();
          const tag_id = tag.tag_id;                          // get this data from the backend

          fetchedCategories[category] = fetchedCategories[category] || []; // if the arr has category already existed || null
          fetchedCategories[category].push(tag_name);

          tagIdMap[tag_name] = tag_id;                        // Map tag names to their IDs
        });

        setCategories(fetchedCategories);
        setTagIdMapping(tagIdMap);                             // Store the tag id mapping
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // when the user selected the options, those tags will be stored as tag_id in an array
  // We will use tag_id later to search for desired programs. 
  const handleCheckboxChange = (tagName) => {
    setSelectedTagIds((prevSelectedTagIds) => {
      const newSelectedTagIds = new Set(prevSelectedTagIds);
      const tagId = tagIdMapping[tagName];                    // Get the tag ID from the tag name

      if (newSelectedTagIds.has(tagId)) {
        newSelectedTagIds.delete(tagId);
      } else {
        newSelectedTagIds.add(tagId);
      }

      // For searching purposes later, log the updated set of selected tag IDs
      console.log("tag_id selected: ", Array.from(newSelectedTagIds));
      return newSelectedTagIds;                              // update the new state in setSelectedTagIds 
    });
  };

  return (
    <Container>
      <Row>
        {Object.entries(categories).map(([category, tags]) => (
          <Col key={category} md={4} className="mb-4 ">
            <Card>
              <Card.Header as="h5" className="bg-success text-white">
                {category}
              </Card.Header>
              <Card.Body>
                {tags.map((tag, index) => (
                  <Form.Check
                    type="checkbox"
                    id={`check-${tag}-${index}`}
                    key={`${tag}-${index}`}
                    label={tag}
                    onChange={() => handleCheckboxChange(tag)}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>



      {/* maybe this is used to add reset filter btn or any options later */}
    </Container>
  );
};

export default FilterByTag;
