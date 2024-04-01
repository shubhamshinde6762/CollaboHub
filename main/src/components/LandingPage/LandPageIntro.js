import React from "react";
import { FaInfinity } from "react-icons/fa6";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const LandPageIntro = () => {
  return (
    <div className="flex select-none relative overflow-x-hidden flex-wrap-reverse w-full min-h-screen items-center justify-center">
      <motion.img
        src={
          "https://res.cloudinary.com/dd6sontgf/image/upload/v1711956456/blue-border-abstract-gradient-background_ve6zwh.jpg"
        }
        className="absolute top-0 left-0 w-screen h-screen -z-10 rotate-180"
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="min-w-[250px] max-w-[700px] py-[4vh] rounded-3xl max-h-full items-center justify-center">
        <motion.img
          className="aspect-auto bg-slate-700 bg-opacity-20 mx-4 rounded-3xl bg-blend-soft-light w-full"
          src="https://res.cloudinary.com/dd6sontgf/image/upload/f_auto,q_auto/nlmfo7ufm5b8ftqsmbqt"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <motion.div
        className="bg-gradient-to-t from-purple-600 to-purple-500 min-w-[250px] py-[12vh] flex flex-col justify-center items-center px-[4vw] w-[50%] h-screen flex-grow"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="font-poppins xs:text-3xl text-[3.5rem] font-bold whitespace-wrap text-left w-full text-white select-none">
          One Platform,
          <span className="flex text-[3.00rem] xs:text-2xl font-poppins flex-wrap items-center">
            <motion.span
              className="mr-4 font-extrabold xs:text-5xl text-8xl text-amber-200"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <FaInfinity />
            </motion.span>
            <ReactTyped
              strings={[
                "Possibilities",
                "Potentialities",
                "Scopes",
                "Opportunities",
              ]}
              showCursor={false}
              typeSpeed={200}
              backSpeed={50}
              loop
            />
          </span>
        </p>
        <motion.p
          className="font-poppins text-2xl xs:text-lg text-pretty text-white font-bold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Your seamless project management solution. Say goodbye to scattered
          tasks and endless emails. Unite your team, streamline workflows, and
          succeed effortlessly.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandPageIntro;
