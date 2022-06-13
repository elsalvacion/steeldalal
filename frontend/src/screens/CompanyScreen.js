import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { ArrowRight, ExpandMoreOutlined } from "@mui/icons-material";
import { aboutUs, companyDetails } from "../constants/footerLinkContents";
import CustomHelmet from "../components/layout/CustomHelmet";

const CompanyScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Company"
        desc="We take great privilege in introducing ourselves as an emerging concern in the field of marketing of Iron & Steel products. We avail ourselves this opportunity to approach you for the establishment of trade relations with you."
      />
      <br />
      <Typography variant="h6" component="h6">
        Company
      </Typography>
      <br />

      {companyDetails.map((term, i) => (
        <Accordion
          defaultExpanded={i === 0 ? true : false}
          key={"company-" + term.id}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{term.text}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <List
        sx={{
          background: "white",
          mt: 1,
        }}
      >
        {aboutUs.map((item) => (
          <ListItem key={"about-us-" + item.id}>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CompanyScreen;
