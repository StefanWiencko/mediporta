import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BasicTableRow from "@/components/BasicTableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { BasicTableData, TableAlign } from "@/types";

type Props = {
  query: (page: number) => {
    data: BasicTableData[] | undefined;
    error: Error | null;
    isSuccess: boolean;
    isPending: boolean;
    totalPages: number;
  };
  minWidth: number;
  perPage: number;
  columnAlign: (key: keyof BasicTableData) => TableAlign;
  tableStructure: { name: string; key: keyof BasicTableData }[];
};

const BasicTable = ({
  query,
  columnAlign,
  tableStructure,
  minWidth,
}: Props) => {
  const [page, setPage] = useState(1);

  const { isPending, isSuccess, error, data, totalPages } = query(page);
  const handleChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth }} aria-label="basicTable">
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
