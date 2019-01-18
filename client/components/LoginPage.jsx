import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/styles';

import { login } from '../store/user/actions';

const styles = createStyles({
  container: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 0,
    width: 300
  }
});

class LoginPage extends React.Component {
  submit = values => {
    this.props.login(values.username, values.password);
  };

  render() {
    console.log(this.props.classes);
    const error = this.props.error;
    return (
      <Paper>
        <Card>
          <MaterialUIForm
            onSubmit={this.submit}
            className={this.props.classes.form}
          >
            <TextField
              label="Username"
              name="username"
              type="text"
              variant="outlined"
              data-validators="isRequired"
              className={this.props.classes.textField}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              data-validators="isRequired"
              className={this.props.classes.textField}
            />
            <Typography
              color="error"
              align="center"
              className={this.props.classes.textField}
            >
              {error}
            </Typography>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
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
