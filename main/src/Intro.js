import React, { useEffect, useState } from "react";

const Intro = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animationFinished2, setAnimationFinished2] = useState(true);
  const [animationFinished3, setAnimationFinished3] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setAnimationFinished2(false);
    }, 100);

    const timeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 1500);

    const timeout3 = setTimeout(() => {
      setAnimationFinished3(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen h-screen bg-gradient-to-br from-purple-300 to-violet-400 transition-opacity duration-1000 flex justify-center items-center ${
        animationFinished ? "opacity-0" : " opacity-100"
      }
        ${animationFinished3 ? "" : "hidden"}`}
    >
      <h1 className=" max-w-[70%] flex justify-center items-center  text-center">
        <img
          src="https://res.cloudinary.com/dd6sontgf/image/upload/f_auto,q_auto/ljhw5r2nlhsz6kpaczma"
          className={` w-[66.39%] scale-0 duration-1000 transition-all ${
            animationFinished2
              ? "scale-[5] rotate-90 -translate-x-[70vw]"
              : "scale-[1] translate-x-[0vw] transition-all duration-500"
          } ${
            animationFinished
              ? " opacity-0 -translate-y-[50vh]"
              : " translate-y-[0vh] scale-100 opacity-100"
          }`}
        ></img>
        <img
          src="https://res.cloudinary.com/dd6sontgf/image/upload/f_auto,q_auto/seebfia1hcoqhlwkenca"
          className={` w-[33.61%] scale-0 duration-1000 transition-all ${
            animationFinished2
              ? "scale-[5] -rotate-90 translate-x-[70vw]"
              : "scale-[1] translate-x-[0vw] transition-all duration-500"
          } ${
            animationFinished
              ? " opacity-0 translate-y-[50vh]"
              : " translate-y-[0vh] scale-100  opacity-100"
          }`}
        ></img>
      </h1>
    </div>
  );
};

export default Intro;
