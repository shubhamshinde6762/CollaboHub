import React from "react";

const TaskRow = ({taskName, }) => {
  return (
    <div className="w-fit bg-black">
      <div className="flex items-center justify-center text-sm text-black bg-white shadow text-center font-poppins">
        <div className="w-40 m-[1px] border-r py-2 ">Task</div>
        <div className="w-28 m-[1px] border-r py-2 ">Due Date</div>
        <div className="w-28 m-[1px] border-r py-2 ">Created On</div>
        <div className="w-28 m-[1px] border-r py-2 ">Created By</div>
        <div className="w-28 m-[1px] border-r py-2 ">Status</div>
      </div>
    </div>
  );
};

export default TaskRow;
