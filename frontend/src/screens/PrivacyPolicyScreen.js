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
import { privacyPolicy } from "../constants/footerLinkContents";
import { ArrowRight, ExpandMoreOutlined } from "@mui/icons-material";
import CustomHelmet from "../components/layout/CustomHelmet";
const PrivacyPolicyScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Privacy Policy"
        desc="This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the SteelDalal website."
      />
      <br />
      <Typography variant="h6" component="h6">
        Privacy Policy
      </Typography>
      <br />

      {privacyPolicy.map((term, i) => (
        <Accordion defaultExpanded={i === 0 ? true : false} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {term.body.map((item) => (
                <ListItem key={"privacy-policy-" + item.id}>
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

export default PrivacyPolicyScreen;
