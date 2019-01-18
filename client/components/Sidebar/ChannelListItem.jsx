import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const ChannelListItem = ({ name, slug, unread }) => {
  return (
    <Link to={slug}>
      <Badge color="primary" badgeContent={unread} showZero={false}>
        <Typography>#{name}</Typography>
      </Badge>
    </Link>
  );
};

ChannelListItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  unread: PropTypes.number
};

ChannelListItem.defaultProps = {
  unread: 0
};

export default ChannelListItem;
