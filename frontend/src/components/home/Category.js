import React from "react";
import "./Category.css";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategoryAction } from "../../actions/categoryAction";
// import CategoryShimmer from "../../shimmers/home/CategoryShimmer";
// import CustomAlert from "../layout/CustomAlert";
// import { FETCH_CATEGORY_RESET } from "../../reducers/types/categoryTypes";
import { ArrowForward } from "@mui/icons-material";
const categories = [
  {
    id: 1,
    title: "Steel",
  },
  {
    id: 2,
    title: "Aluminium",
  },
  {
    id: 3,
    title: "Sheets",
  },
  {
    id: 4,
    title: "Pipes",
  },
  {
    id: 5,
    title: "Coils",
  },
  {
    id: 6,
    title: "Bars",
  },
];

const Category = () => {
  // const { loading, error, categories } = useSelector(
  //   (state) => state.fetchCategories
  // );
  // const dispatch = useDispatch();
  const history = useHistory();
  // useEffect(() => {
  //   if (!categories) {
  //     dispatch(fetchCategoryAction(6));
  //   }
  // }, [categories, dispatch]);
  return (
    <div className="categoriesMainContainer">
      <button
        onClick={() => history.push("/category")}
        className="productCarouselTitle"
      >
        Categories
        <ArrowForward />
      </button>
      <div className="categoryItemsContainer">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={`/category/${category.title}`}
            className="categoryItem"
          >
            <Typography variant="h6" component="h6">
              {category.title}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
