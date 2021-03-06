import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { returnSpecFieldLabel } from "../../constants/specs";

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 7,
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
});

const InvoiceItems = ({ products }) => {
  return (
    <View style={styles.mainContainer}>
      {products.map((product) => (
        <View key={product.id} break>
          {product.title ? (
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>
                {product.title} {product.type} {product.brand} {product.grade}
              </Text>
            </View>
          ) : (
            <Text style={styles.productTitle}>Product Deleted by seller</Text>
          )}
          <View style={styles.divider}></View>
          {product.specs.map((spec) => (
            <View key={"spec-" + spec.id} style={styles.productSpecContainer}>
              {Object.keys(spec).map((key) =>
                returnSpecFieldLabel(key) && spec[key] !== null ? (
                  <View key={"spec-item-" + key} style={styles.productSpecItem}>
                    <Text style={styles.productSpecItemTitle}>
                      {returnSpecFieldLabel(key)}
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
    </View>
  );
};

export default InvoiceItems;
