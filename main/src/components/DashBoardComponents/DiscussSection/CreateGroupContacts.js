import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrNext } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";

const CreateGroupContacts = ({ user, setCreateGroup }) => {
  const [searchText, setSearchText] = useState("");
  const [persons, setPersons] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchPersons, setSearchPersons] = useState([]);
  const [isNextPage, setNextPage] = useState(false);
  const [groupName, setGroupName] = useState();
  const [selectedFile, setSelectedFile] = useState(
    "https://res.cloudinary.com/dd6sontgf/image/upload/v1706275257/icons8-user-100_i1ye5n.png"
  );
  console.log("1321654654654",groupMembers);
  const createHandler = async () => {
   
    const response = await axios.post(
      "https://collabo-hub-ten.vercel.app/api/v1/createGroup",
      {
        userId: user.data._id,
        profilePhoto: selectedFile,
        groupName: groupName,
        groupMembers: groupMembers,
      }
    );
    console.log("response of creating group", response);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchAllRelatedUsers = async () => {
      try {
        let userArray = new Set();

        const fetchAllProjects = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchProject",
          { projectArray: user.data.projectIds }
        );

        fetchAllProjects.data.data.forEach((element) => {
          element.contributorsIds.forEach((contributor) => {
            userArray.add(contributor._id);
          });
        });

        userArray.delete(user.data._id);

        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchUser",
          { userArray: Array.from(userArray) }
        );

        setPersons(response.data.data);
      } catch (err) {
        console.error("Error fetching related users:", err);
      }
    };

    fetchAllRelatedUsers();
  }, []);

  useEffect(() => {
    try {
      let resultPersons = [];

      persons.forEach((obj) => {
        if (
          obj.username.toLowerCase().includes(searchText.toLowerCase()) ||
          obj.email.toLowerCase().includes(searchText.toLowerCase())
        ) {
          resultPersons.push(obj);
        }
      });

      setSearchPersons(resultPersons);
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [searchText, persons]);

  const groupMemberHandler = (event) => {
    const memberId = event.target.id;
    if (event.target.checked) {
      if (!groupMembers.includes(memberId)) {
        setGroupMembers((prevMembers) => [...prevMembers, memberId]);
      }
    } else {
      setGroupMembers((prevMembers) => prevMembers.filter((member) => member !== memberId));
    }
  };
  const clearGroupMembers = () => {
    setGroupMembers([]);
  };

  

  return (
    <div className="w-full mt-2 flex flex-col">
      {!isNextPage && (
        <div
          onClick={() => setNextPage((state) => !state)}
          className="absolute  h-auto  cursor-pointer spin-once group flex items-center bottom-[8%] right-[10%]  rounded-full bg-green-500 text-white"
        >
          <GrNext className="p-1 text-3xl spin-once-hover spin-once-unhover rounded-full group-hover:spin-once" />
          <div className=" group-hover:pr-14 transition-all duration-1000">
            <span className="text-xl absolute w-fit top-0 right-2 translate-x-[100vw] transition-all duration-[750ms] group-hover:-translate-x-0">
              Next
            </span>
          </div>
        </div>
      )}
      {!isNextPage ? (
        <div>
          <label className="my-2 flex gap-1 items-center">
            <RxCross1
              onClick={() => setCreateGroup((state) => !state)}
              className="text-2xl cursor-pointer"
            />
            <input
              name="searchText"
              type="text"
              value={searchText}
              className=" focus:outline-black bg-purple-100 outline-2 border-2 border-purple-400 transition-all duration-300 w-full px-3 py-1 rounded-2xl"
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search"
            />
          </label>
          <div className="w-full flex flex-col  text-black font-poppins">
            {user && user.data && searchPersons && searchPersons.length > 0 && (
              <div>Contacts</div>
            )}
            {user &&
              user.data &&
              searchPersons &&
              searchPersons.map((ele) => (
                <label htmlFor={ele._id} key={ele._id}>
                  <div className="flex hover:scale-[1.02] hover:bg-purple-100 px-2 py-1 rounded-lg transition-all duration-500 cursor-pointer w-full gap-2">
                    <img
                      className="w-11 rounded-full"
                      src={ele.profilePhoto}
                      alt="Profile"
                    />
                    <div className="flex flex-grow w-full flex-col gap-0">
                      <p className="">
                        <p className="">{ele.username} </p>
                        <p className="text-[0.75rem] text-gray-500">
                          <span className="font-bold">Email: </span>
                          {ele.email}{" "}
                        </p>
                      </p>
                    </div>
                    <input
                      onClick={groupMemberHandler}
                      type="checkbox"
                      id={ele._id}
                      value={groupMembers.includes(ele._id)}
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center ">
          <IoArrowBackOutline
            onClick={() => { setNextPage((state) => !state); clearGroupMembers(); }}
            className="absolute left-[5%] text-xl top-[5%] cursor-pointer"
          />
          <div className="relative w-[40%] flex">
            <div className="relative">
              <img
                className="rounded-full"
                src={selectedFile}
                alt=""
              />
            </div>
            <label
              htmlFor="fileInput"
              className="absolute right-0 bottom-3 scale-125 bg-white rounded-full p-1 cursor-pointer border border-black"
            >
              <MdModeEdit />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>

          <label>
            <input
              id="group-name-input"
              className="w-full bg-slate-200 rounded-full px-4 py-1"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
            />
          </label>
          <div
            onClick={createHandler}
            className="bg-green-500 text-white items-center px-2 rounded-full flex gap-1 mt-4 mb-1 hover:scale-110 hover:bg-green-700 transition-all duration-500 cursor-pointer"
          >
            <MdDone />
            <p>Done</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupContacts;
