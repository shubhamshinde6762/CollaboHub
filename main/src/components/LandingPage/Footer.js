import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import { motion } from "framer-motion";
// import { CiLinkedin, FaGithub, RiTwitterXFill } from "react-icons/all";

const Footer = () => {
  return (
    <motion.div
      className="from-indigo-500 to-purple-600 bg-gradient-to-b text-white p-8 w-full flex flex-wrap justify-evenly items-start gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col justify-center items-start max-w-[400px] w-full">
        <p className="font-bold font-poppins ">A LITTLE ABOUT COLLABOHUB</p>
        <p>
          Born from a passion for efficiency and collaboration, our platform
          simplifies project management, fostering seamless teamwork and
          streamlined workflows.
        </p>
      </div>
      <motion.div
        className="flex flex-col justify-center items-center gap-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="font-bold font-poppins">About Us</p>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="vcdv"
              className="w-[6vw] h-[6vw] rounded-full bg-black aspect-auto"
            />
            <p className="font-bold font-poppins">Shubham Shinde</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <CiLinkedin className="cursor-pointer" />
              <FaGithub className="cursor-pointer" />
              <RiTwitterXFill className="cursor-pointer" />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="vcdv"
              className="w-[6vw] h-[6vw] rounded-full bg-black aspect-auto"
            />
            <p className="font-bold font-poppins">Pawan Kusekar</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <CiLinkedin className="cursor-pointer" />
              <FaGithub className="cursor-pointer" />
              <RiTwitterXFill className="cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
  