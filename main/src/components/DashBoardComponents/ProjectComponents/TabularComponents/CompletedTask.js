import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import {motion} from "framer-motion";
export default function completedTasks({ task, index, user }) {
  console.log(task);
  return (
    task &&
    task.owner &&
    task.contributorsId && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
          {(provided, snapshot) => (
            <div
              className={`py-3 relative px-4  my-3 min-w-[100px] flex flex-col mx-2 justify-center rounded-xl shadow hover:scale-105 transition-all duration-500 ${
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
                className={`bg-green-400 shadow w-fit py-[2px] text-[0.7rem] rounded-3xl text-white font-bold absolute right-0 -top-1 px-1`}
              >
                {
                  task.contributorsId.find((ele) => ele._id === user.data._id)
                    .completedOn
                }
                Hrs
              </div>

              <div className={""}>
                {task.contributorsId.find((ele) => ele._id === user.data._id)
                  .comments && (
                  <div className="w-fit font-poppins px-2 text-[0.7rem] rounded-xl bg-red-500 mt-3 text-white">
                    Delayed
                  </div>
                )}
                <div className="text-lg  text-fuchsia-600 font-bold">
                  {task.taskName}
                </div>
                <div className="font-roboto  text-xs">
                  Assigned By <span>{task.owner.username}</span>
                </div>
                <div className="flex  items-center translate-y-4 gap-1 -mt-2 max-w-[100%] overflow-x-scroll custom-scrollbar">
                  {task.contributorsId.map(
                    (ele) =>
                      ele.user && (
                        <img
                          alt="hi"
                          src={ele.user.profilePhoto}
                          className="rounded-full aspect-square w-8"
                        />
                      )
                  )}
                </div>
                <div className="text-white px-2 bg-purple-800 rounded-xl w-fit font-bold text-xs my-1">
                  Due Date {task.dueDate}
                </div>
                <div className="text-slate-600 font-bold text-xs">
                  Assigned On {task.createdOn}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </motion.div>
    )
  );
}
