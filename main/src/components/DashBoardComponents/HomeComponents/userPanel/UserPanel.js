import React, { useEffect, useState } from "react";
import BusyChart from "../BusyChart";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const UserPanel = ({ user, allDetails, busyArray }) => {
  return (
    <motion.div
      className="min-w-[260px] shadeEffect flex flex-col bg-[#fcf8ff]  p-3 w-[95%] mx-[2.5%] rounded-lg justify-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex xs:flex-wrap justify-start  items-center gap-2 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          src={user.data.profilePhoto}
          alt="Profile"
          className="rounded-full w-[30%]"
        />
        <div className="flex flex-col gap-1">
          <ReactTyped
            className="font-bold text-2xl xs:text-xl font-poppins"
            strings={[`${user.data.username}`]}
            typeSpeed={100}
            backSpeed={100}
          />
          <ReactTyped
            className="font-bold text-xl xs:text-lg text-slate-600 font-poppins"
            strings={[`${user.data.email}`]}
            typeSpeed={100}
            backSpeed={100}
            startDelay={2}
          />
          <p className="flex  gap-1 font-poppins text-left ">
            Invitation Pending :{" "}
            <span className="font-bold text-red">
              {user.data.invitedProjectIds.length}
            </span>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="w-full h-full flex flex-col justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <BusyChart busyArray={busyArray} />
      </motion.div>
    </motion.div>
  );
};

export default UserPanel;
