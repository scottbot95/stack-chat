import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import withWidth from '@material-ui/core/withWidth';

const NavBar = ({ width }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {width === 'xs' && (
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6">{document.title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withWidth()(NavBar);

NavBar.propTypes = {
  /** Media breakpoint size */
  width: PropTypes.string.isRequired
};
