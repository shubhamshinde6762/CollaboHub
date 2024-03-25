import React from "react";
import { useState, useRef, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteProject = ({ projectId, user }) => {
  const [sureDelete, setSureDelete] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!event.target.id || event.target.id !== "deletebtn")
      ) {
        setSureDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const deleteProject = async () => {
    try {
      const response = await axios.post(
        "http://13.236.1.19:5000/api/v1/deleteProject",
        { projectId }
      );
      navigate(`/dashboard/${user.data.username}/`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (event) => {
    setSureDelete(!sureDelete);
  };
  return (
    <div className="relative select-none cursor-pointer transition-all duration-1000">
      <div
        id="deletebtn"
        onClick={clickHandler}
        className="bg-red-600 text-sm    text-white px-2 py-2  rounded-md font-poppins hover:scale-105 shadow hover:shadow-red-400 hover:shadow-md transition-all duration-1000"
      >
        <div className="flex items-center gap-x-2">
          <MdDeleteForever className="scale-125" />
          Delete
        </div>
      </div>
      {sureDelete ? (
        <div
          ref={dropdownRef}
          className="border p-3 absolute bg-white w-40 z-30 font-poppins shadow rounded-md transition-all duration-1000"
        >
          Are you sure?
          <div className="flex justify-evenly pt-3">
            <div className="bg-green-600 text-white p-1 rounded-md">
              <FaCheck onClick={deleteProject} />
            </div>
            <div className="bg-red-600 text-white p-1 rounded-md">
              <ImCross onClick={() => setSureDelete(false)} />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DeleteProject;
