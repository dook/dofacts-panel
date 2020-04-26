import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Paper } from '@material-ui/core';

import history from 'base/history';
import { useQuery } from 'hooks/useQuery';
import { extendQueryString } from 'utils/url';
import { debounce } from 'utils';
import FormSearchField from 'components/Forms/FormSearchField';

import styles from './Filters.module.scss';

export const ALL_OPTIONS = {
  label: 'Pokaż wszystkie',
  value: ''
};

const extractDefaultFilterQuery = filters =>
  filters.reduce((obj, el) => {
    const { name, defaultValue } = el;
    const isDefaultValue = Object.keys(el).includes('defaultValue');
    const selected = isDefaultValue ? defaultValue : '';
    const convertedValue = selected === ALL_OPTIONS.value ? null : selected;
    return { ...obj, [name]: convertedValue };
  }, {});

const Filters = ({ filters, withSearch, children }) => {
  const { url } = useRouteMatch();
  const { page, ...query } = useQuery();
  const [currentQuery, setCurrentQuery] = useState(() => ({ ...extractDefaultFilterQuery(filters), page }));

  const handleChange = ({ target: { name, value } }) => {
    // It's workaround for not displaying fields in query string if there is default value
    const convertedValue = value === ALL_OPTIONS.value ? null : value;
    setCurrentQuery({ ...currentQuery, [name]: convertedValue });
  };
  const debouncedHandler = debounce(event => handleChange(event), 300);

  useEffect(() => {
    const extendedQuery = extendQueryString(url, currentQuery);
    history.replace(extendedQuery);
  }, [url, currentQuery]);

  return (
    <Paper className={styles.wrapper}>
      {withSearch && (
        <FormSearchField
          className={styles.search}
          name="search"
          defaultValue={query.search}
          onChange={debouncedHandler}
        />
      )}
      {filters?.map(el => {
        const { name, label, options } = el;
        const isDefaultValue = Object.keys(el).includes('defaultValue');

        return (
          <FormControl key={name} className={styles.field}>
            <InputLabel id={name} shrink={isDefaultValue}>
              {label}
            </InputLabel>
            <Select
              labelId={name}
              name={name}
              value={query[name] || ALL_OPTIONS.value}
              onChange={handleChange}
              displayEmpty={isDefaultValue}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      {children}
    </Paper>
  );
};

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
        })
      )
    })
  ).isRequired,
  withSearch: PropTypes.bool,
  children: PropTypes.element
};

export default Filters;
