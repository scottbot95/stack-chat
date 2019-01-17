import React from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';

const Sidebar = ({ width }) => {
  const drawerType = width === 'xs' ? 'temporary' : 'permanent';

  return (
    <div>
      <Drawer variant={drawerType} />
    </div>
  );
};

export default withWidth(Sidebar);

Sidebar.propTypes = {
  /** Media breakpoint size */
  width: PropTypes.string.isRequired
};
