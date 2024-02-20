import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FavoritesBank from "./FavoritesBank";
import Timeline from "./Timeline";
import emptyTimeline from "./EmptyTimeline";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie"; // Import Cookies

const testPgrms = [
  {
    title: "LSAMP",
    lead_contact: "Joyce Pieretti Ph.D",
    contact_email: "lsamp@pdx.edu",
    link_to_web: "https://www.pdx.edu/alliance-minority-participation/",
    id: uuid4(),
  },
  {
    title: "MESA C2C",
    lead_contact: "Yongwen Lampert",
    contact_email: "mesac2c@pcc.edu",
    link_to_web: "https://www.pcc.edu/maker/stem-center/programming/mesac2c/",
    id: uuid4(),
  },
  {
    title: "ACCESS",
    lead_contact: "Vvdaul Holloway",
    contact_email: "vvdaul.holloway@pdx.edu",
    link_to_web: "https://ondeck.pdx.edu/multicultural-retention-services/access",
    id: uuid4(),
  },
];
const currDate = new Date();
const currYear = currDate.getFullYear();
const first4Years = [ currYear, currYear+1, currYear+2, currYear+3 ];

const backend_url = process.env.REACT_APP_BACKEND_URL;

function CalendarTab() {
  const [favoritesList, setFavoritesList] = useState(testPgrms);
  const [timeline, setTimeline] = useState(emptyTimeline);
  const [years, setYears] = useState(first4Years);
  const { isAuthenticated } = useAuth0();
  // get userID from cookies 
  const cookieUID = Cookies.get("cookieUId");
  console.log("checking cookieUID from calendar tab: ", cookieUID)

  // ================ fetching favorite programs via API ============== // 
  const checkFavoriteDatabase = async () => {
    if (!isAuthenticated && !cookieUID) {
      console.log("User is not authenticated. Please log in.");
      return;
    }
    try {
      // fetching favorite programs based on userID from cookies
      const response = await axios.get(
        `${backend_url}/user/favorite/getFavoritePrograms/${cookieUID}`,
        {
          withCredentials: true,
        }
      );
      console.log("Initial fetching data from favorite at calendar: ", response.data)
      // Check if response.data exists and is an array before applying the map function
      const addIDToPrograms = response.data && Array.isArray(response.data)
        ? response.data.map(program => ({
          ...program,
          id: uuid4(), // Add a new 'id' property with a UUID value to allow infinite copies
        }))
        : []; // Return an empty array if response.data is not iterable


      if (addIDToPrograms.length > 1) {
        //   avoid the case if there's only one program to be sorted out
        const sortedPrograms = addIDToPrograms.sort((a, b) => {
          // storing Alphabetically favorited programs
          return a.title.localeCompare(b.title);
        });
        //   after sorting successfully, storing them to programs
        setFavoritesList(sortedPrograms);
      } else {
        //  Handle only one favorite program.
        setFavoritesList(addIDToPrograms);
      }

      console.log("display data from calendar after formatting:  ", favoritesList)
    } catch (error) {
      console.log(
        "-----!!!!---- fetching fav programs from calendar ERROR ----------"
      );
      console.error("Error fetching programs:", error);
    }
  };

  const [isFavoriteClicked, setFavoriteClicked] = useState(false);
  // re-render the site again to update favorite programs.
  const handleFavoriteClicked = () => setFavoriteClicked(!isFavoriteClicked);
  // unmount the click is back to false until the user clicks on the favorite
  console.log("1/isFavoriteClicked:  ", isFavoriteClicked)
  useEffect(() => {
    checkFavoriteDatabase();
    setFavoriteClicked(false);
  }, [isFavoriteClicked]); // Add isFavoriteClicked to the dependency array

  // Inside the useEffect, log the updated value of isFavoriteClicked
  useEffect(() => {
    console.log("2/isFavoriteClicked: ", isFavoriteClicked);
  }, [isFavoriteClicked]);
  // =================== DONE ==========================================//

  // must be inside here to have access to "setTimeline"
  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return; // invalid destination
    if (  // cancelled add from bank
      source.droppableId === 'bankDroppable' &&
      destination.droppableId === 'bankDroppable'
    ) return;

    if (  // putting timeline entries back into bank
      source.droppableId !== 'bankDroppable' && 
      destination.droppableId === 'bankDroppable'
    ) {
      const srcMonth = timeline[source.droppableId];
      const srcList = Array.from(srcMonth.programIds);
      srcList.splice(source.index, 1);

      const updatedTimeline = {
        ...timeline,
        [srcMonth.title]: {
          ...srcMonth,
          programIds: srcList
        },
      }
      setTimeline(updatedTimeline);
      return;
    }

    const destMonth = timeline[destination.droppableId];
    const destList = Array.from(destMonth.programIds);
    let updatedTimeline = null;
    switch (source.droppableId) {
      case destination.droppableId: // reorder programs in same term
        updatedTimeline = {
          ...timeline,
          [destMonth.title]: {
            ...destMonth,
            programIds: reorderPrograms(destList, source.index, destination.index)
          },
        }
        break;

      case 'bankDroppable': // add new program to timeline from bank
        updatedTimeline = {
          ...timeline,
          [destMonth.title]: {
            ...destMonth,
            programIds: addProgram(
              favoritesList, source.index, destination.index, destList
            )
          },
        }
        break;

      default:  // move program entries between terms
        const srcMonth = timeline[source.droppableId];
        const srcList = Array.from(srcMonth.programIds);
        const [updatedSrcList, updatedDestList] = moveProgram(
          srcList, destList, source.index, destination.index
        );

        updatedTimeline = {
          ...timeline,
          [srcMonth.title]: {
            ...srcMonth,
            programIds: updatedSrcList
          },
          [destMonth.title]: {
            ...destMonth,
            programIds: updatedDestList
          },
        }
        break;
    }

    setTimeline(updatedTimeline);
  }

  function addYear() {
    const newYear = currYear + years.length;
    // don't push this to 'years' array until end
    // to keep years.length the same value

    const updatedTimeline = {
      ...timeline,
      ['Fall'+years.length]: {
        title: 'Fall'+years.length,
        programIds: []
      },
      ['Winter'+years.length]: {
        title: 'Winter'+years.length,
        programIds: []
      },
      ['Spring'+years.length]: {
        title: 'Spring'+years.length,
        programIds: []
      },
      ['Summer'+years.length]: {
        title: 'Summer'+years.length,
        programIds: []
      },
    }

    const updatedYears = years;
    updatedYears.push(newYear);
    setYears(updatedYears);
    setTimeline(updatedTimeline);
  }

  function deleteYear(year) {

  }

  return (
    <Container fluid>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* display favorite programs */}
        <FavoritesBank
          favoritesList={favoritesList}
          cookieUID={cookieUID}
          handleFavoriteClicked={handleFavoriteClicked}
        />

        <Button onClick={() => addYear()} className="my-3" id="newYear">
          New Year
        </Button>

        {/* drag n drop the program to the timeline */}
        {years.map((year, index) => (
          <div className="timelineContainer">
            <div>
              <h3 className="my-0 timelineHeader">{year}-{year+1}</h3>
              <Button onClick={() => {}} id="deleteYear"
                className="mx-3 mt-0 mb-2 timelineHeader" size="sm"
              >
                Delete Year
              </Button>
            </div>

            <Timeline
              timelineData={timeline}
              year={year}
              index={index}
              programOptions={favoritesList}
              cookieUID={cookieUID}
              handleFavoriteClicked={handleFavoriteClicked}
            />
          </div>
        ))}
      </DragDropContext>
    </Container>
  );
}

function reorderPrograms(programList, srcIndex, destIndex) {
  const [moved] = programList.splice(srcIndex, 1);
  programList.splice(destIndex, 0, moved);

  return programList;
}

function addProgram(favoritesList, srcIndex, destIndex, updatedList) {
  const program = favoritesList[srcIndex];
  updatedList.splice(destIndex, 0, { ...program, id: uuid4() });

  return updatedList;
}

function moveProgram(srcList, destList, srcIndex, destIndex) {
  const updatedSrcList = srcList;
  const updatedDestList = destList;
  const [moved] = updatedSrcList.splice(srcIndex, 1);
  updatedDestList.splice(destIndex, 0, moved);

  return [updatedSrcList, updatedDestList];
}

export default CalendarTab;