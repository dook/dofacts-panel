import PropTypes from 'prop-types';
import React from 'react';
import { FormControl, InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const FormSearchField = ({ className, onChange, ...props }) => (
  <FormControl className={className}>
    <TextField
      className={className}
      onChange={e => {
        e.persist();
        onChange(e);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  </FormControl>
);

FormSearchField.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default FormSearchField;
