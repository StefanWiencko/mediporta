import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { BasicTableData } from "@/types";

type Props = {
  cellKey: keyof BasicTableData;
  row: BasicTableData;
};

const BasicTableRow = ({ cellKey, row }: Props) => {
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

export default BasicTableRow;
