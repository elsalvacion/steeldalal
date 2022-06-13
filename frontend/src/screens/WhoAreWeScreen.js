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
import { whoAreWe } from "../constants/footerLinkContents";
import CustomHelmet from "../components/layout/CustomHelmet";

const WhoAreWeScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Who Are We"
        desc="Though STEELDALAL.COM the members can purchase and sell their products in bigger/ unreachable markets at better rates/ margins."
      />
      <br />
      <Typography variant="h6" component="h6">
        Who Are We
      </Typography>
      <br />

      {whoAreWe.map((term, i) => (
        <Accordion defaultExpanded={i === 0 ? true : false} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {term.body.map((item) => (
                <ListItem key={"who-are-we-" + item.id}>
                  <ListItemIcon>
                    <ArrowRight />
                  </ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default WhoAreWeScreen;
