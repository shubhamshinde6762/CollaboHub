import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPeople = ({
  user,
  setChatSection,
  chat,
  needToUpdateChat,
  chats,
  setChats,
}) => {
  const [searchText, setSearchText] = useState("");

  const [searchChats, setSearchChats] = useState([]);
  const [persons, setPersons] = useState([]);
  const [searchPersons, setSearchPersons] = useState([]);

  // console.log("searchPersons", searchPersons)

  useEffect(() => {
    const fetchAllRelatedUsers = async () => {
      try {
        let personInChat = new Set();
        let userArray = new Set();

        chats.forEach((obj) => {
          obj.persons.forEach((ele) => {
            personInChat.add(ele._id);
          });
        });

        const fetchAllProjects = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchProject",
          { projectArray: user.data.projectIds }
        );

        fetchAllProjects.data.data.forEach((element) => {
          element.contributorsIds.forEach((contributor) => {
            if (!personInChat.has(contributor._id)) {
              userArray.add(contributor._id);
            }
          });
        });

        userArray.delete(user.data._id);

        console.log("inPersons", personInChat, userArray);

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
  }, [chats]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const latestUserData = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchUser",
          {
            userArray: [user.data._id],
          }
        );

        console.log("latestUserData", latestUserData);

        const chatId = [
          ...latestUserData.data.data[0].chatGroup,
          ...latestUserData.data.data[0].chatPerson,
        ];
        let response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchChat",
          {
            chatId,
            userId: user.data._id,
          }
        );

        console.log(response.data.data);
        response.data.data.sort((a, b) => {
          if (!b.lastMessage) return true;
          else if (!a.lastMessage) return false;
          const extractDateTime = (dateString) => {
            const [datePart, timePart] = dateString.split(" ");
            const [day, month, year] = datePart.split("/");
            const [hours, minutes, seconds] = timePart.split(":");

            return {
              date: `${year}-${month}-${day}`,
              time: `${hours}:${minutes}:${seconds}`,
            };
          };

          const date1Info = extractDateTime(a.lastMessage.messageTime);
          const date2Info = extractDateTime(b.lastMessage.messageTime);

          const date1 = new Date(`${date1Info.date}T${date1Info.time}`);
          const date2 = new Date(`${date2Info.date}T${date2Info.time}`);

          return date2 - date1;
        });

        let newData = response.data.data;

        newData.forEach((ele) => {
          if (ele.type == "Personal") {
            if (ele.persons[0]._id === user.data._id) ele.user = ele.persons[1];
            else ele.user = ele.persons[0];
            console.log("element for Personal", ele);
          }
        });

        console.log("InUpdationOfChat", newData);

        setChats(newData);
        setSearchChats(newData);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [user, needToUpdateChat]);

  useEffect(() => {
    try {
      let resultChats = [];
      let resultPersons = [];

      chats.forEach((obj) => {
        if (
          ((obj.type === "Project" || obj.type === "Group") &&
            obj.group.chatName
              .toLowerCase()
              .includes(searchText.toLowerCase())) ||
          (obj.type === "Personal" &&
            (obj.user.username
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
              obj.user.email.toLowerCase().includes(searchText.toLowerCase())))
        ) {
          resultChats.push(obj);
        }
      });

      if (searchText !== "") {
        persons.forEach((obj) => {
          if (
            obj.username.toLowerCase().includes(searchText.toLowerCase()) ||
            obj.email.toLowerCase().includes(searchText.toLowerCase())
          ) {
            resultPersons.push(obj);
          }
        });
      }

      setSearchChats(resultChats);
      setSearchPersons(resultPersons);
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [searchText, persons]);

  return (
    <div className="w-full mt-2  h-[74vh] overflow-y-scroll overflow-x-hidden custom-scrollbar flex flex-col">
      <label className="my-2">
        <input
          name="searchText"
          type="text"
          value={searchText}
          className=" focus:outline-black bg-purple-100 outline-2 border-2 border-purple-400 transition-all duration-300 w-full px-3 py-1 rounded-2xl"
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search"
        />
      </label>
      <div className="w-full flex flex-col text-black font-poppins">
        {user && user.data && searchChats && searchChats.length > 0 && (
          <div>Chat History</div>
        )}
        {user &&
          user.data &&
          searchChats &&
          searchChats.map((ele) => (
            <div
              onClick={(event) => setChatSection(ele)}
              className="flex hover:scale-[1.02] hover:bg-purple-100 px-2 py-1 rounded-lg transition-all duration-500 cursor-pointer w-full gap-2"
            >
              <img
                className="w-11 rounded-full"
                src={
                  (ele.group && ele.group.profilePhoto) ||
                  (ele.user && ele.user.profilePhoto)
                }
              />
              <div className="flex w-full flex-col gap-0">
                <p className="">
                  <p className="">
                    {(ele.group && ele.group.chatName) ||
                      (ele.user && ele.user.username)}{" "}
                  </p>
                </p>
                {ele.lastMessage && ele.lastMessage.content && (
                  <p className="text-sm flex font-courier text-gray-500">
                    <span className="font-bold">
                      {ele.lastMessage.sender.username + ": "}
                    </span>
                    <div className="flex-grow">
                      {ele.lastMessage.type === "textMessage"
                        ? ele.lastMessage.content
                        : ele.lastMessage.type === "image"
                        ? "Image"
                        : ele.lastMessage.type === "video"
                        ? "Video"
                        : "File"}
                    </div>
                    <span className="text-sm w-fit">
                      {ele.lastMessage.messageTime.split(" ")[1].split(":")[0] +
                        ":" +
                        ele.lastMessage.messageTime.split(" ")[1].split(":")[1]}
                    </span>
                  </p>
                )}
                {!ele.lastMessage && (
                  <div className="text-sm font-courier">No message</div>
                )}
              </div>
            </div>
          ))}
        {user && user.data && searchPersons && searchPersons.length > 0 && (
          <div>New Contacts</div>
        )}
        {user &&
          user.data &&
          searchPersons &&
          searchPersons.map((ele) => (
            <div
              onClick={(event) => setChatSection({ user: ele })}
              className="flex hover:scale-[1.02] transition-all duration-500 cursor-pointer w-full gap-2"
            >
              <img className="w-11 rounded-full" src={ele.profilePhoto} />
              <div className="flex w-full flex-col gap-0">
                <p className="">
                  <p className="">{ele.username} </p>
                  <p className="text-[0.75rem] text-gray-500">
                    <span className="font-bold">Email: </span>
                    {ele.email}{" "}
                  </p>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPeople;
