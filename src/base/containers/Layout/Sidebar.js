import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, Link } from 'react-router-dom';
import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import UserInfo from './UserInfo.js';

import Logo from 'components/Logo';
import styles from './Layout.module.scss';
import { useTranslation } from 'react-i18next';

const isSelected = (path, url) => {
  const regex = new RegExp('/([^/]*)', 'g');
  return path.match(regex)[0] === url;
};

const Sidebar = ({ menuItems, isOpen, onClose, variant }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={onClose}
      classes={{
        root: styles.Drawer,
        paper: styles.Drawer
      }}
    >
      <div className={styles.LogoWrapper}>
        <Logo className={styles.Logo} />
        <Typography variant="body2" align="center">
          {t('layout.textUnderLogo')}
        </Typography>
      </div>
      <List>
        {menuItems.map(({ i18nkey, url, icon, disabled }) => (
          <ListItem button key={i18nkey} component={Link} to={url} disabled={disabled} selected={isSelected(path, url)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={t(i18nkey)} />
          </ListItem>
        ))}
      </List>
      <UserInfo />
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      i18nkey: PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.element,
      disabled: PropTypes.bool
    })
  ),
  variant: PropTypes.string
};

export default Sidebar;
