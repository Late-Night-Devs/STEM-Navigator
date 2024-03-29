import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "../../CSS/FilterByTag.css";
import SearchByCategory from "./SearchByCategory";
import DropdownCategory from "./DropdownCategory";
import Dropdown from "react-bootstrap/Dropdown";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const FilterByTag = ({ setSelectedTagIds, cookieUID }) => {
  const [categories, setCategories] = useState({});
  const [store, setStore] = useState({});
  const [tempCategories, setTempCategories] = useState({});
  const [tagIdMapping, setTagIdMapping] = useState({}); // Map tag names to IDs
  console.log("\t\n Filter By Tag - CookieUID:  ", cookieUID);

  const [clickedName, setClickedName] = useState("All Categories");
  // Fetch tags from the backend and store them in the state
  useEffect(() => {
    axios
      .get(`${backend_url}/tags`)
      .then((response) => {
        const fetchedCategories = {}; // Object to store categories and tags
        const tagIdMap = {}; // Map tag names to their IDs

        // Iterate through the fetched tags
        response.data.forEach((tag) => {
          // Trim whitespace from category and tag names
          const category = tag.category.trim();
          const tag_name = tag.tag_name.trim();
          const tag_id = tag.tag_id;

          // Add tags to their respective categories
          fetchedCategories[category] = fetchedCategories[category] || [];
          fetchedCategories[category].push(tag_name);

          // Map tag names to their IDs
          tagIdMap[tag_name] = tag_id;
        });

        setCategories(fetchedCategories);
        // Adding an tempData for All Category[] -> help reset data
        let tempData = { ...fetchedCategories };
        tempData = { "All Categories": [], ...tempData };
        //console.log("hello there", tempData);

        setTempCategories(tempData);
        setStore(fetchedCategories);
        setTagIdMapping(tagIdMap); // Store the tag id mapping
        // Sort categories alphabetically
        const sortedCategories = Object.fromEntries(
          Object.entries(fetchedCategories).sort(([catA], [catB]) =>
            catA.localeCompare(catB)
          )
        );

        // Sort tags alphabetically within each category
        for (const category in sortedCategories) {
          sortedCategories[category] = sortedCategories[category].sort();
        }

        // Update state with sorted categories and tag ID mapping
        setCategories(sortedCategories);
        setStore(sortedCategories);
        setTagIdMapping(tagIdMap);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // when the user selected the options, those tags will be stored as tag_id in an array
  // We will use tag_id later to search for desired programs.
  const handleCheckboxChange = (tagName) => {
    setSelectedTagIds((prevSelectedTagIds) => {
      const newSelectedTagIds = new Set(prevSelectedTagIds);
      const tagId = tagIdMapping[tagName]; // Get the tag ID from the tag name

      if (newSelectedTagIds.has(tagId)) {
        newSelectedTagIds.delete(tagId);
      } else {
        newSelectedTagIds.add(tagId);
      }

      // For searching purposes later, log the updated set of selected tag IDs
      console.log("tag_id selected: ", Array.from(newSelectedTagIds));
      console.log("tag_id selected: ", newSelectedTagIds);

      return newSelectedTagIds; // update the new state in setSelectedTagIds
    });
  };

  //Handle search for search function by tag in categories
  const handleSearch = (key) => {
    // Perform search within the store based on the provided key
    let myResult = findKeyValuePair(store, key);

    // If the key is empty, reset to the original store
    if (key === "") {
      myResult = store;
    }

    // Update the categories state variable with the search result
    setCategories(myResult);
  };

  // Helper function to find key-value pairs containing the search key
  function findKeyValuePair(data, key) {
    let result = {};

    // Iterate over each key in the data object
    for (const dataKey in data) {
      const values = data[dataKey];

      // Check each value in the array for a match with the search key
      for (const value of values) {
        if (value.toLowerCase().includes(key.toLowerCase())) {
          // If a match is found, add the key-value pair to the result object
          result[dataKey] = values;
          break; // Exit the loop after finding the first match for efficiency
        }
      }
    }

    return result; 
  }

  ///********Handle Dropdown function******** *//

  const handleClick = (event) => {
    const name = event.target.textContent;
    const currentCard = event.target;

    const className = event.target.className;

    let hasClickedClass = className.includes("clicked-div");

    if (!hasClickedClass) {
      //Remove all clicked-div class from other elements
      const otherCards = document.querySelectorAll(".card.clicked-div");
      otherCards.forEach((card) => {
        card.classList.remove("clicked-div");
      });
      // If not present, add the class to the current element
      currentCard.classList.add("clicked-div");
    }
    handleDropdown(name);

    setClickedName(name);
  };

  const handleDropdown = (name) => {
    let myResult = findName(store, name);

    if (name === "All Categories") {
      myResult = store;
    }
    setCategories(myResult);
  };

  function findName(data, name) {
    let result = {};
    for (let dataKey in data) {
      if (dataKey === name) {
        result[dataKey] = data[dataKey];
      }
    }
    return result;
  }

  return (
    <Container>
      <Row>
        <h2 className="mt-4 text-center">Filter by Tag</h2>
        <SearchByCategory handleSearch={handleSearch} categories={categories} />
        {clickedName && <DropdownCategory handleSearch={handleDropdown} />}

        {/* Dropdown function */}
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown"
            style={{
              background: "grey",
              width: "100%",
              marginBottom: "10px",
              border: "var(--salmon)",
              fontSize: "1em",
            }}
          >
            {clickedName}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              marginTop: "0px",
              width: "50%",
              textAlign: "center",
              fontFamily: "Cocogoose",
              fontSize: "1em",
            }}
          >
            {Object.keys(tempCategories).map((categoryName, index) => (
              <Dropdown.Item key={index} onClick={handleClick}>
                <div className="card">{categoryName}</div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {Object.entries(categories).map(([category, tags]) => (
          <Col key={category} xs={12} lg={6} xxl={4} className="mb-4 ">
            <Card>
              <Card.Header as="h5" className="bg-success text-white" aria-label={`${category} tag category`} tabIndex="0">
                {category}
              </Card.Header>
              <Card.Body
                className="scrollable-category"
              >
                <ul className="tagList">
                {tags.map((tag, index) => (
                  <Form.Check
                    type="checkbox"
                    id={`check-${tag}-${index}`}
                    key={`${tag}-${index}`}
                    label={tag}
                    tabIndex="-1"
                    onChange={() => handleCheckboxChange(tag)}
                  />
                ))}
                </ul>
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
