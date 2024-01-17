import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByTag from "./FilterByTag";
import Programs from "./Programs";
import SearchBar from "./SearchBar";
import "../../CSS/ProgramTab.css";

const backend_url = process.env.REACT_APP_BACKEND_URL;

function ProgramTab() {
  const [selectedTagIds, setSelectedTagIds] = useState(new Set());

  /************************************************************** */
  //This code was moved from FilterByTag, which helps use "reatc props"
  const [categories, setCategories] = useState({});
  const [tagIdMapping, setTagIdMapping] = useState({});

  const [store, setStore] = useState({});

  useEffect(() => {
    axios
      .get(`${backend_url}/tags`)
      .then((response) => {
        const fetchedCategories = {}; //create an empty object < key, value >
        const tagIdMap = {};

        response.data.forEach((tag) => {
          const category = tag.category.trim(); // handle bad input like "programs " and "programs"
          const tag_name = tag.tag_name.trim();
          const tag_id = tag.tag_id; // get this data from the backend

          fetchedCategories[category] = fetchedCategories[category] || []; // if the arr has category already existed || null
          fetchedCategories[category].push(tag_name);

          tagIdMap[tag_name] = tag_id; // Map tag names to their IDs
        });

        setCategories(fetchedCategories);
        setTagIdMapping(tagIdMap); // Store the tag id mapping
        setStore(fetchedCategories); //store caterogy for searchBar
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);
  /*************************************************************** */

  //Handle search for search function
  const handleSearch = (key) => {
    let myResult = findKeyValuePair(categories, key);
    if (key === "") {
      myResult = store;
    }
    console.log("current: ", myResult);
    setCategories(myResult);
  };

  function findKeyValuePair(data, key) {
    let result = {};
    for (const dataKey in data) {
      if (dataKey.toLowerCase().includes(key)) {
        result = { ...result, [dataKey]: data[dataKey] };
      }
    }
    if (Object.keys(result).length !== 0) {
      return result;
    } else {
      return store;
    }
  }

  return (
    <Container fluid>
      <Row class="img-hero-welcome">
        <div className="hero-img"></div>
        <section>
          <p className="intro text-center fs-3 fw-bold p-5">
            Welcome to PSU STEM
          </p>
        </section>
      </Row>

      <Row>
        <div className="search">
          <SearchBar handleSearch={handleSearch} categories={categories} />
        </div>
      </Row>

      <Row className="mt-5">
        <Col md={12} lg={6} className="border-end">
          <FilterByTag
            tagIdMapping={tagIdMapping}
            setSelectedTagIds={setSelectedTagIds}
            categories={categories}
          />
        </Col>

        <Col
          md={12}
          lg={6}
          className="border-end  rounded shadow "
          style={{ minHeight: "200px" }}
        >
          <div className="testing">
            {selectedTagIds.size > 0 ? (
              <Programs selectedTagIds={selectedTagIds} />
            ) : (
              <Programs selectedTagIds={new Set()} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProgramTab;
