import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Sock = ({
  user,
  setUser,
  socket,
  doUpdate,
  setChatSection,
  updateChat,
  setNewMessage,
}) => {
  const navigate = useNavigate();
  useEffect(async () => {
    const autoLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://collabo-hub-ten.vercel.app/api/v1/login",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("app.js", response.data);
        if (response.data && response.data.data) {
          setUser(response.data);
          socket.emit("login", {
            userId: response.data.data._id,
            socketId: socket.id,
          });
        } else {
          localStorage.clear();
          navigate("/");
        }
        console.log(response)
      } catch (error) {
        console.error("Axios request error:", error);
        localStorage.clear();
        navigate("/");
      }
    };

    autoLogin();
  }, []);

  
  useEffect(() => {
    try {
      const needToUpdateProject = (data) => {
        doUpdate((pre) => !pre);
        if (user.data._id === data.user.data._id) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>
                    {`Cheers to ${data.searchuser.username}'s new role as ${data.role} in project ${data.existingProject.projectName}!`}
                  </p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        } else if (user.data._id === data.searchuser._id) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>
                    {`Cheers! Your role has been Updated to ${data.role} in project ${data.existingProject.projectName} by ${data.user.username}`}
                  </p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>
                    {`${data.searchuser.username} has been appointed as ${data.role} for project ${data.existingProject.projectName} by ${data.user.username}.`}
                  </p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
      };

      const addedtaskhandler = (data) => {
        doUpdate((pre) => !pre);
        if (user && user.data && user.data._id === data.owner._id) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`You've successfully created task '${data.taskname}' within the project '${data.project.projectName}'`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        } else if (
          data.contributorsId.some(
            (contributor) => contributor._id === user.data._id
          )
        ) {
          // if (projectId == data.project._id) {
          //   console.log("inside condition");
          //   fetchProject();
          // }
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`You've been added to the task '${data.taskname}' in project '${data.projectname}' by ${data.owner.username}.`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
      };
      const deleteHandler = (data) => {
        doUpdate((pre) => !pre);
        if (
          user &&
          user.data &&
          user.data._id === data.user._id &&
          user.data._id === data.task.owner
        ) {
          // if (projectId == data.project._id) {
          //   console.log("inside condition");
          //   fetchProject();
          // }
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`You've deleted the task ${data.task.taskName} from the project ${data.project.projectName}`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        } else if (
          user &&
          user.data &&
          data.contributorIds.includes(user.data._id)
        ) {
          // if (projectId == data.project._id) {
          //   console.log("inside condition");
          //   fetchProject();
          // }
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className=" text-black">
                  <p>{`The task  ${data.task.taskName} is deleted by ${data.user.userName} in project ${data.project.projectName}`}</p>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
      };
      const editedTaskHandler = (data) => {
        doUpdate((pre) => !pre);
        toast.success("Successfully toasted!");
      };
      const userUpdateHandler = (data) => {
        toast.success(`${data.message}`);
      };

      socket.on("addedTask", addedtaskhandler);
      socket.on("deleteTask", deleteHandler);
      socket.on("needToUpdateProject", needToUpdateProject);
      socket.on("editTask", editedTaskHandler);
      socket.on("userUpdated", userUpdateHandler);

      return () => {
        try {
          socket.off("addedTask", addedtaskhandler);
          socket.off("needToUpdateProject", needToUpdateProject);
          socket.off("deleteTask", deleteHandler);
          socket.off("editTask", editedTaskHandler);
        } catch (error) {
          console.error("Error disconnecting socket:", error);
        }
      };
    } catch (err) {
      console.log("Error");
    }
  }, [user]);

  useEffect(() => {
    console.log("socket");

    try {
      socket.on("message", (data) => {
        toast(data, {
          duration: 6000,
        });
      });
    } catch (error) {
      console.error("Error setting up socket:", error);
    }

    return () => {
      try {
        socket.disconnect();
      } catch (error) {
        console.error("Error disconnecting socket:", error);
      }
    };
  }, []);

  useEffect(() => {
    const handleNewPersonalChat = (data) => {
      // console.log("dataNew", chat);
      setChatSection((prevChat) => {
        if (
          prevChat &&
          !prevChat._id &&
          prevChat.user &&
          prevChat.user._id === data.person2._id
        ) {
          let newChat = data.chat;
          newChat["user"] = prevChat.user;
          return newChat;
        }
        return prevChat;
      });
      updateChat((prev) => !prev);
    };

    const handleMessageReceived = (data) => {
      let res = data;
      // console.log("daaaaaaata", res.newMessage.sender._id, user);
      setNewMessage(res);
      if (res.newMessage.sender._id !== user.data._id)
        toast((t) => (
          <div className="">
            <div className="flex gap-2 font-bold font-poppins items-center">
              <img
                className="rounded-full w-11"
                src={res.newMessage.sender.profilePhoto}
              />
              <p className="flex flex-col">
                <p>{res.newMessage.sender.username}</p>
                <p className=" text-[0.8rem ] font-poppins">
                  {res.newMessage.sender.email}
                </p>
              </p>
            </div>
            <div className="font-poppins text-center w-full">
              <p>{res.newMessage.content}</p>
            </div>
          </div>
        ));
    };

    try {
      socket.on("newPersonalChat", handleNewPersonalChat);
      socket.on("messageReceived", handleMessageReceived);
    } catch (error) {
      console.error("Error setting up socket:", error);
    }

    return () => {
      try {
        socket.off("newPersonalChat", handleNewPersonalChat);
        socket.off("messageReceived", handleMessageReceived);
      } catch (error) {
        console.error("Error disconnecting socket:", error);
      }
    };
  });

  return <div></div>;
};

export default Sock;
