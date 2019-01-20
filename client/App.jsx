import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';

import Routes from './routes';
import { Sidebar, NavBar } from './components';
import { styles } from './theme';

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flex}>
        <Sidebar />
        <div className={classes.container}>
          <NavBar />
          <Routes />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

App.propTypes = {
  classes: PropTypes.object.isRequired
};
