import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { Menu, MenuItem, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import styles from './Checkers.module.scss';

const TableOptions = ({ id, isActive, onStatusChange, onPromoteClick }) => {
  const { t } = useTranslation();
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
          {isActive ? t('community.deactivate') : t('community.activate')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            close();
            onPromoteClick(id);
          }}
        >
          {t('community.promote')}
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
