import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';

const ChannelListItem = ({ name, slug, unread, selected }) => {
  return (
    <Link to={`/channel/${slug}`}>
      <ListItem button selected={selected}>
        <Badge color="primary" badgeContent={unread} showZero={false} max={99}>
          <Typography>#{name}</Typography>
        </Badge>
      </ListItem>
    </Link>
  );
};

ChannelListItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unread: PropTypes.number,
  selected: PropTypes.bool
};

ChannelListItem.defaultProps = {
  unread: 0,
  selected: false
};

export default withRouter(ChannelListItem);
