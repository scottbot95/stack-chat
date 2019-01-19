import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withWidth from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/AddCircle';

import ChannelListItem from './ChannelListItem';
import { showSidebar } from '../../store/window/actions';
import JoinChannelDialog from '../JoinChannelDialog';
import { styles } from '../../theme';

class Sidebar extends React.Component {
  state = {
    open: false
  };

  render() {
    const {
      width,
      channels,
      open,
      closeSidebar,
      isLoggedIn,
      classes
    } = this.props;
    const drawerType = width === 'xs' ? 'temporary' : 'permanent';

    return (
      <React.Fragment>
        <Drawer
          variant={drawerType}
          open={open}
          onClose={closeSidebar}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {channels.map(channel => (
            <ChannelListItem key={channel.id || channel.name} {...channel} />
          ))}
          <Divider />
          <List>
            {isLoggedIn && [
              <ListItem
                button
                key="add"
                onClick={() => this.setState({ open: true })}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Join Channel" />
              </ListItem>
            ]}
          </List>
        </Drawer>
        <JoinChannelDialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  channels: state.channels,
  open: state.window.showSidebar
});

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(showSidebar(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(withStyles(styles)(Sidebar)));

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  /** Media breakpoint size */
  width: PropTypes.string.isRequired,
  /** Array of objects representing each channel */
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
      unread: PropTypes.number
    })
  ),
  open: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  closeSidebar: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  channels: [],
  open: false,
  isLoggedIn: false
};
