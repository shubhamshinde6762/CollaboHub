import React, { useState, useEffect, useRef } from "react";
import { MdOutlineAttachment, MdOutlinePermMedia } from "react-icons/md";
import VideoPlayer from "../functions/VideoPlayer";
import { RxCross1 } from "react-icons/rx";
import { FaArrowUp } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Attachments = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMedia, setMedia] = useState(null);
  const [file, setFile] = useState(null);
  const dropdownRef = useRef(null);
  const [textMessage, setTextMessage] = useState("");

  // console.log("file 000000000", file)

  const uploadHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("textMessage", textMessage);
      formData.append("chatId", props.chat._id);
      formData.append("userId", props.user.data._id);
      formData.append("person2", props.chat.user);
      formData.append("type", isMedia);

      setFile(null);
      setMedia(null);
      setIsOpen(false);

      await toast.promise(
        axios
          .post("https://collabo-hub-ten.vercel.app/api/v1/uploadMedia", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Image uploaded successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          }),
          {
            loading: "Sending Media...",
            success: (response) => {
              console.log(response);
              return <b>Media Sent!</b>;
            },
            error: (error) => {
              console.error(error);
              return <b>Error while Sending.</b>;
            },
          }
      );
    } catch (err) {}
  };

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        file === null &&
        isMedia === null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, file, isMedia]);

  return (
    <div className="relative select-none">
      <div
        onClick={clickHandler}
        className="flex text-2xl items-center justify-between font-poppins cursor-pointer transition-all duration-400"
      >
        <MdOutlineAttachment />
      </div>

      {isOpen && (
        <div
          className="bg-slate-50  hover:scale-[1.006] outline-offset-2 transition-all duration-500  rounded-r-xl rounded-t-xl shadow flex flex-col space-y-2 items-center absolute bottom-6 left-3 z-20"
          ref={dropdownRef}
        >
          {isMedia !== null ? (
            <div className="bg-gray-400 flex justify-center flex-col items-center w-[30vw] relative rounded-lg p-2">
              <RxCross1
                onClick={() => {
                  setFile(null);
                  setMedia(null);
                  setIsOpen(false);
                }}
                className="absolute cursor-pointer -right-1 -top-1 bg-red-400 text-white text-2xl p-1 rounded-full"
              />
              {isMedia === "image" && (
                <img
                  src={URL.createObjectURL(file)}
                  className="bg-black rounded-lg w-full aspect-auto"
                  alt="Uploaded Media"
                />
              )}
              {isMedia === "video" && (
                <VideoPlayer
                  className="w-full"
                  file={URL.createObjectURL(file)}
                />
              )}
              {isMedia === "File" && (
                <div className=" w-fit rounded-xl bg-gray-700 text-white flex gap-2 flex-wrap justify-center items-center p-4">
                  <FaRegFile className="text-3xl m-2" />
                  <div className="flex-grow flex flex-col justify-center ">
                    <p className=" whitespace-pre-line">{file.name}</p>
                    <p className="text-sm">{file.type}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1 w-full">
                <textarea
                  value={textMessage}
                  onChange={(event) =>
                    setTextMessage((state) => event.target.value)
                  }
                  type="text"
                  placeholder="Type a Message"
                  className=" flex-grow my-2 text-white placeholder:text-white resize-none border-b-2 border-b-white py-2 px-1 focus:outline-none h-11 bg-transparent text-start  overflow-x-hidden custom-scrollbar"
                />
                <FaArrowUp
                  onClick={uploadHandler}
                  className="rounded-full cursor-pointer p-1 text-2xl bg-green-500 text-white"
                />
              </div>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              <label
                htmlFor="Media"
                className="relative border-b-2 w-full px-2 hover:scale-[1.01] hover:font-bold hover:border-b-green-600 cursor-pointer transition-all duration-300 flex gap-x-1 items-center"
              >
                <MdOutlinePermMedia />
                Media
                <input
                  onChange={(event) => {
                    if (event.target.files[0].type.includes("image"))
                      setMedia("image");
                    else if (event.target.files[0].type.includes("video"))
                      setMedia("video");
                    setFile(event.target.files[0]);
                  }}
                  accept=".png, .jpeg, .mp4, .mkv"
                  id="Media"
                  type="file"
                  className="absolute hidden"
                />
              </label>
              <label
                htmlFor="File"
                className="relative border-b-2 w-full px-2 hover:scale-[1.01] hover:font-bold hover:border-b-green-600 cursor-pointer transition-all duration-300 flex gap-x-1 items-center"
              >
                <FaRegFile />
                File
                <input
                  onChange={(event) => {
                    setMedia("File");
                    setFile(event.target.files[0]);
                  }}
                  id="File"
                  type="file"
                  className="absolute hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attachments;
