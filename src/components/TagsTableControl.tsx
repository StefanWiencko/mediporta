import { useAtom } from "jotai";
import _ from "lodash";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { tagTableControlAtom } from "@/atoms/tags";
import { HandleNumberChange } from "@/types";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";

const debounceTimeout = 500;

const orderOptions: { name: string; key: string }[] = [
  { name: "Ascending", key: "asc" },
  { name: "Descending", key: "desc" },
];

const sortOptions: { name: string; key: string }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "popular" },
  { name: "Last activity", key: "activity" },
];

const TagsTableControl = () => {
  const [options, setOptions] = useAtom(tagTableControlAtom);
  const [perPage, setPerPage] = useState(options.perPage);

  useEffect(() => {
    const cb = () =>
      setOptions((draft) => {
        draft.perPage = perPage;
      });

    _.debounce(cb, debounceTimeout)();
  }, [perPage, setOptions]);

  const handleNumberChange: HandleNumberChange = (e) => {
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

      _.debounce(cb, debounceTimeout)();
    };

  return (
    <div className="flex gap-6 mb-6">
      <NumberInput
        backgroundColor="white"
        value={perPage}
        changeHandler={handleNumberChange}
      />

      <Select
        options={sortOptions}
        minWidth={120}
        changeHandler={handleSelectChange("sort")}
        value={options.sort}
        backgroundColor="white"
        label="Sort by"
      />
      <Select
        options={orderOptions}
        minWidth={160}
        changeHandler={handleSelectChange("order")}
        value={options.order}
        backgroundColor="white"
        label="Sort direction"
      />
    </div>
  );
};

export default TagsTableControl;
