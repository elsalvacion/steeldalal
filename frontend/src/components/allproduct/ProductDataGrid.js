import React from "react";
import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaRupeeSign } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";
import { Delete, Edit } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction } from "../../actions/productAction";

const useStyles = makeStyles({
  price: {
    display: "flex",
    alignItems: "center",
  },
  action: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    textTransform: "capitalize",
  },
});
const ProductDataGrid = ({ products }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { loading } = useSelector((state) => state.deleteProduct);
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Action</TableCell>
          <TableCell align="left">Title</TableCell>
          <TableCell align="left">Category</TableCell>
          <TableCell align="left">Type</TableCell>
          <TableCell align="left">Quantity</TableCell>
          <TableCell align="left">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className={classes.action} align="left">
              <IconButton
                onClick={() => history.push(`/edit-product/${product.id}`)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                disabled={loading}
                onClick={() => dispatch(deleteProductAction(product.id))}
              >
                <Delete />
              </IconButton>
            </TableCell>
            <TableCell align="left" className={classes.title}>
              {product.title}
            </TableCell>
            <TableCell align="left">{product.category}</TableCell>
            <TableCell align="left">{product.type}</TableCell>
            <TableCell align="left">{product.qty}</TableCell>
            <TableCell align="left" className={classes.price}>
              <FaRupeeSign fontSize={16} />
              {product.price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default ProductDataGrid;
