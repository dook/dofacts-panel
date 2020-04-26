import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { FormHelperText, RadioGroup, FormLabel, Radio, FormControl, FormControlLabel } from '@material-ui/core';

const FormRadio = ({ className, label, options, disabled, ...props }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(props);
  const isError = !!(meta.touched && meta.error && !disabled);

  return (
    <FormControl error={isError} component="fieldset" className={className}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={label} {...field}>
        {options.map(({ label, value, i18nkey, ...rest }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={t(i18nkey, label)}
            disabled={disabled}
            {...rest}
            {...props}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{isError && meta.error}</FormHelperText>
    </FormControl>
  );
};

FormRadio.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      i18nkey: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default FormRadio;
