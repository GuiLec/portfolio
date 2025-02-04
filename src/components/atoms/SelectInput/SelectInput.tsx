import { Box, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectInputProps {
  label: string;
  labelId: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}
export const SelectInput = ({
  label,
  labelId,
  options,
  value,
  onChange,
}: SelectInputProps) => {
  return (
    <Box>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        sx={{ display: "block", width: "250px" }}
        labelId={labelId}
        label={label}
        value={value}
        onChange={(event) => {
          const value = event.target.value;
          onChange(value);
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
