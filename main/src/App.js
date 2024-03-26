import "./App.css";
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sock from "./Sock";
import Intro from "./Intro";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";

import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import Dashboard from "./components/Dashboard";
import Project from "./components/DashBoardComponents/Project";
import Calender from "./components/DashBoardComponents/Calender";
import Discuss from "./components/DashBoardComponents/Discuss";
import HomeDashBoard from "./components/DashBoardComponents/HomeDashBoard";

import EditProfile from "./components/GeneralPurposeComponents/EditProfile";
import Notification from "./components/GeneralPurposeComponents/Notification";
import NavbarProfile from "./components/GeneralPurposeComponents/NavbarProfile";
import ActionButton from "./components/GeneralPurposeComponents/ActionButton";

import io from "socket.io-client";
const socket = io("http://13.210.25.126::5000/");

function App() {
  const [user, setUser] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [needToUpdateChat, updateChat] = useState(false);
  const [chat, setChatSection] = useState();
  const [isUpdate, doUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex   bg-purple-100  flex-col items-center">
      <Intro />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          position: "absolute",
          top: "5%",
        }}
      />
      <Sock
        user={user}
        socket={socket}
        setChatSection={setChatSection}
        updateChat={updateChat}
        setNewMessage={setNewMessage}
        doUpdate={doUpdate}
        setUser={setUser}
      />
      <div className="absolute top-0 left-0 z-30 transition-all duration-1000">
        {user  &&  (
          <ActionButton
            updateStatus={updateStatus}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user}
            className=" transition-all duration-1000 text-white"
          />
        )}
      </div>
      <div className=" z-40 select-none flex justify-center bg-[#fcf8ff]  shadow-purple-400 border border-double border-purple-400  items-center sticky   p-3  w-[98%] rounded-2xl  mt-3">
        <navbar className="flex  items-center justify-center  h-[4vh] w-full">
          <div className="flex justify-center items-center gap-x-2">
            {user &&  (
              <div className="flex relative hidden sx:block  justify-start min-w-6 items-center">
                <div className="text-xl  transition-all duration-1000">
                  <AiOutlineMenu
                    onClick={() => setIsOpen((pre) => !pre)}
                    className={`${
                      isOpen ? "scale-50  text-white" : "scale-100  z-50"
                    } + " transition-all absolute top-[-0.6rem] left-2 duration-1000"`}
                  />
                  <RxCross1
                    onClick={() => setIsOpen((pre) => !pre)}
                    className={`${
                      isOpen ? "scale-100 z-50" : "scale-50 text-white"
                    } " transition-all absolute top-[-0.6rem] left-2  duration-1000"`}
                  />
                </div>
              </div>
            )}
            <div>
              <NavLink to="/" className=" bg-transparent">
                <img
                  src="https://res.cloudinary.com/dd6sontgf/image/upload/v1710047321/rgxj9i4qbm0yayncyunn.png"
                  className="  bg-transparent max-h-[4vh]"
                />
              </NavLink>
            </div>
          </div>

          <div className="flex-grow  "></div>
          <div className="flex items-center ">
            <div className="hover:scale-105 cursor-pointer transition-all duration-300">
              {user && (
                <Notification user={user} setUpdateStatus={setUpdateStatus} />
              )}
            </div>
            <div className="flex gap-3 items-center ">
              {user && user.data ? (
                <div className=" max-w-14 px-2 ">
                  <NavbarProfile
                    user={user}
                    setUser={setUser}
                    editProfile={editProfile}
                    setEditProfile={setEditProfile}
                  />
                </div>
              ) : (
                <NavLink to="/Login">
                  <button className="text-base xs:text-white font-lato mx-2 cursor-pointer hover:scale-[1.05] transition-all duration-300  ">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </navbar>
        {user && editProfile && (
          <div className="fixed  z-30 h-full inset-0 bg-black opacity-70"></div>
        )}
        <div className="absolute w-full left-0 z-50 ">
          <div className="w-full  flex flex-wrap h-full z-50 justify-center items-center">
            {user && editProfile && (
              <EditProfile
                className=""
                user={user}
                editProfile={editProfile}
                setEditProfile={setEditProfile}
              />
            )}
          </div>
        </div>
      </div>

      {/* Defining Routes */}
      <Routes className="w-full">
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/Login"
          element={<Login user={user} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/dashboard/:username"
          element={
            <div className="flex w-full">
              <Dashboard updateStatus={updateStatus} user={user} />
              <HomeDashBoard isUpdate={isUpdate} user={user} />
            </div>
          }
        />

        <Route
          path="/dashboard/calender"
          element={
            <div className="flex w-full">
              <Dashboard updateStatus={updateStatus} user={user} />
              <Calender />
            </div>
          }
        />

        <Route
          exact
          path={`/dashboard/project/:projectId`}
          element={
            <div className="flex w-full ">
              <Dashboard className="" user={user} />
              <Project
                socket={socket}
                user={user}
                isUpdate={isUpdate}
                doUpdate={doUpdate}
                className=""
              />
            </div>
          }
        />

        <Route
          exact
          path={`/dashboard/discuss`}
          element={
            <div className="flex w-full ">
              <Dashboard className="min-w-[30%]" user={user} />
              <Discuss
                className=""
                chat={chat}
                setChatSection={setChatSection}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                updateChat={updateChat}
                needToUpdateChat={needToUpdateChat}
                socket={socket}
                user={user}
              />
            </div>
          }
        />

        <Route
          exact
          path={`/dashboard`}
          element={
            <div className="flex w-full ">
              <Dashboard className="min-w-[30%]" user={user} />
              <Project className="" user={user} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
