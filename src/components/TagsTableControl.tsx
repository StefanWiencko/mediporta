import {
  tagInputsDebounceTime,
  tagOrderOptions,
  tagSortOptions,
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
import { ChangeEvent, useEffect, useState } from "react";

const TagsTableControl = () => {
  const [options, setOptions] = useAtom(tagTableControlAtom);
  const [perPage, setPerPage] = useState(options.per_page);

  useEffect(() => {
    const cb = () =>
      setOptions((draft) => {
        draft.per_page = perPage;
      });

    _.debounce(cb, tagInputsDebounceTime)();
  }, [perPage, setOptions]);

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(e.target.value);
    if (_.inRange(value, 1, 101)) {
      setPerPage(value);
    }
  };

  const handleSelectChange =
    (property: "sort" | "order") => (e: SelectChangeEvent<string>) => {
      const cb = () =>
        setOptions((draft) => {
          draft[property] = e.target.value;
        });

      _.debounce(cb, tagInputsDebounceTime)();
    };
  return (
    <div className="flex gap-6 mb-6">
      <TextField
        value={perPage}
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
            value={options.sort}
            label="Sort by"
            onChange={handleSelectChange("sort")}
          >
            {tagSortOptions.map((col) => (
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
            value={options.order}
            label="Sort direction"
            onChange={handleSelectChange("order")}
          >
            {tagOrderOptions.map((col) => (
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
