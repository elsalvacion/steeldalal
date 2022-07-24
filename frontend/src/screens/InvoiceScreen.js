import { Container } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { useSelector } from "react-redux";
import MainInvoice from "../components/invoice/MainInvoice";

const InvoiceScreen = () => {
  const { order } = useSelector((state) => state.fetchOrder);
  return (
    <Container sx={{ py: 2, display: "flex", justifyContent: "center" }}>
      <Container sx={{ py: 2, display: "flex", justifyContent: "center" }}>
        <PDFViewer width={800} height={500}>
          <MainInvoice invoice={order} />
        </PDFViewer>
      </Container>
    </Container>
  );
};

export default InvoiceScreen;
