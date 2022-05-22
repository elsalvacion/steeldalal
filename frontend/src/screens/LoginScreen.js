import React from "react";
import { Container } from "@mui/material";
import LoginCard from "../components/login/LoginCard";
import LoginContent from "../components/login/LoginContent";
import { useLocation } from "react-router-dom";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoginScreen = () => {
  let query = useQuery();

  const redirect = query.get("redirect")
    ? `/${query.get("redirect")}`
    : "/profile";
  return (
    <div
      style={{
        padding: "50px 0",
        width: "100%",
      }}
    >
      <Container>
        <LoginCard>
          <LoginContent redirect={redirect} />
        </LoginCard>
      </Container>
    </div>
  );
};

export default LoginScreen;
