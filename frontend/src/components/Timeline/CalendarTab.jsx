import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FavoritesBank from "./FavoritesBank";
import Timeline from "./TimelineRow";
import emptyTimeline from "./EmptyTimeline";
import { DragDropContext } from "react-beautiful-dnd";

const testPgrms = [
  {
    title: "LSAMP",
    lead_contact: "Joyce Pieretti Ph.D",
    contact_email: "lsamp@pdx.edu",
    link_to_web: "https://www.pdx.edu/alliance-minority-participation/",
  },
  {
    title: "MESA C2C",
    lead_contact: "Yongwen Lampert",
    contact_email: "mesac2c@pcc.edu",
    link_to_web: "https://www.pcc.edu/maker/stem-center/programming/mesac2c/",
  },
  {
    title: "ACCESS",
    lead_contact: "Vvdaul Holloway",
    contact_email: "vvdaul.holloway@pdx.edu",
    link_to_web: "https://ondeck.pdx.edu/multicultural-retention-services/access",
  },
];



function CalendarTab() {
  const [favoritesList, setFavoritesList] = useState(testPgrms);
  const [timeline, setTimeline] = useState(emptyTimeline);

  function onDragEnd(result) {
    const {source, destination} = result;
  
    if (!destination || destination.droppableId === 'bankDroppable') return;

    console.log(source.droppableId, destination.droppableId);
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
        updatedList.splice(destination.index, 0, program);

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
    
    //setTimeline(updatedTimeline);
    
  }

  return (
    <Container fluid>
      <DragDropContext onDragEnd={onDragEnd}>
        <FavoritesBank favoritesList={favoritesList} />

        <Timeline timelineData={timeline} programOptions={favoritesList} />
      </DragDropContext>
    </Container>
  );
}

export default CalendarTab;