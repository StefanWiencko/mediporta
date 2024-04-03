import TextField from "@mui/material/TextField";
import { HandleNumberChange } from "@/types";

type Props = {
  value: number;
  changeHandler: HandleNumberChange;
  backgroundColor: string;
};

type HandleKeyDown = (a: React.KeyboardEvent<HTMLDivElement>) => void;

const excludedCharacters = ["e", "E", "-", "+"];

const NumberInput = ({ changeHandler, value, backgroundColor }: Props) => {
  const handleKeyDown: HandleKeyDown = (e) => {
    if (excludedCharacters.includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <TextField
      value={value}
      type="number"
      sx={{ maxWidth: 120, background: backgroundColor }}
      onKeyDown={handleKeyDown}
      onChange={changeHandler}
    />
  );
};

export default NumberInput;
