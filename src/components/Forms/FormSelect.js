import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

import styles from './style.module.scss';

//TODO remove and use FormDropdown

const renderMenuOptions = values =>
  values.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

const FormSelect = ({ className, onChange, value, menuOptions, title, ...props }) => (
  <FormControl className={cx(styles.selector, className)}>
    <InputLabel id={title}>{title}</InputLabel>
    <Select labelId={title} value={value} onChange={({ target }) => onChange(target.value)} {...props}>
      {renderMenuOptions(menuOptions)}
    </Select>
  </FormControl>
);

FormSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  menuOptions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FormSelect;
