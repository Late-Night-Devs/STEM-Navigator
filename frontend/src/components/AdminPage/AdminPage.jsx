import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"; // Make sure to import Bootstrap components
import { ButtonList } from "./ButtonList";
import { ProgramInfo } from "./ProgramInfo";
import { TagInfo } from "./TagInfo";
import useFetchData, { handleDelete } from "./dataUtils";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import styled from "styled-components";
import Cookies from "js-cookie";

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
`;

  // other Messages inherit from this to reduce redundancy
  const BaseMessage = styled.h5`
  text-align: center;
  padding: 2rem;
  border-radius: 5px;
  `

// appears when there is not a connection to the backend
const ErrorMessage = styled(BaseMessage)`
  background-color: #dc3545; // Bootstrap danger background
  color: white;
`;

// appears by default place of the selected program or tag form 
const DefaultMessage = styled(BaseMessage)`
  border: 1px solid black;
  margin: 3rem;
  flex-fill: 1;
`;

// appears on small screens to inform user to scroll down to edit 
// the form after they press the 'add' button or select a program or tag.
// 992 px = large screen size
const ScrollNotice = styled(BaseMessage)`
  @media (max-width: 991px) {
    display: block; // display to small screens
  background-color: #2A2A2A;  
  color: white;
  }

  display: none; 
