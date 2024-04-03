import React, { useEffect, useState } from "react";
import Chat from "./DiscussSection/Chat";
import ChatPeopleSection from "./DiscussSection/ChatPeopleSection";
import { motion } from "framer-motion";
const Discuss = ({
  user,
  socket,
  updateUser,
  newMessage,
  needToUpdateChat,
  setNewMessage,
  updateChat,
  chat,
  setChatSection,
}) => {
  return (
    <div className="text-white  w-full m-3  ">
      <div className="flex h-[89vh] gap-2 sx:hidden">
        <ChatPeopleSection
          needToUpdateChat={needToUpdateChat}
          newMessage={newMessage}
          setChatSection={setChatSection}
          user={user}
          className=""
        />

        <Chat
          newMessage={newMessage}
          setChatSection={setChatSection}
          chat={chat}
          user={user}
        ></Chat>
      </div>

      <div className="sx:block h-[89vh] hidden w-full">
        {chat ? (
          <Chat
            newMessage={newMessage}
            setChatSection={setChatSection}
            chat={chat}
            user={user}
          ></Chat>
        ) : (
          <ChatPeopleSection
            needToUpdateChat={needToUpdateChat}
            newMessage={newMessage}
            setChatSection={setChatSection}
            user={user}
            className=""
          />
        )}
      </div>
    </div>
  );
};

export default Discuss;
