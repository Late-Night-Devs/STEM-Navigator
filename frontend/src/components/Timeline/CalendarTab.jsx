import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FavoritesBank from "./FavoritesBank";
import Timeline from "./Timeline";
import emptyTimeline from "./EmptyTimeline";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie"; // Import Cookies


const backend_url = process.env.REACT_APP_BACKEND_URL;

function CalendarTab() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [timeline, setTimeline] = useState(emptyTimeline);
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
      const addIDToPrograms = response.data.map(program => ({
        ...program,
        // the key is here. Drag n drop set up needs id. I add it to our response data. 
        // without this id, the data can be displayed but not dragged and dropped anywhere.
        id: uuid4(), // Add a new 'id' property with a UUID value
      }));

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

  useEffect(() => {
    //   fetching favorite data once
    checkFavoriteDatabase();
  }, []);
  // =================== DONE ==========================================//

  // must be inside here to have access to "setTimeline"
  // TO DO: clean up inside, move outside of component & pass in "setTimeline"
  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination || destination.droppableId === 'bankDroppable') return;

    switch (source.droppableId) {
      case destination.droppableId: {
        const month = timeline[destination.droppableId];
        const reorderedList = Array.from(month.programIds);
        const [movedProgram] = reorderedList.splice(source.index, 1);
        reorderedList.splice(destination.index, 0, movedProgram);

        const updatedTimeline = {
          ...timeline,
          [month.title]: {
            ...month,
            programIds: reorderedList
          },
        }
        setTimeline(updatedTimeline);
        break;
      }
      case 'bankDroppable': {
        const month = timeline[destination.droppableId];
        const updatedList = Array.from(month.programIds);
        const program = testPgrms[source.index];
        updatedList.splice(destination.index, 0, { ...program, id: uuid4() });

        const updatedTimeline = {
          ...timeline,
          [month.title]: {
            ...month,
            programIds: updatedList
          },
        }
        setTimeline(updatedTimeline);
        break;
      }
      default: {
        const srcMonth = timeline[source.droppableId];
        const destMonth = timeline[destination.droppableId];

        const updatedSrcList = Array.from(srcMonth.programIds);
        const updatedDestList = Array.from(destMonth.programIds);
        const [movedProgram] = updatedSrcList.splice(source.index, 1);
        updatedDestList.splice(destination.index, 0, movedProgram);

        const updatedTimeline = {
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
        setTimeline(updatedTimeline);
        break;
      }
    }
  }

  return (
    <Container fluid>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* display favorite programs */}
        <FavoritesBank favoritesList={favoritesList} />
        {/* drag n drop the program to the timeline */}
        <div id="timelineContainer">
          <Timeline timelineData={timeline} programOptions={favoritesList} />
        </div>
      </DragDropContext>
    </Container>
  );
}

export default CalendarTab;