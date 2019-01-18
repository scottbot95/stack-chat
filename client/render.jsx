import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';

const App = require('./app').default;
const store = require('./store').default;

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
        <HashRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </HashRouter>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('App')
  );
};
