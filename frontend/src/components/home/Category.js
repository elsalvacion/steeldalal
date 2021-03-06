import React from "react";
import "./Category.css";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import { ArrowForward } from "@mui/icons-material";
import { categories } from "../../constants/category";

const Category = () => {
  const history = useHistory();

  return (
    <Container>
      <div className="categoriesMainContainer">
        <button
          onClick={() => history.push("/category")}
          className="productCarouselTitle"
        >
          Categories
          <ArrowForward fontSize="small" />
        </button>
        <div className="categoryItemsContainer">
          {categories.map((category, i) =>
            i <= 5 ? (
              <Link
                key={category.title}
                to={`/category/${category.title}`}
                className="categoryItem"
              >
                <Typography variant="h6" component="h6">
                  {category.title}
                </Typography>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </Container>
  );
};

export default Category;
