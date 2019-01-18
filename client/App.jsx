import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

import Routes from './routes';
import { Sidebar, NavBar } from './components';
import { styles } from './theme';

class App extends React.Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <NavBar />
        <Sidebar />
        <Routes />
      </div>
    );
  }
}

export default withStyles(styles)(App);

App.propTypes = {
  classes: PropTypes.object.isRequired
};
