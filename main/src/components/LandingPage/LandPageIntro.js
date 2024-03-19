import React from "react";
import { FaInfinity } from "react-icons/fa6";
import { ReactTyped } from "react-typed";

const LandPageIntro = () => {
  return (
    <div className="flex select-noneflex-wrap bg-white w-full h-screen items-center justify-center">
      <div className="min-w-[250px] w-[50%]  py-[12vh]  rounded-3xl max-h-full items-center justify-center">
        <img
          className=" aspect-auto w-full"
          src="https://res.cloudinary.com/dd6sontgf/image/upload/f_auto,q_auto/nlmfo7ufm5b8ftqsmbqt"
        />
      </div>
      <div className=" bg-purple-400 min-w-[250px]  py-[12vh] flex flex-col justify-center items-center px-[4vw]  w-[50%]   h-full flex-grow">
        <p className="font-poppins text-[3.5rem] font-bold whitespace-wrap text-left w-full text-white select-none ">
          One Platform,
          <span className="flex text-[3.00rem] font-poppins flex-wrap items-center">
            <FaInfinity className="mr-4 font-extrabold text-8xl text-amber-200" />
            <ReactTyped
              strings={[
                "Possibilities",
                "Potentialities",
                "Scopes",
                "Opportunities",
              ]}
              showCursor={true}
              typeSpeed={200}
              backSpeed={50}
              loop
            />
          </span>
        </p>
        <p className="  font-poppins text-2xl text-pretty text-white font-bold">
          Your seamless project management solution. Say goodbye to scattered
          tasks and endless emails. Unite your team, streamline workflows, and
          succeed effortlessly.
        </p>
      </div>
    </div>
  );
};

export default LandPageIntro;
