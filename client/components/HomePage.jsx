import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { setTitle } from '../store/window/actions';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.setTitle('Home');
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Typography variant="h3">
          Welcome, {user.realName || user.username || 'user'}
        </Typography>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  setTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

HomePage.propTypes = {
  user: PropTypes.shape({
    realName: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  setTitle: PropTypes.func.isRequired
};
