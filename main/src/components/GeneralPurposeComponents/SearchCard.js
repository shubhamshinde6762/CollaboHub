import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";
import { useParams } from "react-router-dom";
const SearchCard = ({ user, searchuser, projectDetails }) => {
  // console.log("user",user);
  const searchUserId = searchuser._id;
  const { projectId } = useParams();
  const [editOption, setEditOption] = useState(false);
  const [role, setRole] = useState("");
  const [initialRole, setInitialRole] = useState("");
  const [roleUpdated, setRoleUpdated] = useState(false);
  useEffect(() => {
    if (projectDetails.data && projectDetails.data.data) {
        // console.log(searchuser._id)
      const isOwner = projectDetails.data.data[0].owners.includes(
        searchuser._id
      );
      setInitialRole(isOwner ? "Owner" : "Member");
      setRole(isOwner ? "Owner" : "Member");
    }
  }, [projectDetails.data, searchuser._id]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    try {
      setRoleUpdated(() => initialRole !== role);
    } catch (error) {}
  }, [role]);

  const handleUpdate = async () => {
    try {
      console.log(role);
      if (roleUpdated) {
        await axios.post(
          "http://13.210.25.126::5000/api/v1/updateRole",
          { searchUserId, projectId, role, user, searchuser }
        );
        setInitialRole(role);
        setRoleUpdated(false);
        setEditOption(!editOption);
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  const handleRemove = () => {};

  return (
    <div className="px-4 py-2 cursor-pointer border m-1 rounded-md flex flex-col justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <div>
          {searchuser && <div className="text-xl ">{searchuser.username}</div>}
          <div className="text-sm">{searchuser.email}</div>
        </div>
        <div
          onClick={() => setEditOption((state) => !state)}
          className="relative"
        >
          <FaEdit />
        </div>
      </div>

      <div>
        {editOption && (
          <div className="w-full flex flex-wrap justify-evenly gap-y-2 items-center">
            <div className="w-full bg-gray-400 h-[2px] "></div>
            <label className="w-full">
              <p className="text-sm">Role</p>
              <select
                className="w-full shadow rounded px-1"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="Owner">Owner</option>
                <option value="Member">Member</option>
              </select>
            </label>
            <div
              className={`px-2 py-1 border  ${
                roleUpdated
                  ? " bg-green-500 text-white cursor-pointer"
                  : "border-gray-500 bg-gray-200 cursor-not-allowed"
              } rounded-xl`}
              onClick={handleUpdate}
            >
              Update
            </div>
            <div
              className="px-2 py-1 bg-red-500 text-white  rounded-xl"
              onClick={handleRemove}
            >
              Remove
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
