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

    const loggedInRoutes = [
      <Route path="/channel/:channelId" component={ChatPage} key="/ch" />,
      <Route path="/" component={HomePage} key="/" />
    ];
    const loggedOutRoutes = [
      <Route exact path="/signup" component={SignupPage} key="/signup" />,
      <Route exact path="/" component={LoginPage} key="/" />
    ];
    const commonRoutes = [];
    return (
      <Switch>
        {isLoggedIn ? loggedInRoutes : loggedOutRoutes}
        {commonRoutes}
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
