import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const JoinChannelDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Join New Channel</DialogTitle>
      <div />
    </Dialog>
  );
};

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(JoinChannelDialog);

JoinChannelDialog.propTypes = {
  /** Whether or not to display diaglog */
  open: PropTypes.bool,
  /** Callback called when a close is triggered */
  onClose: PropTypes.func.isRequired
};

JoinChannelDialog.defaultProps = {
  open: false
};
