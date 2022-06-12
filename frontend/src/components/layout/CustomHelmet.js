import React from "react";
import { Helmet } from "react-helmet";

const CustomHelmet = ({ title, desc }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Helmet>
  );
};

export default CustomHelmet;
