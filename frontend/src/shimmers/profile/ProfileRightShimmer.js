import { List, ListItem } from "@material-ui/core";
import React from "react";
import { ShimmerTitle } from "react-shimmer-effects";

const ProfileRightShimmer = () => {
  const products = [1, 2, 3, 4];
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product}>
          <ShimmerTitle line={1} gap={10} variant="primary" />
        </ListItem>
      ))}
    </List>
  );
};

export default ProfileRightShimmer;
