import React from "react";
import "./Partners.css";
import { Card, CardContent, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Container } from "@mui/system";
const Partners = () => {
  const partnersList = [
    {
      id: 1,
      title: "Mumbia Metro",
      image: "/partners/Mumbai-Metro.png",
    },
    {
      id: 2,
      title: "Kochi Metro",
      image: "/partners/Kochi-Metro.png",
    },
    {
      id: 3,
      title: "Chennai Metro",
      image: "/partners/Chennai-Metro.png",
    },
    {
      id: 5,
      title: "NHAI Projects",
      image: "/partners/NHAI.png",
    },
    {
      id: 6,
      title: "Delhi Meerut RRTS",
      image: "/partners/ncrtc.png",
    },
  ];

  const customersList = [
    {
      id: 1,
      title: "JCB",
      image: "/partners/jcb.png",
    },
    {
      id: 2,
      title: "JSW",
      image: "/partners/jsw.png",
    },
    {
      id: 3,
      title: "Godrej",
      image: "/partners/Godrej.png",
    },
    {
      id: 5,
      title: "Havells",
      image: "/partners/Havells-Logo.wine_.png",
    },
    {
      id: 6,
      title: "Vedanta",
      image: "/partners/vedanta.png",
    },
    {
      id: 7,
      title: "Jaquar",
      image: "/partners/Jaquar.png",
    },
    {
      id: 8,
      title: "Jindal",
      image: "/partners/JSPL.png",
    },
  ];
  const partnerItems = partnersList.map((partner) => (
    <Card
      elevation={2}
      sx={{
        width: "75%",
        height: "100%",
        margin: "0 auto",
        "@media(max-width: 500px": {
          width: "95%",
        },
      }}
      key={`partner-item-${partner.id}`}
    >
      <CardContent>
        <img
          src={partner.image}
          alt="steeldalal.com partners"
          className="partnerItemImage"
        />
        <Typography noWrap sx={{ mt: 2, textAlign: "center" }}>
          {partner.title}
        </Typography>
      </CardContent>
    </Card>
  ));

  const customersItems = customersList.map((customer) => (
    <Card
      elevation={2}
      sx={{
        width: "70%",
        height: "100%",
        margin: "0 auto",
        "@media(max-width: 500px": {
          width: "95%",
        },
      }}
      key={`customer-item-${customer.id}`}
    >
      <CardContent>
        <img
          src={customer.image}
          alt="steeldalal.com customers"
          className="partnerItemImage"
        />
      </CardContent>
    </Card>
  ));
  return (
    <Card id="partners">
      <CardContent>
        <Typography variant="h4" sx={{ mt: 2, mb: 1, textAlign: "center" }}>
          Key Partners & Achievements
        </Typography>
        <div className="partnersDivider"></div>
        <Typography
          variant="h6"
          sx={{ mt: 3, mb: 2, textAlign: "center", color: "#1565c0" }}
        >
          Key Projects
        </Typography>
        <Typography sx={{ mt: 3, mb: 4, textAlign: "center" }}>
          We have delivered to multiple landmark projects across the nation
        </Typography>
        <Container sx={{ mb: 5 }}>
          <AliceCarousel
            mouseTracking
            items={partnerItems}
            controlsStrategy="responsive"
            disableDotsControls={true}
            autoPlay={true}
            autoPlayDirection={"ltr"}
            infinite={true}
            autoPlayInterval={1500}
            animationType={"fadeout"}
            renderPrevButton={() => {
              return (
                <button className="carouselProductCustomPrevBtn">
                  <ChevronLeft fontSize="large" />
                </button>
              );
            }}
            renderNextButton={() => {
              return (
                <button className="carouselProductCustomNextBtn">
                  <ChevronRight fontSize="large" />
                </button>
              );
            }}
            responsive={{
              0: {
                items: 1,
              },
              360: {
                items: 2,
              },
              600: {
                items: 3,
              },
              900: {
                items: 3,
              },
              1750: {
                items: 4,
              },
            }}
          />
        </Container>

        <Typography
          variant="h6"
          sx={{ mt: 4, mb: 2, textAlign: "center", color: "#1565c0" }}
        >
          Key Partners & Customers
        </Typography>
        <Typography sx={{ mt: 3, mb: 4, textAlign: "center" }}>
          Digitally connecting key customers and suppliers - On-Time, Every
          Time!
        </Typography>
        <Container sx={{ mb: 5 }}>
          <AliceCarousel
            mouseTracking
            items={customersItems}
            controlsStrategy="responsive"
            disableDotsControls={true}
            autoPlay={true}
            autoPlayDirection={"ltr"}
            infinite={true}
            autoPlayInterval={1500}
            animationType={"fadeout"}
            renderPrevButton={() => {
              return (
                <button className="carouselProductCustomPrevBtn">
                  <ChevronLeft fontSize="large" />
                </button>
              );
            }}
            renderNextButton={() => {
              return (
                <button className="carouselProductCustomNextBtn">
                  <ChevronRight fontSize="large" />
                </button>
              );
            }}
            responsive={{
              0: {
                items: 1,
              },
              360: {
                items: 2,
              },
              600: {
                items: 3,
              },
              900: {
                items: 3,
              },
              1200: {
                items: 4,
              },
            }}
          />
        </Container>
      </CardContent>
    </Card>
  );
};

export default Partners;
