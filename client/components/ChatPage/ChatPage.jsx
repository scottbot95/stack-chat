import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMessages } from '../../store/messages/actions';
import withLoader from '../withLoader';

class ChatPage extends React.Component {
  render() {
    return <div />;
  }
}

const fetchInitialMessages = props =>
  props.fetchMessages(props.match.params.channelId);

const mapState = (state, props) => ({
  messages: state.messages[props.match.params.channelId],
  channel: state.channels.find(
    ch => ch.channelId === props.match.params.channelId
  )
});

const mapDispatch = {
  fetchMessages
};

export default connect(
  mapState,
  mapDispatch
)(withLoader({ loader: fetchInitialMessages })(ChatPage));

ChatPage.propTypes = {
  /** Provied from react router */
  match: PropTypes.object.isRequired,
  /** Callback to fetch initial messages from server */
  fetchMessages: PropTypes.func.isRequired
};
