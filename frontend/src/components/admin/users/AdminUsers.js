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
import { fetchAdminUsersAction } from "../../../actions/adminAction";
import { Button, Chip } from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import CustomSnack from "../../layout/CustomSnack";
import { FETCH_ADMIN_USERS_RESET } from "../../../reducers/types/adminTypes";
import CustomHelmet from "../../layout/CustomHelmet";

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  {
    id: "isSeller",
    label: "Seller",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    align: "right",
  },
];

interface Data {
  id: string;
  name: string;
  phone: string;
  isSeller: number;
}

function createData(
  id: string,
  name: string,
  phone: string,
  isSeller: number
): Data {
  return { id, name, phone, isSeller };
}

export default function AdminOrder() {
  const { loading, error, users } = useSelector((state) => state.adminUsers);
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(fetchAdminUsersAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (users) {
      setRows(
        users.map((user) =>
          createData(user.id, user.name, user.phone, user.isSeller)
        )
      );
    }
  }, [users]);

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
      <CustomHelmet title="Users" desc="Steeldalal" />

      {error && (
        <CustomSnack
          type="error"
          text={error}
          handleClose={() => dispatch({ type: FETCH_ADMIN_USERS_RESET })}
        />
      )}
      {loading && <CustomSnack type="success" text="Fetching... users " />}
      <TableContainer sx={{ minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                User
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
                    onClick={() => history.push(`/admin-user/${row["id"]}`)}
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
                              history.push(`/admin-user/${row["id"]}`)
                            }
                            endIcon={<ChevronRightOutlined />}
                          >
                            More
                          </Button>
                        </TableCell>
                      ) : column.id === "isSeller" ? (
                        <TableCell key={column.id} align={column.align}>
                          <Chip
                            label={value === 1 ? "Seller" : "Not Seller"}
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
