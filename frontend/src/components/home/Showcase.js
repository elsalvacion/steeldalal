import React from "react";
import "./Showcase.css";
const Showcase = () => {
  return (
    <div className="showcaseContainer">
      <div className="showcaseContent">
        <h2>Steeldalal</h2>
        <p>
          Hey welcome to steeldalal.com we are now on both web and mobile.
          <br /> Enjoy your Biz dalala.
        </p>
        <a href="https://play.google.com/store/apps/details?id=steel.dalal.com">
          <img src="assets/google-play.png" alt="steeldalal.com mobile app" />{" "}
          <h4>Google Play</h4>
        </a>
      </div>
      <a
        href="https://play.google.com/store/apps/details?id=steel.dalal.com"
        className="showcaseImage"
      >
        <img src="assets/mobile_app.png" alt="steeldalal.com mobile app" />
      </a>
    </div>
  );
};

export default Showcase;
