import { Container } from "@mui/material";
import React from "react";
import AdminOrders from "./order/AdminOrders";
import "./RightPanel.css";
import AdminUsers from "./users/AdminUsers";
import AdminProducts from "./products/AdminProducts";

const RightPanel = ({ current }) => {
  return (
    <Container sx={{ py: 2 }}>
      {current === "admin-orders" && <AdminOrders />}
      {current === "admin-products" && <AdminProducts />}
      {current === "admin-users" && <AdminUsers />}
    </Container>
  );
};

export default RightPanel;
