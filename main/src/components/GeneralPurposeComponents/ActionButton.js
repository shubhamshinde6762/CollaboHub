import React, { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { GiDiscussion } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { GoProjectSymlink } from "react-icons/go";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

const ActionButton = ({ user, updateStatus, isOpen, setIsOpen }) => {
  const [project, refreshProject] = useState({});
  const selectedProjectClass = "bg-gray-500 text-white p-1 m-1 text-center";
  const [showProjects, setShowProjects] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(<IoIosArrowDropdown />);
  const toggleShowProjects = () => {
    setShowProjects(!showProjects);
    setArrowIcon(showProjects ? <IoIosArrowDropdown /> : <IoIosArrowDropup />);
  };

  const [selectId, setSelectId] = useState();
  const [isVisible, setIsvisible] = useState(true);
  const handleClick = (id) => {
    setSelectId(id);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsvisible(true);
      } else {
        setIsvisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    if (window.innerWidth <= 900) setIsvisible(true);
    else setIsvisible(false);
  }, [window.innerWidth]);

  const navigate = useNavigate();
  useEffect(() => {
    updateProjects();
    return () => {};
  }, [updateStatus, user]);

  const navHome = () => {
    navigate(`/dashboard/${user.data.username}`);
    return () => {};
  };

  const updateProjects = async () => {
    try {
      console.log(user);
      const response = await axios.post(
        "http://13.210.25.126:5000/api/v1/getProjects",
        {
          email: user.data.email,
        }
      );
      refreshProject(response);
    } catch (err) {
      console.log(err);
    }
  };

  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const clickHandler = async () => {
    console.log(showInput);
    setShowInput(!showInput);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      (!event.target.id || event.target.name === "addProject")
    ) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [projectName, setProjectName] = useState("");
  const changeHandler = (event) => {
    setProjectName(event.target.value);
  };
  const createHandler = async (event) => {
    event.preventDefault();
    if (projectName === "") return;

    try {
      const response = await axios.post(
        "http://13.210.25.126:5000/api/v1/createProject",
        {
          projectName: projectName,
          email: user.data.email,
        }
      );

      // Check if the response status is successful (e.g., 200)
      setProjectName("");
      if (response.status === 200) {
        setShowInput(false);
        updateProjects();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return ( (
      <div
        className={`${
          
          isOpen ? "fixed top-0 left-0 bg-opacity-50 bg-black  w-screen h-screen" : "" + " sx:-z-50"
        }`}
      >
        <div>
          <div
            className={` z-20 top-20 left-4 opacity-100  transition-all duration-300 rounded-3xl  shadow -translate-x-[70vw] flex flex-col absolute items-center ${
              isOpen ? "translate-x-[70vwvw]" : ""
            }`}
            ref={dropdownRef}
          >
            <div className="   transition-all duration-300 flex flex-col ">
              <div className=" transition-all rounded-xl bg-[#fcf8ff] duration-300">
                
                <div
                  onClick={navHome}
                  className={`flex rounded-xl font-barlow  w-full px-4 font-bold items-center text-center hover:scale-105 transition-all duration-200 cursor-pointer mx-1 gap-3  py-2 text-black ${
                    selectId === "home"
                      ? selectedProjectClass
                      : "hover:bg-white"
                  }`}
                >
                  <IoHomeOutline />
                  Home
                </div>
                <NavLink
                  to={`/dashboard/discuss`}
                  onClick={() => handleClick("discussion")}
                  className={`flex rounded-xl font-barlow  w-full px-4 font-bold items-center text-center hover:scale-105 transition-all duration-200 cursor-pointer mx-1 gap-3  py-2 text-black ${
                    selectId === "discussion"
                      ? selectedProjectClass
                      : "hover:bg-white"
                  }`}
                >
                  <GiDiscussion />
                  Discuss
                </NavLink>
                <NavLink
                  to={"/dashboard/calender"}
                  onClick={() => handleClick("Calender")}
                  className={`flex rounded-xl font-barlow  w-full px-4 font-bold items-center text-center hover:scale-105 transition-all duration-200 cursor-pointer mx-1 gap-3   py-2 text-black ${
                    selectId === "Calender"
                      ? selectedProjectClass
                      : "hover:bg-white"
                  }`}
                >
                  {" "}
                  <FaCalendarAlt />
                  Calender
                </NavLink>
                <div
                  onClick={async () => await clickHandler()}
                  id="addProject"
                  className="flex rounded-xl font-barlow hover:bg-white w-full  px-4 font-bold items-center text-center min-w-44  overflow-y-hidden  hover:scale-105 transition-all duration-200 cursor-pointer  gap-2  py-2 text-black "
                >
                  <FaPlus />
                  Projects
                </div>
                {showInput && (
                  <form
                    onSubmit={createHandler}
                    className="relative  transition-all font-barlow rounded-xl  duration-300 flex flex-col items-center gap-2 my-2 font-bold justify-center"
                    ref={inputRef}
                  >
                    <label className="text-center  text-base font-poppins transition-all duration-300 relative">
                      <input
                        className="rounded-md w-40 transition-all duration-200 mx-2
                    py-1 px-2 bg-purple-100 text-center focus:outline-double focus:outline-purple-800 text-black placeholder:text-zinc-500 flex justify-center "
                        type="text"
                        placeholder="Project Name"
                        name="projectName"
                        autoComplete="off"
                        value={projectName}
                        onChange={changeHandler}
                      />
                    </label>
                    <button
                      className={
                        `${
                          projectName.length > 0
                            ? "bg-green-500"
                            : "bg-gray-500 cursor-not-allowed"
                        }` + " text-white px-4 w-fit rounded-md "
                      }
                    >
                      Done
                    </button>
                  </form>
                )}
              </div>

              <div className="w-full font-barlow mt-4  max-h-[59vh] relative  bg-[#fcf8ff] rounded-2xl">
                <div
                  onClick={toggleShowProjects}
                  className="text-black flex justify-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-2 rounded-xl  items-center w-full text-center  text-lg "
                >
                  <GoProjectSymlink />
                  Catalogue
                  <div>{arrowIcon}</div>
                </div>
                <div
                  className={`dropdown-content ${showProjects ? "active" : ""}`}
                >
                  {showProjects && (
                    <div className="text-xl my-2 text-black max-h-[45vh] h-fit custom-scrollbar rounded-sm  flex flex-col  overflow-y-scroll option">
                      {project.data ? (
                        project.data.data.map((ele) => (
                          <NavLink
                            to={`/dashboard/project/${ele._id}`}
                            key={ele._id}
                            onClick={() => handleClick(ele._id)}
                            className={`flex  items-center px-4 font-bold text-gray-700 transition-all duration-200 cursor-pointer rounded-md mx-1 gap-3 py-2 ${
                              selectId === ele._id
                                ? selectedProjectClass
                                : " hover:bg-gray-100 text-base hover:scale-105"
                            }`}
                          >
                            <div className="overflow-ellipsis max-w-[130px]  overflow-hidden whitespace-nowrap">
                              {ele.projectName}
                            </div>
                          </NavLink>
                        ))
                      ) : (
                        <div />
                      )}
                    </div>
                  )}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ActionButton;
