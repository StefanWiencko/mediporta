import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

type Props<T> = {
  cellKey: keyof T;
  row: T;
};

const BasicTableRow = <T,>({ cellKey, row }: Props<T>) => {
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
