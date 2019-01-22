import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import RootRef from '@material-ui/core/RootRef';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Message from './Message';
import { fetchMessages } from '../../store/messages/actions';
import LoadingSpinner from '../LoadingSpinner';

import { theme } from '../../theme';

import { throttle } from '../../utils';

class MessageList extends React.Component {
  componentDidMount() {
    this.props.loadMoreMessages(1);
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const prevMessages = prevProps.messages || [];
    const currMessages = this.props.messages || [];
    const prevLastMsg = prevMessages.slice(-1)[0] || { id: 0 };
    const currLastMsg = currMessages.slice(-1)[0] || { id: 0 };

    if (prevLastMsg.id !== currLastMsg.id) {
      this.scrollToBottom();
    }
  }

  paperRef = React.createRef();

  scrollToBottom = () => {
    this.messagesEndRef.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const {
      messages,
      channel,
      hasMore,
      loadMoreMessages,
      myId,
      ...rest
    } = this.props;

    const users = channel.users || {};

    return (
      <RootRef rootRef={this.paperRef}>
        <Paper
          style={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: theme.palette.background.default
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreMessages}
            loader={<LoadingSpinner key={0} />}
            hasMore={hasMore}
            useWindow={false}
            getScrollParent={() => this.paperRef.current}
            isReverse
            key={channel.id}
          >
            {messages.length ? (
              <List {...rest}>
                {messages.map(msg => (
                  <React.Fragment key={msg.id}>
                    <Message
                      author={users[msg.authorId]}
                      content={msg.text}
                      createdAt={msg.createdAt}
                      editedAt={
                        msg.updatedAt !== msg.createdAt && msg.updatedAt
                      }
                      mine={msg.authorId === myId}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography align="center">
                No messages in this channel
              </Typography>
            )}
            <div
              ref={ref => {
                this.messagesEndRef = ref;
              }}
            />
          </InfiniteScroll>
        </Paper>
      </RootRef>
    );
  }
}

const mapState = (state, props) => {
  const channelMessages = state.messages[props.channel.id]
    ? state.messages[props.channel.id]
    : { messages: [], hasMore: true };
  return {
    messages: channelMessages.messages,
    hasMore: channelMessages.hasMore,
    myId: state.user.id
  };
};

const mapDispatch = (dispatch, props) => {
  const throttledDispatch = throttle(dispatch, 250);
  return {
    loadMoreMessages: page =>
      throttledDispatch(fetchMessages(props.channel.id, page))
  };
};

export default connect(
  mapState,
  mapDispatch
)(MessageList);

MessageList.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    users: PropTypes.object
  }).isRequired,
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
