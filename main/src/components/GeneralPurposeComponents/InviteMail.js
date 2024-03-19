import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const InviteMail = ({ user, userDetails, inviteText, setInviteText, isOpen }) => {
  console.log("here", userDetails);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const { projectId } = useParams();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    console.log("122",userDetails)
    setInviteText(inputValue);


    if (inputValue === '') {
      const allUserEmails = userDetails.data.data.map((user) => user.email);
      setFilteredEmails(allUserEmails);
    } else {
      const filteredUsers = userDetails.data.data.filter((user) =>
        user.email.toLowerCase().includes(inputValue.toLowerCase())
      );
      const filteredEmails = filteredUsers.map((user) => user.email);
      setFilteredEmails(filteredEmails);
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setInviteText("");
    }
  }, []);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/invite",
        {
          email: inviteText,
          projectId,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      const { response } = error;
      console.error("Error making the POST request:", response);
      toast.error(response.data.message);
    }
    setInviteText("");
  };

  return (
    <div className="text-black w-full p-2 bg-white  transition-all duration-500  py-4 rounded-b-md rounded-r-md px-4 shadow  flex flex-col space-y-3 items-center">
      <div className="w-full text-center">Connect and Collaborate</div>
      <form className="w-full" onSubmit={submitHandler}>
        <input
          name="email"
          type="text"
          autoComplete="off"
          value={inviteText}
          placeholder="Email Address"
          onChange={handleInputChange}
          className="py-1 px-3 rounded-lg  w-full focus:outline-none shadow shadow-sky-400 "
        />
      </form>

    </div>
  );
};

export default InviteMail;
