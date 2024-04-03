import React from "react";
import styled from "styled-components";
import Task from "./Task";
import CompletedTasks from "./CompletedTask";
import "./Scroll.css";
import { Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
const Container = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TaskList = styled.div`
  padding: 0px;
  transistion: background-color 0.2s ease;
  flex-grow: 1;
`;

const Title = styled.h3`
  text-align: center;
`;

export default function Column({ title, tasks, id, userDetails, user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.3 }}
      className="select-none flex-auto min-w-[200px] pb-4 max-w-[400px] flex flex-col items-center rounded-3xl bg-[#fcf8ff]"
    >
      <h3 className="text-black relative my-2 font-poppins font-bold text-center">
        {title}
      </h3>
      <div className="max-h-[70vh] h-auto rounded-3xl w-full mx-2 overflow-y-scroll custom-scrollbar">
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              className=""
            >
              {tasks && tasks.length && userDetails ? (
                tasks.map((task, index) => {
                  if (id === "2") {
                    return (
                      <CompletedTasks
                        key={index}
                        index={index}
                        task={task}
                        user={user}
                      />
                    );
                  } else {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Task key={index} index={index} task={task} />
                      </motion.div>
                    );
                  }
                })
              ) : (
                <div className="w-full text-center">No Tasks</div>
              )}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </div>
    </motion.div>
  );
}
