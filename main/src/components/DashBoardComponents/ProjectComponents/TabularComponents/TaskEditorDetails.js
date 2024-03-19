import React, { useEffect, useState } from "react";

const TaskEditorDetails = ({ hoveredTask, contributorIndex }) => {
  console.log("hoverWala", hoveredTask);
  const hoverIndexedElement = hoveredTask.contributorsId[contributorIndex];
  console.log("Pavan", hoverIndexedElement);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    setComments(hoverIndexedElement.comments);
  }, [hoveredTask]);

  return (
    <div className="bg-white text-black font-lato font-bold rounded-md p-2 min-w-36">
      <div className="flex items-center">
        <img
          src={
            hoverIndexedElement.user.profilePhoto ||
            hoverIndexedElement.user.data.profilePhoto
          }
          className="rounded-full aspect-square w-12 h-12 mr-2"
          alt="User Profile"
        />
        <div className="flex flex-col">
          <div className="font-bold text-lg ">
            {hoverIndexedElement.user.name ||
              hoverIndexedElement.user.data.name}
          </div>
          <div className="text-xs ">
            {hoverIndexedElement.user.email ||
              hoverIndexedElement.user.data.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditorDetails;
