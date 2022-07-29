import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect } from "react";
import "./ProfileDetailRight.css";
import { Add, ChevronRightOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchYourProductsAction } from "../../actions/productAction";
import ProfileRightShimmer from "../../shimmers/profile/ProfileRightShimmer";

const ProfileDetailRight = ({ editUserInfo, userInfo }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.yourProduct);
  useEffect(() => {
    dispatch(fetchYourProductsAction(editUserInfo ? 7 : 4));
  }, [dispatch, editUserInfo]);
  return (
    <div>
      <div className="ProfileDetailRightHeader">
        <Typography variant="h6" component="h6">
          Recent Products
        </Typography>
        <IconButton
          onClick={() =>
            history.push(
              userInfo && userInfo.yourBiz && userInfo.yourBiz.isVerified === 0
                ? "/biz-notverified"
                : userInfo &&
                  userInfo.yourBiz &&
                  userInfo.yourBiz.isVerified === 1
                ? "/create-product"
                : "/create-biz"
            )
          }
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
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 14,
                    fontWeight: "lighter",
                  }}
                >
                  {product.title}
                </ListItemText>
                {product.isBlocked === 1 && (
                  <ListItemText
                    style={{
                      textTransform: "capitalize",
                      fontSize: 13,
                      fontWeight: "lighter",
                      color: "red",
                    }}
                  >
                    Blocked
                  </ListItemText>
                )}
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>
                No recent products. <br /> Click on
                <span style={{ margin: "0px 15px", fontSize: 22 }}>
                  <b>+</b>
                </span>
                button to create a new product.
              </ListItemText>
            </ListItem>
          )
        ) : null}
      </List>

      <br />
      {products && products.length > 0 && (
        <Button
          endIcon={<ChevronRightOutlined />}
          variant="contained"
          color="primary"
          onClick={() => history.push(`/manage-product`)}
        >
          Manage Products
        </Button>
      )}
    </div>
  );
};

export default ProfileDetailRight;
