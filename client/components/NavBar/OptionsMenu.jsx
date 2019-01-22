import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DotsIcon from '@material-ui/icons/MoreVert';
import withLoggedIn from '../withLoggedIn';
import { logout } from '../../store/user/actions';

class OptionsMenu extends React.Component {
  state = { anchorEl: null };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isLoggedIn, logoutUser } = this.props;
    const loggedInOptions = [{ content: 'Logout', onClick: logoutUser }];
    const loggedOutOptions = [
      { content: 'Login', href: '/' },
      { content: 'Sign Up', href: '/signup' }
    ];
    const commonOptions = [];

    const renderMenuItems = menuItems =>
      menuItems.map(item => {
        const handler = () => {
          if (typeof item.onClick === 'function') item.onClick();
          if (!item.dontClose) this.handleClose();
        };

        const content = item.href ? (
          <Link to={item.href}>
            <Typography>{item.content}</Typography>
          </Link>
        ) : (
          item.content
        );

        return (
          <MenuItem
            key={item.key || item.content}
            onClick={handler}
            component="div"
          >
            <ListItem>{content}</ListItem>
          </MenuItem>
        );
      });

    return (
      <React.Fragment>
        <IconButton
          aira-owns={this.state.anchorEl ? 'navbar-menu' : undefined}
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
          {renderMenuItems(commonOptions)}
          <Divider />
          {renderMenuItems(isLoggedIn ? loggedInOptions : loggedOutOptions)}
        </Menu>
      </React.Fragment>
    );
  }
}

const mapDispatch = {
  logoutUser: logout
};

export default connect(
  null,
  mapDispatch
)(withLoggedIn(OptionsMenu));
