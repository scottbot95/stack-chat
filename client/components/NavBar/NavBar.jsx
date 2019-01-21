import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import withStyles from '@material-ui/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

import { logout } from '../../store/user/actions';
import { toggleSidebar } from '../../store/window/actions';
import { styles } from '../../theme';
import withLoggedIn from '../withLoggedIn';
import OptionsMenu from './OptionsMenu';

class NavBar extends React.Component {
  state = { anchorEl: null };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      title,
      width,
      classes,
      isLoggedIn,
      logoutUser,
      toggleSidebarOpen
    } = this.props;
    const { anchorEl } = this.state;

    // const loggedInMenuItems = [
    //   <MenuItem key="logout" onClick={this.handleClose}>
    //     Logout
    //   </MenuItem>
    // ];
    // const loggedOutMenuItems = [{}];
    // const commonMenuItems = [];

    return (
      <AppBar position="static">
        <Toolbar>
          {width === 'xs' && (
            <IconButton aria-label="menu" onClick={toggleSidebarOpen}>
              <MenuIcon />
            </IconButton>
          )}
          <NavLink exact to="/" activeStyle={{ display: 'none' }}>
            <IconButton aria-label="home">
              <HomeIcon />
            </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.grow}>
            {title}
          </Typography>
          {isLoggedIn && <Button onClick={logoutUser}>Logout</Button>}
          {/* <IconButton
            aira-owns={anchorEl ? 'navbar-menu' : undefined}
            aria-haspopup="true"
            onClick={evt => this.setState({ anchorEl: evt.currentTarget })}
          >
            <DotsIcon />
          </IconButton>
          <Menu
            id="navbar-menu"
            open={!!this.state.anchorEl}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
          >
            {renderMenuItems(commonMenuItems)}
            <Divider />
            {renderMenuItems(
              isLoggedIn ? loggedInMenuItems : loggedOutMenuItems
            )}
          </Menu> */}
          <OptionsMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
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
    )(withLoggedIn(NavBar))
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
