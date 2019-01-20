import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import store from './store';
import history from './history';
import theme from './theme';

// start the socket nonsense
import './socket';

module.exports = () => {
  ReactDOM.render(
    <AppContainer>
      <ErrorBoundary>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Provider store={store}>
              <App />
            </Provider>
          </Router>
        </MuiThemeProvider>
      </ErrorBoundary>
    </AppContainer>,
    document.getElementById('App')
  );
};
