import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItems from "./InvoiceItems";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const MainInvoice = ({ invoice }) => (
  <Document>
    <Page wrap size="A4" style={styles.page}>
      <Image style={styles.logo} src="/assets/logos/2.png" />

      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <InvoiceItems products={invoice.products} />
    </Page>
  </Document>
);

export default MainInvoice;
