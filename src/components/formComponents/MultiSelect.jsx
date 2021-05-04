import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const MultiSelect = ({
  list,
  name,
  optionTitle,
  label,
  errors,
  validatorRef,
  control,
  setValue,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <Autocomplete
            multiple
            options={list}
            defaultValue={props.value}
            getOptionSelected={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option[optionTitle]}
            onChange={(e, values) => {
              const valuesWithCorrectId = values.map((item) => {
                if (!item.id && item._id) {
                  item.id = item._id;
                }
                if (!item._id && item.id) {
                  item._id = item.id;
                }

                return item;
              });
              setValue(name, valuesWithCorrectId);
            }}
            filterSelectedOptions
            fullWidth={true}
            value={props.value}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={label}
                inputRef={validatorRef}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            )}
          />
        )}
      />
    </>
  );
};
