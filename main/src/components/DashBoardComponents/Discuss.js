import React, { useEffect, useState } from "react";
import Chat from "./DiscussSection/Chat";
import ChatPeopleSection from "./DiscussSection/ChatPeopleSection";
import { motion } from "framer-motion";
import Loader from "../Loader";
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
  const [isLoading,setIsLoading] = useState(false);
  return (
    <div className="text-white  w-full m-3  ">
      <Loader isDisplay={isLoading}/>
      <div className="flex h-[89vh] gap-2 sx:hidden">
        <ChatPeopleSection
          needToUpdateChat={needToUpdateChat}
          newMessage={newMessage}
          setChatSection={setChatSection}
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          className=""
        />

        <Chat
          newMessage={newMessage}
          setChatSection={setChatSection}
          chat={chat}
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        ></Chat>
      </div>

      <div className="sx:block h-[89vh] hidden w-full">
        {chat ? (
          <Chat
            newMessage={newMessage}
            setChatSection={setChatSection}
            chat={chat}
            user={user}
            setIsLoading={setIsLoading}

          ></Chat>
        ) : (
          <ChatPeopleSection
            needToUpdateChat={needToUpdateChat}
            newMessage={newMessage}
            setChatSection={setChatSection}
            user={user}
            setIsLoading={setIsLoading}
            className=""
          />
        )}
      </div>
    </div>
  );
};

export default Discuss;
