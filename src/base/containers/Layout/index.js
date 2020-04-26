import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommunityIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExpertIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import HistoryIcon from '@material-ui/icons/History';
import { Hidden } from '@material-ui/core';

import { appUrls } from 'urls';
import Topbar from './Topbar.js';
import Sidebar from './Sidebar.js';

import styles from './Layout.module.scss';
import { rolesTypes } from 'consts.js';
import { useSelector } from 'react-redux';

// TODO: can be somehow merged with routes in the future
const menuItems = {
  [rolesTypes.CHECKER]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />
    },
    {
      i18nkey: 'menuItems.history',
      url: appUrls.HISTORY.LIST,
      icon: <HistoryIcon />
    },
    {
      i18nkey: 'menuItems.settings',
      url: appUrls.SETTINGS,
      icon: <SettingsIcon />
    }
  ],
  [rolesTypes.EXPERT]: [
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.DASHBOARD,
      icon: <ListIcon />
    },
    {
      i18nkey: 'menuItems.history',
      url: appUrls.HISTORY.LIST,
      icon: <HistoryIcon />
    },
    {
      i18nkey: 'menuItems.settings',
      url: appUrls.SETTINGS,
      icon: <SettingsIcon />
    }
  ],
  [rolesTypes.ADMIN]: [
    {
      i18nkey: 'menuItems.community',
      url: appUrls.DASHBOARD,
      icon: <CommunityIcon />
    },
    {
      i18nkey: 'menuItems.experts',
      url: appUrls.EXPERTS,
      icon: <ExpertIcon />
    },
    {
      i18nkey: 'menuItems.invitations',
      url: appUrls.INVITATIONS,
      icon: <EmailIcon />
    },
    {
      i18nkey: 'menuItems.submissions',
      url: appUrls.SUBMISSIONS.LIST,
      icon: <ListIcon />
    },
    {
      i18nkey: 'menuItems.settings',
      url: appUrls.SETTINGS,
      icon: <SettingsIcon />
    }
  ]
};

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const role = useSelector(({ auth }) => auth.info.role);

  return (
    <>
      <Hidden mdUp implementation="css">
        <Topbar onMenuClick={() => setIsOpen(true)} />
        <Sidebar menuItems={menuItems[role]} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Hidden>
      <div className={styles.Layout}>
        <Hidden smDown implementation="css">
          <Sidebar menuItems={menuItems[role]} variant="permanent" />
        </Hidden>
        <main className={styles.Main}>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
