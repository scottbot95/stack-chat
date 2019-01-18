import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import { login } from '../store/user/actions';
import { styles } from '../theme';

class LoginPage extends React.Component {
  submit = values => {
    console.log(values);
    this.props.login(values.username, values.password);
  };

  render() {
    const error = this.props.error;

    const classes = this.props.classes;

    const formClass = [classes.form, classes.container].join(' ');

    return (
      <Paper className={[classes.container, classes.center].join(' ')}>
        <Card>
          <MaterialUIForm onSubmit={this.submit} className={formClass}>
            <fieldset className={formClass}>
              <legend>
                <Typography variant="h6">Login</Typography>
              </legend>
              <Typography variant="subtitle1">
                Enter Login Credentials
              </Typography>
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
            </fieldset>
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
  login
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);

LoginPage.propTypes = {
  /** error text to display, if any */
  error: PropTypes.string,
  /** Thunk to send login information */
  login: PropTypes.func.isRequired,
  /** styles from material ui */
  classes: PropTypes.object.isRequired
};

LoginPage.defaultProps = {
  error: undefined
};
