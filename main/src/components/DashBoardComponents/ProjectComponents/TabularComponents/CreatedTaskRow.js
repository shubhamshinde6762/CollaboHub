import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import EditTaskForm from "./EditTaskForm";
import { TiTick } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import TaskEditorDetails from "./TaskEditorDetails";
import ViewStatus from "./ViewStatus";
import DeleteTask from "./DeleteTask";
import { MdOutlineCreate } from "react-icons/md";


const CreatedTaskRow = ({ user, owning, userDetails, isUpdate }) => {
  const [editTaskForm, setEditTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [hoveredContributor, setHoveredContributor] = useState(null);
  const [status, setStatus] = useState(false);
  const [viewStatusTimestamp, setViewStatusTimestamp] = useState(null);
  const [deletePage, setDeletePage] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);
  const [sureDelete, setSureDelete] = useState(false);
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditTaskForm(!editTaskForm); // Open the form when editing
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50";
      case "Medium":
        return "bg-yellow-50";
      case "Low":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const handleViewStatusClick = (task) => {
    if (selectedTask === task) {
      setSelectedTask(null);
      setStatus(null);
    } else {
      setSelectedTask(task);
      const timestamp = new Date().toLocaleString();
      setViewStatusTimestamp(timestamp);
      setStatus(true); // Or whatever your desired value for status is when selecting a new task
    }
  };

  // console.log("123456789", selectedTask);

  const handleDeleteStatus = (task) => {
    setDeletePage(!deletePage);
    setDeleteTask(task);
    setSureDelete(!sureDelete);
  };
  return (
    <div className="flex w-full justify-center my-4 ">
      <div className=" flex flex-grow justify-center gap-4 flex-wrap select-none relative">
        {owning &&
          owning.length > 0 &&
          owning.map((task, index) => (
            <div
              key={index}
              className={`rounded-xl cursor-pointer relative min-w-[200px] p-4 items-center z-10 hover:scale-105 transition-all duration-200 ${getPriorityColor(
                task.priority
              )}`}
            >
              <div className="text-lg font-poppins font-bold">
                {task.taskName}
              </div>
              <div className="flex my-2 relative">
                {Array.isArray(task.contributorsId) &&
                  task.contributorsId.map((ele, contributorIndex) => {
                    if (ele.user && ele.user.profilePhoto) {
                      return (
                        <div
                          key={contributorIndex}
                          onMouseEnter={() => {
                            setHoveredTask(task);
                            setHoveredContributor(contributorIndex);
                          }}
                          onMouseLeave={() => {
                            setHoveredTask(null);
                            setHoveredContributor(null);
                          }}
                          className="relative"
                        >
                          <img
                            src={ele.user.profilePhoto}
                            className="rounded-full aspect-square w-8 cursor-pointer relative"
                          />
                          <div className="absolute right-0 z-40">
                            {hoveredTask === task &&
                              hoveredContributor === contributorIndex && (
                                <TaskEditorDetails
                                  hoveredTask={hoveredTask}
                                  contributorIndex={contributorIndex}
                                />
                              )}
                          </div>
                        </div>
                      );
                    } else if (
                      ele.user &&
                      ele.user.data &&
                      ele.user.data.profilePhoto
                    ) {
                      return (
                        <div
                          key={contributorIndex}
                          onMouseEnter={() => {
                            setHoveredTask(task);
                            setHoveredContributor(contributorIndex);
                          }}
                          onMouseLeave={() => {
                            setHoveredTask(null);
                            setHoveredContributor(null);
                          }}
                          className="relative"
                        >
                          <img
                            src={ele.user.data.profilePhoto}
                            className="rounded-full aspect-square w-7 cursor-pointer"
                          />
                          <div className="absolute right-0 z-40">
                            {hoveredTask === task &&
                              hoveredContributor === contributorIndex && (
                                <TaskEditorDetails
                                  hoveredTask={hoveredTask}
                                  contributorIndex={contributorIndex}
                                />
                              )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              <div className="font-poppins absolute -right-3 -top-3 text-xs py-1 px-2 flex items-center gap-x-1 rounded-xl bg-blue-700 text-white w-fit ml-2">
                <MdDateRange />
                <div>Due On {task.dueDate}</div>
              </div>

              
              <div className=" text-black font-bold font-poppins py-1 px-2 flex items-center rounded-xl text-xs mx-2 mt-2 gap-x-1 w-fit">
                <MdOutlineCreate className="bg-green-500 text-white rounded-full text-2xl p-1" />
                {task.createdOn} Hrs
              </div>
              <div className="flex justify-between items-center">
                <div
                  className=" bg-sky-200  py-1 px-2 rounded-lg text-sm font-bold font-poppins mt-2 ml-2"
                  onClick={() => handleViewStatusClick(task)}
                >
                  View Status
                </div>
                <div className="flex justify-end items-center gap-x-2 mt-2 mr-2">
                  <div
                    onClick={() => handleEditClick(task)}
                    className="relative"
                  >
                    <MdModeEdit className="text-2xl rounded-full bg-green-500 p-1  text-white hover:scale-125 hover:bg-green-700 transition-all duration-300" />
                  </div>
                  <MdDelete
                    onClick={() => handleDeleteStatus(task)}
                    className="text-2xl rounded-full bg-red-500 p-1 text-white hover:scale-125 hover:bg-red-600 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        {editTaskForm && (
          <EditTaskForm
            user={user}
            task={selectedTask}
            editTaskForm={editTaskForm}
            setEditTaskForm={setEditTaskForm}
            userDetails={userDetails}
            isUpdate={isUpdate}
          />
        )}

        <div className="absolute top-[30%] left-[40%]">
          {deletePage && (
            <DeleteTask
              deletePage={deletePage}
              setDeletePage={setDeletePage}
              user={user}
              task={deleteTask}
            />
          )}
        </div>
      </div>
      <div className="">
        {status && (
          <div className="h-full z-20">
            <ViewStatus
              task={selectedTask}
              viewStatusTimestamp={viewStatusTimestamp}
              status={status}
              setStatus={setStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedTaskRow;
