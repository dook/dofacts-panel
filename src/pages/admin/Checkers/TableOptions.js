import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Menu, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import styles from './Checkers.module.scss';

const TableOptions = ({ id, isActive, onStatusChange, onPromoteClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = event => setAnchorEl(event.currentTarget);
  const close = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={open}
        className={cx(!isActive && styles.bannedBtn)}
      >
        <SettingsIcon />
      </IconButton>
      <Menu id="user-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={close}>
        <MenuItem
          onClick={() => {
            close();
            onStatusChange(id, !isActive);
          }}
        >
          {isActive ? 'Dezaktywuj konto' : 'Aktywuj konto'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            close();
            onPromoteClick(id);
          }}
        >
          Przydziel rolę eksperta
        </MenuItem>
      </Menu>
    </>
  );
};

TableOptions.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onPromoteClick: PropTypes.func
};

export default TableOptions;
