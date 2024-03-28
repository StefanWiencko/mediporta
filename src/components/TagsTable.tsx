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

// https://api.stackexchange.com/2.3/tags?page=1&order=desc&sort=popular&site=stackoverflow
const tableStructure: { title: string; key: keyof Tag }[] = [
  { title: "Name", key: "name" },
  { title: "Count", key: "count" },
  { title: "Required", key: "is_required" },
  { title: "Moderator Only", key: "is_moderator_only" },
  { title: "Synonyms", key: "has_synonyms" },
];

const TagsTable = () => {
  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTagsData(),
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableStructure.map((cell) => (
                <TableCell key={cell.title}>{cell.title}</TableCell>
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
                      <TableCell key={cell.key + row.name}>
                        <TagsTableRow cellKey={cell.key} row={row} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            <TableRow>
              {isSuccess && !data.items?.length ? (
                <TableCell colSpan={3} align="center">
                  No data
                </TableCell>
              ) : null}
              {isPending ? (
                <TableCell colSpan={3} align="center">
                  Loading...
                </TableCell>
              ) : null}
              {error ? (
                <TableCell colSpan={3} align="center">
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
            count={2}
            variant="outlined"
            color="primary"
            page={1}
            onChange={() => {}}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default TagsTable;
