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

  // a way to organize related state values?
  const [selectionState, setSelectionState] = useState({
    selectedProgram: null, // is a program selected
    selectedTag: null, // is a tag selected
    showProgramInfo: false, 
    showTagInfo: false,
  });

  /* formattedProgramTags uses Tags and formats them for use by the Select <Select options={}>*/
  const [formattedTags, setFormattedTags] = useState(null);
  const [formattedCategories, setFormattedCategories] = useState([]);


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
    if (selectionState.selectedTag !== null) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedTag: null,
        showTagInfo: false,
      }));
      setSelectedTagInfo(null);
    }
    setAddingProgram(false);
    setAddingTag(false);
    // if clicking a selected program, deselect it
    if (program.id === selectionState.selectedProgram) {
      setSelectionState({
        selectedProgram: null,
        selectedTag: null,
        showProgramInfo: false,
        showTagInfo: false,
      });
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
      setSelectionState({
        selectedProgram: program.id,
        selectedTag: null,
        showProgramInfo: true,
        showTagInfo: false,
      });
      setSelectedProgramInfo({
        ProgramInfo: programInfo,
        AssociatedTags: associatedTags,
      });
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
  const isProgramSelected = (programId) =>
    programId === selectionState.selectedProgram;
  const isTagSelected = (tagId) => tagId === selectionState.selectedTag;

  const handleTagClick = (tag) => {
    if (addingProgram) {
      setAddingProgram(false);
    }
    if (selectionState.selectedProgram !== null) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedProgram: null,
        showProgramInfo: false,
      }));
      setSelectedProgramInfo(null);
      setAddingProgram(false);
      setAddingTag(false);
    }
    // if clicking a selected tag, deselect it
    if (tag.id === selectionState.selectedTag) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedTag: null,
        showTagInfo: false,
      }));
    } else {
      const tagInfo = tags.find((t) => t.tag_id === tag.id);
      setSelectionState({
        selectedProgram: null,
        selectedTag: tag.id,
        showProgramInfo: false,
        showTagInfo: true,
      });
      setSelectedTagInfo(tagInfo);
      setSelectedProgramInfo(null);
    }
  };

  const handleRemoveProgram = () => {
    // remove the selected program (if there is one)
    if (selectionState.selectedProgram == null) {
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
      selectionState.selectedProgram,
      "are you sure you want to delete the selected program?",
      onError,
      onSuccess
    );
  };

  const handleAddProgram = () => {
    setSelectionState((prevState) => ({
      selectedProgram: null,
      selectedTag: null,
      showProgramInfo: false,
      showTagInfo: false,
    }));

    setAddingProgram(true);
    setAddingTag(false);
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
    setSelectedTagInfo(null);
  };

  const handleAddTag = () => {
    setSelectionState((prevState) => ({
      ...prevState,
      selectedTag: null,
      selectedProgram: null,
    }));
    setSelectedTagInfo(null);
    setAddingTag(true);
    setAddingProgram(false);
    setSelectedProgramInfo(null);
  };

  const handleRemoveTag = () => {
    if (selectionState.selectedTag == null) {
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
      selectionState.selectedTag,
      "are you sure you want to delete the selected tag?",
      onSuccess,
      onError
    );
  };

  useEffect(() => {
    // This block will be executed after the component has re-rendered
    // when the selectedProgram changes state, update the visibility of ProgramInfo
    setSelectionState((prevState) => ({
      ...prevState,
      showProgramInfo: selectionState.selectedProgram !== null,
      showTagInfo: selectionState.selectedTag !== null,
    }));
  }, [selectionState.selectedProgram, selectionState.selectedTag]);

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
          {selectionState.showProgramInfo && (
            <ProgramInfo
              // using a 'key' prop forces a re-render when the key changes.
              key={selectionState.selectedProgram || "default-key"}
              programData={selectedProgramInfo}
              allProgramTags={formattedTags}
              onProgramDataChange={setSelectedProgramInfo}
            />
          )}
          {selectionState.showTagInfo && (
            <TagInfo
              tagData={selectedTagInfo}
              categories={formattedCategories}
              onTagDataChange={setSelectedTagInfo}
            />
          )}
          {/* render the blank form for adding new program */}
          {addingProgram && !selectionState.showProgramInfo && (
            <ProgramInfo
              programData={{}}
              allProgramTags={formattedTags}
              onProgramDataChange={setSelectedProgramInfo}
            />
          )}
          {/* render the blank form for adding new tag */}
          {addingTag && !selectionState.showTagInfo && (
            <TagInfo
              tagData={{}}
              categories={formattedCategories}
              onTagDataChange={setSelectedTagInfo}
            />
          )}

          {!selectionState.showTagInfo &&
            !selectionState.showProgramInfo &&
            !addingProgram &&
            !addingTag && (
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
