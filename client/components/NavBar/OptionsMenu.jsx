import React from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckBox from '@material-ui/core/Checkbox';
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
    const commonOptions = [];

    const renderMenuItems = menuItems =>
      menuItems.map(item => {
        const handler = () => {
          if (typeof item.onClick === 'function') item.onClick();
          if (!item.dontClose) this.handleClose();
        };
        return (
          <MenuItem
            key={item.key || item.content}
            onClick={handler}
            component="div"
          >
            <ListItem>{item.content}</ListItem>
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
          {renderMenuItems(loggedInOptions)}
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
