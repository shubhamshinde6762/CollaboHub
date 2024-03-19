import React, { useState, useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import InviteMail from "./InviteMail";
import Search from "./Search";
import { useRef } from "react";
const Invite = (props) => {
  const [inviteMode, setInviteMode] = useState("Invite");
  const [inviteText, setInviteText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setInviteText("");
        setInviteMode("Invite");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
 
  const handleInputChange = (event) => {

  };
  const handleModeChange = (mode) => {
    console.log("Changing mode to:", mode);
    setInviteMode(mode);
  };

  return (
    <div ref={dropdownRef} className="relative select-none cursor-pointer">
      <div
        onClick={clickHandler}
        className="relative flex text-sm items-center justify-between px-3 py-2 font-poppins hover:scale-105 shadow hover:shadow-purple-800 hover:animation gap-x-2 rounded-md bg-black transition-all duration-500"
      >
        <IoMdPersonAdd />
        Manage Access
      </div>
      {isOpen && (
        <div className="bg-gray-400 absolute right-0 max-w-[270px] min-w-72 flex flex-col p-2 font-poppins rounded-md z-50">
          {/* Invite */}
          <div className="flex">
            <div className="w-1/2 text-center bg-white rounded-t-xl rounded-b-none">
              <div
                className={`${inviteMode === "Invite" ? "text-black  " : "rounded-b-xl  rounded-l-none bg-gray-400"
                  } py-1 px-3 cursor-pointer flex flex-col items-center gap-x-2 font-poppins`}
                onClick={() => handleModeChange("Invite")}
              >
                <span>Invite</span>
              </div>
            </div>

            {/* Search */}
            <div className="w-1/2 text-center bg-white rounded-t-xl rounded-b-none">
              <div
                className={`${inviteMode === "Search" ? "text-black" : "rounded-b-xl rounded-r-none bg-gray-400"
                  }  py-1 px-3 cursor-pointer flex items-center gap-x-2 font-poppins`}
                onClick={() => handleModeChange("Search")}
              >
                <div className="w-full" >Search</div>
              </div>
            </div>
          </div>
          
          {inviteMode === "Invite" ? (<div className=""><InviteMail user={props.user} userDetails={props.userDetails} inviteText={inviteText} setInviteText={setInviteText} isOpen={isOpen}/></div>) :
            (<div className=""><Search user={props.user} userDetails={props.userDetails} setInviteMode={setInviteMode} inviteText={inviteText} setInviteText={setInviteText} projectDetails={props.projectDetails}/></div>)}

        </div>
      )}
    </div>
  );
};

export default Invite;
