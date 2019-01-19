import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import withWidth from '@material-ui/core/withWidth';

import { logout } from '../store/user/actions';
import { toggleSidebar } from '../store/window/actions';
import { styles } from '../theme';

const NavBar = ({
  title,
  width,
  classes,
  isLoggedIn,
  logoutUser,
  toggleSidebarOpen
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {width === 'xs' && (
          <IconButton aria-label="menu" onClick={toggleSidebarOpen}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.grow}>
          {title}
        </Typography>
        {isLoggedIn && <Button onClick={logoutUser}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  title: state.window.title
});

const mapDispatchToProps = {
  logoutUser: logout,
  toggleSidebarOpen: toggleSidebar
};

export default withWidth()(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavBar)
  )
);

NavBar.propTypes = {
  /** Media breakpoint size */
  width: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  toggleSidebarOpen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavBar.defaultProps = {
  isLoggedIn: false
};
