import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components
import { ButtonList } from "./ButtonList";
import { ProgramInfo } from "./ProgramInfo";
import { TagInfo } from "./TagInfo";
import useFetchData from "./useFetchData";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import styled from "styled-components";

// styled components
const PageContainer = styled.div`
  margin: auto;
`;

const IntroSection = styled.section`
  padding: 2rem;
  text-align: center;

  h1 {
    font-weight: bold;
  }
`;

const ProgramsAndTagsRow = styled(Row)`
  padding: 2rem;
`;

const StickyColumn = styled(Col)`
  position: sticky;
  top: 50px;
  height: fit-content; // Adjust the height
  max-height: 100vh; // Limit the max height
  overflow-y: auto; // Allow internal scrolling if content is too long
`;

const ErrorMessage = styled.div`
  background-color: #dc3545; // Bootstrap danger background
  color: white;
  text-align: center;
  padding: 2rem;
  border-radius: 5px;
`;

const DefaultMessage = styled.div`
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2rem;
  margin: 3rem;
  flex-fill: 1;
`;

function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuth0(); // Get user information
  // fetch the programs data from the backend
  const { data: programs, error: programsError } = useFetchData("programs");
  // fetch the tags data from the backend
  const { data: tags, error: tagsError } = useFetchData("tags");
  // currently unused
  /*
    pre-populate the Tags Selection on the Program edit form with 
    any program-tags entries which have the selected program id.
  */
  const { data: programTags, error: programTagsError } =
    useFetchData("program-tags");

  /* formattedProgramTags uses Tags and formats them for use by the Select <Select options={}>*/
  const [formattedProgramTags, setFormattedProgramTags] = useState(null);
  const [formattedCategories, setFormattedCategories] = useState([]);

  // state values representing the selected program or tag (represented by a yellow button)
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
      category: tag.category.trim(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleProgramClick = (program) => {
    // if clicking a selected program, deselect it
    if (program.id === selectedProgram) {
      setSelectedProgram(null);
      setSelectedProgramInfo(null);
    } else {
      // we selected a new program
      // get the associated tags for that program (found in programTags)
      const associatedTags = programTags
        .filter((pt) => pt.program_id === program.id)
        .map((pt) => {
          const tagInfo = tags.find((tag) => tag.tag_id === pt.tag_id);
          return tagInfo
            ? { value: tagInfo.tag_id.toString(), label: tagInfo.tag_name }
            : null;
        })
        .filter((tag) => tag !== null);
      //console.log("Associated Tags:", associatedTags);

      // find a program with the same id as the selected program
      const programInfo = programs.find((p) => p.program_id === program.id);
      setSelectedProgram(program.id);
      setSelectedProgramInfo({
        ProgramInfo: programInfo,
        AssociatedTags: associatedTags,
      });
      setSelectedTag(null);
      setShowTagInfo(false);
    }
  };

  // Extract unique categories from tags
  useEffect(() => {
    if (tags) {
      const uniqueCategories = new Set(tags.map((tag) => tag.category.trim()));
      const formatted = Array.from(uniqueCategories).map((category) => ({
        value: category, // The category name itself is the value
        label: category, // The category name is also the label
      }));
      setFormattedCategories(formatted);
    }
  }, [tags]);

  // runs when tags are available and formats them to be used by the Multi Select
  useEffect(() => {
    if (tags) {
      const formattedTags = tags.map((pt) => {
        const tagInfo = tags.find((tag) => tag.tag_id === pt.tag_id);
        return { value: tagInfo.tag_id.toString(), label: tagInfo.tag_name };
      });
      setFormattedProgramTags(formattedTags);
    }
  }, [tags]); // Depend on tags and programTags

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

  useEffect(() => {
    // when the selectedTag changes state, update the visibility of TagInfo
    if (selectedTag === null) {
      setShowTagInfo(false);
    } else {
      setShowTagInfo(true);
    }
  }, [selectedTag]);

  if (isLoading) {
    return null; // Render nothing while loading
  }

  // Redirect or show an error if the user is not authenticated or not the specific user
  if (
    !isAuthenticated ||
    (user && user.email !== "latenightdevsfw23@gmail.com")
  ) {
    return <p>Access Denied</p>;
  }

  return (
    <PageContainer>
      <Row className="img-hero-welcome">
        <Col>
          <IntroSection>
            <h1 className="intro">Admin Tools</h1>
            <p>
              Select a Program or Tag by clicking on it. You can only select one
              at a time!
            </p>
          </IntroSection>
        </Col>
      </Row>

      <ProgramsAndTagsRow>
        <Col md={12} lg={6}>
          {(programsError || tagsError || programTagsError) && (
            <ErrorMessage>
              <h5>Failed to load data. Ensure the backend is running!</h5>
            </ErrorMessage>
          )}
          <ButtonList
            name="Programs"
            items={programItems}
            isItemSelected={isProgramSelected}
            handleButtonClick={handleProgramClick}
          />
          <ButtonList
            name="Tags"
            items={tagItems}
            isItemSelected={isTagSelected}
            handleButtonClick={handleTagClick}
          />
        </Col>

        <StickyColumn md={12} lg={6}>
          {showProgramInfo && (
            <ProgramInfo
              programData={selectedProgramInfo}
              allProgramTags={formattedProgramTags}
            />
          )}
          {showTagInfo && (
            <TagInfo
              tagData={selectedTagInfo}
              categories={formattedCategories}
            />
          )}
          {!showTagInfo && !showProgramInfo && (
            <DefaultMessage>
              <p>Click on a Program or Tag to show information here.</p>
            </DefaultMessage>
          )}
        </StickyColumn>
      </ProgramsAndTagsRow>
    </PageContainer>
  );
}

export default AdminPage;
