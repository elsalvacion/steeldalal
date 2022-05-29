import { Typography } from "@material-ui/core";
import React from "react";
import "./CategoryScreenContent.css";
import { Link } from "react-router-dom";
const CategoryScreenContent = ({ categories }) => {
  return (
    <div>
      <br />
      <Typography variant="h5" component="h5">
        All Categories
      </Typography>
      <div className="categoryScreenContainer">
        {categories.map((category) => (
          <Link
            to={`/category/${category.title}`}
            key={category.title}
            className="categoryScreenCard"
          >
            <Typography variant="h4" component="h4">
              {category.title}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryScreenContent;
