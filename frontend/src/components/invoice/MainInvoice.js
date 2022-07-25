import React from "react";
import { Page, Document, Image, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItems from "./InvoiceItems";
import InvoiceTotal from "./InvoiceTotal";

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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
    color: "#1565c0",
    marginTop: 24,
  },
});

const MainInvoice = ({ invoice }) => (
  <Document>
    <Page wrap size="A4" style={styles.page}>
      <Image style={styles.logo} src="/assets/logos/2.png" />

      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <Text style={styles.title}>Products</Text>
      {invoice.products.length <= 2 ? (
        <>
          <InvoiceItems products={invoice.products} />
          <InvoiceTotal products={invoice.products} />
        </>
      ) : (
        <>
          <InvoiceItems products={invoice.products.slice(0, 2)} />
        </>
      )}
    </Page>
    {invoice.products.length > 2 && (
      <Page wrap size="A4" style={styles.page}>
        {invoice.products.length > 2 && invoice.products.length <= 5 ? (
          <>
            <InvoiceItems
              products={invoice.products.slice(2, invoice.products.length)}
            />
            <InvoiceTotal
              products={invoice.products.slice(2, invoice.products.length)}
            />
          </>
        ) : (
          <>
            <InvoiceItems products={invoice.products.slice(2, 6)} />
            <InvoiceTotal products={invoice.products.slice(2, 6)} />
          </>
        )}
      </Page>
    )}
    {invoice.products.length > 5 && (
      <Page wrap size="A4" style={styles.page}>
        <InvoiceItems products={invoice.products.slice(5, 10)} />
        <InvoiceTotal products={invoice.products.slice(5, 10)} />
      </Page>
    )}
  </Document>
);

export default MainInvoice;
