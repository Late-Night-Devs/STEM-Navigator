import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FavoritesBank from "./FavoritesBank";
import Timeline from "./Timeline";
import { emptyTimeline, currYear, first4Years} from "./EmptyTimeline";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie"; // Import Cookies

const backend_url = process.env.REACT_APP_BACKEND_URL;

function CalendarTab() {
  const [favoritesList, setFavoritesList] = useState([]);
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
          id: uuid4(), // Add a new 'id' property with a UUID value
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
  // no matter what is true or false for the favorite btn as long as they click on the star icon
  // it needs to re-render the site again to update favorite programs.
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
  // TO DO: clean up inside, move outside of component & pass in "setTimeline"
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
      case destination.droppableId: {
        const [movedProgram] = destList.splice(source.index, 1);
        destList.splice(destination.index, 0, movedProgram);

        updatedTimeline = {
          ...timeline,
          [destMonth.title]: { ...destMonth, programIds: destList },
        }
        setTimeline(updatedTimeline);
        break;
      }
      case 'bankDroppable': {
        const program = favoritesList[source.index];
        destList.splice(destination.index, 0, { ...program, id: uuid4() });

        updatedTimeline = {
          ...timeline,
          [destMonth.title]: { ...destMonth, programIds: destList },
        }
        setTimeline(updatedTimeline);
        break;
      }
      default: {
        const srcMonth = timeline[source.droppableId];
        const srcList = Array.from(srcMonth.programIds);
        const [movedProgram] = srcList.splice(source.index, 1);
        destList.splice(destination.index, 0, movedProgram);

        updatedTimeline = {
          ...timeline,
          [srcMonth.title]: { ...srcMonth, programIds: srcList },
          [destMonth.title]: { ...destMonth, programIds: destList },
        }
        setTimeline(updatedTimeline);
        break;
      }
    }
  }

  function addYear() {
    let newYear = 0;
    
    // years can be deleted out of order (if user takes gap year)
    // so find gaps in timeline to fill before adding new years
    let i = 1;
    for (; i < years.length; i++) {
      if (years[i] - 1 !== years[i-1]) {
        newYear = years[i-1] + 1;
        break;
      }
    } // no gaps found, add new year at end
    if (newYear === 0) {
      // if user deletes first timeline row (the one corresponding to currYear)
      if (years[0] !== currYear) i = 0;

      newYear = currYear + i;
    }

    const updatedTimeline = {
      ...timeline,
      ['Fall'+i]: { title: 'Fall'+i, programIds: [] },
      ['Winter'+i]: { title: 'Winter'+i, programIds: [] },
      ['Spring'+i]: { title: 'Spring'+i, programIds: [] },
      ['Summer'+i]: { title: 'Summer'+i, programIds: [] },
    }
    const updatedYears = years;
    updatedYears.splice(i, 0, newYear);
    setYears(updatedYears);
    setTimeline(updatedTimeline);
    alert(
      `Added academic year ${currYear+i}-${currYear+i+1}.`+
      `\nScroll down if it is not currently visible.`
    )
  }

  function deleteYear(year) {
    const yearIndex = year-currYear;
    const updatedTimeline = { ...timeline };

    delete updatedTimeline['Fall'+yearIndex];
    delete updatedTimeline['Winter'+yearIndex];
    delete updatedTimeline['Spring'+yearIndex];
    delete updatedTimeline['Summer'+yearIndex];

    const updatedYears = years;
    const removedYear = updatedYears.splice(years.indexOf(year), 1);
    setYears(updatedYears);
    setTimeline(updatedTimeline);
    alert(`Removed academic year ${removedYear}-${parseInt(removedYear)+1}`);
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
      {years.map((year) => (
        <div className="timelineContainer">
          <div>
            <h3 className="my-0 timelineHeader">{year}-{year+1}</h3>
            <Button onClick={() => deleteYear(year)} id="deleteYear"
              className="mx-3 mt-0 mb-2 timelineHeader" size="sm"
            >
              Delete Year
            </Button>
          </div>

          <Timeline
            timelineData={timeline}
            year={year}
            yearIndex={year - currYear}
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

export default CalendarTab;