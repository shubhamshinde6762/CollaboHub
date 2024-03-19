import React, { useEffect, useState } from "react";
import BusyChart from "../BusyChart";
import { ReactTyped } from "react-typed";

const UserPanel = ({ user, allDetails, busyArray }) => {
  const [texts, setTexts] = useState([]);
  useEffect(() => {
    setTexts(["Hey " + user.data.username + " \n", "Welcome Aboard!!!\n"]);
  }, [user]);

  return (
    <div className="min-w-[260px] shadeEffect flex flex-col bg-[#fcf8ff]  p-3 w-[95%] mx-[2.5%] rounded-lg justify-center ">
      <div className="flex gap-6 ">
        <img
          src={user.data.profilePhoto}
          alt="Profile"
          className="rounded-full w-[30%]"
        />
        <ReactTyped
          className=" font-bold text-4xl font-lora"
          strings={texts}
          typeSpeed={200}
          backSpeed={50}
          loop
        />
      </div>

      <div className="w-full h-full flex flex-col justify-end">
        <BusyChart busyArray={busyArray} />
      </div>
    </div>
  );
};

export default UserPanel;
