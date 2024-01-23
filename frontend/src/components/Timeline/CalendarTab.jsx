import React, { useState } from "react";
import { Container } from "react-bootstrap";
import FavoritesBank from "./FavoritesBank";
import Timeline from "./TimelineRow";
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

function onDragEnd(result) {
  const {dest, src} = result;

  if (!dest) return;
  if (dest.droppableId === src.droppableId)
    return;

  
}

function CalendarTab() {
  const [favoritesList, setFavoritesList] = useState(testPgrms);
  const [timeline, setTimeline] = useState([]);

  return (
    <Container fluid>
      <DragDropContext onDragEnd={onDragEnd}>
        <FavoritesBank favoritesList={favoritesList} />

        <Timeline />
      </DragDropContext>
    </Container>
  );
}

export default CalendarTab;