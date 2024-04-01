import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
const EditTaskForm = ({
  user,
  task,
  userDetails,
  isUpdate,
  setEditTaskForm,
  editTaskForm,
}) => {
  console.log("taskId",task);
  const {projectId} = useParams();
  const [updatePeople, setUpdatePeople] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [taskForm, setTaskForm] = useState({
    taskName: task.taskName,
    duedate: task.dueDate,
    createdOn: task.createdOn,
    priority: task.priority,
    newdate: "",
    participants: [],
  });
  console.log(taskForm);
  console.log("task", task);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "duedate") {
      const [year, month, day] = value.split("-");
      const newdate = `${day}-${month}-${year}`;

      setTaskForm((prevData) => ({
        ...prevData,
        [name]: value,
        newdate: newdate,
      }));
    } else {
      setTaskForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const participantIds = task.contributorsId.map((participant) => participant._id);
  
  const userIds = userDetails.data.data;
  useEffect(() => {
    // Get user objects instead of just IDs
    const commonUsers = userIds.filter((user) =>
      task.contributorsId.find((participant) => participant._id === user._id)
    );

    setTaskForm((prevTaskForm) => ({
      ...prevTaskForm,
      participants: [...commonUsers],
    }));
  }, [userIds, task.contributorsId]);

  const updateContributors = () => {
    try {
      const participants = searchArray
        .filter((user) => user.checked)
        .map((user) => user); // Use the entire user object instead of just user._id

      setTaskForm((state) => ({
        ...state,
        participants,
      }));

      setUpdatePeople(false);
      console.log("search", searchArray);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (selectedUser) => {
    setSearchArray((prevSearchArray) =>
      prevSearchArray.map((user) =>
        user._id === selectedUser._id
          ? { ...user, checked: !user.checked }
          : user
      )
    );
  
    setTaskForm((state) => {
      const isParticipantExists = state.participants.some(
        (participant) => participant._id === selectedUser._id
      );
  
      const updatedParticipants = isParticipantExists
        ? state.participants.filter(
            (participant) => participant._id !== selectedUser._id
          )
        : [...state.participants, selectedUser];
  
      return {
        ...state,
        participants: updatedParticipants,
      };
    });
  };
  

  const cancelTaskForm = () => {
    setEditTaskForm(!editTaskForm);
  };
  const editHandler = async(event) => {
    event.preventDefault();
    try{
      const response = await axios.post("https://collabo-hub-ten.vercel.app/api/v1/editTask",
      {
        email : user.data.email,
        taskName : taskForm.taskName,
        projectId : projectId,
        taskId : task._id,
        contributorsId : taskForm.participants,
        priority :taskForm.priority,
        dueDate : taskForm.duedate
      })
      console.log("response of edittask",response);
      setEditTaskForm(!editTaskForm);
    }
    catch(error){
      console.log("Error in editting the task",error);
    }
  };
  const updateHandler = () => {
    setUpdatePeople(!updatePeople);
    const users = userDetails.data.data;
    const updatedUsers = users.map((user) => ({
      ...user,
      checked: participantIds.includes(user._id),
    }));
    setSearchArray(updatedUsers);
  };
  const handleRemoveParticipant = (userId) => {
    const isParticipantId = participantIds.includes(userId);
  
    if (isParticipantId) {
      return;
    }
    setTaskForm((prevState) => ({
      ...prevState,
      participants: prevState.participants.filter(
        (participant) => participant._id !== userId
      ),
    }));
  
    setSearchArray((prevSearchArray) =>
      prevSearchArray.map((user) =>
        user._id === userId ? { ...user, checked: false } : user
      )
    );
  };
  

  return (
    <div className="select-none ">
      <div className="bg-black h-screen w-full z-10 fixed top-0 left-0 opacity-70 "></div>
      <div className="fixed z-20 top-0 bottom-0 right-0 left-0 m-5 flex justify-center items-center">
        <div
          style={{ animation: "dropTop 2s " }}
          className="bg-white  text-black select-none h-fit w-96  rounded-md max-w-96   shadow-md shadow-white"
        >
          <div className="p-2 z-20 ">
            <form className="font-poppins transition-all duration-1000 relative">
              <ImCross
                className=" absolute right-0 text-black hover:scale-150 rounded-full"
                onClick={cancelTaskForm}
              />
              <label className="flex flex-col p-2">
                <span className="">TaskName</span>
                <input
                  type="text"
                  placeholder=""
                  name="taskName"
                  value={taskForm["taskName"]}
                  className="outline-none shadow p-2 rounded-md"
                  onChange={handleInputChange}
                />
              </label>

              <label className="flex flex-col p-1 ">
                <span className="">Created On</span>
                <input
                  type="text"
                  name="createdOn"
                  value={taskForm["createdOn"]}
                  placeholder=""
                  className="p-1 shadow rounded-md mt-1 "
                />
              </label>
              <label className="flex flex-col p-1 ">
                <span className="">Due Date</span>
                <input
                  type="date"
                  name="duedate"
                  value={taskForm["duedate"]}
                  placeholder="YYYY-MM-DD"
                  onChange={handleInputChange}
                  className="p-1 shadow rounded-md mt-1 "
                />
              </label>
              <label className="w-full flex gap-3 items-center mt-2">
                <p>Select Priority :</p>
                <select
                  id="priority"
                  name="priority"
                  value={taskForm.priority}
                  className="py-1 rounded-md shadow px-1"
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <label className="flex items-center justify-between mt-2">
                <span>Edit Task Participants</span>
                <div onClick={updateHandler}>
                  <FaUserPlus />
                </div>
              </label>
              <label className="flex gap-x-1">
                {taskForm &&
                  taskForm.participants &&
                  taskForm.participants.length >= 0 &&
                  taskForm.participants.map((ele) => (
                    <div className="flex bg-slate-500 gap-1 px-2  rounded-lg items-center text-sm r text-white">
                      <p>{ele.username}</p>
                      <RxCross2
                        onClick={() => handleRemoveParticipant(ele._id)}
                        className="cursor-pointer"
                        id={ele._id}
                      />
                    </div>
                  ))}
              </label>
              <label
                className="flex items-center justify-center mt-2"
                onClick={editHandler}
              >
                <span className="border p-2 rounded-md loginButton">
                  Edit Task
                </span>
              </label>
            </form>
          </div>
          {updatePeople && searchArray && (
            <div>
              <div className="absolute z-20 transition-all duration-300 bg-white shadow h-full top-0 right-0  rounded-xl p-2 ">
                <div className="flex justify-between  transition-all duration-500 gap-1 m-2 items-center scale-105">
                  <IoMdArrowRoundBack
                    className="text-black mx-1 scale-110 transition-all duration-200 cursor-pointer"
                    onClick={() => setUpdatePeople(false)}
                  />
                  <div className="border p-2 rounded-md font-poppins">
                    <input
                      type="text"
                      // onChange={searchHandler}
                      placeholder="Search"
                      id="searchBox"
                      autoComplete="off"
                      className="w-full h-full outline-none"
                    />
                  </div>
                  <div
                    className="bg-green-600 hover:bg-green-800 transition-all duration-200 cursor-pointer shadow text-white p-2 mr-1 font-poppins rounded-lg"
                    onClick={updateContributors}
                  >
                    Done
                  </div>
                </div>
                <div className="border max-h-80 overflow-y-scroll custom-scrollbar mt-2 rounded-md px-2 flex flex-col ">
                  <div className=" rounded-md p-2 mt-1 flex flex-col gap-y-2 items-center justify-between overflow-hidden">
                    {searchArray &&
                      searchArray.map((ele) => {
                        // Check if the user is already in the task
                        const isParticipant = taskForm.participants.some(
                          (participant) => participant._id === ele._id
                        );
                        return (
                          <div
                            key={ele._id}
                            className="w-full shadow rounded-xl py-2"
                          >
                            <label
                              className="flex cursor-pointer font-poppins px-5 justify-between items-center w-full"
                              htmlFor={ele._id}
                            >
                              <div className="text-md">
                                {ele.username}
                                <div className="text-sm">{ele.email}</div>
                              </div>
                              <input
                                className="scale-125 cursor-pointer"
                                id={ele._id}
                                type="checkbox"
                                checked={ele.checked || isParticipant} // Mark as checked if already in the task
                                onChange={() => {
                                  handleCheckboxChange(ele); // Handle changes for all checkboxes
                                }}
                                disabled={participantIds.includes(ele._id)}
                              />

                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;
