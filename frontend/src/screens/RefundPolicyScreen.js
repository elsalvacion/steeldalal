import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import CustomHelmet from "../components/layout/CustomHelmet";
import { retunAndRefundPolicy } from "../constants/footerLinkContents";
const RefundPolicyScreen = () => {
  return (
    <Container>
      <CustomHelmet title="Refund Policy" desc="Coming Soon" />
      <br />
      <Typography variant="h6" component="h6">
        Return & Refund Policy
      </Typography>
      <br />
      <Typography>Last updated: June 15, 2022</Typography>
      <Typography>Thank you for shopping at SteelDalal.com</Typography>
      <Typography>
        If, for any reason, You are not completely satisfied with a purchase We
        invite You to review our policy on refunds and returns. This Return and
        Refund Policy has been created with the help of the [Return and Refund
        Policy
        Generator](https://www.privacypolicies.com/return-refund-policy-generator/).
      </Typography>
      <Typography>
        The following terms are applicable for any products that You purchased
        with Us.
      </Typography>
      <br />

      {retunAndRefundPolicy.map((term, i) => (
        <Accordion
          defaultExpanded={i === 0 ? true : false}
          key={`refund` + term.id}
        >
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            <Typography>{term.header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {term.body.map((item) => (
              <div
                style={{
                  width: "100%",
                }}
                key={`refund-item-` + item.id}
              >
                {item.text}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default RefundPolicyScreen;
