import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios"

const InviteRow = (props) => {
    
    const acceptHandler = async() => {
        try {
            const response = await axios.post("http://13.210.25.126:5000/api/v1/acceptInvite", {
              "email": props.user.data.email,
              "projectId":props.data["_id"],
            });
      
            // Check if the response status is successful (e.g., 200)
            if (response.status === 200) {
              // console.log(response.data);
              props.setUpdateStatus(state => !state)
            }

          } catch (error) {
            const { response } = error;
            console.error("Error making the POST request:", response);
          }

          props.updateProjects();
          
    }
    const rejectHandler = async() => {
        try {
            const response = await axios.post("http://13.210.25.126:5000/api/v1/rejectInvite", {
              "email": props.user.data.email,
              "projectId":props.data["_id"],
            });
      
            // Check if the response status is successful (e.g., 200)
            if (response.status === 200) {
              console.log(response.data);
            }
          } catch (error) {
            const { response } = error;
            console.error("Error making the POST request:", response);
          }
          props.updateProjects();
          
    }
    return(
        <div className="flex shadow w-full px-3 hover:shadow-purple-200 hover:shadow-2xl rounded-md text-white font-poppins">
            <div className="flex items-center gap-3 justify-center m-2 w-full">
                <div className=" py-2 rounded-md w-full text-base px-2 text-center text-black ">{props.data.projectName}</div>
         
              <div className="flex gap-1 w-fit">
                <div onClick={acceptHandler} className=" rounded-full px-2 py-2 transition-all duration-200  bg-green-500 hover:bg-green-600 hover:scale-[1.001] cursor-pointer"><FaCheck/></div>
                <div onClick={rejectHandler} className=" rounded-full px-2 py-2 transition-all duration-200 text-center bg-red-600 hover:bg-red-700 hover:scale-[1.001] cursor-pointer"><ImCross/></div>
              </div>
            </div>
            
        </div>
    )
}
export default InviteRow