import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className=" bg-indigo-500 text-white p-8    w-full flex flex-wrap justify-evenly items-start gap-6">
      <div className="flex flex-col justify-center items-start max-w-[400px] w-full">
        <p className="font-bold font-poppins ">A LITTLE ABOUT COLLABOHUB</p>
        <p>
          Born from a passion for efficiency and collaboration, our platform
          simplifies project management, fostering seamless teamwork and
          streamlined workflows.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="font-bold font-poppins">About Us</p>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="vcdv"
              className="w-[6vw] h-[6vw] rounded-full bg-black aspect-auto"
            />
            <p className="font-bold font-poppins">Shubham Shinde</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <CiLinkedin className="cursor-pointer transition-all duration-200 hover:scale-110 " />
              <FaGithub className="cursor-pointer transition-all duration-200 hover:scale-110 " />
              <RiTwitterXFill className="cursor-pointer transition-all duration-200 hover:scale-110 " />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="vcdv"
              className="w-[6vw] h-[6vw] rounded-full bg-black aspect-auto"
            />
            <p className="font-bold font-poppins">Pawan Kusekar</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <CiLinkedin className="cursor-pointer transition-all duration-200 hover:scale-110 " />
              <FaGithub className="cursor-pointer transition-all duration-200 hover:scale-110 " />
              <RiTwitterXFill className="cursor-pointer transition-all duration-200 hover:scale-110 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
