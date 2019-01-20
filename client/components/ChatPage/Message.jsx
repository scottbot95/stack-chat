import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import TimeAgo from 'react-timeago';

const Message = ({ author, content, createdAt, mine }) => {
  const fallbackIcon = <PersonIcon />;

  const authorText = author && author.realName + (mine ? ' (me)' : '');

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {author ? (
          <Avatar>
            <Img
              src={author.imageUrl}
              loader={fallbackIcon}
              unloader={fallbackIcon}
              style={{ width: '100%', height: '100%' }}
            />
          </Avatar>
        ) : (
          fallbackIcon
        )}
      </ListItemAvatar>

      <ListItemText
        primary={authorText}
        secondary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              {content}
            </Typography>
            <Typography component="span" variant="caption">
              <TimeAgo date={new Date(createdAt)} />
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Message;

Message.propTypes = {
  /** author of the message */
  author: PropTypes.shape({
    imageUrl: PropTypes.string,
    realName: PropTypes.string
  }).isRequired,
  content: PropTypes.node.isRequired,
  createdAt: PropTypes.string
};
