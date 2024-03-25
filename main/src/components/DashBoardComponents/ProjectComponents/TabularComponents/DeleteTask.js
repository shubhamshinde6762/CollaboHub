import React from "react";
import {useRef} from "react"
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios"
const DeleteTask = ({task,user,deletePage,setDeletePage}) => {
  
  const dropdownRef = useRef(null);
  const deleteTask = async() =>{
    try{
      const response = await axios.post(
        "https://collabo-hub-ten.vercel.app/api/v1/deleteTask",
        {
          projectId : task.projectId,
          taskId : task._id,
          email : user.data.email
        }
        )
        setDeletePage(!deletePage);
        console.log(response)
    }
    catch(error){
        console.log(error);
    }
  }
  return (
        <div
          ref={dropdownRef}
          className="border p-3 absolute bg-white min-w-52 z-30 font-poppins shadow rounded-md transition-all duration-1000"
        >
          {`Are you sure to delete ${task.taskName}?`}
          <div className="flex justify-evenly pt-3">
            <div className="bg-green-600 text-white p-1 rounded-md">
              <FaCheck onClick={deleteTask} />
            </div>
            <div className="bg-red-600 text-white p-1 rounded-md">
              <ImCross onClick={() => setDeletePage(!deletePage)} />
            </div>
          </div>
        </div>
  );
};

export default DeleteTask;
