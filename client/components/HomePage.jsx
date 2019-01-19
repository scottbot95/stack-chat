import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const HomePage = ({ user }) => (
  <div>
    <Typography variant="h3">
      Welcome, {user.realName || user.username || 'user'}
    </Typography>
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(HomePage);

HomePage.propTypes = {
  user: PropTypes.shape({
    realName: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};
