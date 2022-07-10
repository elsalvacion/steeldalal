import React from "react";
import "./Video.css";
const Video = () => {
  return (
    <div className="videoContainer">
      <iframe
        src="https://www.youtube.com/embed/hYvkqOg7oBo"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;
