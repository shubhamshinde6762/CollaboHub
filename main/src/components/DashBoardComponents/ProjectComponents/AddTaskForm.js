import React, { useState, useEffect, useRef } from "react";
import { IoMdAdd, IoMdPersonAdd } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImCheckboxChecked } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";

const AddTaskForm = (props) => {
  const [visible, setVisible] = useState(false);
  const [contributorPage, setContributorPage] = useState(false);
  const dropdownRef = useRef(null);
  const [searchArray, setSearchArray] = useState();
  const [userDetails, setUserDetails] = useState();
  const [projectFormData, setProjectFormData] = useState({
    task: "",
    priority: "Low",
    dueDate: "",
    contributorsId: [],
    // Add other properties as needed
  });
  const todayDate = new Date().toISOString().split("T")[0];

  const createHandler = async () => {
    try {
      // console.log(props.projectDetails);

      if (
        projectFormData.task === "" ||
        projectFormData.dueDate === "" ||
        projectFormData.contributorsId.length === 0
      ) {
        toast("Fill all the fields", {
          icon: "⚠️",
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            width: "800px",
          },
        });
      } else {
        // Use toast.promise for asynchronous operation
        await toast.promise(
          axios.post("http://13.210.25.126::5000/api/v1/createTask", {
            taskName: projectFormData.task,
            dueDate: projectFormData.dueDate,
            contributorsId: projectFormData.contributorsId,
            projectId: props.projectDetails.data.data[0]._id,
            owner: props.user.data._id,
            priority: projectFormData.priority,
          }),
          {
            loading: "Creating task...",
            success: (response) => {
              console.log(response);
              return <b>Task created successfully!</b>;
            },
            error: (error) => {
              console.error(error);
              return <b>Error creating task.</b>;
            },
          }
        );
      }

      setProjectFormData({
        task: "",
        priority: "Low",
        dueDate: "",
        contributorsId: [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      const task = document.getElementById("task");
      task.value = "";
      const dueDate = document.getElementById("dueDate");
      dueDate.value = "";
      const priority = document.getElementById("priority");
      priority.value = "Low";
      setProjectFormData({
        task: "",
        priority: "Low",
        dueDate: "",
        contributorsId: [],
      });
    } catch (err) {
      console.log(err);
    }
  }, [visible]);

  const removeHandler = (event) => {
    try {
      console.log(userDetails);
      setUserDetails((state) =>
        state.map((obj) =>
          obj._id === event.target.id ? { ...obj, checked: false } : obj
        )
      );

      setProjectFormData((state) => ({
        ...state,
        contributorsId: state.contributorsId.filter(
          (obj) => obj._id !== event.target.id
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const checkBoxHandler = (event) => {
    const { id, checked } = event.target;
    console.log(checked);
    setUserDetails((state) =>
      state.map((obj) => (obj._id === id ? { ...obj, checked } : obj))
    );

    setSearchArray((state) =>
      state.map((obj) => (obj._id === id ? { ...obj, checked } : obj))
    );
  };

  const updateContributors = () => {
    try {
      const contributorsId = userDetails
        .filter((obj) => obj.checked)
        .map((obj) => obj);
      setProjectFormData((state) => ({
        ...state,
        contributorsId,
      }));
      setContributorPage(false);
    } catch (err) {
      console.log(err);
    }
  };

  const searchHandler = (event) => {
    const { value } = event.target;
    if (!contributorPage) value = "";

    const array = userDetails.filter((ele) => {
      return (
        ele.username.toLowerCase().includes(value.toLowerCase()) ||
        ele.email.toLowerCase().includes(value.toLowerCase())
      );
    });

    setSearchArray(array);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setUserDetails(props.userDetails.data.data);
        setSearchArray(props.userDetails.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [props.userDetails, visible]);

  const projectFormHandler = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    console.log(projectFormData);
  };

  const clickHandler = () => {
    setVisible(!visible);
    setContributorPage(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!event.target.id || event.target.id !== "addButton")
      ) {
        setVisible(false);
        setContributorPage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative select-none">
      <div
        id="addButton"
        onClick={clickHandler}
        className="hover:scale-105 transition-all duration-300 text-black p-3 spin-once select-none cursor-pointer rounded-md flex items-center font-poppins gap-x-2 text-xl"
      >
        <IoMdAdd className="scale-125 bg-green-600 spin-once-hover spin-once-unhover rounded-full text-white hover:spin-once" />
        Task
      </div>

      {visible && !contributorPage && (
        <div className="  flex justify-center">
          <div
            ref={dropdownRef}
            className="absolute z-20 transition-all duration-300 bg-white shadow w-80 right-0 rounded-xl"
          >
            <form
              onSubmit={projectFormHandler}
              className="flex flex-col p-2 transition-all duration-300 rounded-xl font-poppins mx-4 my-4 gap-2"
            >
              <label>
                <p>Task</p>
                <input
                  type="text"
                  id="task"
                  placeholder="Task"
                  className="w-full rounded-md px-4 py-1 shadow "
                  value={projectFormData.task}
                  name="task"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </label>
              <div className="shadow-inner h-[5px] "></div>
              <label className="w-full flex gap-3 items-center">
                <p>Due Date :</p>
                <input
                  type="date"
                  id="dueDate"
                  placeholder="Due Date"
                  name="dueDate"
                  value={projectFormData["dueDate"]}
                  className="px-2 rounded-md py-1 shadow text-center"
                  onChange={handleInputChange}
                  min={todayDate}
                />
              </label>
              <div className="shadow-inner h-[5px] "></div>
              <label className="w-full flex gap-3 items-center">
                <p>Select Priority :</p>
                <select
                  id="priority"
                  name="priority"
                  value={projectFormData.priority}
                  className="py-1 rounded-md shadow px-1"
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <div className="shadow-inner h-[5px] "></div>
              <label className="w-full flex gap-3 items-center">
                <div className="w-full relative">
                  <p>Task Recipients.</p>
                  <FaUserPlus
                    onClick={async () => {
                      setSearchArray(userDetails);
                      setContributorPage(true);
                    }}
                    className="scale-125 absolute right-0 top-1"
                  ></FaUserPlus>
                </div>
              </label>

              <div className="flex w-full flex-wrap items-center gap-1 max-h-18 overflow-x-scroll custom-scrollbar min-h-0">
                {projectFormData &&
                  projectFormData.contributorsId &&
                  projectFormData.contributorsId &&
                  projectFormData.contributorsId.length > 0 &&
                  projectFormData.contributorsId.map((ele) => (
                    <div className="flex bg-slate-500 gap-1 px-2 rounded-lg items-center text-sm r text-white">
                      <p>{ele.username}</p>
                      <RxCross2
                        onClick={removeHandler}
                        className="cursor-pointer"
                        id={ele._id}
                      />
                    </div>
                  ))}
              </div>

              <div className="w-full flex justify-center">
                <button
                  onClick={createHandler}
                  className="loginButton px-5 py-2 w-fit flex items-center font-poppins text-md rounded-xl hover:scale-110 transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {visible && contributorPage && (
        <div
          ref={dropdownRef}
          className="absolute z-20 transition-all duration-300 bg-white shadow w-80 right-0  rounded-xl p-2 "
        >
          <div className="flex justify-between  transition-all duration-500 gap-1 m-2 items-center scale-105">
            <IoMdArrowRoundBack
              className="text-black mx-1 scale-110 transition-all duration-200 cursor-pointer"
              onClick={() => setContributorPage(false)}
            />
            <div className="border p-2 rounded-md font-poppins">
              <input
                type="text"
                onChange={searchHandler}
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
            <div className=" rounded-md p-2 mt-1 flex flex-col items-center justify-between overflow-hidden">
              {searchArray &&
                searchArray.map((ele) => {
                  return (
                    <div className="w-full shadow rounded-xl py-2">
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
                          checked={ele.checked}
                          onChange={checkBoxHandler}
                        />
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
