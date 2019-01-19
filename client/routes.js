/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { LoginPage, ChatPage, HomePage } from './components';
import { me } from './store/user/actions';

const routes = [
  { path: '/channel', component: ChatPage },
  { path: '/', exact: true, component: HomePage }
];

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {isLoggedIn &&
          routes.map(route => <Route key={`${route.path}`} {...route} />)}
        <LoginPage />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
});

const mapDispatchToProps = {
  loadInitialData: me
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);

Routes.propTypes = {
  /** whether or not the user is logged in */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Fetch user data from server is logged in */
  loadInitialData: PropTypes.func.isRequired
};
