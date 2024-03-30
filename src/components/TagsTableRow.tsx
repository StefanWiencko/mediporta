import { Tag } from "@/types";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  cellKey: keyof Tag;
  row: Tag;
};

const TagsTableRow = ({ cellKey, row }: Props) => {
  if (typeof row[cellKey] === "string" || typeof row[cellKey] === "number") {
    return <div> {String(row[cellKey])}</div>;
  }
  if (typeof row[cellKey] === "boolean" && row[cellKey]) {
    return <CheckIcon />;
  }
  if (typeof row[cellKey] === "boolean" && !row[cellKey]) {
    return <ClearIcon />;
  }
  return <div>No data</div>;
};

export default TagsTableRow;
