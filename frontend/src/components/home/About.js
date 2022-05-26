import React from "react";
import "./About.css";
import { Typography } from "@mui/material";
const About = () => {
  return (
    <div className="aboutContainer" id="about">
      <div className="aboutLeft">
        <iframe
          src="https://www.youtube.com/embed/WI5LLBteInI"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="aboutRight">
        <img src="/assets/logos/2.png" alt="about steeldalal" />
        <Typography variant="h4" component="h4">
          About Us
        </Typography>
        <Typography>
          Steeldalal.com is the largest B2B steel company in india with over ten
          years of experience. We have clients from all over the country and the
          service we render is world class.
        </Typography>
        <Typography>
          We take great privilege in introducing ourselves as an emerging
          concern in the field of marketing of Iron & Steel products. We avail
          ourselves this opportunity to approach you for the establishment of
          trade relations with you.
        </Typography>
        <Typography>
          We are dealing with all kinds of steel items like{" "}
          <b>TMT, PLATES, HR SHEET, CR SHEET, GP/ GC SHEET ANGLE/ CHANNEL</b>{" "}
          etc.
        </Typography>
        <Typography>
          We are very keen in enlarging our market and towards this we look
          forward to serve your requirement. Should there be any item be it in
          interest to you, please let me know. We shall be glad to give you our
          lowest quotation upon receipt of your detailed requirements.
        </Typography>
        <Typography>
          We would be thankful if you could offer us an opportunity to serve you
          by indicating your requirements enabling us to send you our quote. We
          look forward to receive your inquiries soon.
        </Typography>
        <Typography>
          Please feel free to revert, if you need any further information from
          our end. Looking forward to establish a fruitful business relationship
          ahead.
        </Typography>
      </div>
    </div>
  );
};

export default About;
