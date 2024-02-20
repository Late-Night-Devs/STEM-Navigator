import React from "react";
import { Droppable } from "react-beautiful-dnd";
import BankProgram from "./BankProgram";

function Timeline({
  timelineData, year, index, programOptions, 
  cookieUID, handleFavoriteClicked,
}) {
  return (
    <div className="mt-2 mb-4 mx-1 p-3 timeline">
      {timelineData.order.map((name) => (
        <MonthCol
          title={timelineData[name+index].title}
          year={year}
          programOptions={programOptions}
          programList={timelineData[name+index].programIds}
          key={name}
          cookieUID={cookieUID}
          handleFavoriteClicked={handleFavoriteClicked}
        />
      ))}
    </div>
  );
}

function MonthCol({ title, year, programList, cookieUID, handleFavoriteClicked }) {
  const emptyColumn = programList.length === 0;

  return (
    <Droppable droppableId={title} key={title}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="monthCol"
        >
          <h4>
            {title.substring(0, title.length-1)} {title.includes("Fall")? year : year+1}
          </h4>
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
