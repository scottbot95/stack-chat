import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import withWidth from '@material-ui/core/withWidth';
import ChannelListItem from './ChannelListItem';

const Sidebar = ({ width, channels }) => {
  const drawerType = width === 'xs' ? 'temporary' : 'permanent';

  return (
    <div>
      <Drawer variant={drawerType}>
        {channels.map(channel => (
          <ChannelListItem key={channel.id || channel.name} {...channel} />
        ))}
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => ({
  channels: state.channels
});

export default connect(mapStateToProps)(withWidth()(Sidebar));

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
  )
};

Sidebar.defaultProps = {
  channels: []
};
