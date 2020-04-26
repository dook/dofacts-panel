import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { useField } from 'formik';
import { TextField, MenuItem } from '@material-ui/core';

const FormSelect = ({ className, errorClassName, label, options = [], ...props }) => {
  const [field, meta] = useField(props);
  const hasError = !!(meta.touched && meta.error);
  const classes = hasError ? cx(className, errorClassName) : className;

  return (
    <TextField {...field} className={classes} error={hasError} helperText={hasError && meta.error} label={label} select>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

FormSelect.propTypes = {
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default FormSelect;
