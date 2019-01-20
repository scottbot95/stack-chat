import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Message from './Message';
import { fetchMessages } from '../../store/messages/actions';
import LoadingSpinner from '../LoadingSpinner';

import { throttle } from '../../utils';

class MessageList extends React.Component {
  componentDidMount() {
    this.props.loadMoreMessages(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.channelId !== this.props.channelId)
      console.log('new channel');
    // this.props.loadMoreMessages(1);
  }

  render() {
    const {
      users,
      messages,
      channelId,
      hasMore,
      loadMoreMessages,
      myId,
      ...rest
    } = this.props;
    return (
      <Paper style={{ flexGrow: 1, overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreMessages}
          loader={<LoadingSpinner key={0} />}
          hasMore={hasMore}
          useWindow={false}
          isReverse
        >
          {messages.length ? (
            <List {...rest}>
              {messages.map(msg => (
                <React.Fragment>
                  <Message
                    key={msg.id}
                    author={users[msg.authorId]}
                    content={msg.text}
                    createdAt={msg.createdAt}
                    editedAt={msg.updatedAt !== msg.createdAt && msg.updatedAt}
                    mine={msg.authorId === myId}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography align="center">No messages in this channel</Typography>
          )}
        </InfiniteScroll>
      </Paper>
    );
  }
}

const mapState = (state, props) => {
  const channel = state.messages[props.channelId]
    ? state.messages[props.channelId]
    : { messages: [], hasMore: true };
  return {
    messages: channel.messages,
    hasMore: channel.hasMore,
    myId: state.user.id
  };
};

const mapDispatch = (dispatch, props) => {
  const throttledDispatch = throttle(dispatch, 250);
  return {
    loadMoreMessages: page =>
      throttledDispatch(fetchMessages(props.channelId, page))
  };
};

export default connect(
  mapState,
  mapDispatch
)(MessageList);

MessageList.propTypes = {
  channelId: PropTypes.number.isRequired,
  users: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      text: PropTypes.string,
      authorId: PropTypes.number
    })
  )
};

MessageList.defaultProps = {
  users: {},
  messages: []
};
