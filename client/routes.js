import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import withLoader from './components/withLoader';
import { LoginPage, ChatPage, HomePage, SignupPage } from './components';
import { me } from './store/user/actions';

class Routes extends React.Component {
  componentDidUpdate() {
    document.title = this.props.windowTitle;
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <Switch>
          <Route path="/channel" component={ChatPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  windowTitle: state.window.title
});

const mapDispatchToProps = {
  loadInitialData: me
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLoader({ loader: props => props.loadInitialData() })(Routes))
);

Routes.propTypes = {
  /** whether or not the user is logged in */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Fetch user data from server is logged in */
  loadInitialData: PropTypes.func.isRequired,
  /** Title for the window */
  windowTitle: PropTypes.string.isRequired
};
