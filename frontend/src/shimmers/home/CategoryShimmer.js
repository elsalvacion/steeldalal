import React from "react";
import "./CategoryShimmer.css";
import { ShimmerThumbnail } from "react-shimmer-effects";

const CategoryShimmer = () => {
  const categoryShimmers = [1, 2, 3, 4, 5, 6];
  return (
    <div className="categoryShimmerMainContainer">
      <h2>Categories</h2>
      <div className="categoryShimmerItemsContainer">
        {categoryShimmers.map((category) => (
          <div key={category} className="categoryShimmerItem">
            <ShimmerThumbnail
              height={75}
              className="categoryShimmerThumbnail"
              rounded
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryShimmer;
