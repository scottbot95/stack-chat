import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import colors from '@material-ui/core/colors';

const App = require('./app').default;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.purple[500]
    }
  }
});

module.exports = () => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('App')
  );
};
