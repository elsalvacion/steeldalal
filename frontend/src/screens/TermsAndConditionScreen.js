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
import { termsAndConditions } from "../constants/footerLinkContents";
import { ArrowRight, ExpandMoreOutlined } from "@mui/icons-material";
import CustomHelmet from "../components/layout/CustomHelmet";
const TermsAndConditionScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="Terms & Conditions"
        desc="PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT"
      />
      <br />
      <Typography variant="h6" component="h6">
        Terms & Conditions
      </Typography>
      <br />

      {termsAndConditions.map((term, i) => (
        <Accordion defaultExpanded={i === 0 ? true : false} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {term.body.map((item) => (
                <ListItem key={"term-" + item.id}>
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

export default TermsAndConditionScreen;
