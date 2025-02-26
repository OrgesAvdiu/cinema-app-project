import ValidTextField from "./common/ValidTextField";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  ListItemText,
} from "@material-ui/core";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { isValid } from "date-fns";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

// Adding a style for white text
const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: 'white',  // Ensures that the text color is white
  },
}));

export const TextFieldTableCell = (
  props,
  errorRef,
  type,
  textFieldProps = {}
) => {
  const classes = useStyles();

  return (
    <ValidTextField
      {...textFieldProps}
      type={type}
      fullWidth
      label={props.columnDef.title}
      value={props.value || (type === "number" ? 0 : "")}
      onChange={(e) => props.onChange(e.target.value)}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      InputProps={{
        className: classes.whiteText, // Apply white text color here
      }}
    />
  );
};

export const SelectTableCell = (props, errorRef, menuItems, equalOn) => {
  const classes = useStyles();
  const value =
    equalOn && props.value
      ? menuItems
          .map((x) => x.value)
          .find((x) => x[equalOn] === props.value[equalOn])
      : props.value;

  return (
    <ValidTextField
      select
      id="select"
      fullWidth
      sx={{ m: 1, minWidth: 120 }}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      value={value || {}}
      onChange={(e) => props.onChange(e.target.value)}
      label={props.columnDef.title}
      InputProps={{
        className: classes.whiteText, // Apply white text color here
      }}
    >
      {menuItems.map((item, i) => (
        <MenuItem key={i} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </ValidTextField>
  );
};

export const MultipleSelectTableCell = (props, allItems, renderLabel) => {
  const classes = useStyles();
  const values = props.value || [];
  const valueIds = values.map((x) => x.id);

  return (
    <FormGroup row>
      {allItems.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              checked={valueIds.includes(item.id)}
              onChange={() => {
                const newValues = valueIds.includes(item.id)
                  ? values.filter((x) => x.id !== item.id)
                  : [...values, item];
                props.onChange(newValues);
              }}
              name={props.columnDef.title}
              color="secondary"
            />
          }
          label={<span className={classes.whiteText}>{renderLabel(item)}</span>} // Apply white text color here
        />
      ))}
    </FormGroup>
  );
};

export const TimeTableCell = (props, errorRef) => {
  const classes = useStyles();
  const value =
    typeof props.value === "string"
      ? new Date("01/01/1970 " + props.value)
      : props.value;
  const [dateFormatError, setDateFormatError] = useState("");

  function handleDateChange(value) {
    if (!isValid(value)) {
      setDateFormatError("Invalid date");
    } else {
      setDateFormatError("");
    }

    props.onChange(value);
  }

  const error = errorRef.current && errorRef.current[props.columnDef.field];

  return (
    <KeyboardTimePicker
      label={props.columnDef.title}
      placeholder="08:00 AM"
      required
      minutesStep={5}
      mask="__:__ _M"
      value={value}
      onChange={handleDateChange}
      error={!!error || !!dateFormatError}
      helperText={error?.message || dateFormatError}
      InputProps={{
        className: classes.whiteText, // Apply white text color here
      }}
    />
  );
};

export const MultipleCheckboxTableCell = (props, allItems, renderLabel) => {
  const classes = useStyles();
  const values = props.value || [];
  const valueIds = values.map((x) => x.id);

  return (
    <FormGroup row>
      {allItems.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              checked={valueIds.includes(item.id)}
              onChange={() => {
                const newValues = valueIds.includes(item.id)
                  ? values.filter((x) => x.id !== item.id)
                  : [...values, item];
                props.onChange(newValues);
              }}
              name={props.columnDef.title}
              color="secondary"
            />
          }
          label={<span className={classes.whiteText}>{renderLabel(item)}</span>} // Apply white text color here
        />
      ))}
    </FormGroup>
  );
};

export const NumberFieldTableCell = (props, errorRef, textFieldProps = {}) => {
  const classes = useStyles();

  return (
    <TextField
      {...textFieldProps}
      type="number"
      fullWidth
      label={props.columnDef.title}
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
      InputProps={{
        className: classes.whiteText, // Apply white text color here
      }}
    />
  );
};

export const PriceFieldTableCell = (props, errorRef, textFieldProps = {}) => {
  const classes = useStyles();

  const parseValue = (value) => {
    return parseFloat(value.replace("$", ""));
  };

  const formatValue = (value) => {
    if (value && typeof value === "number") {
      return `${value.toFixed(2)} $`;
    } else {
      return "";
    }
  };

  const [editedValue, setEditedValue] = useState(formatValue(props.value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEditedValue(newValue);
    props.onChange(parseValue(newValue));
  };

  return (
    <TextField
      {...textFieldProps}
      type="text"
      fullWidth
      label={props.columnDef.title}
      value={editedValue}
      onChange={handleChange}
      error={errorRef.current && errorRef.current[props.columnDef.field]}
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
      InputProps={{
        className: classes.whiteText, // Apply white text color here
      }}
    />
  );
};
