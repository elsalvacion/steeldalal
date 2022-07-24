import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
    color: "#1565c0",
  },
  productContainer: {
    flexDirection: "column",
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    objectFit: "scale-down",
  },
  productTitle: {
    fontSize: 12,
  },
  productSpecContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productSpecItem: {
    marginVertical: 7,
    marginHorizontal: 10,
  },
  productSpecItemTitle: {
    marginRight: 7,
    fontSize: 11,
    fontWeight: "bold",
  },
  productSpecItemValue: {
    fontSize: 10,
    fontWeight: "light",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#1565c0",
    marginBottom: 5,
  },
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

const returnSpecTitle = (column) => {
  switch (column) {
    case "thickness":
      return "Thickness";
    case "t_uom":
      return "T. UoM";
    case "width":
      return "Width";
    case "w_uom":
      return "W. UoM";
    case "length":
      return "Length";
    case "l_uom":
      return "L. UoM";
    case "qty":
      return "Qty (tonnes)";
    case "price":
      return "Price";
    default:
      return null;
  }
};
const InvoiceItems = ({ products }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Products</Text>
      {products.map((product) => (
        <View key={product.id} break>
          <View style={styles.productHeader}>
            <Image style={styles.productImage} src={product.image} />
            <Text style={styles.productTitle}>{product.title}</Text>
          </View>
          <View style={styles.divider}></View>
          {product.specs.map((spec) => (
            <View key={"spec-" + spec.id} style={styles.productSpecContainer}>
              {Object.keys(spec).map((key) =>
                returnSpecTitle(key) && spec[key] !== 0 && spec[key] !== "" ? (
                  <View key={"spec-item-" + key} style={styles.productSpecItem}>
                    <Text style={styles.productSpecItemTitle}>
                      {returnSpecTitle(key)}
                    </Text>
                    <Text style={styles.productSpecItemValue}>
                      {key === "price" && (
                        <Image style={styles.rupee} src="/assets/rupee.png" />
                      )}
                      {!isNaN(spec[key]) ? spec[key].toFixed(2) : spec[key]}
                    </Text>
                  </View>
                ) : null
              )}
            </View>
          ))}
        </View>
      ))}

      <View style={styles.total}>
        <Text>
          Total: <Image style={styles.rupee} src="/assets/rupee.png" />
          {products
            .map((product) =>
              product.specs.reduce(
                (acc, curr) => acc + curr.price * curr.qty,
                0
              )
            )
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceItems;
