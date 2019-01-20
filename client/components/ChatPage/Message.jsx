import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const Message = ({ author, content, createdAt }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {author ? <Avatar src={author.imageUrl} /> : <PersonIcon />}
      </ListItemAvatar>

      <ListItemText
        primary={author && author.realName}
        secondary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              {content}
            </Typography>
            <Typography component="span">{createdAt}</Typography>
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
