import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchChannelDetails } from '../../store/channels/actions';
import { setTitle } from '../../store/window';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { messageSocket } from '../../socket';

class ChatPage extends React.Component {
  componentDidMount() {
    this.postRender();
  }

  componentDidUpdate() {
    if (this.props.channel.name !== this.props.currTitle) {
      this.postRender();
    }
  }

  postRender = () => {
    if (this.props.channel.name)
      this.props.setWindowTitle(this.props.channel.name);

    this.props.fetchChannelDetails();

    messageSocket.emit('switch-channel', this.props.channel.id);
  };

  render() {
    return (
      <React.Fragment>
        <MessageList
          channelId={this.props.channel.id}
          users={this.props.channel.users}
        />
        <MessageInput
          authorId={this.props.userId}
          channelId={this.props.channel.id}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state, props) => ({
  channel:
    state.channels.find(ch => ch.id === Number(props.match.params.channelId)) ||
    {},
  currTitle: state.window.title,
  userId: state.user.id
});

const mapDispatch = (dispatch, props) => ({
  fetchChannelDetails: () =>
    dispatch(fetchChannelDetails(props.match.params.channelId)),
  setWindowTitle: title => dispatch(setTitle(title))
});

export default connect(
  mapState,
  mapDispatch
)(ChatPage);

ChatPage.propTypes = {
  /** Provied from react router */
  match: PropTypes.object.isRequired,
  /** Callback to fetch channel details (users) from server */
  fetchChannelDetails: PropTypes.func.isRequired,
  /** Meta-Data about this channel */
  channel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.object
  }).isRequired,
  /** Callback to change window title */
  setWindowTitle: PropTypes.func.isRequired
};
