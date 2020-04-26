import React from 'react';
import cx from 'classnames';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const FormTextField = ({ label, errorClassName, className, type, disabled, helperText, ...props }) => {
  const [field, meta] = useField(props);

  const hasError = !!(meta.touched && meta.error && !disabled);
  const classes = cx(className, hasError && errorClassName);

  return (
    <TextField
      {...field}
      {...props}
      className={classes}
      error={hasError}
      helperText={hasError ? meta.error : helperText}
      label={label}
      type={type}
      disabled={disabled}
    />
  );
};

FormTextField.defaultProps = {
  type: 'text'
};

FormTextField.propTypes = {
  label: PropTypes.string,
  errorClassName: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.any
};

export default FormTextField;
