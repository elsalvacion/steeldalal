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
import CustomHelmet from "../components/layout/CustomHelmet";
const AcceptancePolicyScreen = () => {
  const pricingPolicy = [
    {
      id: 1,
      header: "Acceptance Policy Coming",
      body: [
        {
          id: 1,
          text: "Coming soon...",
        },
      ],
    },
  ];
  return (
    <Container>
      <CustomHelmet title="Acceptance Policy" desc="Coming Soon" />
      <br />
      <Typography variant="h6" component="h6">
        Acceptance Policy
      </Typography>
      <br />

      {pricingPolicy.map((term, i) => (
        <Accordion defaultExpanded={i === 0 ? true : false} key={term.id}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {term.body.map((item) => (
                <ListItem key={"acceptance-policy-" + item.id}>
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

export default AcceptancePolicyScreen;