`

function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth0(); // Get user information
  // fetch the programs data from the backend
  const { data: programs, error: programsError } = useFetchData("programs");
  // fetch the tags data from the backend
  const { data: tags, error: tagsError } = useFetchData("tags");
  // fetch the relationship data between tags and programs
  const { data: programTags, error: programTagsError } =
    useFetchData("program-tags");
  // Check if the user is an admin from the cookie
  const isAdmin = Cookies.get("isAdmin") === "true";

  // a way to organize related state values?
  const [selectionState, setSelectionState] = useState({
    selectedProgram: null, // the id of the currently selected Program
    selectedTag: null, // the id of the currently selected Tag
  });

  /* formattedProgramTags uses Tags and formats them for use by the Select <Select options={}>*/
  const [formattedTags, setFormattedTags] = useState(null);
  const [formattedCategories, setFormattedCategories] = useState([]);

  // object state values representing information about the currently selected program or tag
  const [selectedProgramInfo, setSelectedProgramInfo] = useState(null);
  const [selectedTagInfo, setSelectedTagInfo] = useState(null);

  // button list items, transformed from programs and tags
  const [programItems, setProgramItems] = useState([]);
  const [tagItems, setTagItems] = useState([]);

  const [submitClicked, setSubmitClicked] = useState(false);

  // iterate over the tags to find a tag with matching name
  function isUniqueTagName(newTagName) {
    // if is unique, there is not some tag in the tags which has a matching name 
    return !tags.some(tag => tag.tag_name.toLowerCase() === newTagName.toLowerCase());
  }

  // iterate over the programs to find a program with matching name
  function isUniqueProgramName(newProgramName) {
    // if is unique, there is not some tag in the tags which has a matching name 
    return !programs.some(program => program.title.toLowerCase() === newProgramName.toLowerCase());
  }


  // for debugging 
  useEffect(() => {
    console.log("updated tag info: ", selectedTagInfo);
  }, [selectedTagInfo])

  useEffect(() => {
    console.log("updated program info: ", selectedProgramInfo);
  }, [selectedProgramInfo])

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
    // handle previously selected tag
    if (selectionState.selectedTag !== null) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedTag: null,
      }));
      setSelectedTagInfo(null);
    }
    // if clicking a selected program, deselect it
    if (program.id === selectionState.selectedProgram) {
      setSelectionState({
        selectedProgram: null,
        selectedTag: null,
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
    if (selectionState.selectedProgram !== null) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedProgram: null,
      }));
      setSelectedProgramInfo(null);
    }
    // if clicking a selected tag, deselect it
    if (tag.id === selectionState.selectedTag) {
      setSelectionState((prevState) => ({
        ...prevState,
        selectedTag: null,
      }));
    } else {
      const tagInfo = tags.find((t) => t.tag_id === tag.id);
      setSelectionState({
        selectedProgram: null,
        selectedTag: tag.id,
      });
      setSelectedTagInfo(tagInfo);
      setSelectedProgramInfo(null);
    }
  };

  const handleRemoveProgram = () => {
    // remove the selected program (if there is one)
    // -1 used for temporary program id of 'adding' program
    if (selectionState.selectedProgram == null || selectionState.selectedProgram === -1) {
      window.alert("No currently selected program to remove!")
      return;
    }

    const onSuccess = (response_data) => {
      // Handle successful deletion
      // update the ButtonList for Programs
      // update the Form to be empty
      window.location.reload();
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
      onSuccess,
      onError
    );
  };

  const handleAddProgram = () => {
    setSelectionState((prevState) => ({
      selectedProgram: -1, // -1 is an available temporary Program ID
      selectedTag: null,
    }));

    setSelectedProgramInfo({
      ProgramInfo: {
      program_id: "-1",
      title: "",
      lead_contact: "",
      contact_email: "",
      link_to_web: "",
      long_description: "",
      duration: "1",
      duration_unit: "Terms",
      },
      AssociatedTags: null
    });
    setSelectedTagInfo(null);
  };

  const handleAddTag = () => {
    setSelectionState((prevState) => ({
      ...prevState,
      selectedTag: -1,
      selectedProgram: null,
    }));
    setSelectedTagInfo({tag_id: -1, tag_name: "", category:null});
    setSelectedProgramInfo(null);
  };

  // not fully implemented yet
  const handleRemoveTag = () => {
    // -1 used for temporary program id of 'adding' tag
    if (selectionState.selectedTag == null || selectionState.selectedTag === -1) {
      window.alert("No currently selected tag to remove!");
      return;
    }
    const onSuccess = (response_data) => {
      // Handle successful deletion
      window.location.reload(); 
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

  if (isLoading) {
    return null; // Render nothing while loading
  }

  // Redirect or show an error if the user is not authenticated or not the specific user
  if (!isAuthenticated || !isAdmin) {
    return <p>Access Denied</p>;
  }

  //  handle refreshing the site after a successful submission
  const handleReloadAfterSubmission = () => setSubmitClicked(!submitClicked);

  return (
    <PageContainer>
      <ProgramsAndTagsRow>
        <Col md={12} lg={6}>
          {(programsError || tagsError || programTagsError) && (
            <ErrorMessage>
              Failed to load data. Ensure the backend is running!
            </ErrorMessage>
          )}
          <div>
            {(selectionState.selectedProgram || selectionState.selectedTag) && (
              <ScrollNotice>
                This webpage works best with larger screens. Scroll down to view
                form.
              </ScrollNotice>
            )}
          </div>
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
          {selectionState.selectedProgram != null && (
            <ProgramInfo
              // using a 'key' prop forces a re-render when the key changes.
              key={selectionState.selectedProgram || "default-key"}
              programData={selectedProgramInfo}
              allProgramTags={formattedTags}
              onProgramDataChange={setSelectedProgramInfo}
              isUniqueName={isUniqueProgramName}
              handleReloadAfterSubmission={handleReloadAfterSubmission}
            />
          )}
          {selectionState.selectedTag != null && (
            <TagInfo
              tagData={selectedTagInfo}
              categories={formattedCategories}
              onTagDataChange={setSelectedTagInfo}
              isUniqueName={isUniqueTagName}
              handleReloadAfterSubmission={handleReloadAfterSubmission}
            />
          )}
          {/* Show the default message when there is not a currently selected Tag or Program */}
          {selectionState.selectedTag == null &&
            selectionState.selectedProgram == null && (
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
