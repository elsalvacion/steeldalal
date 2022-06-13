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
import { faq } from "../constants/footerLinkContents";
import { ArrowRight, ExpandMoreOutlined } from "@mui/icons-material";
import CustomHelmet from "../components/layout/CustomHelmet";
const FaqScreen = () => {
  return (
    <Container>
      <CustomHelmet
        title="FAQ"
        desc="In This Page You Can Easily Get Answers To Your Question Which Were Frequently Asked By Our Visitors All Common Queries You Can Find Easily Here:"
      />
      <br />
      <Typography variant="h6" component="h6">
        Frequently Asked Questions
      </Typography>
      <br />

      {faq.map((term, i) => (
        <Accordion defaultExpanded={i === 0 ? true : false} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {term.body.map((item) => (
                <ListItem key={"faq-" + item.id}>
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

export default FaqScreen;
