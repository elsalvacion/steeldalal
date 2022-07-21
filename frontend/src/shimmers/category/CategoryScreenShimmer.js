import React from "react";
import "./CategoryScreenShimmer.css";
import { ShimmerTitle } from "react-shimmer-effects";
const CategoryScreenShimmer = () => {
  const categories = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="categoryScreenShimmerContainer">
      {categories.map((category) => (
        <div key={category} className="categoryScreenShimmerCard">
          <ShimmerTitle line={2} gap={10} variant="primary" />
        </div>
      ))}
    </div>
  );
};

export default CategoryScreenShimmer;
