import axios from "axios";
import React, { useEffect, useState } from "react";

const People = ({
  user,
  setChatSection,
  newMessage,
  needToUpdateChat,
  chats,
  setChats,
}) => {
  // useEffect

  console.log(chats);
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

        response.data.data.forEach((ele) => {
          if (ele.type == "Personal") {
            console.log(ele);
            if (ele.persons[0]._id === user.data._id) ele.user = ele.persons[1];
            else ele.user = ele.persons[0];
          }
        });

        console.log(response.data.data);
        let temp = response.data.data.filter((ele) => ele.lastMessage);
        temp.sort((a, b) => {

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

        let newData = [
          ...temp,
          ...response.data.data.filter((ele) => !ele.lastMessage),
        ];

        console.log("newData", newData);

        setChats(newData);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [user, needToUpdateChat]);

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("mssg", newMessage);
        const chatId = [newMessage.newMessage.chatId];
        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchChat",
          {
            chatId,
            userId: user.data._id,
          }
        );

        let updatedChat = response.data.data[0];

        if (updatedChat.type == "Personal") {
          console.log(updatedChat);
          if (updatedChat.persons[0]._id === user.data._id)
            updatedChat.user = updatedChat.persons[1];
          else updatedChat.user = updatedChat.persons[0];
        }

        // console.log(response.data.data);

        setChats((pre) => {
          const state = pre.filter(
            (ele) => ele._id !== newMessage.newMessage.chatId
          );
          return [updatedChat, ...state];
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [newMessage]);

  return (
    user && (
      <div className="mt-3 py-2 px-1 relative h-[74vh] text-black overflow-x-hidden overflow-y-scroll custom-scrollbar rounded-2xl">
        <div className="w-full flex flex-col text-black font-poppins">
          {user && user.data && chats && chats.length > 0 && (
            <div>Chat History</div>
          )}

          {user &&
            user.data &&
            chats &&
            chats.map((ele) => (
              <div
                onClick={(event) => setChatSection(ele)}
                className="flex hover:scale-[1.02] hover:bg-purple-100 px-2 rounded-lg py-1 transition-all duration-500 cursor-pointer w-full gap-2"
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
                        {ele.lastMessage.messageTime
                          .split(" ")[1]
                          .split(":")[0] +
                          ":" +
                          ele.lastMessage.messageTime
                            .split(" ")[1]
                            .split(":")[1]}
                      </span>
                    </p>
                  )}
                  {!ele.lastMessage && (
                    <div className="text-sm font-courier">No message</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default People;
