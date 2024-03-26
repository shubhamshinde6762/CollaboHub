import React, { useState, useEffect, useRef } from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import InviteRow from "../DashBoardComponents/InvitationComponents/InviteRow";
import axios from "axios";
const Notification = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [invitationData, setInvitationData] = useState([]);

  useEffect(() => {
    updateProjects();
  }, []);

  const updateProjects = async () => {
    try {
      console.log(props.user.data.email);
      const response = await axios.post(
        "http://13.210.25.126:5000/api/v1/getInvitedProjects",
        {
          email: props.user.data.email,
        }
      );

      setInvitationData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const clickHandler = (event) => {
    // console.log(event.target);
    setIsOpen(!isOpen);
    updateProjects();
  };

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

  return (
    <div className="relative select-none">
      <div
        onClick={clickHandler}
        className="flex text-4xl items-center shadow-purple-300 shadow-2xl justify-between font-poppins hover:scale-105 cursor-pointer text-gray-600 rounded-full  transition-all duration-400"
      >
        <IoNotificationsCircleSharp />
      </div>

      {isOpen ? (
        <div
          className=" bg-slate-50  hover:shadow-pink-400  outline-offset-2 transition-all duration-500  py-2 rounded-xl px-2 min-w-48 shadow  flex flex-col space-y-3 items-center absolute right-3 z-20"
          ref={dropdownRef}
        >
          {invitationData.data && invitationData.data.data.length ? (
            invitationData.data.data.map((ele) => (
              <InviteRow
                data={ele}
                user={props.user}
                updateProjects={updateProjects}
                setUpdateStatus={props.setUpdateStatus}
              />
            ))
          ) : (
            <div className="text-black text-sm ">No new Notifications.</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Notification;
