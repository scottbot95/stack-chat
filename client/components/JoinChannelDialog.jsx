import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import form from 'react-material-ui-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import withLoader from './withLoader';
import axios from '../store/axios';
import { styles } from '../theme';
import { joinChannel } from '../store/channels/actions';

const JoinChannelDialog = ({
  open,
  onClose,
  attemptJoinChannel,
  channels,
  classes
}) => {
  const submit = async evt => {
    evt.preventDefault();
    await attemptJoinChannel(evt.target.channelId.value);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: classes.dialogPaper
      }}
    >
      <DialogTitle>Join New Channel</DialogTitle>
      <DialogContent className={classes.dialogPaper}>
        <form onSubmit={submit}>
          <Select
            options={channels}
            name="channelId"
            placeholder="Type channel name here"
          />
          <Button type="submit" variant="contained" color="primary">
            Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const fetchAllChannels = async () => {
  const res = await axios.get('/api/channels/?mine=false');
  return res.data.map(channel => ({
    label: channel.name,
    value: channel.id
  }));
};

const mapState = state => ({
  user: state.user
});

const mapDispatch = {
  attemptJoinChannel: joinChannel
};

export default withLoader({ loader: fetchAllChannels, dataProp: 'channels' })(
  connect(
    mapState,
    mapDispatch
  )(withStyles(styles)(JoinChannelDialog))
);

JoinChannelDialog.propTypes = {
  /** Whether or not to display diaglog */
  open: PropTypes.bool,
  /** Callback called when a close is triggered */
  onClose: PropTypes.func.isRequired
};

JoinChannelDialog.defaultProps = {
  open: false
};
