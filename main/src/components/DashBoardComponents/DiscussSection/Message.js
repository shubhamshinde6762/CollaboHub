import React from "react";
import VideoPlayer from "../../functions/VideoPlayer";
import { FaRegFile } from "react-icons/fa";

const Message = ({ messageText, user }) => {
  const handleOpenFile = () => {
    fetch(messageText.content.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", messageText.content.originalName);
        document.body.appendChild(link);
        link.click();
      });
  };

  console.log(messageText);
  return (
    <div>
      <div className="flex justify-start">
        {user && user.data._id !== messageText.sender._id && (
          <div className="w-fit relative max-w-[50%] flex items-center">
            <img className="w-12" src={messageText.sender.profilePhoto} />
            {messageText.type === "textMessage" && (
              <p className="shadow px-2 bg-slate-50 text-lg  rounded-r-full rounded-t-full">
                {messageText.content}
              </p>
            )}
            {messageText.type === "image" && (
              <div className=" bg-slate-100 p-2 rounded-xl ">
                <img
                  src={messageText.content.url}
                  loading="lazy"
                  className=""
                />
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            {messageText.type === "video" && (
              <div className=" bg-slate-100 flex-col p-2 rounded-xl w-full ">
                <div className="w-full flex-grow h-fit bg-black">
                  <VideoPlayer
                    file={messageText.content.url}
                    className="h-fit"
                  />
                </div>
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            {messageText.type === "File" && (
              <div className="bg-slate-100 rounded-xl p-2">
                <div className="w-full bg-gray-50 p-2 rounded-xl flex flex-col gap-1 justify-center">
                  <div className="flex gap-1 justify-center items-center">
                    <FaRegFile className="text-xl" />
                    <p className="">{messageText.content.originalName}</p>
                  </div>
                  <div className="w-full text-center">
                    <span
                      onClick={handleOpenFile}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-xl"
                    >
                      Download
                    </span>
                  </div>
                </div>
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            <span className="text-[0.8rem] absolute bottom-1 -right-10">
              {messageText.messageTime.split(" ")[1].split(":")[0] +
                ":" +
                messageText.messageTime.split(" ")[1].split(":")[1]}
            </span>
          </div>
        )}
      </div>
      <div className="flex w-full justify-end">
        {user && user.data._id === messageText.sender._id && (
          <div
            className={`justify-end mt-3  relative max-w-[60%] flex items-center`}
          >
            {messageText.type === "textMessage" && (
              <p className="shadow px-2 whitespace-pre-wrap bg-slate-50 text-lg  rounded-l-full rounded-t-full">
                {messageText.content}
              </p>
            )}
            {messageText.type === "image" && (
              <div className=" bg-slate-100 p-2 rounded-xl ">
                <img
                  src={messageText.content.url}
                  loading="lazy"
                  className=""
                />
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            {messageText.type === "video" && (
              <div className=" bg-slate-100 flex-col p-2 rounded-xl w-full ">
                <div className="w-full flex-grow h-fit bg-black">
                  <VideoPlayer
                    file={messageText.content.url}
                    className="h-fit"
                  />
                </div>
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            {messageText.type === "File" && (
              <div className="bg-slate-100 rounded-xl p-2">
                <div className="w-full bg-gray-50 p-2 rounded-xl flex flex-col gap-1 justify-center">
                  <div className="flex gap-1 justify-center items-center">
                    <FaRegFile className="text-xl" />
                    <p className="">{messageText.content.originalName }</p>
                  </div>
                  <div className="w-full text-center">
                    <span
                      onClick={handleOpenFile}
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-xl"
                    >
                      Download
                    </span>
                  </div>
                </div>
                <p className="text-black">{messageText.content.textMessage}</p>
              </div>
            )}
            <span className="text-[0.8rem] absolute bottom-0 -left-10">
              {messageText.messageTime.split(" ")[1].split(":")[0] +
                ":" +
                messageText.messageTime.split(" ")[1].split(":")[1]}
            </span>
            <img className="w-12" src={messageText.sender.profilePhoto} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
