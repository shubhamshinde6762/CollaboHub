import React from 'react';
import CreatedTaskRow from "./TabularComponents/CreatedTaskRow";

const CreatedTask = ({ owning, userDetails, isUpdate }) => {
  // console.log("owning", owning);
  return (
    <div className="text-white ">
      <CreatedTaskRow className="w-full" owning={owning} userDetails={userDetails} isUpdate={isUpdate}/>
    </div>
  );
};

export default CreatedTask;
