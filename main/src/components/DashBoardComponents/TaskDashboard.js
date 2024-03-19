import React from 'react'
import { FaPlus } from "react-icons/fa";
const TaskDashboard = () => {
  return (
    <div>
        {/* info div */}
        <div className='flex justify-between px-2'>
            <div className='hover:border-b-2 border-pink-500 rounded-md p-1 '>Project Name</div>
            <FaPlus className="bg-green-600"/>
        </div>

        {/* Navbar of dashboard */}
        <div className='inline-flex mt-5 mb-5 bg-stone-700 rounded-2xl text-white space-x-4  cursor-pointer'>
            <div className='flex items-center hover:border-b-2 border-pink-500 hover:bg-black rounded-md p-1 justify-between'>Table</div>
            <div className='flex items-center hover:border-b-2 border-pink-500 hover:bg-black rounded-md p-1 justify-between'>Board</div>
            <div className='flex items-center hover:border-b-2 border-pink-500 hover:bg-black rounded-md p-1 justify-between'>Chart</div>
            <div className='flex items-center hover:border-b-2 border-pink-500 hover:bg-black rounded-md p-1 justify-between'>Piechart</div>
        </div>
        {/* drag n drop component */}
        <div>
            <div>New</div>
            <div>Planned</div>
            <div>in Progress</div>
        </div>
    </div>
           
  )
}

export default TaskDashboard