import { Typography } from "@mui/material";
import React from "react";
import "./CategoryScreenContent.css";
import { Link } from "react-router-dom";
const CategoryScreenContent = ({ categories }) => {
  return (
    <div>
      <br />
      <Typography variant="h6" component="h6">
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
