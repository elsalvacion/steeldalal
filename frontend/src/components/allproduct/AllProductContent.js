import React, { useEffect, useState } from "react";
import "./AllProductContent.css";
import { Button, Typography } from "@material-ui/core";
import { ChevronRightOutlined } from "@material-ui/icons";
import AllProductItem from "./AllProductItem";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AllProductContent = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/product/category",
          {
            category,
          },
          {
            "Content-Type": "application/json",
          }
        );

        setProducts(data.msg);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response.data.msg);
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);
  return (
    <div className="allProductContentContainer">
      <div className="allProductContentHeader">
        <Typography variant="h6" component="h6">
          {category}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ChevronRightOutlined />}
          onClick={() => history.push(`category/${category}`)}
        >
          More
        </Button>
      </div>
      <div className="allProductContent">
        {products &&
          products.map((product) => (
            <AllProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProductContent;
