import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Topbar = ({ onMenuClick }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" aria-label="open menu" edge="start" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="p" noWrap>
          DoFacts!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  onMenuClick: PropTypes.func
};

export default Topbar;
