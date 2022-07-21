import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrdersAction } from "../../../actions/adminAction";
import { Button, Chip } from "@mui/material";
import {
  ChevronRightOutlined,
  CurrencyRupeeOutlined,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import CustomSnack from "../../layout/CustomSnack";
import { FETCH_ADMIN_ORDERS_RESET } from "../../../reducers/types/adminTypes";

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "isPaid",
    label: "Paid",
    minWidth: 170,
  },
  {
    id: "totalPrice",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        Order Price (<CurrencyRupeeOutlined />)
      </div>
    ),
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "shippingPrice",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        Shipp. Price (<CurrencyRupeeOutlined />)
      </div>
    ),
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    align: "right",
  },
];

interface Data {
  id: number;
  name: string;
  isPaid: number;
  totalPrice: number;
  shippingPrice: number;
}

function createData(
  id: number,
  name: string,
  isPaid: string,
  totalPrice: number,
  shippingPrice: number
): Data {
  return { id, name, isPaid, totalPrice, shippingPrice };
}

export default function AdminOrder() {
  const { loading, error, orders } = useSelector((state) => state.adminOrders);
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(fetchAdminOrdersAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (orders) {
      setRows(
        orders.map((order) =>
          createData(
            order.id,
            order.name,
            order.isPaid,
            order.totalPrice,
            order.shippingPrice
          )
        )
      );
    }
  }, [orders]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      {error && (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_ADMIN_ORDERS_RESET })}
        />
      )}
      {loading && <CustomSnack type="success" text="Fetching... orders " />}
      <TableContainer sx={{ minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Order
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    onClick={() => history.push(`/admin-order/${row["id"]}`)}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return column.id === "action" ? (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            onClick={() =>
                              history.push(`/admin-order/${row["id"]}`)
                            }
                            endIcon={<ChevronRightOutlined />}
                          >
                            More
                          </Button>
                        </TableCell>
                      ) : column.id === "isPaid" ? (
                        <TableCell key={column.id} align={column.align}>
                          <Chip
                            label={value === 1 ? "Paid" : "UnPaid"}
                            color={value === 0 ? "error" : "success"}
                          />
                        </TableCell>
                      ) : (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
