import {
  tagInputsDebounceTime,
  tagSortDirections,
  tagTableStructure,
} from "@/constants/tags";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import _ from "lodash";
import { useAtom } from "jotai";
import { tagTableControlAtom } from "@/atoms/tags";
import { useEffect, useState } from "react";

const TagsTableControl = () => {
  const [options, setOptions] = useAtom(tagTableControlAtom);
  const [count, setCount] = useState(options.count);

  useEffect(() => {
    const cb = () =>
      setOptions((draft) => {
        draft.count = count;
      });

    _.debounce(cb, tagInputsDebounceTime)();
  }, [count, setOptions]);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(e.target.value);
    if (_.inRange(value, 1, 101)) {
      setCount(value);
    }
  };

  const handleSelectChange =
    (property: "sortBy" | "sortDirection") =>
    (e: SelectChangeEvent<string>) => {
      const cb = () =>
        setOptions((draft) => {
          draft[property] = e.target.value;
        });

      _.debounce(cb, tagInputsDebounceTime)();
    };
  return (
    <div className="flex gap-6 mb-6">
      <TextField
        value={count}
        type="number"
        sx={{ maxWidth: 120, background: "white" }}
        onKeyDown={(e) => {
          if (
            e.key === "e" ||
            e.key === "E" ||
            e.key === "-" ||
            e.key === "+"
          ) {
            e.preventDefault();
          }
        }}
        onChange={handleNumberChange}
      />

      <Box sx={{ minWidth: 120, background: "white" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={options.sortBy}
            label="Sort by"
            onChange={handleSelectChange("sortBy")}
          >
            {tagTableStructure.map((col) => (
              <MenuItem key={col.key} value={col.key}>
                {col.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 160, background: "white" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort direction</InputLabel>
          <Select
            labelId="sort-direction-select-label"
            id="sort-direction-select"
            value={options.sortDirection}
            label="Sort direction"
            onChange={handleSelectChange("sortDirection")}
          >
            {tagSortDirections.map((col) => (
              <MenuItem key={col.key} value={col.key}>
                {col.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default TagsTableControl;
