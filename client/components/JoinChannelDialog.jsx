import React from 'react';
import { connect } from 'react-redux';
import CreateableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import form from 'react-material-ui-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Loader from './Loader';
import axios from '../store/axios';
import { styles } from '../theme';
import {
  joinChannel,
  fetchChannelList,
  createChannel
} from '../store/channels/actions';

class JoinChannelDialog extends React.Component {
  state = { channels: [], loaded: false };

  async componentDidUpdate(prevProps) {
    const prevOpen = prevProps.open;
    const currOpen = this.props.open;
    if (!prevOpen && currOpen) {
      const channels = await this.props.fetchAvailChannels();
      const options = channels.map(ch => ({ label: ch.name, value: ch.id }));
      this.setState({ channels: options, loaded: true });
    }
  }

  static getDerviedStateFromProps(nextProps, prevState) {
    if (prevState.loaded && nextProps.open) return { loaded: false };
  }

  render() {
    const {
      open,
      onClose,
      attemptJoinChannel,
      createAndJoinChannel,
      classes
    } = this.props;
    const { channels, loaded } = this.state;
    const submit = async evt => {
      evt.preventDefault();
      const channelId = evt.target.channelId.value;
      if (channels.find(ch => ch.id === Number(channelId))) {
        await attemptJoinChannel(evt.target.channelId.value);
      } else {
        await createAndJoinChannel(channelId);
      }
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
            <Loader isLoading={!loaded}>
              <CreateableSelect
                options={channels}
                name="channelId"
                placeholder="Type channel name here"
              />
              <Button type="submit" variant="contained" color="primary">
                Join
              </Button>
            </Loader>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  attemptJoinChannel: channelId => dispatch(joinChannel(channelId)),
  fetchAvailChannels: () => dispatch(fetchChannelList(false)),
  createAndJoinChannel: name => dispatch(createChannel(name))
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(JoinChannelDialog));

JoinChannelDialog.propTypes = {
  /** Whether or not to display diaglog */
  open: PropTypes.bool,
  /** Callback called when a close is triggered */
  onClose: PropTypes.func.isRequired
};

JoinChannelDialog.defaultProps = {
  open: false
};
