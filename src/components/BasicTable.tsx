import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BasicTableRow from "@/components/BasicTableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { TableAlign } from "@/types";
import { Stack } from "@mui/material";

type RequiredProperties = {
  name: string;
};

type Props<T> = {
  query: (page: number) => {
    data: T[] | undefined;
    error: Error | null;
    isSuccess: boolean;
    isPending: boolean;
    totalPages: number;
  };
  minWidth: number;
  perPage: number;
  columnAlign: (key: keyof T) => TableAlign;
  tableStructure: { name: string; key: keyof T }[];
};

const BasicTable = <T extends RequiredProperties>({
  query,
  columnAlign,
  tableStructure,
  minWidth,
}: Props<T>) => {
  const [page, setPage] = useState(1);

  const { isPending, isSuccess, error, data, totalPages } = query(page);
  const handleChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableStructure.map((cell) => (
                <TableCell align={columnAlign(cell.key)} key={cell.name}>
                  {cell.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isSuccess
              ? data?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {tableStructure.map((cell) => (
                      <TableCell
                        align={columnAlign(cell.key)}
                        key={cell.key.toString() + row.name}
                      >
                        <BasicTableRow cellKey={cell.key} row={row} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            <TableRow>
              {isSuccess && !data?.length ? (
                <TableCell colSpan={tableStructure.length} align="center">
                  No data
                </TableCell>
              ) : null}
              {isPending ? (
                <TableCell colSpan={tableStructure.length} align="center">
                  Loading...
                </TableCell>
              ) : null}
              {error ? (
                <TableCell colSpan={tableStructure.length} align="center">
                  {"Error: " + error.message}
                </TableCell>
              ) : null}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{ marginX: "auto", marginTop: 2, width: "fit-content" }}
        spacing={2}
      >
        {isSuccess ? (
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChange}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default BasicTable;
