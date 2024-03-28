import { Tag } from "@/types";

type Props = {
  cellKey: keyof Tag;
  row: Tag;
};

const TagsTableRow = ({ cellKey, row }: Props) => {
  if (typeof row[cellKey] === "string" || typeof row[cellKey] === "number") {
    return <div> {String(row[cellKey])}</div>;
  }
  if (typeof row[cellKey] === "boolean" && row[cellKey]) {
    return <div>true xxdd</div>;
  }
  if (typeof row[cellKey] === "boolean" && !row[cellKey]) {
    return <div>false dd</div>;
  }
  //   console.log(key, row);
  return <div>No data</div>;
};

export default TagsTableRow;
