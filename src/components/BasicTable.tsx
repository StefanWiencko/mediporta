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
import { useAtom } from "jotai";
import { tagTableControlAtom } from "@/atoms/tags";
import { useState } from "react";

const tableStructure: { name: string; key: keyof Tag }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "count" },
  { name: "Required", key: "is_required" },
  { name: "Moderator Only", key: "is_moderator_only" },
  { name: "Synonyms", key: "has_synonyms" },
];

const TagsTable = () => {
  const [page, setPage] = useState(1);
  const [{ perPage, sort, order }] = useAtom(tagTableControlAtom);

  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["tags", page, perPage, sort, order],
    queryFn: () =>
      getTagsData({
        page,
        perPage,
        sort,
        order,
      }),
  });

  const handleChange = (_: unknown, value: number) => {
    setPage(value);
  };

  const calculateTotalPages =
    data?.total !== undefined ? Math.ceil(data?.total / perPage) : 0;
  const columnAlign = (key: keyof Tag) =>
    key === "name" || key === "count" ? "left" : "center";
  return (
    <>
      <TagsTableControl />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
              ? data.items?.map((row) => (
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
