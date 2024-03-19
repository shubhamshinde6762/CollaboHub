import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./TabularComponents/Column";
import toast from "react-hot-toast";

import axios from "axios";

export default function Tabular({ projectDetails,projectId, socket,  user, userDetails ,projectUpdate,doUpdate}) {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [expired, setExpired] = useState([]);

  const [isUpdate, needToUpdateTask ] = useState(false);

  const fetch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/fetchTask",
        {
          tasks: projectDetails.data.data[0].contributorsIds.find(
            (ele) => ele._id === user.data._id
          ).contributingTask,
        }
      );
      console.log("task", response);
      // console.log("project", projectDetails);
      // console.log("userDetails", userDetails);

      const taskCompleted = [];
      const taskIncomplete = [];
      const taskExpired = [];

      response.data.data.forEach((ele) => {
        const element = ele.contributorsId.find(
          (ele2) => ele2._id === user.data._id
        );

        if (element) {
          ele.owner = userDetails.data.data.find(
            (obj) => obj._id === ele.owner
          );
          ele.contributorsId.forEach((contributor) => {
            const user = userDetails.data.data.find(
              (obj) => obj._id === contributor._id
            );
            if (user) {
              contributor.user = user;
            }
          });

          if (element.completedOn) {
            taskCompleted.push(ele);
          } else if (new Date(ele.dueDate) < new Date().setHours(0, 0, 0, 0)) {
            taskExpired.push(ele);
          } else {
            taskIncomplete.push(ele);
          }
        }
      });

      const priorityValues = { Low: 2, Medium: 1, High: 0 };

      const sortedCompleted = taskCompleted.sort((a, b) => {
        const getDateFromString = (dateString) => {
          const [datePart, timePart] = dateString.split(" ");
          const [year, month, day] = datePart.split("-");
          const [hours, minutes] = timePart.split(".");
          return new Date(year, month - 1, day, hours, minutes);
        };

        const dateA = getDateFromString(
          a.contributorsId.find((ele) => ele._id === user.data._id).completedOn
        );

        const dateB = getDateFromString(
          b.contributorsId.find((ele) => ele._id === user.data._id).completedOn
        );

        return dateB - dateA;
      });

      const sortedIncomplete = taskIncomplete.sort((a, b) => {
        const dueDateComparison = new Date(a.dueDate) - new Date(b.dueDate);
        if (dueDateComparison !== 0) {
          return dueDateComparison;
        }

        return priorityValues[a.priority] - priorityValues[b.priority];
      });

      const sortedExpired = taskExpired.sort((a, b) => {
        const dueDateComparison = new Date(a.dueDate) - new Date(b.dueDate);
        if (dueDateComparison !== 0) {
          return dueDateComparison;
        }

        return priorityValues[a.priority] - priorityValues[b.priority];
      });

      setCompleted(sortedCompleted);
      setIncomplete(sortedIncomplete);
      setExpired(sortedExpired);

      

      console.log(sortedCompleted, sortedIncomplete);
    } catch (err) {
      console.log(err )
    }
  };

  useEffect(() => {
    fetch();
    console.log("executed");
  }, [projectDetails, userDetails, user, isUpdate]);


  useEffect(() => {
    try {

      const completedTaskHandler = (data) => {
        if (user.data._id === data.currentUserId && user.data._id === data.taskToUpdate.owner) {
          needToUpdateTask((state) => !state)
          console.log("Inside completed socket");
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`Task '${data.taskToUpdate.taskName}' has been successfully completed in project '${data.projectName}'`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
        else if(data.taskToUpdate.owner === user.data._id){
          fetch();
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`${data.taskToUpdate.taskName} has been completed by ${data.currentuser.username} in project ${data.projectName}.`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                  Close
                </button>
              </div>
            </div>
          ));
        }
        else{
          fetch();
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`You've completed the task '${data.taskToUpdate.taskname}' in project '${data.projectName}'.`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                  Close 
                </button>
              </div>
            </div>
          ));
        }
      };
      
      socket.on("completedtask", completedTaskHandler);

      
      
      return () => {
        try {
          socket.off("completedtask", completedTaskHandler);
        } catch (error) {
          console.error("Error disconnecting socket:", error);
        }
      };
      
    } catch (err) {
      console.log("Error");
    }
  }, [user]);



  const handleDragEnd = async (result) => {
    try {
      const { destination, source, draggableId } = result;
      console.log(destination, source, draggableId);

      // Check if there is a valid destination
      if (!destination) {
        console.log("Invalid destination");
        return;
      }

      // Check if dragging from "TO DO" or "Expired" to "Completed"
      if (
        (source.droppableId === "1" || source.droppableId === "3") &&
        destination.droppableId === "2"
      ) {
        const response = await axios.post(
          "http://localhost:5000/api/v1/completeTask",
          {
            _id: draggableId,
            currentUserId: user.data._id,
          }
        );


        if (response) {
          doUpdate(!projectUpdate);
          const movedTask =
            incomplete.find((ele) => ele._id === draggableId) ||
            expired.find((ele) => ele._id === draggableId);
          if (incomplete.find((ele) => ele._id === draggableId))
            setIncomplete(incomplete.map((ele) => ele._id !== draggableId));
          else setExpired(expired.map((ele) => ele._id !== draggableId));
            setCompleted((state) => [...state, movedTask]);
        }
      }
    } catch (error) {
      console.error("Error during drag and drop:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} className="select-none  w-full ">
      <div className="flex justify-center relative flex-wrap  flex-grow gap-y-4 gap-x-2">
        <Column
          userDetails={userDetails}
          title={"TO DO"}
          tasks={incomplete}
          id={"1"}
        />
        <Column
          userDetails={userDetails}
          user={user}
          title={"Completed"}
          tasks={completed}
          id={"2"}
        />
        <Column
          userDetails={userDetails}
          title={"Expired"}
          tasks={expired}
          id={"3"}
        />
      </div>
    </DragDropContext>
  );
}
