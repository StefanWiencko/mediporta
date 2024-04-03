import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  value: string;
  options: {
    name: string;
    key: string;
  }[];
  changeHandler: (e: SelectChangeEvent<string>) => void;
  minWidth: number;
  backgroundColor: string;
  label: string;
};

const CustomSelect = ({
  changeHandler,
  value,
  options,
  minWidth,
  backgroundColor,
  label,
}: Props) => {
  return (
    <Box sx={{ minWidth: minWidth, background: backgroundColor }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={changeHandler}
        >
          {options.map((col) => (
            <MenuItem key={col.key} value={col.key}>
              {col.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
