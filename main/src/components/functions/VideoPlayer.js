import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

const VideoPlayer = ({ file }) => {
  console.log("videoUrl", file)
  return (
    <div className="w-full h-fit">
      <ReactPlayer
        pip="true"
        width="100%"
        height={"100%"}
        playing={false}
        url={file}
        controls="true"
        className="bg-black rounded-lg w-[500px] aspect-auto"
        alt="Uploaded Media"
        stopOnUnmount={false}
        light="true"
      />
    </div>
  );
};

export default VideoPlayer;
