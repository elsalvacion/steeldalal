import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "./ProfileDetailRight.css";
import { Add, ChevronRightOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchYourProductsAction } from "../../actions/productAction";
import ProfileRightShimmer from "../../shimmers/profile/ProfileRightShimmer";

const ProfileDetailRight = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.yourProduct);
  useEffect(() => {
    dispatch(fetchYourProductsAction(3));
  }, [dispatch]);
  return (
    <div>
      <div className="ProfileDetailRightHeader">
        <Typography variant="h6" component="h6">
          Recent Products
        </Typography>
        <IconButton
          onClick={() => history.push("/create-product")}
          color="primary"
        >
          <Add />
        </IconButton>
      </div>
      <br />
      <List>
        {loading ? (
          <ProfileRightShimmer />
        ) : products ? (
          products.length > 0 ? (
            products.map((product) => (
              <ListItem
                key={product.id}
                style={{
                  margin: "5px 0",
                }}
                button
                onClick={() => history.push(`/product/${product.id}`)}
              >
                <ListItemIcon>
                  <img
                    src={product.image}
                    alt={`steeldalal.com ${product.title}`}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{
                    textTransform: "capitalize",
                    fontSize: 14,
                    fontWeight: "lighter",
                  }}
                >
                  {product.title}
                </ListItemText>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>No recent products</ListItemText>
            </ListItem>
          )
        ) : null}
      </List>

      <br />
      <Button
        endIcon={<ChevronRightOutlined />}
        variant="contained"
        color="primary"
      >
        Manage Products
      </Button>
    </div>
  );
};

export default ProfileDetailRight;
