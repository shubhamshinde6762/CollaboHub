import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { CiLinkedin, FaGithub, RiTwitterXFill } from "react-icons/all";

const Footer = () => {
  return (
    <motion.div
      id="about"
      className="from-violet-600 to-purple-500 pt-12  bg-gradient-to-b text-white p-8 w-full flex flex-wrap justify-evenly items-start gap-6"
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
              src="https://media.licdn.com/dms/image/D4D03AQF6isUbW2Up_w/profile-displayphoto-shrink_400_400/0/1708968816185?e=1718236800&v=beta&t=EOprmMjgYlupWMh3DX0OX-GX2l-xsAxnHL2aNHSpP3s"
              className="w-[6vw] min-w-[70px] rounded-full bg-black aspect-square"
            />
            <p className="font-bold font-poppins">Shubham Shinde</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/shubham-shinde-1061a8252/"
              >
                <CiLinkedin className="cursor-pointer" />
              </a>
              <a target="_blank" href="https://github.com/shubhamshinde6762">
                <FaGithub className="cursor-pointer" />
              </a>
              <a>
                <RiTwitterXFill className="cursor-pointer" />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="https://media.licdn.com/dms/image/D4D03AQGYPO70nXy6Bg/profile-displayphoto-shrink_400_400/0/1712917294515?e=1718236800&v=beta&t=cyw2Y9nIVx-81mLgOU-iBwZoUGoXa0v9VU_riFiVeT4"
              className="w-[6vw]  min-w-[70px] rounded-full bg-black aspect-square"
            />
            <p className="font-bold font-poppins">Pawan Kusekar</p>
            <p className="font-bold text-xs font-lato">Full Stack Developer</p>
            <div className="flex justify-center items-center gap-2 text-2xl my-2">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/pawan-kusekar-677050265/"
              >
                <CiLinkedin className="cursor-pointer" />
              </a>
              <a target="_blank" href="https://github.com/pawank505">
                <FaGithub className="cursor-pointer" />
              </a>
              <a>
                <RiTwitterXFill className="cursor-pointer" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
