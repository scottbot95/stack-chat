/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { LoginPage } from './components';

const Routes = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <Switch />;
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
});

export default connect(mapStateToProps)(Routes);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool
};
