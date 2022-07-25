import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  total: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 35,
  },
  rupee: {
    width: 7,
    height: 7,
    objectFit: "scale-down",
  },
});
const InvoiceTotal = ({ products }) => {
  return (
    <View style={styles.total}>
      <Text>
        Total: <Image style={styles.rupee} src="/assets/rupee.png" />
        {products
          .map((product) =>
            product.specs.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
          )
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(2)}
      </Text>
    </View>
  );
};

export default InvoiceTotal;
