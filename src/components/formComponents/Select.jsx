import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Controller } from "react-hook-form";

export const Select = ({
  optionTitle,
  errors,
  list,
  label,
  name,
  rules,
  optionValue,
  control,
  setValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={(props) => (
        <TextField
          label={label}
          select
          variant="outlined"
          fullWidth={true}
          defaultValue={props.value}
          value={props.value}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          onChange={(e) => setValue(name, e.target.value)}
        >
          <MenuItem key={"empty"} value={""}>
            Empty
          </MenuItem>
          {list.map((option) => (
            <MenuItem key={option[optionValue]} value={option[optionValue]}>
              {option[optionTitle]}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
