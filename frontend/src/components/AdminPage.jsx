import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components
import { ButtonList } from "./ButtonList";
import { ProgramInfo } from "./ProgramInfo";
import { TagInfo } from "./TagInfo";
import useFetchData from "../useFetchData";
//import axios from "axios";
//const backend_url = process.env.REACT_APP_BACKEND_URL;

function AdminPage() {
  const { data: programs, error: programsError } = useFetchData("programs");
  const { data: tags, error: tagsError } = useFetchData("tags");
  // state values representing the the selected program or tag
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  // state values representing the visibility of the Program Info or Tag Info
  const [showProgramInfo, setShowProgramInfo] = useState(false);
  const [showTagInfo, setShowTagInfo] = useState(false);

  const [selectedProgramInfo, setSelectedProgramInfo] = useState(null);
  const [selectedTagInfo, setSelectedTagInfo] = useState(null);

  // Transform programs data for ButtonList
  const programItems = programs
    .map((program) => ({
      key: program.program_id,
      id: program.program_id,
      name: program.title,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Transform tags data for TagsList
  const tagItems = tags
    .map((tag) => ({
      key: tag.tag_id,
      id: tag.tag_id,
      name: tag.tag_name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleProgramClick = (program) => {
    // if clicking a selected program, deselect it
    if (program.id === selectedProgram) {
      setSelectedProgram(null);
      setSelectedProgramInfo(null);
    } else {
      // find a program with the same id as the selected program
      const programInfo = programs.find((p) => p.program_id === program.id);
      setSelectedProgram(program.id);
      setSelectedProgramInfo(programInfo);
      setSelectedTag(null);
      setShowTagInfo(false);
    }
  };

  // utility to determine if a program or tag is currently selected
  const isProgramSelected = (programId) => programId === selectedProgram;
  const isTagSelected = (tagId) => tagId === selectedTag;

  const handleTagClick = (tag) => {
    // if clicking a selected tag, deselect it
    if (tag.id === selectedTag) {
      setSelectedTag(null);
      setSelectedTagInfo(null);
    } else {
      const tagInfo = tags.find((t) => t.tag_id === tag.id);
      setSelectedTag(tag.id);
      setSelectedTagInfo(tagInfo);
      setSelectedProgram(null);
      setSelectedProgramInfo(null);
    }

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
      <Row className="p-4">
        {/* PROGRAMS */}
        <Col md={12} lg={6}>
          {(programsError || tagsError) && (
            <div className="bg-danger rounded-5 text-center p-2">
              <h5 className="text-white text-xl">
                Failed to load data. Ensure the backend is running!
              </h5>
            </div>
          )}
          <ButtonList
            name="Programs"
            items={programItems}
            isItemSelected={isProgramSelected}
            handleButtonClick={handleProgramClick}
            className="d-flex justify-content-center"
          />

          {/* TAGS*/}
          <ButtonList
            name="Tags"
            items={tagItems}
            isItemSelected={isTagSelected}
            handleButtonClick={handleTagClick}
          />
        </Col>

        <Col
          md={12}
          lg={6}
          className="d-flex flex-column justify-content-center"
        >
          {/* PROGRAM INFO */}
          {showProgramInfo && <ProgramInfo programData={selectedProgramInfo} />}
          {/* TAG INFO */}
          {showTagInfo && <TagInfo tagData={selectedTagInfo} />}
          {/* When not showing tags or programs, display this default message */}
          {!showTagInfo && !showProgramInfo && (
            <div className="text-center border border-dark rounded-5 p-2 m-3 flex-fill">
              <p className="p-2 m-2">
                Click on a Program or Tag to show information here.
              </p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default AdminPage;
