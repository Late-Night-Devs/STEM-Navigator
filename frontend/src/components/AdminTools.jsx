import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components
import { ButtonList } from "./ButtonList";
import { ProgramInfo } from "./ProgramInfo";
import { TagInfo } from "./TagInfo";

function AdminTools() {
  // state values representing the the selected program or tag
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  // state values representing the visibility of the Program Info or Tag Info
  const [showProgramInfo, setShowProgramInfo] = useState(false);
  const [showTagInfo, setShowTagInfo] = useState(false);

  const handleProgramClick = (program) => {
    // if clicking a selected program, deselect it
    setSelectedProgram(program.id === selectedProgram ? null : program.id);
    setSelectedTag(null);
    setShowTagInfo(false);
  };

  const handleTagClick = (tag) => {
    // if clicking a selected tag, deselect it
    setSelectedTag(tag.id === selectedTag ? null : tag.id);
    setSelectedProgram(null);
    setShowProgramInfo(false);
    //setShowTagInfo(true);
  };

  useEffect(() => {
    // This block will be executed after the component has re-rendered
    // when the selectedProgram changes state, update the visibility of ProgramInfo
    if (selectedProgram === null) {
      setShowProgramInfo(false);
    } else {
      setShowProgramInfo(true);
    }
  }, [selectedProgram]);

  // when the selectedTag changes state, update the visibility of TagInfo
  useEffect(() => {
    if (selectedTag === null) {
      setShowTagInfo(false);
    } else {
      setShowTagInfo(true);
    }
  }, [selectedTag]);

  // utility to determine if a program or tag is currently selected
  const isProgramSelected = (programId) => programId === selectedProgram;
  const isTagSelected = (tagId) => tagId === selectedTag;

  // Dummy programs
  const dummyPrograms = [
    { id: 1, name: "LSAMP" },
    { id: 2, name: "EWX" },
    { id: 3, name: "ACCESS" },
    { id: 4, name: "NATIONS" },
    { id: 5, name: "GANAS" },
    { id: 6, name: "EMPOWER" },
    { id: 7, name: "TRIO" },
    { id: 8, name: "S^3" },
    { id: 9, name: "MESA C2C" },
    { id: 10, name: "NSF REU" },
    { id: 11, name: "URMP" },
    { id: 12, name: "HONORS COLLEGE" },
    { id: 13, name: "MECOP / CECOP" },
    { id: 14, name: "MCNAIR" },
    { id: 15, name: "EAGLES" },
    // Add more dummy programs as needed
  ];

  // Dummy tags
  const dummyTags = [
    { id: 1, name: "STEM" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Low Income" },
    { id: 4, name: "Ada Disability" },
    { id: 5, name: "Summer" },
    { id: 6, name: "Latino / Hispanic" },
    { id: 7, name: "Black / African American" },
    { id: 8, name: "First Generation" },
    { id: 9, name: "Native American" },
    { id: 10, name: "Pacific Islander" },
    // Add more dummy tags as needed
  ];

  return (
    <div className="m-auto">
      {/* Intro section */}
      <Row className="img-hero-welcome p-2">
        <Col>
          <section>
            <h1 className="intro text-center fw-bold">Admin Tools</h1>
            <p className="text-center">
              Select a Program or Tag by clicking on it. You can only select one
              at a time!
            </p>
          </section>
        </Col>
      </Row>

      {/* PROGRAMS AND TAGS*/}
      <Row className="p-3">
        {/* PROGRAMS */}
        <ButtonList
          name="Programs"
          items={dummyPrograms}
          isItemSelected={isProgramSelected}
          handleButtonClick={handleProgramClick}
        />
        {/* TAGS*/}
        <ButtonList
          name="Tags"
          items={dummyTags}
          isItemSelected={isTagSelected}
          handleButtonClick={handleTagClick}
        />
      </Row>

      <hr />

      {/* PROGRAM INFO AND TAG INFO*/}
      <Row className="p-2 mx-auto d-flex justify-content-center">
        {/* PROGRAM INFO */}
        {showProgramInfo && <ProgramInfo />}
        {/* TAG INFO */}
        {showTagInfo && <TagInfo />}
      </Row>
    </div>
  );
}

export default AdminTools;
