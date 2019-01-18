import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';

import App from './App';
import store from './store';
import history from './history';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500]
    }
  },
  typography: {
    useNextVariants: true
  }
});

module.exports = () => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('App')
  );
};
