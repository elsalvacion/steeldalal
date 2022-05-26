import React from "react";
import { Typography } from "@mui/material";
import "./HowItWorks.css";
import styled from "@emotion/styled";
import Zoom from "react-reveal/Zoom";

const Offer = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: ${(props) => (props.i % 2 === 0 ? "row-reverse" : "row")};
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
const HowItWorks = () => {
  const offers = [
    {
      id: 1,
      title: "Easy Registration & Login",
      img: "/assets/weo_login.png",
      desc: `
            On our platform you can easily register and start selling or buy the best iron, steel, alumium and all type of metal products out there. We make the hard things easy, no long forms just the easy and simple information.
            `,
      moreDesc: `
            Our website is accessible in all forms of devices. Mobiles, Tablets, Laptops and Desktops, you do not have anything to worry about steeldalal.com got you covered.
            `,
    },
    {
      id: 2,
      title: "Procure",
      img: "/assets/weo_procure.png",
      desc: `
            With the number one B2B steel company you can acquire your desired metals from the comfort of you couch. With just few clicks you can close the best metal deals.
            `,
      moreDesc: `
            It is only on steeldalal where you get to chat with the seller. We always believe in keeping it simple, nothing complex.
            `,
    },
    {
      id: 3,
      title: "Make Payment",
      img: "/assets/weo_pay.png",
      desc: `
            We integrated the most popular and secure online payment gateways out there. This way you do not have to worry about if your money is save because we got you covered.
            `,
      moreDesc: `
            All our payment systems are convient, so that even if you are foreign you could have your order placed and delivered. We are fast reliable and secure. 
            `,
    },
    {
      id: 4,
      title: "Get On Time Delivery",
      img: "/assets/weo_shipping.png",
      desc: `
            Once your deal is sealed and your payment is confirmed. You can expected your products on the shorts delivery dates depending on your location. We believe in reliability and making our customers happy.
            `,
      moreDesc: `
            Our contracted couriers are the best in what they do. You can sleep and relax if your product is turned to them, their resilience, courage and professionalism will always be appreciated. 
            `,
    },
  ];
  return (
    <div className="weoContainer" id="how-it-work">
      <Typography component="h3" variant="h3">
        How It Work
      </Typography>
      {offers.map((offer, i) => (
        <Offer i={i} key={offer.id}>
          <div className="offerLeft">
            <Zoom>
              <img
                src={offer.img}
                className="offerLeftImg"
                alt="Steeldalal what we offer"
              />
            </Zoom>
          </div>
          <div className="offerRight">
            <Typography component="h5" variant="h5">
              {offer.title}
            </Typography>
            <Typography component="p" className="offerRightDesc1" variant="p">
              {offer.desc}
            </Typography>
            <Typography component="p" variant="p">
              {offer.moreDesc}
            </Typography>
          </div>
        </Offer>
      ))}
    </div>
  );
};

export default HowItWorks;
