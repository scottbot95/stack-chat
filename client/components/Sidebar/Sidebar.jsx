import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import withWidth from '@material-ui/core/withWidth';

import ChannelListItem from './ChannelListItem';
import { showSidebar } from '../../store/window/actions';

const Sidebar = ({ width, channels, open, closeSidebar }) => {
  const drawerType = width === 'xs' ? 'temporary' : 'permanent';

  return (
    <div>
      <Drawer variant={drawerType} open={open} onClose={closeSidebar}>
        {channels.map(channel => (
          <ChannelListItem key={channel.id || channel.name} {...channel} />
        ))}
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => ({
  channels: state.channels,
  open: state.window.showSidebar
});

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(showSidebar(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(Sidebar));

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
  closeSidebar: PropTypes.func.isRequired
};

Sidebar.defaultProps = {
  channels: [],
  open: false
};
