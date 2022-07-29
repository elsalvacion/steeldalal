export const coilSpec = {
  thickness: "",
  t_uom: "mm",
  moq: "",
  width: "",
  w_uom: "mm",
  price: "",
  qty: "",
};

export const sheetSpec = {
  thickness: "",
  t_uom: "mm",
  moq: "",
  width: "",
  w_uom: "mm",
  length: "",
  l_uom: "mm",
  price: "",
  qty: "",
};

export const tmtSpec = {
  thickness: "",
  t_uom: "mm",
  moq: "",
  price: "",
  qty: "",
};

export const tmtThickness = [
  "5.0",
  "6.0",
  "8.0",
  "10.0",
  "12.0",
  "16.0",
  "20.0",
  "32.0",
];

export const returnCategorySpec = (category) => {
  const categoryLowerCase = category.toLowerCase();

  if (categoryLowerCase.includes("sheet")) return sheetSpec;
  else if (categoryLowerCase.includes("coil")) return coilSpec;
  else return tmtSpec;
};

export const returnSpecFieldLabel = (column) => {
  switch (column) {
    case "thickness":
      return "Thickness";
    case "t_uom":
      return "T. UoM";
    case "width":
      return "Width";
    case "w_uom":
      return "W. UoM";
    case "length":
      return "Length";
    case "l_uom":
      return "L. UoM";
    case "qty":
      return "Qty (tonnes)";
    case "price":
      return "Price";
    case "moq":
      return "MOQ";
    default:
      return null;
  }
};
