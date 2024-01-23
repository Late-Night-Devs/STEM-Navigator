import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components
import { ButtonList } from "./ButtonList";
import { ProgramInfo } from "./ProgramInfo";
import { TagInfo } from "./TagInfo";
import useFetchData, { handleDelete } from "./dataUtils";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import styled from "styled-components";

// styled components
const PageContainer = styled.div`
  margin: auto;
`;

const ProgramsAndTagsRow = styled(Row)`
  padding: 2rem;
`;

const StickyColumn = styled(Col)`
  position: sticky;
  top: 50px;
  height: fit-content; // Adjust the height
  max-height: 100vh; // Limit the max height
  overflow-y: visible; // allow overflow to be visible
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
  // fetch the relationship data between tags and programs
  const { data: programTags, error: programTagsError } =
    useFetchData("program-tags");

  /* formattedProgramTags uses Tags and formats them for use by the Select <Select options={}>*/
  const [formattedTags, setFormattedTags] = useState(null);
  const [formattedCategories, setFormattedCategories] = useState([]);

  // state values representing the selected program or tag (represented by a yellow button)
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // boolean state values representing the visibility of the Program Info or Tag Info
  const [showProgramInfo, setShowProgramInfo] = useState(false);
  const [showTagInfo, setShowTagInfo] = useState(false);

  // object state values representing information about the currently selected program or tag
  const [selectedProgramInfo, setSelectedProgramInfo] = useState(null);
  const [selectedTagInfo, setSelectedTagInfo] = useState(null);

  // handle add btn press
  const [addingProgram, setAddingProgram] = useState(false);
  const [addingTag, setAddingTag] = useState(false);

  // button list items
  const [programItems, setProgramItems] = useState([]);
  const [tagItems, setTagItems] = useState([]);

  useEffect(() => {
    if (programs) {
      console.log("programs re-loaded");
      const transformedPrograms = programs
        .map((program) => ({
          key: program.program_id,
          id: program.program_id,
          name: program.title,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setProgramItems(transformedPrograms);
    }
  }, [programs]); // Recalculate when programs data changes

  useEffect(() => {
    if (tags) {
      const transformedTags = tags
        .map((tag) => ({
          key: tag.tag_id,
          id: tag.tag_id,
          name: tag.tag_name,
          category: tag.category.trim(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setTagItems(transformedTags);
    }
  }, [tags]); // Recalculate when tags data changes

  const handleProgramClick = (program) => {
    setAddingProgram(false);
    setAddingTag(false);
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
      setFormattedTags(formattedTags);
    }
  }, [tags]); // Depend on tags and programTags

  // utility to determine if a program or tag is currently selected
  const isProgramSelected = (programId) => programId === selectedProgram;
  const isTagSelected = (tagId) => tagId === selectedTag;

  const handleTagClick = (tag) => {
    // if clicking a selected tag, deselect it
    setAddingProgram(false);
    setAddingTag(false);

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

  const handleRemoveProgram = () => {
    // remove the selected program (if there is one)
    if (selectedProgram == null) {
      console.log("no selected program to remove");
      return;
    }

    const onSuccess = (response_data) => {
      // Handle successful deletion
      // update the ButtonList for Programs
      // update the Form to be empty
      //setSelectedProgram(null);
      //setSelectedProgramInfo(null);
    };
    const onError = (error) => {
      // Handle error
      //console.log(error);
      console.log("backend returned error: " + error);
    };
    handleDelete(
      "programs",
      selectedProgram,
      "are you sure you want to delete the selected program?",
      onError,
      onSuccess
    );
  };

  const handleAddProgram = () => {
    setAddingProgram(true);
    setAddingTag(false);
    setSelectedProgram({}); // empty program object
    setSelectedProgramInfo({
      program_id: "-1",
      title: "",
      lead_contact: "",
      contact_email: "",
      link_to_web: "",
      duration: "",
      duration_unit: "",
      long_description: "",
    });
    setSelectedTag(null);
    setSelectedTagInfo(null);
  };

  const handleAddTag = () => {
    setSelectedTag({}); //  empty tag object
    setSelectedTagInfo({ tag_id: "-1", tag_name: "", category: "" }); // structure of a tag
    setAddingTag(true);
    setAddingProgram(false);
    setSelectedProgram(null);
    setSelectedProgramInfo(null);
  };

  const handleRemoveTag = () => {
    if (selectedTag == null) {
      console.log("no selected tag to remove");
      return;
    }
    const onSuccess = (response_data) => {
      // Handle successful deletion
      console.log(response_data);
    };
    const onError = (error) => {
      // Handle error
      console.log(error);
    };
    handleDelete(
      "tags",
      selectedTag,
      "are you sure you want to delete the selected tag?",
      onSuccess,
      onError
    );
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
            handleRemoveBtnClick={handleRemoveProgram}
            handleAddBtnClick={handleAddProgram}
          />
          <ButtonList
            name="Tags"
            items={tagItems}
            isItemSelected={isTagSelected}
            handleButtonClick={handleTagClick}
            handleRemoveBtnClick={handleRemoveTag}
            handleAddBtnClick={handleAddTag}
          />
        </Col>

        <StickyColumn md={12} lg={6}>
          {showProgramInfo && (
            <ProgramInfo
              // using a 'key' prop forces a re-render when the key changes.
              key={selectedProgram || "default-key"}
              programData={selectedProgramInfo}
              allProgramTags={formattedTags}
              onProgramDataChange={setSelectedProgramInfo}
            />
          )}
          {showTagInfo && (
            <TagInfo
              tagData={selectedTagInfo}
              categories={formattedCategories}
              onTagDataChange={setSelectedTagInfo}
            />
          )}
          {/* render the blank form for adding new program */}
          {addingProgram && !showProgramInfo && (
            <ProgramInfo
              programData={{}}
              allProgramTags={formattedTags}
              onProgramDataChange={setSelectedProgramInfo}
            />
          )}
          {/* render the blank form for adding new tag */}
          {addingTag && !showTagInfo && (
            <TagInfo
              tagData={{}}
              categories={formattedCategories}
              onTagDataChange={setSelectedTagInfo}
            />
          )}

          {!showTagInfo && !showProgramInfo && !addingProgram && !addingTag && (
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
