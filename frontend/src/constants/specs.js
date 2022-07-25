export const coilSpec = {
  thickness: null,
  t_uom: "m",
  width: null,
  w_uom: "m",
  price: null,
  qty: null,
};

export const sheetSpec = {
  thickness: null,
  t_uom: "m",
  width: null,
  w_uom: "m",
  length: 0,
  l_uom: "m",
  price: null,
  qty: null,
};

export const tmtSpec = {
  thickness: null,
  t_uom: "m",
  price: null,
  qty: null,
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
    default:
      return null;
  }
};
