import { Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";

const BizNotVerifiedScreen = () => {
  return (
    <Container sx={{ my: 3 }}>
      <Card>
        <CardContent>
          <Typography sx={{ mb: 2 }} variant="h6">
            Business Credentails in verification
          </Typography>

          <Typography sx={{ fontSize: 12 }}>
            Our team will be in touch with you soon to verify the business
            credentials you provided. You can start placing your products on
            sale as soon as our verification process is complete
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BizNotVerifiedScreen;
