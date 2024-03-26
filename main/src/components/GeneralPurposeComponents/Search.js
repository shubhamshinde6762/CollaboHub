import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import SearchCard from "./SearchCard";

const Search = ({ user, userDetails, inviteText, setInviteText, setInviteMode, isOpen, projectDetails }) => {
    const { projectId } = useParams();
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setInviteText(inputValue);

        if (inputValue === '') {
            setFilteredUsers([]);
        } else {
            const filteredUsers = userDetails.data.data.filter((user) =>
                user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                user.username.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredUsers(filteredUsers);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://13.210.25.126:5000/api/v1/invite",
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
            if (response.data.status === "401-USER") {
                toast.error("User Not exist");
            }
            if (response.status === 401) {
                toast.error("User already in the project")
            }
        }
        setInviteText("");
    };
    

    useEffect(() => {
        setInviteText("");
    }, [isOpen]);

    return (
        <div className="text-black bg-white p-2 rounded-l-md rounded-b-md">
            <div className="text-center w-full">Search your Contributors</div>
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
            <div className="flex flex-col">
                {filteredUsers.length === 0 && inviteText.length > 0 && (
                    <div className="flex justify-center items-center px-4 py-2 cursor-pointer gap-x-1" onClick={() => setInviteMode("Invite")}>
                        <div className=" bg-green-500 text-white p-1 rounded-full"><FaPlus /></div>
                        <div>{inviteText}</div>
                    </div>
                )}
                {filteredUsers.map((searchuser, index) => (
                    <SearchCard key={index} projectDetails={projectDetails} searchuser={searchuser} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Search;
