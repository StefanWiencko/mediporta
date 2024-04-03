import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  value: number;
  changeHandler: HandleNumberChange;
  backgroundColor: string;
};

type HandleKeyDown = (a: React.KeyboardEvent<HTMLDivElement>) => void;
type HandleNumberChange = (
  a: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

const NumberInput = ({ changeHandler, value, backgroundColor }: Props) => {
  const handleKeyDown: HandleKeyDown = (e) => {
    const excludedCharacters = ["e", "E", "-", "+"];

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
