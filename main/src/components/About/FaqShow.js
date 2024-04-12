import React from "react";
import { GiTargetShot } from "react-icons/gi";
const FaqShow = ({question,answer}) => {
  return (
    <div>
      <div className=" bg-purple-500 custom-scrollbar rounded-lg text-white p-4 my-2 select-none font-poppins">
        <div className="flex gap-4 items-center">
          <div className=" text-2xl xs:text-lg   scale-150">
            <GiTargetShot />
          </div>
          <div className=" flex flex-col ">
            <div>
              <p  className="text-lg xs:text-base  font-bold  ">
                {question}
              </p>
            </div> 
            <div className="text-base xs:text-sm">
                <p>{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqShow;


