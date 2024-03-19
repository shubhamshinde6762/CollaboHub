import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";

export default function Task({ task, index }) {
  return (
    task &&
    task.owner &&
    task.contributorsId && (
      <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            className={`py-3 relative  px-4 mx-2 my-3 min-w-[100px] rounded-xl shadow hover:scale-105 transition-all duration-500 ${
              task.priority === "Low"
                ? "bg-sky-50"
                : task.priority === "Medium"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={(el) => {
              provided.innerRef(el);
            }}
            isDragging={snapshot.isDragging}
          >
            <div
              className={`  w-fit py-[2px] bg-red-500 rounded-3xl text-white font-bold text-xs absolute right-0 -top-1 px-1`}
            >
              {task.dueDate}
            </div>

            <div className={""}>
              <div className="text-lg text-fuchsia-600 font-bold">
                {task.taskName}
              </div>
              <div className="font-roboto text-xs">
                Assigned By <span>{task.owner.username}</span>
              </div>
              <div className="flex items-center -mt-1 translate-y-4 gap-1  max-w-[100%] overflow-x-scroll custom-scrollbar">
                {task.contributorsId.map(
                  (ele) =>
                    ele.user && (
                      <img
                        alt="hi"
                        src={ele.user.profilePhoto}
                        className="rounded-full w-8  aspect-square"
                      />
                    )
                )}
              </div>
              <div className="text-slate-600 font-bold text-xs">
                Assigned On {task.createdOn}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  );
}
