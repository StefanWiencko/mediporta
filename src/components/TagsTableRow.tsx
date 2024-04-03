import { Tag } from "@/types";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  cellKey: keyof Tag;
  row: Tag;
};

const TagsTableRow = ({ cellKey, row }: Props) => {
  switch (typeof row[cellKey]) {
    case "string":
    case "number":
      return <div> {String(row[cellKey])}</div>;
    case "boolean":
      return row[cellKey] ? <CheckIcon /> : <ClearIcon />;
    default:
      return <div>No data</div>;
  }
};

export default TagsTableRow;
