import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";


const ViewStatus = ({ task, viewStatusTimestamp, status, setStatus }) => {
  const [completionStatus, setCompletionStatus] = useState({});
  const timestampDate = new Date(viewStatusTimestamp);
  const due = new Date(task.dueDate);

  const differenceMs = due - timestampDate;
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const status = {};
    task.contributorsId.forEach((contributor) => {
      status[contributor._id] =
        contributor.completedOn !== null
          ? new Date(contributor.completedOn)
          : "Incomplete";
    });
    setCompletionStatus(status);
  }, [task]);

  return (
    <div>
      <div
        style={{ animation: "dropRight 0.8s " }}
        className=" relative bg-white z-50 p-4  text-blue-500 rounded-md w-[270px]font-roboto  shadow-2xl shadow-purple-200"
      >
        <div
          onClick={() => setStatus(!status)}
          className=" bg-red-500 p-2 text-xs rounded-full text-white absolute transition-all duration-200 -left-3 -top-3 hover:scale-105 cursor-pointer hover:bg-red-700"
        >
          <ImCross />
        </div>
        <div className="text-center text-black font-lato  font-bold text-xl overflow-hidden whitespace-nowrap overflow-ellipsis ">
          <span className="text-black">Task :</span> {task.taskName}
        </div>
        <div className="bg-red-500 px-2 rounded-xl absolute -right-3 -top-4 text-sm  text-white rounded-md px-1 mt-2">
          Due On {due.toDateString()}
        </div>
        <div className="text-center border border-white m-2 rounded-md ">
          <span className="text-xl">Associates</span>
          <div className="flex flex-col">
            {task &&
              task.contributorsId.map((contributor) => (
                <div
                  key={contributor._id}
                  className="flex items-center justify-center shadow shadow-white m-2 px-1 rounded-md w-fit"
                >
                  <div>
                    <img src={contributor.user.profilePhoto} className="w-10" />
                  </div>
                  <div>{contributor.user.username}</div>
                  {completionStatus && completionStatus[contributor._id] && (
                    <div
                      className={`ml-4 rounded-md text-white font-poppins p-1 m-2 ${
                        completionStatus[contributor._id] === "Incomplete"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {completionStatus[contributor._id] === "Incomplete" ? (
                        <span>Incomplete</span>
                      ) : (
                        <span className="flex justify-center items-center">
                          <TiTick />
                          {completionStatus[contributor._id].completedOn &&
                            new Date(
                              contributor.completedOn.split(" ")[0]
                            ).toDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="text-center">
          Deadline CountDown : {differenceDays} Days
        </div>
      </div>
    </div>
  );
};

export default ViewStatus;
