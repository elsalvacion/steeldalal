import { Home } from "@mui/icons-material";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFoundScreen = () => {
  const history = useHistory();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        py: 3,
      }}
    >
      <Card
        elevation={2}
        sx={{
          width: "450px",
          maxWidth: "80%",
          p: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5">Page Not Found</Typography>
          <br />
          <Typography
            sx={{
              color: "GrayText",
              fontSize: 14,
            }}
          >
            This page does not exist go back to home page.
          </Typography>
          <Button
            onClick={() => history.push("/")}
            sx={{ mt: 2 }}
            variant="contained"
            startIcon={<Home />}
          >
            Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFoundScreen;
