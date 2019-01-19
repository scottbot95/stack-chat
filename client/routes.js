import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { LoginPage, ChatPage, HomePage, SignupPage } from './components';
import { me } from './store/user/actions';

const routes = [
  { path: '/channel', component: ChatPage },
  { path: '/', component: HomePage }
];

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate() {
    document.title = this.props.windowTitle;
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return (
        <Switch>
          {routes.map(route => (
            <Route key={`${route.path}`} {...route} />
          ))}
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
  )(Routes)
);

Routes.propTypes = {
  /** whether or not the user is logged in */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Fetch user data from server is logged in */
  loadInitialData: PropTypes.func.isRequired,
  /** Title for the window */
  windowTitle: PropTypes.string.isRequired
};
