import React from "react";
import { Droppable } from "react-beautiful-dnd";
import BankProgram from "./BankProgram";

function Timeline({timelineData, programOptions}) {
  return (
    <div id="timeline" className="my-4 mx-1 p-3">
      {timelineData.monthOrder.map((name) => (
        <MonthCol
          title={timelineData[name].title}
          programOptions={programOptions}
          programList={timelineData[name].programIds}
          key={name}
        />
      ))}
    </div>
  );
}

function MonthCol({title, programList}) {
  const emptyColumn = (programList.length === 0);
  
  return (
    <Droppable droppableId={title} key={title}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="monthCol">
          <h4>{title}</h4>
          {programList.map((program, index) => (
            <BankProgram program={program} index={index} key={program.title + index} />
          ))}

          {emptyColumn && (<p>Drag a program here...</p>)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Timeline;