import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import { login } from '../store/user/actions';
import { setTitle } from '../store/window/actions';
import { styles } from '../theme';

class LoginPage extends React.Component {
  componentDidMount() {
    this.props.setWindowTitle('Login');
  }

  submit = values => {
    this.props.login(values.username, values.password);
  };

  render() {
    const { error, classes } = this.props;

    const formClass = [classes.form, classes.container].join(' ');

    return (
      <Paper className={[classes.container, classes.center].join(' ')}>
        <Card>
          <MaterialUIForm onSubmit={this.submit} className={formClass}>
            <Typography variant="subtitle1">Enter Login Credentials</Typography>
            <TextField
              label="Username"
              name="username"
              type="text"
              value=""
              variant="outlined"
              data-validators="isRequired"
              className={classes.textField}
            />
            <TextField
              label="Password"
              name="password"
              value=""
              type="password"
              variant="outlined"
              data-validators="isRequired"
              className={classes.textField}
            />
            <Typography
              color="error"
              align="center"
              className={classes.textField}
            >
              {error}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Link to="/signup">
              <Typography variant="caption" align="center">
                Don't have an account? Click here to signup!
              </Typography>
            </Link>
          </MaterialUIForm>
        </Card>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error && state.user.error.response.data
});

const mapDispatchToProps = {
  login,
  setWindowTitle: setTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage));

LoginPage.propTypes = {
  /** error text to display, if any */
  error: PropTypes.string,
  /** Thunk to send login information */
  login: PropTypes.func.isRequired,
  setWindowTitle: PropTypes.func.isRequired,
  /** styles from material ui */
  classes: PropTypes.object.isRequired
};

LoginPage.defaultProps = {
  error: undefined
};
