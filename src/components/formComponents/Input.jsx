import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const Input = ({
  name,
  label,
  rules,
  autoComplete,
  errors,
  type,
  inputLabelProps,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      as={
        <TextField
          label={label}
          type={type}
          variant="outlined"
          autoComplete={autoComplete}
          fullWidth={true}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputLabelProps={inputLabelProps}
        />
      }
    />
  );
};
