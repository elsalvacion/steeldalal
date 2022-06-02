import React from "react";
import "./About.css";
import { Typography } from "@mui/material";
// import { PauseCircleOutline, PlayCircleOutline } from "@mui/icons-material";
const About = () => {
  // const [play, setPlay] = useState(false);
  return (
    <div className="aboutContainer" id="about">
      <div className="aboutLeft">
        <iframe
          src="https://www.youtube.com/embed/WI5LLBteInI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay="1"
          muted="1"
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
        <div className="aboutAction">
          {/* <Typography>For info: </Typography> */}
          {/* <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={play ? <PauseCircleOutline /> : <PlayCircleOutline />}
          >
            Video
          </Button> */}
          <Typography>For info: watch video or contact us. </Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
