import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = ({ isDisplay }) => {
  return (
    <>
      {isDisplay && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <HashLoader color="#ffffff" size={60} />
        </div>
      )}
    </>
  );
};

export default Loader;
