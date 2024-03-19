import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { FaUserEdit } from "react-icons/fa";
const NavbarProfile = ({ user, setUser,editProfile,setEditProfile }) => {
  const { data } = user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dashboardHandler = () => {
    navigate(`/dashboard/${data.username}`)
  }

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };

  const logOutHandler = async () => {
    localStorage.clear();
    setUser(false);
    navigate("/");
  }
  const handleEdit = (event) =>{
    setEditProfile((state) => !state);
    setIsOpen(false);
  }

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='relative select-none'>
      <div onClick={clickHandler}>
        <img src={data.profilePhoto} className='rounded-full' alt='Profile' />
      </div>

      {isOpen ? (
        <div
          className=' bg-white  shadow-sky-300 hover:scale-105 shadow-2xl py-4 transition-all duration-1000 rounded-3xl px-4 flex flex-col space-y-3 max-w-72 items-center absolute right-1 top-12  z-50'
          ref={dropdownRef}
        >
          <div className='flex hover:scale-105 btn relative hover:border-sky-400 border transition-all duration-1000 shadow-lg rounded-3xl space-x-3 min-w-48 p-4 items-center'>
            <div className='w-20 px-2 py-1 '>
              <img className='shadow-sm shadow-gray-200 rounded-full' src={data.profilePhoto} alt='Profile' />
            </div>
            <div>
              <div className=' text-neutral-950 font-roboto text-sm select-none text-bold w-full '>
                <span className='text-base'>{data.username}</span>
                <br />
                {data.email}
              </div>
            </div>
          </div>
          <div onClick={handleEdit} className='w-full transition-all duration-500 text-sky-400 py-2 text-center rounded-full hover:scale-105 shadow hover:shadow-2xl  '>
            <div className='flex justify-center items-center cursor-pointer'>
              <FaUserEdit className=" mr-2" />
              <p>
                Edit Profile
              </p>
            </div>
          </div>
          <div onClick={dashboardHandler} className='w-full transition-all duration-500 text-sky-400 py-2 text-center rounded-full hover:scale-105 shadow hover:shadow-2xl'>
            <div className='flex justify-center items-center cursor-pointer'>
              <MdOutlineDashboard className=" mr-2" />
              <p>
                Dashboard
              </p>
            </div>
          </div>
          <div onClick={logOutHandler} className='bg-red-500 cursor-pointer  w-full transition-all duration-500 text-white py-2 text-center rounded-full hover:scale-105 shadow shadow-white '>
            LogOut
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavbarProfile;
