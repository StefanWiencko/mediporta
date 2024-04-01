import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Tag } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getTagsData } from "@/services/stackexchange";
import TagsTableRow from "@/components/TagsTableRow";
import TagsTableControl from "./TagsTableControl";
import { tagTableStructure } from "@/constants/tags";
import { useAtom } from "jotai";
import { tagTableControlAtom } from "@/atoms/tags";
import { ChangeEvent, useState } from "react";

const TagsTable = () => {
  const [page, setPage] = useState(1);
  const [{ per_page, sort, order }] = useAtom(tagTableControlAtom);

  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["tags", page, per_page, sort, order],
    queryFn: () =>
      getTagsData({
        page,
        per_page,
        sort,
        order,
      }),
  });

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const calculateTotalPages =
    data?.total !== undefined ? Math.ceil(data?.total / per_page) : 0;
  const columnAlign = (key: keyof Tag) =>
    key === "name" || key === "count" ? "left" : "center";
  return (
    <>
      <TagsTableControl />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tagTableStructure.map((cell) => (
                <TableCell align={columnAlign(cell.key)} key={cell.name}>
                  {cell.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isSuccess
              ? data.items?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {tagTableStructure.map((cell) => (
                      <TableCell
                        align={columnAlign(cell.key)}
                        key={cell.key + row.name}
                      >
                        <TagsTableRow cellKey={cell.key} row={row} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            <TableRow>
              {isSuccess && !data.items?.length ? (
                <TableCell colSpan={tagTableStructure.length} align="center">
                  No data
                </TableCell>
              ) : null}
              {isPending ? (
                <TableCell colSpan={tagTableStructure.length} align="center">
                  Loading...
                </TableCell>
              ) : null}
              {error ? (
                <TableCell colSpan={tagTableStructure.length} align="center">
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
            count={calculateTotalPages}
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

export default TagsTable;
