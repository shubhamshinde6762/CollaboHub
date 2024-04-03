import React, { useEffect, useState } from "react";
import People from "./People";
import SearchPeople from "./SearchPeople";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import CreateGroupContacts from "./CreateGroupContacts";

const ChatPeopleSection = ({
  user,
  newMessage,
  setChatSection,
  needToUpdateChat,
}) => {
  const [isSearch, setSearch] = useState(false);
  const [isCreateGroup, setCreateGroup] = useState(false);
  const [chats, setChats] = useState();

  return (
    user && (
      <div className="shadow min-w-[30%] h-[89vh] bg-[#fcf8ff] relative text-black p-4  overflow-x-hidden rounded-2xl flex flex-col">
        {!isCreateGroup && (
          <div
            onClick={() => setCreateGroup((state) => !state)}
            className="absolute z-10  h-auto  cursor-pointer spin-once group flex items-center bottom-[8%] right-[10%]  rounded-full bg-green-500 text-white"
          >
            <IoMdAdd className="p-1 text-3xl spin-once-hover spin-once-unhover rounded-full group-hover:spin-once" />
            <div className=" group-hover:px-16 transition-all duration-1000">
              <span className="text-xl absolute  w-32 top-0 right-0 translate-x-[100vw] transition-all duration-[750ms] group-hover:-translate-x-0">
                Create Group
              </span>
            </div>
          </div>
        )}

        {isCreateGroup ? (
          <CreateGroupContacts setCreateGroup={setCreateGroup} user={user} />
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={user.data.profilePhoto} className="w-12" />
                <p className="font-bold text-2xl">Chats</p>
              </div>
              <IoSearch
                onClick={() => setSearch((state) => !state)}
                className="text-xl"
              />
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            {user && !isSearch ? (
              <People
                newMessage={newMessage}
                setChatSection={setChatSection}
                user={user}
                needToUpdateChat={needToUpdateChat}
                chats={chats}
                setChats={setChats}
              />
            ) : (
              <SearchPeople
                newMessage={newMessage}
                setChatSection={setChatSection}
                user={user}
                needToUpdateChat={needToUpdateChat}
                chats={chats}
                setChats={setChats}
              />
            )}
          </div>
        )}
      </div>
    )
  );
};

export default ChatPeopleSection;
