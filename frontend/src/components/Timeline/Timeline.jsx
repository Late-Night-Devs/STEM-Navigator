import React from "react";
import { Droppable } from "react-beautiful-dnd";
import BankProgram from "./BankProgram";

function Timeline({
  timelineData, year, programOptions, cookieUID, handleFavoriteClicked,
}) {
  return (
    <div className="my-4 mx-1 p-3 timeline">
      {timelineData.order.map((name) => (
        <MonthCol
          title={timelineData[name+year].title}
          programOptions={programOptions}
          programList={timelineData[name+year].programIds}
          key={name}
          cookieUID={cookieUID}
          handleFavoriteClicked={handleFavoriteClicked}
        />
      ))}
    </div>
  );
}

function MonthCol({ title, programList, cookieUID, handleFavoriteClicked }) {
  const emptyColumn = programList.length === 0;

  return (
    <Droppable droppableId={title} key={title}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="monthCol"
        >
          <h4>{title.substring(0, title.length-1)}</h4>
          {programList.map((program, index) => (
            <BankProgram
              program={program}
              cookieUID={cookieUID}
              handleFavoriteClicked={handleFavoriteClicked}
              index={index}
              key={program.title + index}
            />
          ))}

          {emptyColumn && <p>Drag a program here...</p>}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Timeline;
